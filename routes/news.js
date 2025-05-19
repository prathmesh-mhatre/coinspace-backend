const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/news?limit=10
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const result = await pool`SELECT * FROM news_article ORDER BY published_at DESC LIMIT ${limit}`;
    res.json(result);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

module.exports = router;
