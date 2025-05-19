const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/candlesticks?assets=BTC,ETH,XRP&fiat=JPY&limit=60
router.get('/', async (req, res) => {
  const { assets, fiat, limit } = req.query;
  if (!assets || !fiat) return res.status(400).json({ message: 'assets and fiat are required' });

  const assetSymbols = assets.split(',').map(s => s.trim().toUpperCase());
  const lim = parseInt(limit, 10) || 60;

  try {
    // Fetch asset IDs and names for all requested symbols
    const assetResult = await pool`SELECT id, symbol, name FROM asset WHERE symbol = ANY(${assetSymbols})`;
    if (assetResult.length === 0) return res.status(404).json({ message: 'No assets found' });

    // Map: symbol -> { id, name }
    const assetMap = {};
    assetResult.forEach(row => {
      assetMap[row.symbol] = { id: row.id, name: row.name };
    });

    // For each asset, fetch candlesticks and latest price snapshot
    const results = await Promise.all(assetSymbols.map(async (symbol) => {
      const asset = assetMap[symbol];
      if (!asset) return { symbol, error: 'Asset not found' };
      // Candlesticks
      const cResult = await pool`SELECT * FROM candlestick WHERE asset_id = ${asset.id} AND fiat_code = ${fiat} ORDER BY open_time DESC LIMIT ${lim}`;
      // Latest price snapshot
      const pResult = await pool`SELECT price, pct_change_24h FROM price_snapshot WHERE asset_id = ${asset.id} AND fiat_code = ${fiat} ORDER BY taken_at DESC LIMIT 1`;
      return {
        symbol,
        name: asset.name,
        candlesticks: cResult.reverse(), // chronological order
        price: pResult[0]?.price || null,
        pct_change_24h: pResult[0]?.pct_change_24h || null
      };
    }));

    res.json(results);
  } catch (err) {
    console.error('Error fetching candlesticks:', err);
    res.status(500).json({ message: 'Error fetching candlesticks' });
  }
});

module.exports = router;
