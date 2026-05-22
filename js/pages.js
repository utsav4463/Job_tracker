/* ═══════════════════════════════════════════════
   PAGES.JS — Tracker, Analytics, Goals Pages
   DS Jobs Pro
═══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   MY APPLICATIONS — TRACKER PAGE
══════════════════════════════════════════════ */
function renderTracker() {
  const el = $('trackerList');
  if (!el) return;

  const search = ($('s3')?.value || '').toLowerCase();
  const apps   = [...Store.getApps()]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(a =>
      !search ||
      a.title.toLowerCase().includes(search)   ||
      a.company.toLowerCase().includes(search) ||
      (a.notes || '').toLowerCase().includes(search)
    );

  if (!apps.length) {
    el.innerHTML = `
      <div class="empty">
        <div class="ei">📋</div>
        No applications yet. Click "+ Add New" to get started!
      </div>`;
    return;
  }

  el.innerHTML = apps.map(a => `
    <div class="tr-row">
      <div class="tr-logo" style="background:${hashColor(a.company, 0.12)};color:${hashColor(a.company, 1)}">
        ${(a.company || '?')[0].toUpperCase()}
      </div>
      <div class="tr-body">
        <div class="tr-tit">${a.title}</div>
        <div class="tr-sub">
          ${a.company} · ${a.location || ''}
          · <span style="color:var(--muted2)">${a.role || ''}</span>
          · <span style="color:var(--muted2)">${a.level || ''}</span>
          ${a.salary ? `· <span style="color:var(--green)">${a.salary}</span>` : ''}
        </div>
        ${a.notes ? `<div class="tr-notes">📝 ${a.notes}</div>` : ''}
      </div>
      <div class="tr-right">
        <div class="tr-actions">
          <select class="status-sel" onchange="changeStatus(${a.id}, this.value)">
            ${['applied','interview','offered','rejected','saved']
              .map(s => `<option ${a.status === s ? 'selected' : ''}>${s}</option>`)
              .join('')}
          </select>
          <button class="tr-edit" onclick="editApp(${a.id})" title="Edit">✏️</button>
          <button class="tr-del"  onclick="delApp(${a.id})"  title="Delete">✕</button>
        </div>
        <div class="tr-date">${fmtDate(a.date)}</div>
        ${a.url
          ? `<a href="${a.url}" target="_blank" style="font-size:10px;color:var(--cyan);font-family:var(--mono);">View Job →</a>`
          : ''}
      </div>
    </div>`).join('');
}

function changeStatus(id, status) {
  Store.updateApp(id, { status });
  renderTracker();
  updateStats();
  renderJobList('dash');
  toast('Status updated ✓');
}

function delApp(id) {
  if (!confirm('Delete this application?')) return;
  Store.deleteApp(id);
  renderTracker();
  updateStats();
  renderJobList('dash');
  renderJobList('jobs');
  toast('Deleted');
}

function editApp(id) {
  const app = Store.getApps().find(a => a.id == id);
  if (app) openModal(app);
}

/* ══════════════════════════════════════════════
   ANALYTICS PAGE
══════════════════════════════════════════════ */
function renderAnalytics() {
  renderHeatmap();
  updateStats();
}

/* ══════════════════════════════════════════════
   GOALS PAGE
══════════════════════════════════════════════ */
function saveGoal() {
  const n = parseInt($('goalInput').value) || 5;
  Store.setGoal(n);
  renderGoals();
  toast('Goal saved ✓');
}

function renderGoals() {
  const apps  = Store.getApps();
  const goal  = Store.getGoal();
  const c     = Store.counts();
  const now   = new Date();

  const week  = apps.filter(a => new Date(a.date + 'T12:00:00') >= new Date(now - 7  * 86400000)).length;
  const month = apps.filter(a => new Date(a.date + 'T12:00:00') >= new Date(now - 30 * 86400000)).length;

  // Set input value
  if ($('goalInput')) $('goalInput').value = goal;

  /* ── Progress goals ── */
  const goals = [
    { name: 'Applications this week',  curr: week,         target: goal,     color: 'var(--cyan)'   },
    { name: 'Applications this month', curr: month,        target: goal * 4, color: 'var(--purple)'  },
    { name: 'Interviews secured',      curr: c.interview,  target: 3,        color: 'var(--amber)'  },
    { name: 'Offers received',         curr: c.offered,    target: 1,        color: 'var(--green)'  },
    { name: 'Total applications',      curr: apps.length,  target: 50,       color: 'var(--pink)'   },
  ];

  const gl = $('goalsList');
  if (gl) {
    gl.innerHTML = goals.map(g => {
      const pct = Math.min(g.curr / g.target * 100, 100);
      return `
        <div class="goal-item">
          <div class="goal-head">
            <span class="goal-name">${g.name}</span>
            <span class="goal-pct" style="color:${g.color}">${g.curr} / ${g.target}</span>
          </div>
          <div class="goal-track">
            <div class="goal-fill" style="width:${pct}%;background:${g.color}"></div>
          </div>
        </div>`;
    }).join('');
  }

  /* ── Milestones ── */
  const milestones = [
    { label: 'First Application',  icon: '🚀', done: apps.length >= 1 },
    { label: '5 Applications',     icon: '⭐', done: apps.length >= 5 },
    { label: '10 Applications',    icon: '🔥', done: apps.length >= 10 },
    { label: 'First Interview',    icon: '🎤', done: c.interview >= 1 || c.offered >= 1 },
    { label: '25 Applications',    icon: '💪', done: apps.length >= 25 },
    { label: 'First Offer',        icon: '🎉', done: c.offered >= 1 },
    { label: '50 Applications',    icon: '🏆', done: apps.length >= 50 },
  ];

  const ml = $('milestones');
  if (ml) {
    ml.innerHTML = milestones.map(m => `
      <div style="
        display:flex;align-items:center;gap:10px;
        padding:10px 12px;
        background:${m.done ? 'rgba(52,211,153,0.06)' : 'var(--s2)'};
        border:1px solid ${m.done ? 'rgba(52,211,153,0.2)' : 'var(--border)'};
        border-radius:9px;margin-bottom:7px;
      ">
        <span style="font-size:18px;">${m.icon}</span>
        <span style="font-size:13px;font-weight:600;color:${m.done ? 'var(--green)' : 'var(--muted2)'};">
          ${m.label}
        </span>
        <span style="margin-left:auto;">${m.done ? '✅' : '🔒'}</span>
      </div>`).join('');
  }
}
