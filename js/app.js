(function () {
  "use strict";

  /* ---------- Configuración (edita aquí) ---------- */
  var SITE    = "";
  var YOUTUBE = "https://www.youtube.com/@VincentDantesGrey/videos";
  var DEFAULT_LANG = "en";

  var BONUSES = [
    { name: "Alliance Experience Gift", value: "Lv.12" },
    { name: "Fast Build 8",             value: "+20%" },
    { name: "Research Speedup 5",       value: "+12.5%", noteKey: "In Progress" },
    { name: "Crafting Speedup 4",       value: "+8%" },
    { name: "Fast Training 2",          value: "+1%" },
    { name: "Rally HP/ATK/DEF 2",       value: "+2%" },
    { name: "Shard Exchange Bank",      value: "Active", noteKey: "" }
  ];

  /* ---------- Páginas del menú ---------- */
  var PAGES = [
    { file: "actividades-diarias.html", key: "navDaily",  titleKey: "pageDailyTitle" },
    { file: "normas-uxm.html",          key: "navRules",  titleKey: "pageRulesTitle" },
    { file: "video-tutoriales.html",    key: "navTutorials", titleKey: "pageTutorialsTitle" },
    { file: "estrategia.html",          key: "navStrategy", titleKey: "pageStrategyTitle" },
    { file: "contacto.html",            key: "navContact", titleKey: "pageContactTitle" }
  ];

  /* ---------- Utilidades ---------- */
  function byId(id) { return document.getElementById(id); }

  function currentFile() {
    var path = window.location.pathname || "";
    var file = path.substring(path.lastIndexOf("/") + 1);
    return file || "index.html";
  }

  /* Las subpáginas viven en ./pages: desde allí se sube un nivel */
  function inPagesDir() {
    var path = window.location.pathname || "";
    return path.indexOf("/pages/") >= 0 || /(^|\/)pages\//.test(path);
  }

  function basePath() {
    return inPagesDir() ? "../" : "";
  }

  function pageUrl(file) {
    return inPagesDir() ? file : "pages/" + file;
  }

  function withLang(href, lang) {
    return href + (href.indexOf("?") >= 0 ? "&" : "?") + "lang=" + lang;
  }

  function resolveLang() {
    var m = /[?&]lang=([a-zA-Z]{2})/.exec(window.location.search);
    if (m && window.I18N[m[1].toLowerCase()]) return m[1].toLowerCase();
    var base = ((navigator.language || navigator.userLanguage || "").toLowerCase().split("-"))[0];
    return window.I18N[base] ? base : DEFAULT_LANG;
  }

  var LANG = resolveLang();
  var T = window.I18N[LANG];

  document.documentElement.lang = LANG;
  document.documentElement.setAttribute("data-lang", LANG);

  /* ---------- Textos generales ---------- */
  function setText(id, text) {
    var el = byId(id);
    if (el) el.textContent = text;
  }

  setText("join", T.join);
  setText("bonusTitle", T.bonuses);
  setText("copyright", T.copyright);
  setText("ytLabel", T.youtube);

  var heroScrollCue = byId("heroScrollCue");
  if (heroScrollCue) heroScrollCue.setAttribute("aria-label", T.scrollCue);

  /* ---------- Sección informativa de bienvenida ---------- */
  function applyInfoContent() {
    var infoTitle = byId("infoTitle");
    var dynamicWelcome = byId("dynamicWelcome");
    var welcomeMessage = byId("welcomeMessage");
    var buttonsBox = byId("infoButtons");

    if (infoTitle) {
      var title = T.welcomeTitle || T.welcome;
      infoTitle.textContent = "";
      var initial = document.createElement("span");
      initial.className = "info-initial";
      initial.textContent = title.charAt(0);
      infoTitle.appendChild(initial);
      infoTitle.appendChild(document.createTextNode(title.slice(1)));
    }

    if (dynamicWelcome) {
      var welcomeTexts = [];
      Object.keys(window.I18N).forEach(function (code) {
        if (code !== LANG && window.I18N[code].welcome) {
          welcomeTexts.push(window.I18N[code].welcome);
        }
      });
      dynamicWelcome.textContent = welcomeTexts.join(" · ");
    }

    if (welcomeMessage) welcomeMessage.textContent = T.welcomeMessage || "";
    if (buttonsBox) buildInfoButtons(buttonsBox);
  }

  function buildInfoButtons(container) {
    if (!container) return;
    container.innerHTML = "";

    var youtubeButton = document.createElement("a");
    youtubeButton.className = "btn-outline btn-info-youtube";
    youtubeButton.href = YOUTUBE;
    youtubeButton.target = "_blank";
    youtubeButton.rel = "noopener noreferrer";
    youtubeButton.setAttribute("aria-label", T.youtubeLabel);
    youtubeButton.innerHTML = '<svg class="yt-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
      '<path fill="#ff1919" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8z"/>' +
      '<path fill="#fff" d="M9.6 15.6 15.8 12 9.6 8.4z"/></svg>';
    youtubeButton.appendChild(document.createTextNode(T.youtubeLabel));
    container.appendChild(youtubeButton);

    var rulesButton = document.createElement("a");
    rulesButton.className = "btn-outline btn-info-rules";
    rulesButton.href = withLang(pageUrl("normas-uxm.html"), LANG);
    rulesButton.textContent = T.rulesLabel;
    container.appendChild(rulesButton);
  }

  /* ---------- Texto propio de cada página ---------- */
  function applyPageContent() {
    var here = currentFile();
    var lead = byId("pageLead");
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].file !== here) continue;
      var title = T[PAGES[i].titleKey];
      var leadKey = PAGES[i].titleKey.replace("Title", "Lead");
      if (lead) lead.textContent = T[leadKey] || "";
      if (title) {
        var h1 = byId("heroTitle");
        if (h1) h1.textContent = title;
        document.title = title + " – UXM";
      }
      return;
    }
  }

  var bonusList = byId("bonuses");
  if (bonusList) {
    BONUSES.forEach(function (b) {
      var li = document.createElement("li");
      li.textContent = b.name + " — " + b.value + (b.noteKey ? " (" + b.noteKey + ")" : "");
      bonusList.appendChild(li);
    });
  }

  /* ---------- Video de fondo del hero ---------- */
  function initHeroVideo() {
    var video = byId("heroVideo");
    if (!video) return;

    /* Safari/iOS requieren el silenciado aplicado antes de iniciar la reproducción. */
    video.muted = true;
    video.defaultMuted = true;

    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    var playRequest = video.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(function () {
        /* El poster permanece visible cuando el navegador bloquea el autoplay. */
        video.setAttribute("data-playback", "fallback");
      });
    }
  }

  /* ---------- Menú lateral propio ---------- */
  var navPanel = byId("navPanel");
  var navList = byId("navList");
  var navToggle = byId("navToggle");
  var navBackdrop = byId("navBackdrop");
  var homeLink = byId("homeLink");

  function buildNav() {
    if (!navList) return;
    navList.innerHTML = "";
    var here = currentFile();

    var homeItem = document.createElement("li");
    homeItem.className = "nav-item";
    var homeNavLink = document.createElement("a");
    homeNavLink.className = "nav-link";
    homeNavLink.href = withLang(basePath() + "index.html", LANG);
    homeNavLink.textContent = T.navHome;
    if (here === "index.html") {
      homeNavLink.classList.add("active");
      homeNavLink.setAttribute("aria-current", "page");
    }
    homeItem.appendChild(homeNavLink);
    navList.appendChild(homeItem);

    PAGES.forEach(function (page) {
      var li = document.createElement("li");
      li.className = "nav-item";
      var a = document.createElement("a");
      a.className = "nav-link";
      a.href = withLang(pageUrl(page.file), LANG);
      a.textContent = T[page.key];
      if (page.file === here) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      navList.appendChild(li);
    });
    if (navToggle) navToggle.setAttribute("aria-label", T.menu);
    if (navPanel) {
      var panelTitle = byId("navPanelTitle");
      if (panelTitle) panelTitle.textContent = T.menu;
    }
    if (homeLink) homeLink.href = withLang(basePath() + "index.html", LANG);
  }

  /* Estado visual del icono hamburguesa mientras el menú está abierto */
  function syncNavState() {
    var open = navPanel && navPanel.classList.contains("is-open");
    document.body.classList.toggle("nav-open", open);
  }

  function openNav() {
    if (!navPanel) return;
    navPanel.hidden = false;
    if (navBackdrop) navBackdrop.hidden = false;
    /* Forzar el reflow para que la transición se aplique desde el estado inicial */
    void navPanel.offsetWidth;
    navPanel.classList.add("is-open");
    if (navBackdrop) navBackdrop.classList.add("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }

  function closeNav() {
    if (!navPanel) return;
    navPanel.classList.remove("is-open");
    if (navBackdrop) navBackdrop.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    window.setTimeout(function () {
      if (navPanel.classList.contains("is-open")) return;
      navPanel.hidden = true;
      if (navBackdrop) navBackdrop.hidden = true;
    }, 280);
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navPanel && navPanel.classList.contains("is-open");
      if (open) closeNav();
      else openNav();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeNav);
  }

  if (navPanel) {
    /* Cierre al navegar dentro del menú */
    navPanel.addEventListener("click", function (e) {
      var link = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (link) closeNav();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navPanel && navPanel.classList.contains("is-open")) {
      closeNav();
      if (navToggle) navToggle.focus();
    }
  });

  /* ---------- Selector de idiomas (Menu desplegable de Bootstrap) ---------- */
  var langsBox = byId("langs");
  function buildLangs() {
    if (!langsBox) return;
    langsBox.innerHTML = "";

    var label = document.createElement("span");
    label.className = "lang-label";
    label.id = "langLabel";
    label.textContent = T.language;
    langsBox.appendChild(label);

    var toggle = document.createElement("button");
    toggle.id = "langToggle";
    toggle.type = "button";
    toggle.className = "btn-outline lang-toggle";
    toggle.setAttribute("data-bs-toggle", "menu");
    toggle.setAttribute("data-bs-placement", "top-end");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-labelledby", "langLabel langToggle");
    toggle.setAttribute("lang", LANG);
    toggle.textContent = window.I18N[LANG].name;
    langsBox.appendChild(toggle);

    var menu = document.createElement("div");
    menu.className = "menu lang-menu";
    menu.setAttribute("aria-labelledby", "langToggle");

    Object.keys(window.I18N).forEach(function (code) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "menu-item" + (code === LANG ? " selected" : "");
      item.setAttribute("lang", code);
      item.setAttribute("data-lang", code);
      item.textContent = window.I18N[code].name;
      if (code === LANG) item.setAttribute("aria-current", "true");
      item.addEventListener("click", function () {
        window.location.href = withLang(currentFile(), code);
      });
      menu.appendChild(item);
    });

    langsBox.appendChild(menu);
  }

  /* ---------- Init ---------- */
  buildNav();
  buildLangs();
  applyPageContent();
  applyInfoContent();
  syncNavState();
  initHeroVideo();
})();
