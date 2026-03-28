import express from 'express';
import crypto from 'crypto';
import { query } from '../db/database.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (username.length < 3 || password.length < 6) {
      return res.status(400).json({ error: 'Username must be 3+ chars, password 6+ chars' });
    }

    const existing = await query('SELECT id FROM admin_users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = hashPassword(password);
    await query(
      'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    const user = { id: Date.now(), username, isAdmin: true };
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(user);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const hashedPassword = hashPassword(password);
    const result = await query(
      'SELECT * FROM admin_users WHERE username = $1 AND password_hash = $2',
      [username, hashedPassword]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = { id: result.rows[0].id, username: result.rows[0].username, isAdmin: true, provider: 'local' };
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(user);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + process.env.SESSION_SECRET).digest('hex');
}

export default router;
