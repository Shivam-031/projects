'use strict';
// GET /.netlify/functions/admin-stats

const { connectDB, Entry }                         = require('./lib/db');
const { verifyToken, ok, unauth, serverErr, preflight } = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  try {
    await connectDB();
    const [total, low, moderate, high, agg, genderAgg, catPop] = await Promise.all([
      Entry.countDocuments(),
      Entry.countDocuments({ level: 'low' }),
      Entry.countDocuments({ level: 'moderate' }),
      Entry.countDocuments({ level: 'high' }),
      Entry.aggregate([{ $group: { _id: null, avgPct: { $avg: '$pct' }, avgScore: { $avg: '$score' } } }]),
      Entry.aggregate([{ $group: { _id: '$gender', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Entry.aggregate([
        { $unwind: '$categories' },
        { $group: { _id: '$categories', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);
    return ok({
      total, low, moderate, high,
      avg_pct:             agg[0] ? Math.round(agg[0].avgPct   * 10) / 10 : 0,
      avg_score:           agg[0] ? Math.round(agg[0].avgScore * 10) / 10 : 0,
      gender_breakdown:    genderAgg,
      category_popularity: catPop,
    });
  } catch (e) {
    return serverErr(e.message);
  }
};
