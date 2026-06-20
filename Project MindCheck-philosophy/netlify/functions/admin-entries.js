'use strict';
// GET    /.netlify/functions/admin-entries   → list records
// DELETE /.netlify/functions/admin-entries   → delete ALL

const { connectDB, Entry }                                          = require('./lib/db');
const { verifyToken, VALID_LEVELS, VALID_CAT_IDS,
        serialiseEntry, ok, badReq, unauth, serverErr, preflight }  = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  try {
    await connectDB();

    if (event.httpMethod === 'DELETE') {
      const r = await Entry.deleteMany({});
      return ok({ success: true, deleted: r.deletedCount });
    }

    if (event.httpMethod !== 'GET') return badReq('Method not allowed');

    const q        = event.queryStringParameters || {};
    const search   = (q.search   || '').trim();
    const level    = q.level    || '';
    const category = q.category || '';
    const gender   = q.gender   || '';
    const sort     = q.sort     || 'newest';
    const page     = Math.max(1, parseInt(q.page  || '1'));
    const limit    = Math.min(parseInt(q.limit || '200'), 500);

    const filter = {};
    if (level    && VALID_LEVELS.includes(level))  filter.level = level;
    if (category && VALID_CAT_IDS.includes(category)) filter.categories = category;
    if (gender   && gender !== 'all') {
      filter.gender = new RegExp('^' + gender.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i');
    }
    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { age: rx }, { gender: rx }];
    }

    const sortMap = {
      newest:       { createdAt: -1 },
      oldest:       { createdAt:  1 },
      'score-high': { pct: -1 },
      'score-low':  { pct:  1 },
      'name-az':    { name:  1 },
    };

    const [entries, total] = await Promise.all([
      Entry.find(filter).sort(sortMap[sort] || { createdAt: -1 })
        .skip((page - 1) * limit).limit(limit).lean(),
      Entry.countDocuments(filter),
    ]);

    return ok({ entries: entries.map(serialiseEntry), total, page });
  } catch (e) {
    return serverErr(e.message);
  }
};
