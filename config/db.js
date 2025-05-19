const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;
const pool = postgres(connectionString);

module.exports = pool;