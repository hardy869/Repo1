/* =============================================================================
   navigation.js  —  The chapter engine
   Shows one screen at a time, handles theme switching, progress, and the
   special transitions into the HR portal and the final proposal.
   ========================================================================== */

window.Nav = (function () {

  // Order of the 18 screens (must match the <section> ids in index.html)
  const order = [
    'access', 'welcome', 'before-us', 'when-i-knew', 'little-things',
    'the-storm', 'bubu-dudu', 'future',
    'hr-transition', 'resume', 'verification', 'stress-test',
    'culture-fit', 'references', 'compensation', 'offer-letter',
    'final-proposal', 'keepsake-home',
  ];

  // Screens that use the white corporate (HR) theme
  const HR_SCREENS = new Set([
    'hr-transition', 'resume', 'verification', 'stress-test',
    'culture-fit', 'references', 'compensation', 'offer-letter',
  ]);

  const state = { index: 0 };
  const hooks = {};                         // hooks[id] = fn(screenEl) run on enter

  function el(id) { return document.getElementById(id); }

  function updateChrome() {
    const i = state.index, last = order.length - 1;
    const bar = el('progress');
    bar.style.width = (i / last) * 100 + '%';
    bar.classList.toggle('show', i >= 1 && i < last);
    el('music-toggle').classList.toggle('show', i >= 1);
    el('back-btn').classList.toggle('show', i >= 2);   // hidden on the gate + welcome
  }

  function show(i) {
    if (i < 0 || i >= order.length) return;
    const current = el(order[state.index]);
    const next = el(order[i]);
    if (current && current !== next) current.classList.remove('active');

    const isHR = HR_SCREENS.has(next.id);
    document.body.classList.toggle('hr-mode', isHR);
    document.body.classList.toggle('story-mode', !isHR);

    // Rain only belongs to the storm
    el('rain').classList.remove('on');

    // Pause reel-wall videos when leaving their screen
    document.querySelectorAll('video.reel').forEach((v) => { try { v.pause(); } catch (e) {} });

    next.classList.add('active');
    next.scrollTop = 0;
    state.index = i;
    updateChrome();

    if (window.onNavProgress) window.onNavProgress(state.index, order.length, next.id, isHR);
    if (window.MusicPlayer) MusicPlayer.playForScreen(next.id);

    // The gold string only ties the Star to the Moon on the access screen
    const str = el('string');
    if (str) {
      const onAccess = next.id === 'access';
      str.classList.toggle('show', onAccess);
      if (onAccess && window.drawString) requestAnimationFrame(window.drawString);
    }

    if (hooks[next.id]) hooks[next.id](next);
  }

  // Route a navigation request, inserting the cinematic transitions
  function go(i) {
    if (i < 0 || i >= order.length) return;
    const targetId = order[i];
    if (targetId === 'hr-transition') { Transitions.glitch(() => show(i)); return; }
    if (targetId === 'final-proposal') { Transitions.powerdown(() => show(i)); return; }
    show(i);
  }

  return {
    hooks,
    init() {
      show(0);                              // start on the access gate

      // Delegated controls used across all screens
      document.body.addEventListener('click', (e) => {
        const next = e.target.closest('[data-action="next"]');
        const goto = e.target.closest('[data-goto]');
        if (next) { go(state.index + 1); }
        else if (goto) { this.goTo(goto.getAttribute('data-goto')); }
      });

      el('back-btn').addEventListener('click', () => this.prev());
    },
    next() { go(state.index + 1); },
    // Step back one screen (plain, no replayed transitions). Skips the HR boot
    // screen and never returns to the locked access gate.
    prev() {
      let t = state.index - 1;
      if (t >= 0 && order[t] === 'hr-transition') t--;
      if (t < 1) return;
      show(t);
    },
    goTo(id) { go(order.indexOf(id)); },
    current() { return order[state.index]; },
  };
})();
