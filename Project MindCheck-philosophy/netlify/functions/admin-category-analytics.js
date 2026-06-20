'use strict';
// GET /.netlify/functions/admin-category-analytics

const { connectDB, Entry }                              = require('./lib/db');
const { verifyToken, ok, unauth, serverErr, preflight } = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  try {
    await connectDB();
    const results = await Entry.aggregate([
      { $project: { catsArr: { $objectToArray: '$cats' } } },
      { $unwind: '$catsArr' },
      {
        $group: {
          _id:        '$catsArr.k',
          totalScore: { $sum: '$catsArr.v.score' },
          totalMax:   { $sum: '$catsArr.v.max' },
          count:      { $sum: 1 },
          avgPct: {
            $avg: { $multiply: [{ $divide: ['$catsArr.v.score', '$catsArr.v.max'] }, 100] },
          },
        },
      },
      { $sort: { avgPct: -1 } },
    ]);
    return ok({ analytics: results });
  } catch (e) {
    return serverErr(e.message);
  }
};
