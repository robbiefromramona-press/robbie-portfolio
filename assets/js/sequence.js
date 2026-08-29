/* ============================================================
   SEQUENCE ENGINE
   Two ways to build a page. Both work. Pick per page.

   MODE A - one video (easiest):
       p1: { video: "p1.mp4" }
     Render the whole chapter in Blender with the narration
     baked in. Drop the file. Done. No timing, no ordering.

   MODE B - image sequence:
       p0: { audio: "p0_audio.mp3", media: [ ... ] }
     The audio is the clock and stills advance against it.

   You shouldn't need to touch this file.
   ============================================================ */

(function () {
  "use strict";

  var page  = document.body.dataset.page;
  var conf  = (window.PORTFOLIO || {})[page] || {};
  var stage = document.querySelector(".stage");
  var audio = document.getElementById("narration");
  var btn   = document.querySelector(".play");
  var fill  = document.querySelector(".scrub-fill");
  var bar   = document.querySelector(".scrub");
  var clock = document.querySelector(".clock");
  var here  = document.querySelector('.erastrip a[aria-current="page"]');

  var timer = null;

  function mmss(s) {
    if (!isFinite(s)) return "0:00";
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function emptyState(note) {
    var msg = document.createElement("div");
    msg.className = "stage-empty";
    msg.innerHTML = "<b>Stage ready</b>" + note;
    stage.appendChild(msg);
    if (btn) btn.disabled = true;
  }

  function bindKeys() {
    document.addEventListener("keydown", function (e) {
      if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.code === "Space" && btn && !btn.disabled) { e.preventDefault(); btn.click(); }
      if (e.key === "ArrowRight") { var n = document.querySelector('link[rel="next"]'); if (n) location.href = n.href; }
      if (e.key === "ArrowLeft")  { var p = document.querySelector('link[rel="prev"]'); if (p) location.href = p.href; }
      if (e.key === "f" && timer && timer.requestFullscreen) timer.requestFullscreen();
    });
  }

  function wire(el) {
    timer = el;

    el.addEventListener("timeupdate", function () {
      var t = el.currentTime, d = el.duration || 0;
      var pct = d ? (t / d) * 100 : 0;
      if (fill)  fill.style.width = pct + "%";
      if (here)  here.style.setProperty("--chapter-progress", pct + "%");
      if (clock) clock.textContent = mmss(t) + " / " + mmss(d);
      if (window.__onTick) window.__onTick(t, d);
    });

    el.addEventListener("loadedmetadata", function () {
      if (clock) clock.textContent = "0:00 / " + mmss(el.duration);
      if (window.__onMeta) window.__onMeta(el.duration);
    });

    el.addEventListener("ended", function () {
      if (btn) btn.textContent = "\u25B6";
      var next = document.querySelector('link[rel="next"]');
      if (next) setTimeout(function () { location.href = next.href; }, 1400);
    });

    if (btn) {
      btn.addEventListener("click", function () {
        if (el.paused) {
          el.play();
          btn.textContent = "\u275A\u275A";
          btn.setAttribute("aria-label", "Pause");
        } else {
          el.pause();
          btn.textContent = "\u25B6";
          btn.setAttribute("aria-label", "Play");
        }
      });
    }

    if (bar) {
      bar.addEventListener("click", function (e) {
        var r = bar.getBoundingClientRect();
        if (el.duration) el.currentTime = ((e.clientX - r.left) / r.width) * el.duration;
      });
    }
  }

  /* ---------- MODE A: one video per chapter ---------- */
  if (conf.video) {
    var v = document.createElement("video");
    v.src = "media/" + page + "/" + conf.video;
    v.playsInline = true;
    v.preload = "metadata";

    var wrap = document.createElement("figure");
    wrap.className = "is-live solo";
    wrap.appendChild(v);
    stage.appendChild(wrap);

    v.addEventListener("error", function () {
      stage.innerHTML = "";
      emptyState("Couldn't load <code>media/" + page + "/" + conf.video +
                 "</code>. Check the spelling and capitals match the file exactly.");
    });

    wire(v);
    bindKeys();
    return;
  }

  /* ---------- MODE B: audio clock + stills ---------- */
  var items = (conf.media || []).map(function (m) {
    var o = (typeof m === "string") ? { src: m } : m;
    return {
      src: "media/" + page + "/" + o.src,
      hold: typeof o.hold === "number" ? o.hold : null,
      video: /\.(mp4|webm|mov)$/i.test(o.src)
    };
  });

  if (!items.length) {
    emptyState("Drop this chapter's video into <code>media/" + page +
               "/</code>, then add it to <code>assets/js/manifest.js</code>.");
    bindKeys();
    return;
  }

  if (audio && conf.audio) audio.src = "media/" + page + "/" + conf.audio;

  var frames = items.map(function (it, i) {
    var fig = document.createElement("figure");
    var el;
    if (it.video) {
      el = document.createElement("video");
      el.muted = true; el.playsInline = true; el.preload = i < 2 ? "auto" : "none";
    } else {
      el = document.createElement("img");
      el.alt = "";
      el.loading = i < 2 ? "eager" : "lazy";
      el.decoding = "async";
      fig.style.setProperty("--shot", 'url("' + it.src + '")');
    }
    el.src = it.src;
    fig.appendChild(el);
    stage.appendChild(fig);
    return { fig: fig, el: el, video: it.video, hold: it.hold };
  });

  var cuts = [], current = -1;

  function layout(total) {
    if (!total || !isFinite(total)) total = items.length * 4;
    var fixed = 0, flex = 0;
    items.forEach(function (it) { it.hold ? (fixed += it.hold) : flex++; });
    var each = flex ? Math.max(0.8, (total - fixed) / flex) : 0;
    var t = 0;
    cuts = items.map(function (it) { var s = t; t += (it.hold || each); return s; });
  }

  function show(i) {
    if (i === current || !frames[i]) return;
    if (frames[current]) {
      frames[current].fig.classList.remove("is-live");
      if (frames[current].video) frames[current].el.pause();
    }
    current = i;
    frames[i].fig.classList.add("is-live");
    if (frames[i].video) {
      frames[i].el.currentTime = 0;
      frames[i].el.play().catch(function () {});
    }
    var nxt = frames[i + 1];
    if (nxt && nxt.el.preload === "none") nxt.el.preload = "auto";
  }

  window.__onMeta = function (d) { layout(d); };
  window.__onTick = function (t) {
    for (var i = cuts.length - 1; i >= 0; i--) {
      if (t >= cuts[i]) { show(i); break; }
    }
  };

  layout(0);
  show(0);
  if (audio) wire(audio);
  bindKeys();
})();
