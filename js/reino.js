/* Datos y renderizado de la subpagina Reino.
   Dependencias: js/i18n.js, js/i18n/reino/i18n.js y js/app.js (deben cargarse antes). */
(function () {
  "use strict";

  /* ---------- Datos del Reino ---------- */
  /* Edita estas listas para publicar la informacion real del reino.
     Cada territorio usa: name, type, coords y status.
     Las coordenadas se escriben como texto para no depender de un mapa. */
  var KINGDOM = {
    number: "277",
    alliance: "UXM",
    coalition: "«Bloque de Hierro»",
    allianceLocation: {
      location: "",
      coords: "",
      reference: ""
    },
    territories: [],
    tips: [],
    plans: []
  };

  var FALLBACK_LANG = "en";

  function byId(id) { return document.getElementById(id); }

  function resolveLang() {
    var attr = document.documentElement.getAttribute("data-lang");
    if (attr && window.I18N[attr]) return attr;
    var m = /[?&]lang=([a-zA-Z]{2})/.exec(window.location.search);
    if (m && window.I18N[m[1].toLowerCase()]) return m[1].toLowerCase();
    var base = ((navigator.language || navigator.userLanguage || "").toLowerCase().split("-"))[0];
    return window.I18N[base] ? base : FALLBACK_LANG;
  }

  var LANG = resolveLang();
  var T = window.I18N[LANG] || window.I18N[FALLBACK_LANG];

  function text(key) {
    return T[key] || window.I18N[FALLBACK_LANG][key] || "";
  }

  function setText(id, value) {
    var el = byId(id);
    if (el) el.textContent = value;
  }

  function setValue(id, value) {
    var el = byId(id);
    if (!el) return;
    var pending = text("kingdomPending");
    el.textContent = value ? value : pending;
  }

  /* ---------- Cabecera de la tabla de territorios ---------- */
  function initTerritoryTable() {
    setText("kingdomThName", text("kingdomTerritoryName"));
    setText("kingdomThType", text("kingdomTerritoryType"));
    setText("kingdomThCoords", text("kingdomTerritoryCoords"));
    setText("kingdomThStatus", text("kingdomTerritoryStatus"));

    var body = byId("kingdomTerritoryBody");
    var empty = byId("kingdomTerritoryEmpty");
    if (!body) return;

    body.innerHTML = "";

    if (!KINGDOM.territories.length) {
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;

    KINGDOM.territories.forEach(function (territory) {
      var tr = document.createElement("tr");
      [territory.name, territory.type, territory.coords, territory.status].forEach(function (value) {
        var td = document.createElement("td");
        td.textContent = value ? value : text("kingdomPending");
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  /* ---------- Lista de consejos ---------- */
  function initTips() {
    var list = byId("kingdomTipsList");
    var empty = byId("kingdomTipsEmpty");
    if (!list) return;

    list.innerHTML = "";

    if (!KINGDOM.tips.length) {
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;

    KINGDOM.tips.forEach(function (tip) {
      var li = document.createElement("li");
      li.className = "kingdom-list-item";
      li.textContent = tip;
      list.appendChild(li);
    });
  }

  /* ---------- Planes de batalla ---------- */
  function initPlans() {
    var box = byId("kingdomPlansList");
    var empty = byId("kingdomPlansEmpty");
    if (!box) return;

    box.innerHTML = "";

    if (!KINGDOM.plans.length) {
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;

    KINGDOM.plans.forEach(function (plan, index) {
      var card = document.createElement("article");
      card.className = "kingdom-plan";

      var title = document.createElement("h4");
      title.className = "kingdom-plan-title";
      title.textContent = plan.title;
      card.appendChild(title);

      if (plan.summary) {
        var summary = document.createElement("p");
        summary.className = "kingdom-plan-summary";
        summary.textContent = plan.summary;
        card.appendChild(summary);
      }

      if (plan.steps && plan.steps.length) {
        var list = document.createElement("ol");
        list.className = "kingdom-plan-steps";
        plan.steps.forEach(function (step) {
          var li = document.createElement("li");
          li.textContent = step;
          list.appendChild(li);
        });
        card.appendChild(list);
      }

      card.setAttribute("data-index", String(index));
      box.appendChild(card);
    });
  }

  /* ---------- Ubicacion de la Alianza ---------- */
  function initAllianceLocation() {
    var location = KINGDOM.allianceLocation || {};
    setValue("kingdomAllianceLocation", location.location);
    setValue("kingdomAllianceCoords", location.coords);
    setValue("kingdomAllianceReference", location.reference);
  }

  function init() {
    initTerritoryTable();
    initAllianceLocation();
    initTips();
    initPlans();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
