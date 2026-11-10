(function () {
  "use strict";

  /* ---------- Configuración (edita aquí) ---------- */
  var SITE    = "";
  var YOUTUBE = "https://www.youtube.com/@VincentDantesGrey/videos";
  var DEFAULT_LANG = "en";

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

  setText("arengaTitle", T.arengaTitle);
  setText("arengaMessage", T.arengaMessage);
  setText("tutoTitle", T.tutoTitle);
  setText("allianceTitle", T.allianceTitle);
  setText("allianceMessage", T.allianceMessage);
  setText("bonusAlliance", T.bonusAlliance);
  setText("copyright", T.copyright);
  setText("ytLabel", T.youtube);

  var heroScrollCue = byId("heroScrollCue");
  if (heroScrollCue) heroScrollCue.setAttribute("aria-label", T.scrollCue);

  /* ---------- Tabla de bonos de la alianza ---------- */
  /* Las filas se generan con los datos de js/alliance-bonuses.js y los
     textos traducidos de js/i18n.js. */
  function buildAllianceBonuses() {
    var body = byId("allianceBonusBody");
    var bonuses = window.ALLIANCE_BONUSES || [];
    if (!body) return;
    body.innerHTML = "";

    /* Las claves identifican cada fila: se descartan duplicados. */
    var seen = {};
    bonuses.forEach(function (bonus) {
      if (!bonus || !bonus.key || seen[bonus.key]) return;
      seen[bonus.key] = true;

      var tr = document.createElement("tr");

      var icon = document.createElement("th");
      icon.setAttribute("scope", "row");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "★";
      tr.appendChild(icon);

      var value = document.createElement("td");
      value.textContent = bonus.value || "";
      tr.appendChild(value);

      var value = document.createElement("td");
      // value.textContent = bonus.level || "";
      value.textContent = bonus.level === null || bonus.level === undefined
        ? ""
        : "Lv." + bonus.level;
      tr.appendChild(value);

      var name = document.createElement("td");
      name.id = bonus.key;
      name.textContent = T[bonus.key] || bonus.key;
      if (bonus.inProgress) {
        name.className = "in-progress";
        name.setAttribute("data-progress", T.bonusInProgress);
      }
      tr.appendChild(name);

      body.appendChild(tr);
    });
  }

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

    /* Todos los subtítulos informativos reciben inicial escarlata. */
    var infoTitles = document.querySelectorAll(".sibtitle-info");
    for (var i = 0; i < infoTitles.length; i++) {
      var heading = infoTitles[i];
      if (heading.querySelector(".info-initial")) continue;
      var text = heading.textContent.trim();
      if (!text) continue;
      heading.textContent = "";
      var headingInitial = document.createElement("span");
      headingInitial.className = "info-initial";
      headingInitial.textContent = text.charAt(0);
      heading.appendChild(headingInitial);
      heading.appendChild(document.createTextNode(text.slice(1)));
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

    var videoButtonsBox = byId("videoTutorialButtons");
    if (videoButtonsBox) buildVideoTutorialButtons(videoButtonsBox);
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

  /* ---------- Botones del bloque de video tutorial ---------- */
  var VIDEO_TUTORIAL_SECTIONS = [
    { id: "learningPriority", labelKey: "learningPriority" },
    { id: "tips", labelKey: "tips" },
    { id: "events", labelKey: "events" }
  ];

  function buildVideoTutorialButtons(container) {
    if (!container) return;
    container.innerHTML = "";

    VIDEO_TUTORIAL_SECTIONS.forEach(function (section) {
      var button = document.createElement("a");
      button.className = "btn-outline btn-info-rules";
      button.href = withLang(pageUrl("video-tutoriales.html"), LANG) + "#" + section.id;
      button.textContent = T[section.labelKey] || section.id;
      container.appendChild(button);
    });
  }

  /* ---------- Texto propio de cada página ---------- */

  /* Los subtitulos de seccion traducidos se reconstruyen con inicial escarlata. */
  function setSectionTitle(el, title) {
    if (!el || !title) return;
    el.textContent = "";

    var initial = document.createElement("span");
    initial.className = "info-initial";
    initial.textContent = title.charAt(0);

    el.appendChild(initial);
    el.appendChild(document.createTextNode(title.slice(1)));
  }

  /* Aplica la traduccion a los subtitulos de seccion que declaran su clave. */
  function applySectionTitles() {
    var headings = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var key = heading.getAttribute("data-i18n");
      setSectionTitle(heading, T[key]);
    }
  }

  /* Aplica la traduccion a los textos simples que declaran su clave. */
  function applyTexts() {
    var nodes = document.querySelectorAll("[data-i18n-text]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var key = node.getAttribute("data-i18n-text");
      var text = T[key];
      if (text) node.textContent = text;
    }
  }

  /* Aplica la traduccion a los textos con marcado, como reglas con enlaces.
     Las traducciones son textos locales y controlados, sin contenido externo. */
  function applyRichTexts() {
    var nodes = document.querySelectorAll("[data-i18n-html]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var key = node.getAttribute("data-i18n-html");
      var html = T[key];
      if (html) node.innerHTML = html;
    }
  }

  /* Aplica la traduccion al atributo title de los elementos que lo declaran. */
  function applyTitles() {
    var nodes = document.querySelectorAll("[data-i18n-title]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var key = node.getAttribute("data-i18n-title");
      var title = T[key];
      if (title) node.setAttribute("title", title);
    }
  }

  /* El título de subpagina se reconstruye para aplicar la inicial escarlata. */
  function setSubpageTitle(el, title) {
    if (!el) return;
    el.textContent = "";

    var word = document.createElement("span");
    word.className = "subpage-title-word";

    var initial = document.createElement("span");
    initial.className = "subpage-title-initial subpage-title-accent";
    initial.textContent = title.charAt(0);

    word.appendChild(initial);
    word.appendChild(document.createTextNode(title.slice(1)));
    el.appendChild(word);
  }

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
        if (h1) {
          if (h1.className.indexOf("subpage-title") >= 0) setSubpageTitle(h1, title);
          else h1.textContent = title;
        }
        document.title = title + " – UXM";
      }
      return;
    }
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
  var sideLangsBox = byId("sideLangs");

  function buildLangSelector(container, prefix, placement) {
    if (!container) return;
    container.innerHTML = "";

    var label = document.createElement("span");
    label.className = "lang-label";
    label.id = prefix + "LangLabel";
    label.textContent = T.language;
    container.appendChild(label);

    var toggle = document.createElement("button");
    toggle.id = prefix + "LangToggle";
    toggle.type = "button";
    toggle.className = "btn-outline lang-toggle";
    toggle.setAttribute("data-bs-toggle", "menu");
    toggle.setAttribute("data-bs-placement", placement);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-labelledby", label.id + " " + toggle.id);
    toggle.setAttribute("lang", LANG);
    toggle.textContent = window.I18N[LANG].name;
    container.appendChild(toggle);

    var menu = document.createElement("div");
    menu.className = "menu lang-menu";
    menu.setAttribute("aria-labelledby", toggle.id);

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

    container.appendChild(menu);
  }

  function buildLangs() {
    buildLangSelector(langsBox, "", "top-end");
    buildLangSelector(sideLangsBox, "side", "top-start");
  }

  /* ---------- Init ---------- */
  buildAllianceBonuses();
  buildNav();
  buildLangs();
  applyPageContent();
  applySectionTitles();
  applyTexts();
  applyRichTexts();
  applyTitles();
  applyInfoContent();
  syncNavState();
  initHeroVideo();
})();
