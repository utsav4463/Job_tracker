/* ═══════════════════════════════════════════════
   UTILS.JS — Shared Helper Functions
   DS Jobs Pro
═══════════════════════════════════════════════ */

/* ── STATUS COLOUR MAPS ── */
const SC = {
  applied:   'var(--cyan)',
  interview: 'var(--amber)',
  offered:   'var(--green)',
  rejected:  'var(--red)',
  saved:     'var(--muted2)'
};
const SB = {
  applied:   'rgba(56,189,248,0.12)',
  interview: 'rgba(251,191,36,0.12)',
  offered:   'rgba(52,211,153,0.12)',
  rejected:  'rgba(248,113,113,0.12)',
  saved:     'rgba(107,127,160,0.12)'
};

/* ── DOM SHORTHAND ── */
function $(id) { return document.getElementById(id); }

/* ── DATE HELPERS ── */
function today() {
  return new Date().toISOString().split('T')[0];
}

function fmtDate(d) {
  try {
    return new Date(d + 'T12:00:00').toLocaleDateString('en-CA', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch { return d || ''; }
}

function daysAgo(dateStr) {
  try {
    const n = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
    return n === 0 ? 'Today' : n === 1 ? '1d ago' : n + 'd ago';
  } catch { return 'Recently'; }
}

function recentDate(n) {
  return new Date(Date.now() - n * 86400000).toISOString().split('T')[0];
}

/* ── TOAST NOTIFICATIONS ── */
function toast(msg, type = 'ok') {
  const el = $('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'toast show' + (type === 'err' ? ' err' : type === 'inf' ? ' inf' : '');
  setTimeout(() => el.classList.remove('show'), 3000);
}

/* ── CHIP SELECTORS ── */
function pickChip(el, gid) {
  document.getElementById(gid)
    ?.querySelectorAll('.chip-tog')
    .forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
}

function getChip(gid) {
  return document.getElementById(gid)
    ?.querySelector('.sel')
    ?.textContent?.trim() || '';
}

/* ── COLOUR HASH (for company logos) ── */
function hashColor(str, alpha) {
  let h = 0;
  for (const c of str) { h = ((h << 5) - h) + c.charCodeAt(0); h |= 0; }
  const palette = [
    '#38bdf8','#34d399','#fbbf24','#f87171',
    '#a78bfa','#f472b6','#fb923c','#4ade80',
    '#60a5fa','#e879f9'
  ];
  const col = palette[Math.abs(h) % palette.length];
  return alpha === 1 ? col : col + '1a';
}

/* ── GUESS ROLE FROM TITLE ── */
function guessRole(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('engineer') || t.includes('etl') || t.includes('pipeline')) return 'engineer';
  if (t.includes('scientist')) return 'scientist';
  if (t.includes('ml') || t.includes('machine learning') || t.includes(' ai ')) return 'ml';
  return 'analyst';
}

/* ── GUESS LEVEL FROM TITLE ── */
function guessLevel(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('senior') || t.includes('lead') || t.includes('principal')) return 'senior';
  if (t.includes('junior') || t.includes('jr.')) return 'junior';
  if (t.includes('intern') || t.includes('trainee') || t.includes('grad') ||
      t.includes('entry') || t.includes('new grad')) return 'fresh';
  return 'junior';
}

/* ── FORMAT AI MARKDOWN ── */
function fmtAI(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,     '<em>$1</em>')
    .replace(/`(.*?)`/g,       '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g,   '<br>');
}
