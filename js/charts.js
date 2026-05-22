/* ═══════════════════════════════════════════════
   CHARTS.JS — Stats, Ring Chart, Bar Charts,
   Timeline, Heatmap
   DS Jobs Pro
═══════════════════════════════════════════════ */

/* ── UPDATE ALL STAT CARDS ── */
function updateStats() {
  const apps  = Store.getApps();
  const c     = Store.counts();
  const total = apps.length;
  const rate  = Store.responseRate();
  const week  = Store.weekCount();
  const goal  = Store.getGoal();

  // Stat cards
  $('s-total').textContent    = total;
  $('s-inter').textContent    = c.interview;
  $('s-rate').textContent     = rate + '%';
  $('s-week').textContent     = week;
  $('s-total-sub').textContent = total ? 'Keep it up!' : 'Start logging!';
  $('s-goal-sub').textContent  = `Goal: ${goal}/week`;
  $('appBadge').textContent    = total;

  // Analytics page numbers
  if ($('bigRate'))  $('bigRate').textContent  = rate + '%';
  if ($('bigTotal')) $('bigTotal').textContent = total;

  // Best role
  if ($('bestRole')) {
    const roles = { analyst: 0, engineer: 0, scientist: 0, ml: 0 };
    apps.forEach(a => {
      const r = (a.role || 'analyst').toLowerCase();
      if (roles[r] !== undefined) roles[r]++;
    });
    const best = Object.entries(roles).sort((a, b) => b[1] - a[1])[0];
    $('bestRole').textContent = (best && best[1] > 0)
      ? best[0].charAt(0).toUpperCase() + best[0].slice(1)
      : '—';
  }

  updateStatusBars(c, total);
  updateRingChart(total, c);
  updateBarCharts(apps);
  renderTimeline();
}

/* ── STATUS BARS ── */
function updateStatusBars(c, total) {
  const max = Math.max(...Object.values(c), 1);
  ['applied', 'interview', 'offered', 'rejected', 'saved'].forEach(k => {
    const bar = $('sb-' + k);
    const cnt = $('sc-' + k);
    if (bar) bar.style.width = (c[k] / max * 100) + '%';
    if (cnt) cnt.textContent = c[k];
  });
}

/* ── RING / DONUT CHART ── */
function updateRingChart(total, c) {
  const C   = 302; // circumference
  const elA = $('ring-a');
  const elI = $('ring-i');
  const elO = $('ring-o');
  const num = $('ringNum');

  if (!num) return;
  num.textContent = total;

  const aw = total ? (c.applied   / total) * C : 0;
  const iw = total ? (c.interview / total) * C : 0;
  const ow = total ? (c.offered   / total) * C : 0;

  elA.setAttribute('stroke-dasharray',  `${aw} ${C - aw}`);
  elI.setAttribute('stroke-dasharray',  `${iw} ${C - iw}`);
  elI.setAttribute('stroke-dashoffset', -aw);
  elO.setAttribute('stroke-dasharray',  `${ow} ${C - ow}`);
  elO.setAttribute('stroke-dashoffset', -(aw + iw));
}

/* ── BAR CHARTS ── */
function updateBarCharts(apps) {
  // By role
  const roles = { analyst: 0, engineer: 0, scientist: 0, ml: 0 };
  apps.forEach(a => {
    const r = (a.role || 'analyst').toLowerCase();
    if (roles[r] !== undefined) roles[r]++;
    else roles.analyst++;
  });
  setBarChart('roleChart', [roles.analyst, roles.engineer, roles.scientist, roles.ml]);

  // By location
  const locs = { remote: 0, toronto: 0, vancouver: 0, calgary: 0 };
  apps.forEach(a => {
    const l = (a.location || '').toLowerCase();
    if      (l.includes('remote'))    locs.remote++;
    else if (l.includes('toronto'))   locs.toronto++;
    else if (l.includes('vancouver')) locs.vancouver++;
    else if (l.includes('calgary'))   locs.calgary++;
  });
  setBarChart('locChart', [locs.remote, locs.toronto, locs.vancouver, locs.calgary]);

  // Weekly activity (last 4 weeks)
  const now = new Date();
  const wk  = [0, 0, 0, 0];
  apps.forEach(a => {
    const d = Math.floor((now - new Date(a.date + 'T12:00:00')) / 86400000);
    const w = Math.floor(d / 7);
    if (w >= 0 && w < 4) wk[3 - w]++;
  });
  setBarChart('wkChart', wk);
}

/* ── SET A BAR CHART ── */
function setBarChart(chartId, vals) {
  const cols = $(chartId)?.querySelectorAll('.bc-col');
  if (!cols) return;
  const max = Math.max(...vals, 1);
  vals.forEach((v, i) => {
    if (cols[i]) {
      cols[i].querySelector('.bc-val').textContent    = v;
      cols[i].querySelector('.bc-bar').style.height   = (v / max * 86 + 4) + 'px';
    }
  });
}

/* ── TIMELINE ── */
function renderTimeline() {
  const tl = $('timeline');
  if (!tl) return;

  const apps = [...Store.getApps()]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  if (!apps.length) {
    tl.innerHTML = '<div class="empty"><div class="ei">📭</div>No applications yet</div>';
    return;
  }

  tl.innerHTML = apps.map(a => `
    <div class="tl-entry">
      <div class="tl-spine">
        <div class="tl-node" style="background:${SC[a.status] || 'var(--muted2)'}"></div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-body">
        <div class="tl-when">${fmtDate(a.date)}</div>
        <div class="tl-tit">${a.title}</div>
        <div class="tl-sub">${a.company} · ${a.location || ''}</div>
        <span class="tl-stag" style="background:${SB[a.status]};color:${SC[a.status]}">
          ${a.status}
        </span>
      </div>
    </div>`).join('');
}

/* ── HEATMAP (6 months) ── */
function renderHeatmap() {
  const hm   = $('heatmap');
  if (!hm) return;

  const apps = Store.getApps();
  const now  = new Date();
  let   html = '';

  for (let i = 181; i >= 0; i--) {
    const d  = new Date(now - i * 86400000);
    const ds = d.toISOString().split('T')[0];
    const n  = apps.filter(a => a.date === ds).length;
    const cls = n === 0 ? '' : n === 1 ? 'l1' : n === 2 ? 'l2' : n <= 3 ? 'l3' : 'l4';
    html += `<div class="hm-cell ${cls}" title="${ds}: ${n} application${n !== 1 ? 's' : ''}"></div>`;
  }

  hm.innerHTML = html;
}
