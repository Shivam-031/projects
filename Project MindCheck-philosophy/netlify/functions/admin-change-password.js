'use strict';
// POST /.netlify/functions/admin-change-password

const { verifyToken, hashPass, ADMIN, ok, badReq, unauth, preflight } = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST') return badReq('POST only');

  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return badReq('Invalid JSON'); }

  const { newPassword } = body;
  if (!newPassword || newPassword.length < 6)
    return badReq('Password must be at least 6 characters');

  ADMIN.passHash = hashPass(newPassword);
  return ok({ success: true, message: 'Password updated. Please log in again.' });
};
