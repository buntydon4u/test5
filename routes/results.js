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

// GET /api/results - Get all results
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/results - Create a new result (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .insert([req.body])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating result:', error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT /api/results/:id - Update a result (authenticated)
router.put('/:id', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE /api/results/:id - Delete a result (authenticated)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('results')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/results/publish - Publish result for a game (authenticated)
router.post('/publish', auth, async (req, res) => {
  try {
    const { gameId, left, center, right } = req.body;

    if (!gameId || !left || !center || !right) {
      return res.status(400).json({ error: 'Game ID and all result numbers are required' });
    }

    // Find the game to get its name
    const { data: game, error: gameError } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();

    if (gameError || !game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Create result
    const resultData = {
      name: game.nick_name,
      time: new Date(game.end_time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      left,
      center,
      right,
      result: `${left}${center}${right}`
    };

    const { data, error } = await supabase
      .from('results')
      .insert([resultData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error publishing result:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
