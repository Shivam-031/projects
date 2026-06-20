'use strict';
/**
 * POST /.netlify/functions/admin-ai-seed
 *
 * Uses the Anthropic API to generate realistic MindCheck assessment entries
 * and bulk-inserts them into MongoDB.
 *
 * Body params:
 *   count      {number}   How many entries to generate (1–50, default 10)
 *   categories {string[]} Which categories to include (default: all)
 *   prompt     {string}   Optional extra instruction sent to the AI
 *                         e.g. "focus on young adults with high anxiety"
 *
 * Requires env vars:
 *   ANTHROPIC_API_KEY   — Anthropic secret key
 *   MONGO_URI           — MongoDB Atlas connection string
 *   ADMIN_USER / ADMIN_PASS / SECRET — same as other admin functions
 */

const { connectDB, Entry }  = require('./lib/db');
const { verifyToken, VALID_LEVELS, VALID_CAT_IDS,
        ok, badReq, unauth, serverErr, preflight } = require('./lib/auth');

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const MAX_ENTRIES   = 50;
const QUESTIONS_PER_CAT = 16;   // each category has 16 questions, answers 0-3

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Build the system prompt that constrains Claude's JSON output */
function buildSystemPrompt(count, categories, extraInstruction) {
  return `You are a data-generation assistant for a mental-health self-assessment app called MindCheck.

Your task: generate EXACTLY ${count} realistic, diverse assessment entries.

Schema for each entry (JSON):
{
  "name":       string  (realistic full name, ≤100 chars),
  "age":        string  (e.g. "24", "35-44", or "—" if unknown),
  "gender":     string  (e.g. "Male", "Female", "Non-binary", "—"),
  "categories": string[] (subset of valid categories, must be non-empty),
  "answers":    number[] (length = categories.length × ${QUESTIONS_PER_CAT}, each value 0-3),
  "score":      number  (sum of all answers),
  "max":        number  (categories.length × ${QUESTIONS_PER_CAT} × 3),
  "pct":        number  (score/max × 100, rounded to 1 decimal),
  "level":      "low" | "moderate" | "high"  (low <40%, moderate 40-69%, high ≥70%),
  "cats":       object  (key = catId, value = { score, max, catId })
}

Valid category IDs: ${VALID_CAT_IDS.join(', ')}
Chosen categories for this batch: ${categories.join(', ')}

Rules:
- Only use categories from the chosen list above.
- answers.length MUST equal categories.length × ${QUESTIONS_PER_CAT}.
- score = sum(answers), max = categories.length × ${QUESTIONS_PER_CAT} × 3
- pct = (score / max) × 100 rounded to 1 decimal place
- level: pct < 40 → "low", 40 ≤ pct < 70 → "moderate", pct ≥ 70 → "high"
- cats: for each category, sum its 16 answers as "score", its max = ${QUESTIONS_PER_CAT} × 3 = 48
- Make names, ages, and genders realistic and diverse (mix of demographics)
${extraInstruction ? `\nAdditional instruction: ${extraInstruction}` : ''}

Return ONLY a valid JSON array — no markdown, no commentary, no backticks.`;
}

/** Call the Anthropic Messages API and parse the JSON array response */
async function generateEntries(count, categories, extraInstruction) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system:     buildSystemPrompt(count, categories, extraInstruction),
      messages: [
        {
          role:    'user',
          content: `Generate ${count} entries using categories: ${categories.join(', ')}. Return only the JSON array.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = (data.content || [])
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');

  // Strip any accidental markdown fences
  const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    throw new Error('AI returned invalid JSON: ' + clean.slice(0, 200));
  }

  if (!Array.isArray(parsed)) throw new Error('AI response is not an array');
  return parsed;
}

/** Validate and sanitise a single AI-generated entry before DB insert */
function sanitise(raw, allowedCats) {
  const errors = [];

  if (!raw.name || typeof raw.name !== 'string' || !raw.name.trim())
    errors.push('missing name');

  const cats = Array.isArray(raw.categories)
    ? raw.categories.filter(c => allowedCats.includes(c))
    : [];
  if (!cats.length) errors.push('no valid categories');

  const expectedLen = cats.length * QUESTIONS_PER_CAT;
  if (!Array.isArray(raw.answers) || raw.answers.length !== expectedLen)
    errors.push(`answers.length must be ${expectedLen}, got ${raw.answers?.length}`);

  if (!VALID_LEVELS.includes(raw.level)) errors.push('invalid level');
  if (typeof raw.score !== 'number')    errors.push('score not a number');
  if (typeof raw.max   !== 'number')    errors.push('max not a number');
  if (typeof raw.pct   !== 'number')    errors.push('pct not a number');

  if (errors.length) return { ok: false, errors };

  // Re-derive score/max/pct/level from answers to ensure consistency
  const answers = raw.answers.map(Number);
  const score   = answers.reduce((s, v) => s + v, 0);
  const max     = cats.length * QUESTIONS_PER_CAT * 3;
  const pct     = Math.round((score / max) * 1000) / 10;
  const level   = pct < 40 ? 'low' : pct < 70 ? 'moderate' : 'high';

  // Re-derive per-category stats
  const catsMap = {};
  cats.forEach((catId, i) => {
    const slice = answers.slice(i * QUESTIONS_PER_CAT, (i + 1) * QUESTIONS_PER_CAT);
    catsMap[catId] = {
      catId,
      score: slice.reduce((s, v) => s + v, 0),
      max:   QUESTIONS_PER_CAT * 3,
    };
  });

  return {
    ok: true,
    entry: {
      name:       raw.name.trim().slice(0, 100),
      age:        String(raw.age  ?? '—').slice(0, 10),
      gender:     String(raw.gender ?? '—').slice(0, 20),
      categories: cats,
      answers,
      score,
      max,
      pct,
      level,
      cats:       catsMap,
    },
  };
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST')    return badReq('POST only');

  // Admin-only endpoint
  const auth = verifyToken(event.headers);
  if (!auth.ok) return unauth(auth.error);

  // Parse request body
  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return badReq('Invalid JSON'); }

  const count = Math.min(Math.max(parseInt(body.count ?? 10), 1), MAX_ENTRIES);

  const requestedCats = Array.isArray(body.categories) && body.categories.length
    ? body.categories.filter(c => VALID_CAT_IDS.includes(c))
    : VALID_CAT_IDS;

  if (!requestedCats.length) return badReq('No valid categories provided');

  const extraInstruction = typeof body.prompt === 'string'
    ? body.prompt.slice(0, 500)
    : '';

  try {
    // 1. Generate entries via Anthropic
    const rawEntries = await generateEntries(count, requestedCats, extraInstruction);

    // 2. Validate & sanitise
    const valid   = [];
    const skipped = [];

    for (let i = 0; i < rawEntries.length; i++) {
      const result = sanitise(rawEntries[i], requestedCats);
      if (result.ok) {
        valid.push(result.entry);
      } else {
        skipped.push({ index: i, errors: result.errors });
      }
    }

    if (!valid.length) {
      return serverErr('All AI-generated entries failed validation: ' +
        JSON.stringify(skipped.slice(0, 3)));
    }

    // 3. Bulk-insert into MongoDB
    await connectDB();
    const inserted = await Entry.insertMany(valid, { ordered: false });

    return ok({
      success:       true,
      requested:     count,
      generated:     rawEntries.length,
      inserted:      inserted.length,
      skipped:       skipped.length,
      skippedDetail: skipped,
      ids:           inserted.map(e => e._id.toString()),
    });

  } catch (e) {
    return serverErr(e.message);
  }
};
