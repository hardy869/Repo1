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

// Returns markup for an image slot. Drop assets/img/<SLOT>.jpg to fill it.
function mediaImg(slot, desc) {
  return `<img class="probe" src="assets/img/${slot}.jpg" alt="${desc}">
          <span class="media__label"><b>${slot}</b>${desc}</span>`;
}

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
      if (m.complete && m.naturalWidth > 0) { wrap.classList.add('has-media'); }
      else {
        m.addEventListener('load', () => wrap.classList.add('has-media'));
        m.addEventListener('error', () => m.classList.add('hidden'));
      }
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
  const merging = (id === 'final-proposal' || id === 'keepsake-home');
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
  svg.querySelectorAll('line').forEach((line) => {     // base + travelling spark
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
  });
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
});
