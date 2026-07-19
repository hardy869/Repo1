/* =============================================================================
   story.js  —  Renders the Moon & Star world (Part I)
   Reads everything from window.CONTENT. Uses the global helpers
   setInner(), mediaImg(), mediaVideo() defined in main.js.
   ========================================================================== */

window.Story = {

  render() {
    const C = window.CONTENT;

    /* ---- Secret access gate ------------------------------------------- */
    setInner('access-inner', `
      <div class="lock-star" aria-hidden="true"></div>
      <h1 class="access-title">${C.access.title}</h1>
      <p class="access-hint">${C.access.hint}</p>
      <form id="access-form" autocomplete="off">
        <input id="access-input" type="text" inputmode="numeric"
               placeholder="${C.access.placeholder}" aria-label="Secret password" />
        <p id="access-error" role="alert"></p>
        <button type="submit" class="btn-moon">${C.access.button}</button>
      </form>
    `);

    /* ---- Welcome ------------------------------------------------------- */
    setInner('welcome-inner', `
      <p class="eyebrow">${C.welcome.eyebrow}</p>
      <div id="welcome-lines" class="prose"></div>
      <p class="signature">${C.welcome.signature}</p>
      <div class="spacer"></div>
      <button class="btn-moon reveal" id="welcome-btn" data-action="next">${C.welcome.button}</button>
    `);

    /* ---- Before us ----------------------------------------------------- */
    setInner('before-us-inner', `
      <h1 class="title">${C.beforeUs.title}</h1>
      ${C.beforeUs.media ? Media.render(C.beforeUs.media) : Media.single(C.beforeUs.image, C.beforeUs.imageDesc)}
      <div class="prose">${C.beforeUs.body.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.beforeUs.button}</button>
    `);

    /* ---- When I knew --------------------------------------------------- */
    setInner('when-i-knew-inner', `
      <h1 class="title">${C.whenIKnew.title}</h1>
      ${C.whenIKnew.media ? Media.render(C.whenIKnew.media) : Media.single(C.whenIKnew.image, C.whenIKnew.imageDesc, C.whenIKnew.aspect)}
      <div id="wik-lines" class="prose"></div>
      <div class="spacer"></div>
      <button class="btn-moon reveal" id="wik-btn" data-action="next">${C.whenIKnew.button}</button>
    `);

    /* ---- Little things (constellation) --------------------------------- */
    /* ---- A poem (Hindi) ----------------------------------------------- */
    setInner('poem-inner', `
      <h1 class="title">${C.poem.title}</h1>
      <p class="subtitle">${C.poem.subtitle}</p>
      <div class="poem">${C.poem.lines.map(l => `<p>${l || '&nbsp;'}</p>`).join('')}</div>
      <p class="poem-sign">${C.poem.signature}</p>
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.poem.button}</button>
    `);

    const cards = C.littleThings.cards;
    const n = cards.length;
    // Taurus (the bull): two horns rising to a brow, converging at Aldebaran (the eye = Taara).
    const TAURUS = {
      points: [{ x: 16, y: 16 }, { x: 84, y: 22 }, { x: 39, y: 46 }, { x: 60, y: 42 }, { x: 50, y: 80 }],
      edges: [[0, 2], [1, 3], [2, 3], [2, 4], [3, 4]],
      bright: 4,
    };
    let pts, edges, bright = -1;
    if (C.littleThings.shape === 'taurus' && n === 5) {
      pts = TAURUS.points; edges = TAURUS.edges; bright = TAURUS.bright;
    } else {
      // Fallback: gentle wave, joined in sequence.
      pts = cards.map((c, i) => ({
        x: +(12 + (n === 1 ? 38 : (i / (n - 1)) * 76)).toFixed(1),
        y: +Math.max(14, Math.min(86, 50 + Math.sin(i * 1.7) * 28)).toFixed(1),
      }));
      edges = pts.slice(1).map((_, i) => [i, i + 1]);
    }
    this._edges = edges;
    const lines = edges.map((e, idx) =>
      `<line id="cl${idx}" x1="${pts[e[0]].x}" y1="${pts[e[0]].y}" x2="${pts[e[1]].x}" y2="${pts[e[1]].y}" />`).join('');
    const stars = cards.map((c, i) =>
      `<button class="cstar${i === bright ? ' cstar--bright' : ''}" data-memory="${i}" style="left:${pts[i].x}%;top:${pts[i].y}%" aria-label="${c.title}">✦</button>`).join('');
    const label = bright >= 0
      ? `<span class="constel-label" style="left:${pts[bright].x}%;top:${pts[bright].y}%">Taara</span>` : '';
    setInner('little-things-inner', `
      <h1 class="title">${C.littleThings.title}</h1>
      <p class="subtitle">${C.littleThings.subtitle}</p>
      <div class="constel" id="constel">
        <svg class="constel-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>
        ${stars}
        ${label}
      </div>
      <div class="memory-card" id="memory-card"></div>
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.littleThings.button}</button>
    `);

    /* ---- Our memories (shuffle albums) -------------------------------- */
    const albums = C.memories.albums.map(a => `
      <div class="mem-album">
        <h3 class="mem-title">${a.name}</h3>
        ${a.note ? `<p class="mem-note">${a.note}</p>` : ''}
        ${Media.render(a.media)}
      </div>`).join('');
    setInner('memories-inner', `
      <h1 class="title">${C.memories.title}</h1>
      <p class="subtitle">${C.memories.subtitle}</p>
      <div class="mem-grid">${albums}</div>
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.memories.button}</button>
    `);

    /* ---- The storm ----------------------------------------------------- */
    const nodes = C.storm.timeline.map(n => `
      <div class="tl-node">
        <div class="tl-date">${n.date}</div>
        <div class="tl-title">${n.title}</div>
        <div class="tl-text">${n.text}</div>
      </div>`).join('');
    setInner('the-storm-inner', `
      <h1 class="title">${C.storm.title}</h1>
      <p class="subtitle">${C.storm.subtitle}</p>
      <div class="storm-timeline">${nodes}</div>
      <p class="storm-resolve">${C.storm.resolution}</p>
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.storm.button}</button>
    `);

    /* ---- Bubu & Dudu --------------------------------------------------- */
    setInner('bubu-dudu-inner', `
      <h1 class="title">${C.bubuDudu.title}</h1>
      ${C.bubuDudu.hero ? `
        <div class="bubu-hero">
          <img src="assets/img/${C.bubuDudu.hero.image}.png" alt="Dudu and Bubu"
               onload="this.closest('.bubu-hero').classList.add('has-img')"
               onerror="if(this.src.indexOf('.png')>-1){this.src='assets/img/${C.bubuDudu.hero.image}.jpg'}else{this.style.display='none'}">
          <span class="bubu-hero__ph">🐻🐼<small>${C.bubuDudu.hero.desc} → assets/img/${C.bubuDudu.hero.image}.png</small></span>
        </div>` : ''}
      <div class="prose">${C.bubuDudu.body.map(p => `<p>${p}</p>`).join('')}</div>
      ${C.bubuDudu.media ? Media.render(C.bubuDudu.media) : ''}
      ${C.bubuDudu.flips ? `<p class="subtitle" style="margin-top:1.4rem">Tap to flip 🐼</p>${Media.render({ mode: 'flip', items: C.bubuDudu.flips })}` : ''}
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.bubuDudu.button}</button>
    `);

    /* ---- Future -------------------------------------------------------- */
    const dreams = C.future.dreams.map(d => `
      <div class="dream"><h3>${d.title}</h3><p>${d.text}</p></div>`).join('');
    setInner('future-inner', `
      <h1 class="title">${C.future.title}</h1>
      <p class="subtitle">${C.future.subtitle}</p>
      <div class="dream-grid">${dreams}</div>
      ${C.future.media ? Media.render(C.future.media) : ''}
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.future.button}</button>
    `);

    /* ---- Final proposal ------------------------------------------------ */
    setInner('final-proposal-inner', `
      <div id="final-lines"></div>
      <div id="final-extra" style="display:none">
        <p class="final-big">${C.finalProposal.finalLine}</p>
        <p class="final-hint">${C.finalProposal.afterHint}</p>
        <button class="heart-btn" id="yes-btn" aria-label="yes">${C.finalProposal.button}</button>
      </div>
    `);

    /* ---- Keepsake home ------------------------------------------------- */
    const menu = [
      ['welcome', 'Welcome'], ['before-us', 'Before us'], ['when-i-knew', 'When I knew'],
      ['little-things', 'Little things'], ['the-storm', 'The storm'], ['bubu-dudu', 'Bubu & Dudu'],
      ['future', 'Our future'], ['resume', 'The evaluation'], ['offer-letter', 'The offer'],
      ['final-proposal', 'The moment'],
    ].map(([id, label]) => `<button data-goto="${id}">${label}</button>`).join('');
    /* ---- Our Future (three portraits) --------------------------------- */
    setInner('our-future-inner', `
      <h1 class="title">${C.ourFuture.title}</h1>
      <p class="subtitle">${C.ourFuture.subtitle}</p>
      <div class="future-photos">${C.ourFuture.photos.map(p => `
        <figure class="fp-card">
          <div class="media">${mediaImg(p.image, p.desc)}</div>
          <figcaption>${p.caption}</figcaption>
        </figure>`).join('')}</div>
      <div class="spacer"></div>
      <button class="btn-moon" data-action="next">${C.ourFuture.button}</button>
    `);

    setInner('keepsake-home-inner', `
      <h1 class="title">${C.keepsake.title}</h1>
      ${Media.render({ mode: 'shuffle', items: C.memories.albums.flatMap(a => a.media.items) })}
      <p class="counter">${C.keepsake.counterLabel} <b id="since-counter">…</b></p>
      <p class="prose"><em>${C.keepsake.message}</em></p>
      <div class="chapter-menu">${menu}</div>
    `);

    // Wire the constellation taps
    document.querySelectorAll('.cstar').forEach(s =>
      s.addEventListener('click', () => this.openMemory(+s.dataset.memory, s)));
  },

  _opened: null,

  openMemory(i, starEl) {
    const c = window.CONTENT.littleThings.cards[i];
    const card = document.getElementById('memory-card');
    const media = c.media ? Media.render(c.media) : Media.single(c.image, c.imageDesc, c.aspect);
    card.innerHTML = `${media}<div class="memory-card__body"><h3>${c.title}</h3><p>${c.text}</p></div>`;
    card.classList.add('show');
    if (starEl) starEl.classList.add('opened');

    // Light each connecting line once BOTH of its endpoint stars are opened
    if (!this._opened) this._opened = new Set();
    this._opened.add(i);
    (this._edges || []).forEach((e, idx) => {
      if (this._opened.has(e[0]) && this._opened.has(e[1])) {
        const ln = document.getElementById('cl' + idx);
        if (ln) ln.classList.add('lit');
      }
    });

    window.checkMedia();
    Media.hydrate();
  },

  startRain() {
    const rain = document.getElementById('rain');
    if (rain.childElementCount === 0) {
      let html = '';
      for (let i = 0; i < 60; i++) {
        const left = Math.random() * 100;
        const dur = 0.6 + Math.random() * 0.9;
        const delay = Math.random() * 2;
        html += `<span class="raindrop" style="left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
      }
      rain.innerHTML = html;
    }
    rain.classList.add('on');
  },
};
