/* =============================================================================
   media.js  —  Flexible, content-driven media system
   -----------------------------------------------------------------------------
   Any section can declare a media block in content.js:

     media: { mode: "gallery", items: [ ... ] }

   MODES:
     single  → one photo/video (the default)
     gallery → grid of photos; tap any to enlarge (lightbox)
     shuffle → auto-rotating album, crossfading every few seconds
     flip    → flip cards: photo on front, message on back; tap to flip
     reveal  → hidden cards; tap to reveal the photo
     wall    → looping reel wall (videos autoplay muted on loop)

   ITEM shapes (mix freely):
     "IMAGE_PLACEHOLDER_05"                                  (shorthand image)
     { image: "IMAGE_PLACEHOLDER_05", desc, caption, back }
     { video: "VIDEO_PLACEHOLDER_04", desc, caption }
   ========================================================================== */

window.Media = {
  _seq: 0,

  _norm(it) {
    if (typeof it === 'string') return { type: 'img', slot: it, desc: '' };
    if (it.video) return { type: 'video', slot: it.video, desc: it.desc || '', caption: it.caption || '' };
    return { type: 'img', slot: it.image, desc: it.desc || '', caption: it.caption || '', back: it.back || '' };
  },

  // One .media cell. `loop` makes videos autoplay/mute/loop (for the reel wall).
  _cell(it, loop) {
    if (it.type === 'video') {
      // Reel-wall videos (loop) don't autoplay globally — they're started only when
      // the Bubu & Dudu screen is active, so they never block initial load.
      const cls = loop ? 'probe reel' : 'probe';
      const attrs = loop ? 'muted loop playsinline preload="none"' : 'controls playsinline preload="metadata"';
      return `<div class="media"><video class="${cls}" src="assets/video/${it.slot}.mp4" ${attrs}></video>
              <span class="media__label"><b>${it.slot}</b>${it.desc}</span></div>`;
    }
    return `<div class="media">${mediaImg(it.slot, it.desc)}</div>`;
  },

  render(config) {
    if (!config || !config.items || !config.items.length) return '';
    const mode = config.mode || 'single';
    const items = config.items.map(this._norm);
    const cell = (it, loop) => this._cell(it, loop);

    if (mode === 'gallery') {
      return `<div class="media-block media-gallery">${items.map(it => `
        <button class="g-thumb" data-lightbox type="button">${cell(it)}
          ${it.caption ? `<span class="g-cap">${it.caption}</span>` : ''}
        </button>`).join('')}</div>`;
    }

    if (mode === 'shuffle') {
      return `<div class="media-block media-shuffle" data-shuffle>${items.map((it, i) => `
        <div class="sh-item ${i === 0 ? 'show' : ''}">${cell(it)}
          ${it.caption ? `<span class="sh-cap">${it.caption}</span>` : ''}
        </div>`).join('')}</div>`;
    }

    if (mode === 'flip') {
      return `<div class="media-block media-flip">${items.map(it => `
        <button class="flip-card" data-flip type="button">
          <div class="flip-inner">
            <div class="flip-front">${cell(it)}</div>
            <div class="flip-back"><p>${it.back || it.caption || '♡'}</p></div>
          </div>
        </button>`).join('')}</div>`;
    }

    if (mode === 'reveal') {
      return `<div class="media-block media-reveal">${items.map(it => `
        <button class="reveal-card" data-reveal type="button">
          <div class="reveal-cover">${it.caption || 'Tap to reveal ✨'}</div>
          <div class="reveal-media">${cell(it)}</div>
        </button>`).join('')}</div>`;
    }

    if (mode === 'wall') {
      return `<div class="media-block media-wall">${items.map(it => cell(it, true)).join('')}</div>`;
    }

    // single (default)
    return `<div class="media-block media-single">${cell(items[0])}</div>`;
  },

  // Convenience for sections that still use a single image/imageDesc pair.
  single(slot, desc) {
    if (!slot) return '';
    return this.render({ mode: 'single', items: [{ image: slot, desc: desc || '' }] });
  },

  /* ---- Behaviours ----------------------------------------------------- */

  hydrate() {
    document.querySelectorAll('[data-shuffle]').forEach((el) => {
      if (el.dataset.live) return;            // don't double-start on replay
      el.dataset.live = '1';
      const items = el.querySelectorAll('.sh-item');
      if (items.length < 2) return;
      let i = 0;
      setInterval(() => {
        items[i].classList.remove('show');
        i = (i + 1) % items.length;
        items[i].classList.add('show');
      }, 3600);
    });
  },

  init() {
    // Build the lightbox once
    if (!document.getElementById('lightbox')) {
      const lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.innerHTML = '<button class="lb-close" aria-label="close">✕</button><div class="lb-content"></div>';
      document.body.appendChild(lb);
      lb.addEventListener('click', () => lb.classList.remove('open'));
    }
    const lb = document.getElementById('lightbox');

    // One delegated listener for flips, reveals, and lightbox opens
    document.body.addEventListener('click', (e) => {
      const flip = e.target.closest('[data-flip]');
      const reveal = e.target.closest('[data-reveal]');
      const thumb = e.target.closest('[data-lightbox]');

      if (flip) { flip.classList.toggle('flipped'); return; }
      if (reveal) { reveal.classList.add('revealed'); return; }
      if (thumb) {
        const cell = thumb.querySelector('.media');
        if (cell) {
          lb.querySelector('.lb-content').innerHTML = cell.outerHTML;
          lb.classList.add('open');
        }
      }
    });
  },
};
