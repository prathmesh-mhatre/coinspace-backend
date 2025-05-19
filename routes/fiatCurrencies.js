const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/fiat-currencies
router.get('/', async (req, res) => {
  try {
    const result = await pool`SELECT code, name FROM fiat_currency ORDER BY code`;
    res.json(result);
  } catch (err) {
    console.error('Error fetching fiat currencies:', err);
    res.status(500).json({ message: 'Error fetching fiat currencies' });
  }
});

module.exports = router;
