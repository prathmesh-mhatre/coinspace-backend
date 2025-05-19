require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Coinspace API' });
});

// API routes
const sampleRoute = require('./routes/sample');
const assetsRoute = require('./routes/assets');
const fiatRoute = require('./routes/fiatCurrencies');
const priceSnapshotsRoute = require('./routes/priceSnapshots');
const candlesticksRoute = require('./routes/candlesticks');
const activitiesRoute = require('./routes/activities');
const newsRoute = require('./routes/news');

app.use('/api/sample', sampleRoute);
app.use('/api/assets', assetsRoute);
app.use('/api/fiat-currencies', fiatRoute);
app.use('/api/price-snapshots', priceSnapshotsRoute);
app.use('/api/candlesticks', candlesticksRoute);
app.use('/api', activitiesRoute); // /api/users/:userId/activities
app.use('/api/news', newsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
