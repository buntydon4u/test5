const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check against users table
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/logout - Admin logout
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/auth/me - Get current user info
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
