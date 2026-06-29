/* =============================================================================
   audio.js  —  Background music toggle
   Mobile browsers block autoplay, so music starts on the first real tap
   (unlocking the access gate). If the audio file is missing, the toggle
   simply does nothing — the site still works perfectly.
   ========================================================================== */

window.MusicPlayer = {
  audio: null,
  on: false,

  init() {
    this.btn = document.getElementById('music-toggle');
    this.btn.setAttribute('aria-label', 'Toggle music');
    this.btn.addEventListener('click', () => this.toggle());
  },

  _make() {
    if (this.audio) return;
    this.audio = new Audio(window.CONTENT.music.theme);
    this.audio.loop = true;
    this.audio.volume = 0.55;
  },

  start() {
    this._make();
    this.audio.play()
      .then(() => { this.on = true; this._icon(); })
      .catch(() => { this.on = false; this._icon(); });   // file missing / blocked
  },

  toggle() {
    this._make();
    if (this.on) { this.audio.pause(); this.on = false; }
    else { this.audio.play().catch(() => {}); this.on = true; }
    this._icon();
  },

  _icon() { this.btn.textContent = this.on ? '🔊' : '🔈'; },
};
