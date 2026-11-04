/* Calendario de Batalla de Supervivencia.
   Depende de js/i18n.js (window.I18N) y del idioma que fija js/app.js
   en <html data-lang>. No modifica el titulo ni el idioma de la pagina. */
(function () {
  "use strict";

  var CSS = ""
    + ".bs-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; display: flex; justify-content: flex-start; }"
    + ".bs-schedule { width:100%; min-width: 640px; max-width: 900px; border-collapse: collapse; background: #fff; color: #888; font: 13px/1.45 Roboto, Arial, Helvetica, sans-serif; }"
    + ".bs-schedule th { padding: 3px 10px; text-align: left; font-size: 11px; font-weight: 700; color: #fff; background: #26b; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid #eee; white-space: nowrap; }"
    + ".bs-schedule td { padding: 1px 10px; border-bottom: 1px solid #eee; vertical-align: top; }"
    + ".bs-schedule tbody tr:last-child td { border-bottom: none; }"
    + ".bs-schedule tbody tr.bs-dayend td { border-bottom: 2px solid #ccc; }"
    + ".bs-event, .bs-counter, .bs-status, .bs-server { white-space: nowrap; }"
    + ".bs-counter { font-variant-numeric: tabular-nums; text-align: right; }"
    + "#bs-th-counter { text-align: right; }"
    + ".bs-event { font-weight: 700; }"
    + "tr.bs-past td { color: #b3b3b3; }"
    + "tr.bs-current td { background: #009922; color: #fff; font-weight: 700; }"
    + "tr.bs-current td:nth-child(n+3) { background: #00ff39; color: #00821d; font-weight: normal; }"
    + "tr.bs-current td.bs-counter { font-weight: normal; }"
    + ".bs-activities, .bs-server { font-size: 11px; }"
    + ".bs-activities .bs-act-line { display: block; }"
    + ".bs-schedule tbody .bs-hl-track { background-color: #727374; color: #ebebeb; }"
    + ".bs-schedule tbody td.bs-hl-special { background-color: #ffee00; color: #b65200; }"
    + ".bs-schedule tbody tr.bs-row-third td:nth-child(1), .bs-schedule tbody tr.bs-row-third td:nth-child(2) { background-color: #B11; color: #FFF; }"
    + "tr.bs-current td.bs-event::after { content: \" \u2605\";margin-right: 4px; }"
    + "#bs-tzinfo { font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #aaa; padding: 10px 10px 0 10px; text-align: left; }";

  var styleEl = document.createElement("style");
  styleEl.type = "text/css";
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = CSS;
  } else {
    styleEl.appendChild(document.createTextNode(CSS));
  }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(styleEl);

  var SRC_TO_UTC_MS = 2 * 3600 * 1000;
  var FALLBACK_LANG = "en";

  /* El idioma lo resuelve js/app.js y lo publica en <html data-lang>. */
  function resolveLang() {
    var attr = document.documentElement.getAttribute("data-lang");
    if (attr && window.I18N[attr]) return attr;
    var m = /[?&]lang=([a-zA-Z]{2})/.exec(window.location.search);
    if (m && window.I18N[m[1].toLowerCase()]) return m[1].toLowerCase();
    return FALLBACK_LANG;
  }

  var LANG = resolveLang();
  var T = window.I18N[LANG] || window.I18N[FALLBACK_LANG];

  var ACTIVITIES = [
    { "codebs": "BUILD",   "event": "Build Territory",     "activity_1": "1min Construction Speedup (50H) [+10]", "activity_2": "Increase 1 Building Might (30.000) [+1]", "goal": "30.000 pts" },
    { "codebs": "HEROE",   "event": "Enhance Heroes",      "activity_1": "20 Ticket Heroes (30T) [+400]",         "activity_2": "1950 Antitoxin (23.4M) [+1]",             "goal": "12.000 pts" },
    { "codebs": "RAVEN",   "event": "Enhance Raven",       "activity_1": "10 Raven Fruit",                        "activity_2": "1 Stamina (15 Rallys) [+100]",            "goal": "30.000 pts" },
    { "codebs": "SOLDIER", "event": "Train Soldiers",      "activity_1": "1min Training Boost (17H) [+10]",       "activity_2": "Train 1 Lv.8 Soldier (2.800) [+25]",      "goal": "60.000 pts" },
    { "codebs": "TECH",    "event": "Technology Research", "activity_1": "1min Research Speedup (50H) [+10]",     "activity_2": "Increase 1 Tech Might (30.000) [+1]",     "goal": "30.000 pts" },
    { "codebs": "STANDBY", "event": "Stand by", "activity_1": "Stand by", "activity_2": "Stand by", "goal": "" }
  ];

  var CALENDAR = [
    { "codet": "0.00", "noday": 0, "time_init": "00:00:00", "day": "Sun", "codebs": "BUILD" },
    { "codet": "0.04", "noday": 0, "time_init": "04:00:00", "day": "Sun", "codebs": "SOLDIER" },
    { "codet": "0.08", "noday": 0, "time_init": "08:00:00", "day": "Sun", "codebs": "TECH" },
    { "codet": "0.12", "noday": 0, "time_init": "12:00:00", "day": "Sun", "codebs": "RAVEN" },
    { "codet": "0.16", "noday": 0, "time_init": "16:00:00", "day": "Sun", "codebs": "HEROE" },
    { "codet": "0.20", "noday": 0, "time_init": "20:00:00", "day": "Sun", "codebs": "BUILD" },

    { "codet": "1.00", "noday": 1, "time_init": "00:00:00", "day": "Mon", "codebs": "HEROE" },
    { "codet": "1.04", "noday": 1, "time_init": "04:00:00", "day": "Mon", "codebs": "BUILD" },
    { "codet": "1.08", "noday": 1, "time_init": "08:00:00", "day": "Mon", "codebs": "SOLDIER" },
    { "codet": "1.12", "noday": 1, "time_init": "12:00:00", "day": "Mon", "codebs": "TECH" },
    { "codet": "1.16", "noday": 1, "time_init": "16:00:00", "day": "Mon", "codebs": "RAVEN" },
    { "codet": "1.20", "noday": 1, "time_init": "20:00:00", "day": "Mon", "codebs": "HEROE" },

    { "codet": "2.00", "noday": 2, "time_init": "00:00:00", "day": "Tue", "codebs": "BUILD" },
    { "codet": "2.04", "noday": 2, "time_init": "04:00:00", "day": "Tue", "codebs": "SOLDIER" },
    { "codet": "2.08", "noday": 2, "time_init": "08:00:00", "day": "Tue", "codebs": "TECH" },
    { "codet": "2.12", "noday": 2, "time_init": "12:00:00", "day": "Tue", "codebs": "RAVEN" },
    { "codet": "2.16", "noday": 2, "time_init": "16:00:00", "day": "Tue", "codebs": "HEROE" },
    { "codet": "2.20", "noday": 2, "time_init": "20:00:00", "day": "Tue", "codebs": "BUILD" },

    { "codet": "3.00", "noday": 3, "time_init": "00:00:00", "day": "Wed", "codebs": "SOLDIER" },
    { "codet": "3.04", "noday": 3, "time_init": "04:00:00", "day": "Wed", "codebs": "TECH" },
    { "codet": "3.08", "noday": 3, "time_init": "08:00:00", "day": "Wed", "codebs": "RAVEN" },
    { "codet": "3.12", "noday": 3, "time_init": "12:00:00", "day": "Wed", "codebs": "HEROE" },
    { "codet": "3.16", "noday": 3, "time_init": "16:00:00", "day": "Wed", "codebs": "BUILD" },
    { "codet": "3.20", "noday": 3, "time_init": "20:00:00", "day": "Wed", "codebs": "SOLDIER" },

    { "codet": "4.00", "noday": 4, "time_init": "00:00:00", "day": "Thu", "codebs": "TECH" },
    { "codet": "4.04", "noday": 4, "time_init": "04:00:00", "day": "Thu", "codebs": "RAVEN" },
    { "codet": "4.08", "noday": 4, "time_init": "08:00:00", "day": "Thu", "codebs": "HEROE" },
    { "codet": "4.12", "noday": 4, "time_init": "12:00:00", "day": "Thu", "codebs": "BUILD" },
    { "codet": "4.16", "noday": 4, "time_init": "16:00:00", "day": "Thu", "codebs": "SOLDIER" },
    { "codet": "4.20", "noday": 4, "time_init": "20:00:00", "day": "Thu", "codebs": "TECH" },

    { "codet": "5.00", "noday": 5, "time_init": "00:00:00", "day": "Fri", "codebs": "RAVEN" },
    { "codet": "5.04", "noday": 5, "time_init": "04:00:00", "day": "Fri", "codebs": "HEROE" },
    { "codet": "5.08", "noday": 5, "time_init": "08:00:00", "day": "Fri", "codebs": "BUILD" },
    { "codet": "5.12", "noday": 5, "time_init": "12:00:00", "day": "Fri", "codebs": "SOLDIER" },
    { "codet": "5.16", "noday": 5, "time_init": "16:00:00", "day": "Fri", "codebs": "TECH" },
    { "codet": "5.20", "noday": 5, "time_init": "20:00:00", "day": "Fri", "codebs": "RAVEN" },

    { "codet": "6.00", "noday": 6, "time_init": "00:00:00", "day": "Sat", "codebs": "HEROE" },
    { "codet": "6.04", "noday": 6, "time_init": "04:00:00", "day": "Sat", "codebs": "BUILD" },
    { "codet": "6.08", "noday": 6, "time_init": "08:00:00", "day": "Sat", "codebs": "SOLDIER" },
    { "codet": "6.12", "noday": 6, "time_init": "12:00:00", "day": "Sat", "codebs": "TECH" },
    { "codet": "6.16", "noday": 6, "time_init": "16:00:00", "day": "Sat", "codebs": "RAVEN" },
    { "codet": "6.20", "noday": 6, "time_init": "20:00:00", "day": "Sat", "codebs": "HEROE" }
  ];

  var WEEK_SECONDS = 604800;
  var DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var actMap = {};
  ACTIVITIES.forEach(function (a) { actMap[a.codebs] = a; });

  var slots = CALENDAR.map(function (c) {
    var p = c.time_init.split(":");
    return {
      noday: c.noday,
      sec: c.noday * 86400 + (+p[0]) * 3600 + (+p[1]) * 60 + (+p[2]),
      event: actMap[c.codebs].event,
      act1: actMap[c.codebs].activity_1,
      act2: actMap[c.codebs].activity_2,
      hlSpecial: actMap[c.codebs].event.toLowerCase().indexOf("soldiers") >= 0,
      hlTrack: actMap[c.codebs].event.toLowerCase().indexOf("raven") >= 0 || actMap[c.codebs].event.toLowerCase().indexOf("heroes") >= 0
    };
  });
  slots.sort(function (a, b) { return a.sec - b.sec; });
  var lastSecByDay = {};
  slots.forEach(function (s) {
    if (lastSecByDay[s.noday] === undefined || s.sec > lastSecByDay[s.noday]) lastSecByDay[s.noday] = s.sec;
  });
  slots.forEach(function (s) { s.dayEnd = s.sec === lastSecByDay[s.noday]; });

  function nowSecondsSrc() {
    var d = new Date(Date.now() - SRC_TO_UTC_MS);
    return d.getUTCDay() * 86400 + d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
  }

  function weekStartMs() {
    var s = new Date(Date.now() - SRC_TO_UTC_MS);
    return Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate() - s.getUTCDay()) + SRC_TO_UTC_MS;
  }

  function currentIndex(sec) {
    if (sec < slots[0].sec) return -1;
    var idx = 0;
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].sec <= sec) idx = i; else break;
    }
    return idx;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function fmtCounter(sec) {
    return pad(Math.floor(sec / 3600)) + ":" + pad(Math.floor((sec % 3600) / 60)) + ":" + pad(sec % 60);
  }

  function tzLabel() {
    var off = -new Date(Date.now()).getTimezoneOffset() / 60;
    var h = Math.floor(Math.abs(off));
    var m = Math.round((Math.abs(off) - h) * 60);
    return "GMT" + (off < 0 ? "-" : "+") + h + (m ? ":" + pad(m) : "");
  }

  function tzName() {
    try {
      return (typeof Intl !== "undefined" && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || "";
    } catch (e) {
      return "";
    }
  }
  var TZ_NAME = tzName();

  var HEADERS = ["bs-th-counter", "bs-th-status", "bs-th-event", "bs-th-activities", "bs-th-server"];
  var tbody = document.getElementById("bs-body");
  var tzInfoEl = document.getElementById("bs-tzinfo");
  var counters = [];
  var lastIdx = -2;

  if (!tbody || !tzInfoEl) return;

  HEADERS.forEach(function (id, i) {
    var cell = document.getElementById(id);
    if (cell) cell.textContent = T.bsHeaders[i];
  });

  function appendCell(tr, text, cls) {
    var td = document.createElement("td");
    if (cls) td.className = cls;
    td.textContent = text;
    tr.appendChild(td);
    return td;
  }

  function appendActivitiesCell(tr, act1, act2, hlTrack) {
    var td = document.createElement("td");
    td.className = "bs-activities" + (hlTrack ? " bs-hl-track" : "");
    var d1 = document.createElement("span");
    d1.className = "bs-act-line bs-act1";
    d1.textContent = act1;
    var d2 = document.createElement("span");
    d2.className = "bs-act-line bs-act2";
    d2.textContent = act2;
    td.appendChild(d1);
    td.appendChild(d2);
    tr.appendChild(td);
    return td;
  }

  function updateTzInfo() {
    var d = new Date(Date.now());
    var txt = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + " [" + tzLabel();
    if (TZ_NAME) txt += " · " + TZ_NAME;
    tzInfoEl.textContent = txt + "]";
  }

  function buildRows(idx) {
    counters = [];
    tbody.innerHTML = "";
    var n = slots.length;
    var weekStart = weekStartMs();
    for (var rel = -1; rel <= 7; rel++) {
      var u = idx + rel;
      var slot = slots[((u % n) + n) % n];
      var uSec = slot.sec + Math.floor(u / n) * WEEK_SECONDS;
      var loc = new Date(weekStart + uSec * 1000);
      var tr = document.createElement("tr");
      tr.className = (rel === -1 ? "bs-past" : rel === 0 ? "bs-current" : "bs-next") + (slot.dayEnd ? " bs-dayend" : "") + (rel === 1 ? " bs-row-third" : "");
      var td = appendCell(tr, rel === -1 ? "—" : "", "bs-counter" + (rel > 0 && slot.hlSpecial ? " bs-hl-special" : ""));
      if (rel === 0) counters.push({ td: td, startSec: uSec, elapsed: true, prefix: "+ " });
      else if (rel > 0) counters.push({ td: td, targetSec: uSec, prefix: "T- " });
      appendCell(tr, rel === -1 ? T.bsPast : rel === 0 ? T.bsCurrent : rel === 1 ? T.bsNext : "", "bs-status" + (rel > 0 && slot.hlSpecial ? " bs-hl-special" : ""));
      appendCell(tr, slot.event, "bs-event" + (rel > 0 && slot.hlSpecial ? " bs-hl-special" : ""));
      appendActivitiesCell(tr, slot.act1, slot.act2, rel > 0 && slot.hlTrack);
      appendCell(tr, DAY_ABBR[loc.getDay()] + " " + pad(loc.getHours()) + ":" + pad(loc.getMinutes()), "bs-server");
      tbody.appendChild(tr);
    }
  }

  function tick() {
    var sec = nowSecondsSrc();
    var idx = currentIndex(sec);
    if (idx !== lastIdx) {
      lastIdx = idx;
      buildRows(idx);
    }
    for (var i = 0; i < counters.length; i++) {
      var c = counters[i];
      c.td.textContent = c.prefix + (c.elapsed ? fmtCounter(sec - c.startSec) : fmtCounter(c.targetSec - sec));
    }
    updateTzInfo();
  }

  tick();
  setInterval(tick, 1000);
})();
