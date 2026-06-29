/* =============================================================================
   audio.js  —  Per-screen background music with crossfades
   -----------------------------------------------------------------------------
   Each screen has a track (see CONTENT.music.byScreen). When she moves to a
   screen with a DIFFERENT track, the old one fades out while the new fades in.
   Screens that share a track keep playing it seamlessly (no restart).

   Mobile browsers block autoplay, so playback begins on her first tap
   (unlocking the access gate). Missing files fail silently — the site still works.
   ========================================================================== */

window.MusicPlayer = {
  started: false,
  muted: false,
  curKey: undefined,   // track key for the current screen
  cur: null,           // currently playing Audio element

  init() {
    this.btn = document.getElementById('music-toggle');
    this.btn.setAttribute('aria-label', 'Toggle music');
    this.btn.addEventListener('click', () => this.toggle());
    this.target = (window.CONTENT.music && window.CONTENT.music.volume) || 0.55;
  },

  // Called once, on the first user gesture (unlocking the gate).
  begin() {
    this.started = true;
    this.btn.classList.add('show');
    this._icon();
  },

  _keyFor(id) {
    const m = window.CONTENT.music;
    if (m.byScreen && Object.prototype.hasOwnProperty.call(m.byScreen, id)) return m.byScreen[id];
    return m.default;
  },

  _file(key) {
    const f = window.CONTENT.music.files;
    return key && f[key] ? f[key] : null;
  },

  // Navigation calls this on every screen change.
  playForScreen(id) {
    if (!this.started) return;
    const key = this._keyFor(id);
    if (key === this.curKey) return;          // same track → let it keep playing
    this.curKey = key;
    if (!this.muted) this._switch(this._file(key));
  },

  toggle() {
    if (!this.started) return;
    this.muted = !this.muted;
    this._icon();
    this._switch(this.muted ? null : this._file(this.curKey));
  },

  // Crossfade: fade out whatever is playing, fade in `src` (or nothing).
  _switch(src) {
    const old = this.cur;
    if (old) this._fade(old, old.volume, 0, () => { try { old.pause(); } catch (e) {} });

    if (!src) { this.cur = null; return; }
    const next = new Audio(src);
    next.loop = true;
    next.volume = 0;
    this.cur = next;
    next.play()
      .then(() => this._fade(next, 0, this.target))
      .catch(() => {});                        // file missing or blocked
  },

  _fade(audio, from, to, done) {
    const steps = 20, duration = 800;
    let i = 0;
    audio.volume = Math.max(0, Math.min(1, from));
    const timer = setInterval(() => {
      i++;
      const v = from + (to - from) * (i / steps);
      audio.volume = Math.max(0, Math.min(1, v));
      if (i >= steps) { clearInterval(timer); if (done) done(); }
    }, duration / steps);
  },

  _icon() { this.btn.textContent = this.muted ? '🔈' : '🔊'; },
};
