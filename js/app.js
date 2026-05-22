/* ═══════════════════════════════════════════════
   APP.JS — Navigation Router & Initialisation
   DS Jobs Pro
   Load order: store → utils → jobs → modal →
               interview → ai → charts → pages → app
═══════════════════════════════════════════════ */

/* ── PAGE TITLES ── */
const PAGE_META = {
  dashboard: { title: 'Overview',          sub: 'Data Science Jobs — Canada & Remote' },
  jobs:      { title: 'Live Jobs',          sub: 'Real-time openings — Canada & Remote' },
  tracker:   { title: 'My Applications',   sub: 'Track every job you have applied to' },
  analytics: { title: 'Analytics',         sub: 'Your job search performance over time' },
  interview: { title: 'Interview Prep',    sub: 'Technical · HR · Behavioural · Mock · General' },
  ai:        { title: 'AI Career Coach',   sub: 'Powered by Claude — Real advice for your DS job search' },
  goals:     { title: 'Goals & Milestones',sub: 'Track your job search targets' },
};

/* ── NAVIGATION ── */
function nav(pageId, clickedEl) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const pg = $('pg-' + pageId);
  if (pg) pg.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (clickedEl) {
    clickedEl.classList.add('active');
  } else {
    // Auto-highlight matching nav item
    document.querySelectorAll('.nav-item').forEach(n => {
      if (n.textContent.toLowerCase().includes(pageId.substring(0, 5))) {
        n.classList.add('active');
      }
    });
  }

  // Scroll main to top
  const main = $('mainScroll');
  if (main) main.scrollTop = 0;

  // Page-specific render calls
  if (pageId === 'tracker')   renderTracker();
  if (pageId === 'analytics') renderAnalytics();
  if (pageId === 'goals')     renderGoals();
  if (pageId === 'interview') renderQuestions(currentRound);
}

/* ── REFRESH ALL VIEWS ── */
function refreshAll() {
  updateStats();
  renderJobList('dash');
  renderJobList('jobs');
  renderTracker();
  renderTimeline();
}

/* ══════════════════════════════════════════════
   INITIALISE APP
══════════════════════════════════════════════ */
(function init() {

  // Render interview questions on load (default: tech round)
  renderQuestions('tech');

  // Render initial stats from stored data
  updateStats();

  // Fetch live jobs (non-blocking)
  loadJobs();

  // Auto-refresh jobs every 20 minutes
  setInterval(() => loadJobs(true), 20 * 60 * 1000);

  console.log('%c DS Jobs Pro loaded ✓', 'color:#38bdf8;font-weight:bold;');
})();
