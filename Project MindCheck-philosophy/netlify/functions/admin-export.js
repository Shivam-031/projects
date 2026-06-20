'use strict';
// GET /.netlify/functions/admin-export

const { connectDB, Entry }                              = require('./lib/db');
const { verifyToken, unauth, serverErr, preflight, CORS } = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  try {
    await connectDB();
    const entries = await Entry.find({}).sort({ createdAt: -1 }).lean();

    const catNamesSet = new Set();
    entries.forEach(e => {
      const keys = e.cats instanceof Map ? [...e.cats.keys()] : Object.keys(e.cats || {});
      keys.forEach(k => catNamesSet.add(k));
    });
    const catNames = [...catNamesSet].sort();

    const headers = [
      '#','MongoDB ID','Name','Age','Gender',
      'Score','Max','Pct%','Level','Categories','Date','Time',
      ...catNames.map(n => n + ' %'),
    ];

    const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;

    const rows = entries.map((e, i) => {
      const dt      = new Date(e.createdAt);
      const catsObj = e.cats instanceof Map
        ? Object.fromEntries(e.cats)
        : Object.fromEntries(Object.entries(e.cats || {}));
      return [
        i + 1, e._id.toString(), e.name, e.age || '—', e.gender || '—',
        e.score, e.max, e.pct + '%', e.level,
        (e.categories || []).join(' | '),
        dt.toLocaleDateString('en-IN'), dt.toLocaleTimeString('en-IN'),
        ...catNames.map(n => {
          const c = catsObj[n];
          return c ? Math.round((c.score / c.max) * 100) + '%' : '—';
        }),
      ];
    });

    const csv = '\uFEFF' + [headers, ...rows].map(r => r.map(q).join(',')).join('\n');
    const date = new Date().toISOString().split('T')[0];

    return {
      statusCode: 200,
      headers: {
        ...CORS,
        'Content-Type':        'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="mindcheck-${date}.csv"`,
      },
      body: csv,
    };
  } catch (e) {
    return serverErr(e.message);
  }
};
