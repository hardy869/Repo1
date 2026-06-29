/* =============================================================================
   access.js  —  The secret entry gate
   Password is checked loosely: case, spaces, dashes and slashes are ignored,
   so "09-10-2025", "09102025" and "09/10/2025" all work.
   ========================================================================== */

window.Access = {
  init() {
    const form = document.getElementById('access-form');
    const input = document.getElementById('access-input');
    const error = document.getElementById('access-error');
    if (!form) return;

    const normalize = (s) => String(s).toLowerCase().replace(/[\s\-\/.]/g, '');
    const expected = normalize(window.CONTENT.access.password);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (normalize(input.value) === expected) {
        error.textContent = '';
        MusicPlayer.begin();            // first user gesture — unlock audio playback
        Nav.goTo('welcome');            // navigation starts the right track for the screen
      } else {
        error.textContent = window.CONTENT.access.wrong;
        input.classList.add('access-shake');
        setTimeout(() => input.classList.remove('access-shake'), 450);
      }
    });
  },
};
