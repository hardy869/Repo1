/* =============================================================================
   transitions.js  —  The two cinematic gear-changes
     glitch()    : love story  →  HR portal  (RGB-split flash + scanlines)
     powerdown() : HR portal   →  final proposal  (screen collapses to a dot)
   Each plays an overlay animation and swaps the screen mid-way via cb().
   ========================================================================== */

window.Transitions = {
  glitch(cb) {
    const g = document.getElementById('glitch');
    g.classList.add('run');
    setTimeout(cb, 340);                 // swap underneath while the flash peaks
    setTimeout(() => g.classList.remove('run'), 720);
  },

  powerdown(cb) {
    const p = document.getElementById('powerdown');
    p.classList.add('run');
    setTimeout(cb, 700);                 // swap once it has collapsed to a line
    setTimeout(() => p.classList.remove('run'), 1000);
  },
};
