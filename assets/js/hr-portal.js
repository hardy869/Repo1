/* =============================================================================
   hr-portal.js  —  Renders the HR evaluation world (Part II)
   ========================================================================== */

window.HR = {

  _bar(pill) {
    return `<div class="hr-bar">
      <span class="hr-bar__brand">TAARA <span>Talent Acquisition System™</span></span>
      <span class="hr-bar__pill">${pill}</span>
    </div>`;
  },

  render() {
    const C = window.CONTENT;

    /* ---- HR transition / terminal boot --------------------------------- */
    setInner('hr-transition-inner', `<div class="terminal" id="terminal"></div>`);

    /* ---- Résumé -------------------------------------------------------- */
    const exp = C.resume.experience.map(e => `
      <div class="hr-card">
        <h3>${e.role}</h3>
        <div class="meta">${e.company} · ${e.period}</div>
        <ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>`).join('');
    setInner('resume-inner', `
      ${this._bar('Candidate ID: HA-2025')}
      <h2 class="hr-h">${C.resume.heading}</h2>
      <div class="resume-head">
        <div class="media">${mediaImg(C.resume.photo, C.resume.photoDesc)}</div>
        <div>
          <div class="resume-name">${C.resume.name}</div>
          <div class="resume-role">${C.resume.role}</div>
        </div>
      </div>
      <div class="hr-card"><div class="meta">Objective</div><p style="color:var(--hr-slate);font-size:0.95rem">${C.resume.objective}</p></div>
      ${exp}
      <div class="hr-card">
        <div class="meta">Core skills</div>
        <div class="tag-row">${C.resume.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
        <div class="meta" style="margin-top:12px">Certifications</div>
        <div class="tag-row">${C.resume.certifications.map(s => `<span class="tag cert">${s}</span>`).join('')}</div>
      </div>
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.resume.button}</button></div>
    `);

    /* ---- Background verification --------------------------------------- */
    setInner('verification-inner', `
      ${this._bar('Verification')}
      <h2 class="hr-h">${C.verification.heading}</h2>
      <p class="hr-sub">${C.verification.subtitle}</p>
      <div id="verify-list">${C.verification.items.map(it => `
        <div class="check-row">
          <span class="claim">${it.claim}</span>
          <span class="status">${it.result}</span>
        </div>`).join('')}</div>
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.verification.button}</button></div>
    `);

    /* ---- Stress test --------------------------------------------------- */
    setInner('stress-test-inner', `
      ${this._bar('Stress Test')}
      <h2 class="hr-h">${C.stressTest.heading}</h2>
      <p class="hr-sub">${C.stressTest.subtitle}</p>
      <div id="stress-list">${C.stressTest.scenarios.map(s => `
        <div class="check-row">
          <span class="claim">${s.scenario}</span>
          <span class="status">${s.result}</span>
        </div>`).join('')}</div>
      <p class="hr-verdict">${C.stressTest.summary}</p>
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.stressTest.button}</button></div>
    `);

    /* ---- Culture fit (meters) ------------------------------------------ */
    setInner('culture-fit-inner', `
      ${this._bar('Culture Fit')}
      <h2 class="hr-h">${C.cultureFit.heading}</h2>
      <p class="hr-sub">${C.cultureFit.subtitle}</p>
      <div id="meter-list">${C.cultureFit.metrics.map(m => `
        <div class="meter">
          <div class="meter__top"><span>${m.metric}</span><span>${m.score}%</span></div>
          <div class="meter__track"><div class="meter__fill" data-score="${m.score}"></div></div>
        </div>`).join('')}</div>
      <p class="hr-verdict">${C.cultureFit.verdict}</p>
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.cultureFit.button}</button></div>
    `);

    /* ---- Reference checks (mom video) ---------------------------------- */
    const refs = C.references.list.map(r => `
      <div class="ref-card">
        <div class="media">${mediaVideo(r.video, r.videoDesc)}</div>
        <div class="ref-card__body">
          <div>
            <span class="tag">${r.tag}</span>
            <div style="margin-top:6px;color:var(--hr-slate);font-weight:500">${r.name}</div>
            <div style="color:var(--hr-muted);font-size:0.85rem">${r.note}</div>
          </div>
          <span class="ref-stamp">RECOMMENDED</span>
        </div>
      </div>`).join('');
    setInner('references-inner', `
      ${this._bar('References')}
      <h2 class="hr-h">${C.references.heading}</h2>
      <p class="hr-sub">${C.references.subtitle}</p>
      ${refs}
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.references.button}</button></div>
    `);

    /* ---- Compensation -------------------------------------------------- */
    setInner('compensation-inner', `
      ${this._bar('Compensation')}
      <h2 class="hr-h">${C.compensation.heading}</h2>
      <p class="comp-note">${C.compensation.note}</p>
      <div class="perk-grid">${C.compensation.perks.map(p => `
        <div class="perk"><h4>${p.perk}</h4><p>${p.detail}</p></div>`).join('')}</div>
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.compensation.button}</button></div>
    `);

    /* ---- Offer letter (the pivot back to emotion) ---------------------- */
    setInner('offer-letter-inner', `
      ${this._bar('Offer Letter')}
      <h2 class="hr-h" style="text-align:center">${C.offer.heading}</h2>
      <div class="offer-paper">
        <p class="greeting">${C.offer.greeting}</p>
        ${C.offer.body.map(p => `<p>${p}</p>`).join('')}
        <p class="sign">${C.offer.signature}<small>${C.offer.signedBy}</small></p>
      </div>
      <div class="hr-actions"><button class="btn-hr" data-action="next">${C.offer.button}</button></div>
    `);
  },

  /* ---- Enter-animations ------------------------------------------------ */

  bootTerminal(done) {
    const term = document.getElementById('terminal');
    typeSequence(term, window.CONTENT.hrTransition.boot, {
      cls: 'line', charDelay: 14, lineGap: 240,
      onDone: () => setTimeout(done, 650),
    });
  },

  runChecklist(listId) {
    const rows = document.querySelectorAll('#' + listId + ' .check-row');
    rows.forEach((row, i) => setTimeout(() => row.classList.add('in'), 350 * (i + 1)));
  },

  runMeters() {
    document.querySelectorAll('#meter-list .meter__fill').forEach((f, i) =>
      setTimeout(() => { f.style.width = f.dataset.score + '%'; }, 200 * (i + 1)));
  },
};
