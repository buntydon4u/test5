const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const auth = require('../middleware/auth');

const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/games - Get all games (prime and local)
router.get('/', async (req, res) => {
  try {
    const { data: primeGames, error: primeError } = await supabase
      .from('games')
      .select('*')
      .eq('gameType', 'prime')
      .eq('isActive', true)
      .order('startTime', { ascending: true });

    const { data: localGames, error: localError } = await supabase
      .from('games')
      .select('*')
      .eq('gameType', 'local')
      .eq('isActive', true)
      .order('startTime', { ascending: true });

    if (primeError || localError) {
      throw new Error('Error fetching games');
    }

    res.json({
      prime: primeGames,
      local: localGames
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/games/admin - Get all games for admin (authenticated) with latest results
router.get('/admin', auth, async (req, res) => {
  try {
    const { data: games, error: gamesError } = await supabase
      .from('games')
      .select('*')
      .order('nickName', { ascending: true })
      .order('createdAt', { ascending: false });

    if (gamesError) {
      throw new Error('Error fetching games');
    }

    // Get unique game names and their latest instances
    const uniqueGames = [];
    const seenNames = new Set();

    for (const game of games) {
      if (!seenNames.has(game.nickName)) {
        seenNames.add(game.nickName);

        // Get the latest result for this game
        const { data: latestResult, error: resultError } = await supabase
          .from('results')
          .select('*')
          .eq('name', game.nickName)
          .order('created_at', { ascending: false })
          .limit(1);

        uniqueGames.push({
          ...game,
          latestResult: latestResult && latestResult.length > 0 ? {
            result: latestResult[0].result,
            date: latestResult[0].created_at,
            time: latestResult[0].time
          } : null
        });
      }
    }

    res.json(uniqueGames);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/games - Create a new game (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    // Transform camelCase to match database schema
    const transformedBody = {
      nickName: req.body.nickName,
      startTime: req.body.startTime,
      end_time: req.body.endTime,
      isActive: req.body.isActive,
      gameType: req.body.gameType
    };

    const { data, error } = await supabase
      .from('games')
      .insert([transformedBody])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// GET /api/games/:id - Get a single game (authenticated)
router.get('/:id', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/games/:id - Update a game (authenticated)
router.put('/:id', auth, async (req, res) => {
  try {
    // Transform camelCase to match database schema
    const transformedBody = {
      nickName: req.body.nickName,
      startTime: req.body.startTime,
      end_time: req.body.endTime,
      isActive: req.body.isActive,
      gameType: req.body.gameType
    };

    const { data, error } = await supabase
      .from('games')
      .update(transformedBody)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE /api/games/:id - Delete a game (authenticated)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
