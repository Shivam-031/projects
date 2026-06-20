'use strict';

const crypto = require('crypto');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'mindcheck2025';
const SECRET     = process.env.SECRET     || 'mindcheck_secret_change_me';

function hashPass(p) {
  return crypto.createHash('sha256').update(p + SECRET).digest('hex');
}

const ADMIN = { username: ADMIN_USER, passHash: hashPass(ADMIN_PASS) };

function verifyToken(headers) {
  const token = headers['x-admin-token'] || headers['X-Admin-Token'];
  if (!token) return { ok: false, error: 'No auth token' };
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const col = decoded.indexOf(':');
    const u   = decoded.slice(0, col);
    const p   = decoded.slice(col + 1);
    if (u !== ADMIN.username || hashPass(p) !== ADMIN.passHash)
      return { ok: false, error: 'Invalid credentials' };
    return { ok: true, username: u };
  } catch {
    return { ok: false, error: 'Malformed token' };
  }
}

function makeToken(u, p) {
  return Buffer.from(`${u}:${p}`).toString('base64');
}

function checkLogin(u, p) {
  return u === ADMIN.username && hashPass(p) === ADMIN.passHash;
}

// ─── RESPONSE HELPERS ─────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-token',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
};

function respond(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...CORS, ...extraHeaders },
    body: JSON.stringify(body),
  };
}

const ok        = b   => respond(200, b);
const created   = b   => respond(201, b);
const badReq    = msg => respond(400, { error: msg });
const unauth    = msg => respond(401, { error: msg });
const notFound  = msg => respond(404, { error: msg });
const serverErr = msg => respond(500, { error: msg });
const preflight = ()  => ({ statusCode: 204, headers: CORS, body: '' });

// ─── ENTRY SERIALISER ─────────────────────────────────────────────────────────

function serialiseEntry(e) {
  const cats = e.cats instanceof Map
    ? Object.fromEntries(e.cats)
    : (e.cats ? Object.fromEntries(Object.entries(e.cats)) : {});
  return { ...e, _id: e._id.toString(), cats };
}

// ─── VALIDATION ───────────────────────────────────────────────────────────────

const VALID_LEVELS  = ['low', 'moderate', 'high'];
const VALID_CAT_IDS = [
  'creativity','intelligence','emotional','personality',
  'memory','attention','anxiety','depression','mania',
];

function validateEntry(b) {
  if (!b.name || typeof b.name !== 'string' || !b.name.trim()) return 'name is required';
  if (!VALID_LEVELS.includes(b.level))   return 'level must be low|moderate|high';
  if (typeof b.score !== 'number')       return 'score must be a number';
  if (typeof b.max   !== 'number' || b.max < 1) return 'max must be a positive number';
  if (typeof b.pct   !== 'number')       return 'pct must be a number';
  if (!Array.isArray(b.categories) || !b.categories.length) return 'categories required';
  if (!Array.isArray(b.answers))         return 'answers must be an array';
  const expected = b.categories.length * 16;
  if (b.answers.length !== expected)
    return `answers.length must be ${expected} (${b.categories.length} categories × 16)`;
  return null;
}

module.exports = {
  verifyToken, makeToken, checkLogin, hashPass, ADMIN,
  validateEntry, VALID_LEVELS, VALID_CAT_IDS,
  ok, created, badReq, unauth, notFound, serverErr, preflight,
  serialiseEntry, CORS,
};
