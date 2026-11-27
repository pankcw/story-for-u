(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var views = { cover: $('#cover'), story: $('#story'), end: $('#end') };
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var total = pages.length;
  var prev = $('#prev'), next = $('#next'), openBtn = $('#open');
  var view = 'cover', page = 0, KEY = 'cerita-desi-state';

  function pad(n) { return String(n).padStart(2, '0'); }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify({ view: view, page: page })); } catch (e) {} }
  function load() {
    try {
      var s = JSON.parse(sessionStorage.getItem(KEY));
      if (s && views[s.view]) { view = s.view; page = Math.min(Math.max(parseInt(s.page, 10) || 0, 0), total - 1); }
    } catch (e) {}
  }

  function render(moveFocus) {
    Object.keys(views).forEach(function (k) { views[k].hidden = (k !== view); });
    pages.forEach(function (p, i) { p.hidden = (i !== page); });
    $('#counter').textContent = pad(page + 1) + ' / ' + pad(total);
    $('#bar').style.width = ((page + 1) / total * 100) + '%';
    $('.progress').setAttribute('aria-valuenow', page + 1);
    prev.disabled = page === 0;
    next.textContent = page === total - 1 ? 'selesai membaca' : 'lanjut membaca';
    openBtn.textContent = page > 0 ? 'lanjutkan membaca' : 'buka cerita';
    save();
    if (moveFocus) {
      window.scrollTo(0, 0);
      var t = view === 'story' ? pages[page].querySelector('h2') : views[view].querySelector('h1, h2');
      if (t) t.focus({ preventScroll: true });
    }
  }

  function go(v, p) { view = v; if (typeof p === 'number') page = p; render(true); }

  openBtn.addEventListener('click', function () { go('story'); });
  prev.addEventListener('click', function () { if (page > 0) go('story', page - 1); });
  next.addEventListener('click', function () { if (page < total - 1) go('story', page + 1); else go('end'); });
  $('#again').addEventListener('click', function () { go('story', 0); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-home]'), function (b) {
    b.addEventListener('click', function () { go('cover'); });
  });
  document.addEventListener('keydown', function (e) {
    if (view !== 'story' || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') next.click();
    else if (e.key === 'ArrowLeft') prev.click();
  });

  /* ---- backsound ---- */
  var audio = $('#audio'), playBtn = $('#play'), muteBtn = $('#mute'), status = $('#status'), player = $('#player');
  var ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>',
    vol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9c1.3 1.7 1.3 4.3 0 6"/></svg>',
    mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>'
  };
  var ok = true;
  audio.volume = 0.6;

  function updateAudio() {
    var playing = !audio.paused;
    playBtn.innerHTML = playing ? ICON.pause : ICON.play;
    playBtn.setAttribute('aria-label', playing ? 'jeda backsound' : 'putar backsound');
    muteBtn.innerHTML = audio.muted ? ICON.mute : ICON.vol;
    muteBtn.setAttribute('aria-label', audio.muted ? 'nyalakan suara backsound' : 'matikan suara backsound');
    if (ok) status.textContent = 'backsound: ' + (playing && !audio.muted ? 'on' : 'off');
  }
  function disableAudio() {
    ok = false;
    player.classList.add('off');
    playBtn.disabled = muteBtn.disabled = true;
    status.textContent = 'backsound belum tersedia';
  }

  audio.addEventListener('error', disableAudio);
  audio.addEventListener('play', updateAudio);
  audio.addEventListener('pause', updateAudio);
  audio.addEventListener('volumechange', updateAudio);
  playBtn.addEventListener('click', function () {
    if (!ok) return;
    if (audio.paused) {
      var r = audio.play();
      if (r && r.catch) r.catch(function () { updateAudio(); });
    } else { audio.pause(); }
  });
  muteBtn.addEventListener('click', function () { if (ok) audio.muted = !audio.muted; });

  load();
  render(false);
  updateAudio();
})();
