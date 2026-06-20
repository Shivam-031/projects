'use strict';
// GET /.netlify/functions/health

const { connectDB, Entry } = require('./lib/db');
const { ok, preflight, CORS } = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  try {
    await connectDB();
    const total = await Entry.countDocuments();
    return ok({ status: 'ok', database: 'connected', total_entries: total });
  } catch (err) {
    // Always return 200 with error detail — frontend reads `database` field
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...CORS },
      body: JSON.stringify({
        status: 'error',
        database: 'disconnected',
        total_entries: 0,
        error: err.message,
      }),
    };
  }
};
