const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/users/:userId/activities?limit=20
router.get('/users/:userId/activities', async (req, res) => {
  const { userId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const result = await pool`
      SELECT aa.*, a.symbol AS asset_symbol, fc.code AS fiat_code, ua.username
      FROM account_activity aa
      JOIN user_account ua ON ua.id = aa.user_id
      LEFT JOIN asset a ON a.id = aa.asset_id
      LEFT JOIN fiat_currency fc ON fc.code = aa.fiat_code
      WHERE aa.user_id = ${userId}
      ORDER BY aa.happened_at DESC
      LIMIT ${limit}
    `;
    res.json(result);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ message: 'Error fetching activities' });
  }
});

module.exports = router;
