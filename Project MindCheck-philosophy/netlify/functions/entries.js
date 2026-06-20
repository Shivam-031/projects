'use strict';
// POST /.netlify/functions/entries

const { connectDB, Entry }                              = require('./lib/db');
const { validateEntry, VALID_CAT_IDS,
        created, badReq, serverErr, preflight }         = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST') return badReq('POST only');

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return badReq('Invalid JSON'); }

  const err = validateEntry(body);
  if (err) return badReq(err);

  const { name, age, gender, categories, score, max, pct, level, cats, answers } = body;

  try {
    await connectDB();
    const entry = await Entry.create({
      name:       name.trim(),
      age:        String(age    ?? '—').slice(0, 10),
      gender:     String(gender ?? '—').slice(0, 20),
      categories: (categories || []).filter(c => VALID_CAT_IDS.includes(c)),
      score, max, pct, level, cats, answers,
    });
    return created({ success: true, id: entry._id.toString() });
  } catch (e) {
    return serverErr('DB error: ' + e.message);
  }
};
