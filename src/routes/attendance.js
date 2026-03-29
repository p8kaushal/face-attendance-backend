import express from 'express';
import { query } from '../db/database.js';

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

router.get('/', requireAuth, async (req, res) => {
  try {
    const { date, userId } = req.query;
    console.log('Querying attendance with date:', date, 'and userId:', userId);
    let sql = `
      SELECT a.id, a.user_id, u.employee_id, u.name, a.check_in, a.check_out, a.date 
      FROM attendance a 
      JOIN users u ON a.user_id = u.id
    `;
    const params = [];
    const conditions = [];

    if (date) {
      params.push(date);
      conditions.push(`a.date = $${params.length}`);
    }
    if (userId && userId !== 'undefined') {
      console.log('Filtering by userId:', userId);
      params.push(userId);
      conditions.push(`a.user_id = $${params.length}`);
    }
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY a.check_in DESC';

    console.log('Final SQL:', sql, 'with params:', params);

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/record', requireAuth, async (req, res) => {
  try {
    const { userId, type } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();

    if (type === 'in') {
      await query(
        'INSERT INTO attendance (user_id, check_in, date) VALUES ($1, $2, $3)',
        [userId, now, today]
      );
    } else {
      const lastRecord = await query(
        'SELECT id FROM attendance WHERE user_id = $1 AND date = $2 AND check_out IS NULL ORDER BY check_in DESC LIMIT 1',
        [userId, today]
      );
      if (lastRecord.rows.length > 0) {
        await query('UPDATE attendance SET check_out = $1 WHERE id = $2', [now, lastRecord.rows[0].id]);
      }
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', requireAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, employee_id, name, face_descriptor FROM users ORDER BY name`
    );
    res.json(result.rows.map(u => ({ ...u, faceDescriptor: JSON.parse(u.face_descriptor) })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/export', requireAuth, async (req, res) => {
  try {
    const result = await query(`
      SELECT u.employee_id, u.name, a.date, a.check_in, a.check_out
      FROM attendance a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.date DESC, a.check_in DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
