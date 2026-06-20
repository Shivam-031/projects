'use strict';
// GET    /.netlify/functions/admin-entry?id=<mongoId>
// DELETE /.netlify/functions/admin-entry?id=<mongoId>

const { connectDB, Entry }                                        = require('./lib/db');
const { verifyToken, serialiseEntry,
        ok, badReq, unauth, notFound, serverErr, preflight }      = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  const id = (event.queryStringParameters || {}).id;
  if (!id) return badReq('Missing ?id= parameter');

  try {
    await connectDB();

    if (event.httpMethod === 'GET') {
      const entry = await Entry.findById(id).lean();
      if (!entry) return notFound('Entry not found');
      return ok(serialiseEntry(entry));
    }

    if (event.httpMethod === 'DELETE') {
      const r = await Entry.findByIdAndDelete(id);
      if (!r) return notFound('Entry not found');
      return ok({ success: true, message: 'Entry deleted' });
    }

    return badReq('Method not allowed');
  } catch (e) {
    return serverErr(e.message);
  }
};
