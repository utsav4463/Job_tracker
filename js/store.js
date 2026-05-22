/* ═══════════════════════════════════════════════
   STORE.JS — LocalStorage Data Management
   DS Jobs Pro
═══════════════════════════════════════════════ */

const STORE_KEY = 'dspro_v2';

const Store = {

  load() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || { apps: [], goal: 5 };
    } catch {
      return { apps: [], goal: 5 };
    }
  },

  save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch {}
  },

  /* ── Applications ── */
  getApps() { return this.load().apps; },

  addApp(app) {
    const d = this.load();
    d.apps.push(app);
    this.save(d);
  },

  updateApp(id, changes) {
    const d = this.load();
    const i = d.apps.findIndex(a => a.id == id);
    if (i !== -1) {
      d.apps[i] = { ...d.apps[i], ...changes };
      this.save(d);
    }
  },

  deleteApp(id) {
    const d = this.load();
    d.apps = d.apps.filter(a => a.id != id);
    this.save(d);
  },

  /* ── Aggregates ── */
  counts() {
    const c = { applied: 0, interview: 0, offered: 0, rejected: 0, saved: 0 };
    this.getApps().forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
    return c;
  },

  weekCount() {
    const cutoff = new Date(Date.now() - 7 * 86400000);
    return this.getApps().filter(a => new Date(a.date + 'T12:00:00') >= cutoff).length;
  },

  responseRate() {
    const apps = this.getApps();
    if (!apps.length) return 0;
    const c = this.counts();
    return Math.round((c.interview + c.offered + c.rejected) / apps.length * 100);
  },

  /* ── Goal ── */
  getGoal()   { return this.load().goal || 5; },
  setGoal(n)  { const d = this.load(); d.goal = n; this.save(d); }
};
