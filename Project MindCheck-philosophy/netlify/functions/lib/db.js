'use strict';
/**
 * lib/db.js — Mongoose connection + schema for Netlify Functions
 *
 * Key points for serverless:
 *  - Connection is cached on the module-level variable so warm invocations
 *    reuse the existing socket (avoids ~200ms reconnect penalty per request).
 *  - Timeout set to 8s to stay well inside Netlify's 10s function limit.
 *  - maxPoolSize: 3 — keeps Atlas free-tier connection count low.
 */

const mongoose = require('mongoose');

// ─── SCHEMA ───────────────────────────────────────────────────────────────────

const catResultSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 0 },
  max:   { type: Number, required: true, min: 1 },
  catId: { type: String, default: '' },
}, { _id: false });

const entrySchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true, maxlength: 100 },
  age:        { type: String, default: '—', maxlength: 10 },
  gender:     { type: String, default: '—', maxlength: 20 },
  categories: { type: [String], default: [] },
  score:      { type: Number, required: true, min: 0 },
  max:        { type: Number, required: true, min: 1 },
  pct:        { type: Number, required: true, min: 0, max: 100 },
  level:      { type: String, required: true, enum: ['low', 'moderate', 'high'] },
  cats:       { type: Map, of: catResultSchema },
  answers:    { type: [Number], default: [] },
}, { timestamps: true });

// Guard against model re-registration on warm invocations
const Entry = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

// ─── CONNECTION ───────────────────────────────────────────────────────────────

let cached = global._mongooseConnection;
if (!cached) cached = global._mongooseConnection = { conn: null, promise: null };

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set in environment variables');

  // Reuse existing connection
  if (cached.conn) return cached.conn;

  // Wait for in-progress connection
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS:          30000,
        connectTimeoutMS:         8000,
        maxPoolSize:              3,
        minPoolSize:              0,
        bufferCommands:           false,
      })
      .then(m => {
        cached.conn = m;
        cached.promise = null;
        return m;
      })
      .catch(err => {
        cached.promise = null;
        throw err;
      });
  }

  return cached.promise;
}

module.exports = { connectDB, Entry };
