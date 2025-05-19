const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Example: GET /api/sample
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

module.exports = router;
