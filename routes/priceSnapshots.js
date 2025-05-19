const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/price-snapshots?fiat=JPY
router.get('/', async (req, res) => {
  const fiat = req.query.fiat || 'JPY';
  try {
    // Get the latest price_snapshot for each asset in the given fiat
    const query = `
      SELECT DISTINCT ON (ps.asset_id) ps.*, a.symbol, a.name, a.icon_url
      FROM price_snapshot ps
      JOIN asset a ON a.id = ps.asset_id
      WHERE ps.fiat_code = $1
      ORDER BY ps.asset_id, ps.taken_at DESC
    `;
    const result = await pool.query(query, [fiat]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching price snapshots:', err);
    res.status(500).json({ message: 'Error fetching price snapshots' });
  }
});

module.exports = router;
