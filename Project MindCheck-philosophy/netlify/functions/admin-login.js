'use strict';
// POST /.netlify/functions/admin-login

const { checkLogin, makeToken, ok, badReq, unauth, preflight } = require('./lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST') return badReq('POST only');

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return badReq('Invalid JSON'); }

  const { username, password } = body;
  if (!username || !password) return badReq('Username and password required');
  if (!checkLogin(username, password)) return unauth('Invalid credentials');

  return ok({ success: true, token: makeToken(username, password), username });
};
