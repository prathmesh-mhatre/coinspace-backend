const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/assets
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, symbol, name, icon_url FROM asset ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ message: 'Error fetching assets' });
  }
});

module.exports = router;
