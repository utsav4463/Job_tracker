/* ═══════════════════════════════════════════════
   MODAL.JS — Add / Edit Application Modal
   DS Jobs Pro
═══════════════════════════════════════════════ */

function openModal(prefill = {}) {
  $('modalTitle').textContent = prefill.id ? 'Edit Application' : 'Log Application';

  $('modalBody').innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Company *</label>
        <input class="form-input" id="fc" placeholder="e.g. Shopify" value="${prefill.company || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Job Title *</label>
        <input class="form-input" id="ft" placeholder="e.g. Data Analyst" value="${prefill.title || ''}">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Location</label>
        <select class="form-select" id="fl">
          ${['Remote','Toronto, ON','Vancouver, BC','Calgary, AB','Montreal, QC',
             'Ottawa, ON','Edmonton, AB','Winnipeg, MB','Hybrid','Other Canada']
            .map(l => `<option ${prefill.location === l ? 'selected' : ''}>${l}</option>`)
            .join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Salary Range</label>
        <input class="form-input" id="fsal" placeholder="e.g. $70K–$90K" value="${prefill.salary || ''}">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Role Type</label>
      <div class="chip-grp" id="cg-role">
        ${['Analyst','Engineer','Scientist','ML/AI','BI','Other']
          .map(r => `<button class="chip-tog ${(prefill.role || 'analyst') === r.toLowerCase() ? 'sel' : ''}"
              onclick="pickChip(this,'cg-role')">${r}</button>`)
          .join('')}
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Experience Level</label>
      <div class="chip-grp" id="cg-level">
        ${['Fresher','Junior','Mid-level','Senior']
          .map(l => `<button class="chip-tog ${(prefill.level || 'junior') === l.toLowerCase() ? 'sel' : ''}"
              onclick="pickChip(this,'cg-level')">${l}</button>`)
          .join('')}
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Status</label>
      <div class="chip-grp" id="cg-status">
        ${['Applied','Saved','Interview','Offered','Rejected']
          .map(s => `<button class="chip-tog ${(prefill.status || 'applied') === s.toLowerCase() ? 'sel' : ''}"
              onclick="pickChip(this,'cg-status')">${s}</button>`)
          .join('')}
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Date Applied</label>
        <input class="form-input" type="date" id="fd" value="${prefill.date || today()}">
      </div>
      <div class="form-group">
        <label class="form-label">Job URL (optional)</label>
        <input class="form-input" id="fu" placeholder="https://..." value="${prefill.url || ''}">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Notes</label>
      <textarea class="form-textarea" id="fn"
        placeholder="Recruiter name, follow-up date, interview feedback...">${prefill.notes || ''}</textarea>
    </div>

    <div class="modal-foot" style="padding:0;margin-top:4px;">
      <button class="btn btn-primary" style="flex:1" onclick="saveApp('${prefill.id || ''}')">
        ${prefill.id ? 'Update Application' : 'Save Application'}
      </button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    </div>
  `;

  $('modal').classList.add('open');
}

function closeModal() {
  $('modal').classList.remove('open');
}

// Close on overlay click
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

/* ── SAVE / UPDATE ── */
function saveApp(editId = '') {
  const company = $('fc').value.trim();
  const title   = $('ft').value.trim();

  if (!company || !title) {
    toast('Please fill in Company and Job Title', 'err');
    return;
  }

  const app = {
    id:       editId || Date.now(),
    company,
    title,
    location: $('fl').value,
    salary:   $('fsal').value,
    role:     getChip('cg-role').toLowerCase(),
    level:    getChip('cg-level').toLowerCase(),
    status:   getChip('cg-status').toLowerCase(),
    date:     $('fd').value || today(),
    url:      $('fu').value,
    notes:    $('fn').value,
  };

  if (editId) {
    Store.updateApp(editId, app);
    toast('Application updated ✓');
  } else {
    Store.addApp(app);
    toast('Application saved! 🎉');
  }

  closeModal();
  refreshAll();
}

/* ── PRE-FILL FROM JOB CARD CLICK ── */
function quickLog(job) {
  openModal({
    title:    job.title,
    company:  job.company,
    location: job.location,
    salary:   job.salary,
    role:     job.role,
    level:    job.level,
    url:      job.url,
  });
}
