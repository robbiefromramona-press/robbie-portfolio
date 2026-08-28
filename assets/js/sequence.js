/* ============================================================
   SEQUENCE ENGINE
   Audio is the clock. Media advances against it.
   You shouldn't need to touch this file.
   ============================================================ */

(function () {
  "use strict";

  var page  = document.body.dataset.page;          // "p0" .. "p6"
  var conf  = (window.PORTFOLIO || {})[page] || { audio: null, media: [] };
  var stage = document.querySelector(".stage");
  var audio = document.getElementById("narration");
  var btn   = document.querySelector(".play");
  var fill  = document.querySelector(".scrub-fill");
  var bar   = document.querySelector(".scrub");
  var clock = document.querySelector(".clock");
  var here  = document.querySelector('.erastrip a[aria-current="page"]');

  // Normalise "p1_01.jpg" and { src, hold } into one shape.
  var items = (conf.media || []).map(function (m) {
    var o = (typeof m === "string") ? { src: m } : m;
    return {
      src: "media/" + page + "/" + o.src,
      hold: typeof o.hold === "number" ? o.hold : null,
      video: /\.(mp4|webm|mov)$/i.test(o.src)
    };
  });

  if (audio && conf.audio) audio.src = "media/" + page + "/" + conf.audio;

  /* ---------- empty state: shell still works with no files ---------- */
  if (!items.length) {
    var msg = document.createElement("div");
    msg.className = "stage-empty";
    msg.innerHTML = "<b>Stage ready</b>Drop your photos and clips into <code>media/" +
      page + "/</code>, then list them in <code>assets/js/manifest.js</code>.";
    stage.appendChild(msg);
    if (btn) btn.disabled = true;
    return;
  }

  /* ---------- build the frames ---------- */
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
    }
    el.src = it.src;
    fig.appendChild(el);
    stage.appendChild(fig);
    return { fig: fig, el: el, video: it.video, hold: it.hold };
  });

  var cuts = [];   // start time of each frame, in seconds
  var current = -1;

  function layout(total) {
    if (!total || !isFinite(total)) total = items.length * 4; // sane fallback
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
    // warm the next one up
    var nxt = frames[i + 1];
    if (nxt && nxt.el.preload === "none") nxt.el.preload = "auto";
  }

  function mmss(s) {
    if (!isFinite(s)) return "0:00";
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  /* ---------- wire it up ---------- */
  layout(0);
  show(0);

  if (audio) {
    audio.addEventListener("loadedmetadata", function () { layout(audio.duration); });

    audio.addEventListener("timeupdate", function () {
      var t = audio.currentTime, d = audio.duration || 0;
      for (var i = cuts.length - 1; i >= 0; i--) {
        if (t >= cuts[i]) { show(i); break; }
      }
      var pct = d ? (t / d) * 100 : 0;
      if (fill) fill.style.width = pct + "%";
      if (here) here.style.setProperty("--chapter-progress", pct + "%");
      if (clock) clock.textContent = mmss(t) + " / " + mmss(d);
    });

    audio.addEventListener("ended", function () {
      if (btn) btn.textContent = "▶";
      var next = document.querySelector('link[rel="next"]');
      if (next) setTimeout(function () { location.href = next.href; }, 1200);
    });

    if (btn) {
      btn.addEventListener("click", function () {
        if (audio.paused) { audio.play(); btn.textContent = "❚❚"; btn.setAttribute("aria-label", "Pause"); }
        else { audio.pause(); btn.textContent = "▶"; btn.setAttribute("aria-label", "Play"); }
      });
    }

    if (bar) {
      bar.addEventListener("click", function (e) {
        var r = bar.getBoundingClientRect();
        if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
      });
    }
  }

  /* ---------- keyboard ---------- */
  document.addEventListener("keydown", function (e) {
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.code === "Space" && btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    if (e.key === "ArrowRight") { var n = document.querySelector('link[rel="next"]'); if (n) location.href = n.href; }
    if (e.key === "ArrowLeft")  { var p = document.querySelector('link[rel="prev"]'); if (p) location.href = p.href; }
  });
})();
