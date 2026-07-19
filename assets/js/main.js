/* =============================================================================
   main.js  —  Boots the experience and wires the modules together.
   Loaded LAST, so the helpers it declares are available to story.js / hr-portal.js
   by the time their render() functions are called.
   ========================================================================== */

/* ---- Global helpers (used by story.js & hr-portal.js) ------------------ */

function setInner(id, html) {
  const node = document.getElementById(id);
  if (node) node.innerHTML = html;
}

// Returns markup for an image slot. Drop assets/img/<SLOT>.jpg (or .jpeg/.png/.webp) to fill it.
function mediaImg(slot, desc) {
  return `<img class="probe" data-slot="${slot}" data-ext="jpg" src="assets/img/${slot}.jpg" alt="${desc}">
          <span class="media__label"><b>${slot}</b>${desc}</span>`;
}

// Image formats the site will try, in order, before falling back to the placeholder.
var IMG_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];

// Returns markup for a video slot. Drop assets/video/<SLOT>.mp4 to fill it.
function mediaVideo(slot, desc) {
  return `<video class="probe" src="assets/video/${slot}.mp4" controls playsinline preload="metadata"></video>
          <span class="media__label"><b>${slot}</b>${desc}</span>`;
}

// Detects which media files actually exist and reveals them; placeholders stay otherwise.
function checkMedia() {
  document.querySelectorAll('img.probe, video.probe').forEach((m) => {
    m.classList.remove('probe');
    const wrap = m.closest('.media');
    if (!wrap) return;
    if (m.tagName === 'IMG') {
      const onLoad = () => wrap.classList.add('has-media');
      const onErr = () => {
        const cur = m.getAttribute('data-ext') || 'jpg';
        const i = IMG_EXTS.indexOf(cur);
        if (i > -1 && i < IMG_EXTS.length - 1) {          // try the next extension
          const next = IMG_EXTS[i + 1];
          m.setAttribute('data-ext', next);
          m.src = 'assets/img/' + m.getAttribute('data-slot') + '.' + next;
        } else {
          m.classList.add('hidden');                       // give up → show placeholder
        }
      };
      m.addEventListener('load', onLoad);
      m.addEventListener('error', onErr);
      if (m.complete) { m.naturalWidth > 0 ? onLoad() : onErr(); }
    } else {
      m.addEventListener('loadeddata', () => wrap.classList.add('has-media'));
      m.addEventListener('error', () => m.classList.add('hidden'));
    }
  });
}
window.checkMedia = checkMedia;

// Reveals text one character at a time, line by line. Cancels cleanly on replay.
window.typeSequence = function (parent, lines, opts) {
  opts = opts || {};
  const cls = opts.cls || '';
  const charDelay = opts.charDelay || 32;
  const lineGap = opts.lineGap || 420;
  const onDone = opts.onDone;

  const token = String((+parent.dataset.run || 0) + 1);
  parent.dataset.run = token;
  parent.innerHTML = '';
  const alive = () => parent.dataset.run === token;
  let li = 0;

  (function nextLine() {
    if (!alive()) return;
    if (li >= lines.length) { if (onDone) onDone(); return; }
    const p = document.createElement('p');
    p.className = (cls + ' caret').trim();
    parent.appendChild(p);
    const text = lines[li];
    let c = 0;
    (function typeChar() {
      if (!alive()) return;
      if (c < text.length) { p.textContent = text.slice(0, ++c); setTimeout(typeChar, charDelay); }
      else { p.classList.remove('caret'); li++; setTimeout(nextLine, lineGap); }
    })();
  })();
};

// The star travels from the horizon toward the moon as the chapters progress,
// then merges with it at the proposal. Hidden during the HR portal.
window.onNavProgress = function (index, total, id, isHR) {
  const star = document.getElementById('journey-star');
  if (!star) return;
  if (isHR || id === 'access') { star.classList.remove('show', 'merge'); return; }

  star.classList.add('show');
  const merging = (id === 'final-proposal' || id === 'our-future' || id === 'keepsake-home');
  star.classList.toggle('merge', merging);

  if (merging) { star.style.left = '82%'; star.style.top = '14%'; return; }
  const frac = Math.max(0, Math.min(1, (index - 1) / (total - 2)));  // welcome → finale
  star.style.left = (15 + frac * 67) + '%';     // 15% → 82% (toward the moon)
  star.style.top = (82 - frac * 68) + '%';      // 82% → 14%
};

// Draws the gold string between the center Star and the corner Moon (access screen).
window.drawString = function () {
  const svg = document.getElementById('string');
  const star = document.querySelector('#access .lock-star');
  const moon = document.getElementById('moon');
  if (!svg || !star || !moon) return;
  const s = star.getBoundingClientRect();
  const m = moon.getBoundingClientRect();
  const x1 = s.left + s.width / 2, y1 = s.top + s.height / 2;
  const x2 = m.left + m.width / 2, y2 = m.top + m.height / 2;
  // Quadratic curve with the control point pulled DOWN, so the string hangs with slack.
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const sag = Math.max(24, dist * 0.18);
  const d = `M ${x1} ${y1} Q ${mx} ${my + sag} ${x2} ${y2}`;
  svg.querySelectorAll('path').forEach((p) => p.setAttribute('d', d));   // base + travelling spark
};

// A little glittery burst at (x, y) — gold, rose, and white sparkles flying out.
function spawnSparkles(x, y) {
  const colors = ['#F4C95D', '#FFE9A8', '#E8A0BF', '#FFFFFF'];
  const glyphs = ['✦', '✧', '✺'];
  for (let k = 0; k < 14; k++) {
    const bit = document.createElement('span');
    bit.className = 'spark-bit';
    bit.textContent = glyphs[(Math.random() * glyphs.length) | 0];
    const angle = Math.random() * Math.PI * 2;
    const dist = 28 + Math.random() * 58;
    bit.style.left = x + 'px';
    bit.style.top = y + 'px';
    bit.style.color = colors[(Math.random() * colors.length) | 0];
    bit.style.fontSize = (10 + Math.random() * 12) + 'px';
    bit.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    bit.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    bit.style.animationDelay = (Math.random() * 60) + 'ms';
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 900);
  }
}

// A shooting star streaks across the night sky.
function shootStar() {
  const sky = document.getElementById('sky');
  if (!sky) return;
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.top = (4 + Math.random() * 42) + '%';
  s.style.left = (42 + Math.random() * 48) + '%';
  sky.appendChild(s);
  setTimeout(() => s.remove(), 1500);
}
function scheduleShootingStars() {
  const loop = () => {
    if (!document.body.classList.contains('hr-mode')) shootStar();
    setTimeout(loop, 6000 + Math.random() * 9000);
  };
  setTimeout(loop, 4500);
}

// The big "Yes" moment — rose petals fall while gold confetti bursts.
function celebrate() {
  const layer = document.createElement('div');
  layer.className = 'celebrate';
  document.body.appendChild(layer);

  const petals = ['🌸', '🌷', '🌹', '💗', '✨'];
  for (let i = 0; i < 48; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = petals[(Math.random() * petals.length) | 0];
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.fontSize = (14 + Math.random() * 20) + 'px';
    p.style.animationDuration = (2.6 + Math.random() * 2.4) + 's';
    p.style.animationDelay = (Math.random() * 1.2) + 's';
    p.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');
    layer.appendChild(p);
  }
  const colors = ['#F4C95D', '#FFE9A8', '#E8A0BF', '#FFFFFF', '#ff7eb6'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 260;
    c.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    c.style.setProperty('--ty', (Math.sin(angle) * dist - 90) + 'px');
    c.style.background = colors[(Math.random() * colors.length) | 0];
    c.style.animationDelay = (Math.random() * 0.25) + 's';
    layer.appendChild(c);
  }
  setTimeout(() => layer.remove(), 6500);
}

function updateCounter() {
  const el = document.getElementById('since-counter');
  if (!el) return;
  const start = new Date(window.CONTENT.meta.anniversary + 'T00:00:00');
  const now = new Date();
  const days = Math.max(0, Math.floor((now - start) / 86400000));
  el.textContent = days + (days === 1 ? ' day' : ' days');
}

/* ---- Per-screen enter hooks -------------------------------------------- */

function registerHooks() {
  const H = Nav.hooks;
  const C = window.CONTENT;

  H['welcome'] = () => {
    const btn = document.getElementById('welcome-btn');
    typeSequence(document.getElementById('welcome-lines'), C.welcome.lines,
      { charDelay: 30, lineGap: 380, onDone: () => btn.classList.add('in') });
  };

  H['when-i-knew'] = () => {
    const btn = document.getElementById('wik-btn');
    typeSequence(document.getElementById('wik-lines'), C.whenIKnew.lines,
      { charDelay: 32, lineGap: 520, onDone: () => btn.classList.add('in') });
  };

  H['the-storm'] = () => Story.startRain();

  H['bubu-dudu'] = (el) => el.querySelectorAll('video.reel').forEach((v) => { v.play().catch(() => {}); });

  H['hr-transition'] = () => HR.bootTerminal(() => Nav.next());

  H['verification'] = () => HR.runChecklist('verify-list');
  H['stress-test'] = () => HR.runChecklist('stress-list');
  H['culture-fit'] = () => HR.runMeters();

  H['final-proposal'] = () => {
    const extra = document.getElementById('final-extra');
    extra.style.display = 'none';
    extra.classList.remove('in');
    typeSequence(document.getElementById('final-lines'), C.finalProposal.lines, {
      cls: 'final-line', charDelay: 42, lineGap: 700,
      onDone: () => setTimeout(() => {
        extra.style.display = 'block';
        extra.classList.add('reveal');
        requestAnimationFrame(() => extra.classList.add('in'));
      }, 700),
    });
  };

  H['keepsake-home'] = () => updateCounter();
}

/* ---- Build the starfield ----------------------------------------------- */

function buildStars() {
  const sky = document.getElementById('sky');
  let html = '';
  for (let i = 0; i < 140; i++) {
    const sparkle = Math.random() < 0.14;                 // ~1 in 7 is a real star shape
    const size = sparkle ? (8 + Math.random() * 7) : (Math.random() < 0.85 ? 1.5 : 2.5);
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const dur = 2 + Math.random() * 4;
    html += `<span class="star${sparkle ? ' sparkle' : ''}" style="width:${size}px;height:${size}px;top:${top}%;left:${left}%;--dur:${dur}s"></span>`;
  }
  sky.innerHTML = html;
}

/* ---- Boot -------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  buildStars();
  Story.render();
  HR.render();
  checkMedia();
  Media.init();
  Media.hydrate();
  registerHooks();
  MusicPlayer.init();
  Access.init();
  Nav.init();

  // Keep the gold string attached when the window resizes
  window.addEventListener('resize', () => {
    const str = document.getElementById('string');
    if (str && str.classList.contains('show')) drawString();
  });

  // Glittery sparkle burst when she taps a next / continue button
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-moon, .btn-hr, .heart-btn, [data-action="next"], [data-goto]');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX || (r.left + r.width / 2);
    const y = e.clientY || (r.top + r.height / 2);
    spawnSparkles(x, y);
  });

  // The big "Yes": celebrate on the final screen, then drift to the keepsake home
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('#yes-btn')) {
      celebrate();
      setTimeout(() => Nav.goTo('our-future'), 3400);
    }
  });

  // Sparkle trail that follows her cursor / finger (paused in the HR portal)
  let lastTrail = 0;
  document.addEventListener('pointermove', (e) => {
    if (document.body.classList.contains('hr-mode')) return;
    const now = Date.now();
    if (now - lastTrail < 45) return;
    lastTrail = now;
    const b = document.createElement('span');
    b.className = 'trail-bit';
    b.textContent = Math.random() < 0.5 ? '✦' : '✧';
    b.style.left = e.clientX + 'px';
    b.style.top = e.clientY + 'px';
    b.style.color = Math.random() < 0.5 ? '#F4C95D' : '#FFFFFF';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 700);
  });

  scheduleShootingStars();
});
