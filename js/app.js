(function () {
  "use strict";

  /* ---------- Configuración (edita aquí) ---------- */
  var SITE    = "";
  var YOUTUBE = "https://www.youtube.com/@VincentDantesGrey/videos";
  var DEFAULT_LANG = "en";

  /* ---------- Páginas del menú ---------- */
  var PAGES = [
    { file: "normas-uxm.html",          key: "navRules",  titleKey: "pageRulesTitle" },
    { file: "video-tutoriales.html",    key: "navTutorials", titleKey: "pageTutorialsTitle" },
    { file: "actividades-diarias.html", key: "navDaily",  titleKey: "pageDailyTitle" },
    { file: "estrategia.html",          key: "navStrategy", titleKey: "pageStrategyTitle" },
    { file: "reino.html",               key: "navKingdom", titleKey: "pageKingdomTitle" },
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

  setText("warCryTitle", T.warCryTitle);
  setText("warCryMessage", T.warCryMessage);
  setText("tutoTitle", T.tutoTitle);
  setText("allianceTitle", T.allianceTitle);
  setText("allianceMessage", T.allianceMessage);
  setText("bonusAlliance", T.bonusAlliance);
  setText("copyright", T.copyright);
  setText("ytLabel", T.youtube);

  var heroScrollCue = byId("heroScrollCue");
  if (heroScrollCue) heroScrollCue.setAttribute("aria-label", T.scrollCue);

  /* ---------- Contador de visitas local ---------- */
  /* El contador vive solo en el navegador del visitante: no hay backend ni
     servicios externos. Se incrementa una vez por sesion (sessionStorage) y el
     total se conserva en localStorage. */
  var VISIT_COUNT_KEY = "uxmVisitCount";
  var VISIT_SESSION_KEY = "uxmVisitSession";
  var VISIT_SESSION_TTL = 30 * 60 * 1000; /* 30 minutos */

  function storageGet(store, key) {
    try { return store.getItem(key); } catch (e) { return null; }
  }

  function storageSet(store, key, value) {
    try { store.setItem(key, value); return true; } catch (e) { return false; }
  }

  function countLocalVisits() {
    var now = Date.now();
    var session = storageGet(window.sessionStorage, VISIT_SESSION_KEY);
    var last = parseInt(session, 10);

    /* Sesion vigente: no se cuenta de nuevo. */
    if (last && (now - last) < VISIT_SESSION_TTL) {
      var current = parseInt(storageGet(window.localStorage, VISIT_COUNT_KEY), 10) || 0;
      return current > 0 ? current : 0;
    }

    var total = parseInt(storageGet(window.localStorage, VISIT_COUNT_KEY), 10) || 0;
    total += 1;

    /* Si el almacenamiento esta bloqueado no se puede contabilizar la visita. */
    if (!storageSet(window.localStorage, VISIT_COUNT_KEY, String(total))) return 0;
    if (!storageSet(window.sessionStorage, VISIT_SESSION_KEY, String(now))) return 0;
    return total;
  }

  function renderVisitCounter() {
    var el = byId("visitCounter");
    if (!el) return;

    var total = countLocalVisits();
    if (!total) return; /* Almacenamiento bloqueado: se oculta el contador. */

    var label = T.visitCounter || "";
    el.textContent = label.replace("{n}", total.toLocaleString(LANG));
  }

  /* ---------- Tabla de bonos de la alianza ---------- */
  /* Las filas se generan con los datos de js/alliance-bonuses.js y los
     textos traducidos de js/i18n/index/i18n.js. */
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
    var infoTitles = document.querySelectorAll(".subtitle-info");
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

    var bookmarksBox = byId("strategyBookmarks");
    if (bookmarksBox) buildStrategyBookmarks(bookmarksBox);
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

    var dailyButton = document.createElement("a");
    dailyButton.className = "btn-outline btn-info-rules";
    dailyButton.href = withLang(pageUrl("actividades-diarias.html"), LANG);
    dailyButton.textContent = T.navDaily;
    container.appendChild(dailyButton);
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

  /* ---------- Marcadores de la Biblioteca Estrategica ---------- */
  /* Los grupos viven en db/library. Solo se cargan los manifiestos de grupo:
     los temas individuales se cargan ya en la subpagina de estrategia. */
  var LIBRARY_BASE = "db/library/";
  var LIBRARY_INDEX = LIBRARY_BASE + "index.json";
  var LIBRARY_FALLBACK_LANGS = ["en", "es"];

  function libraryTitle(field) {
    if (!field) return "";
    if (typeof field === "string") return field;

    var candidates = [field[LANG]];
    for (var i = 0; i < LIBRARY_FALLBACK_LANGS.length; i++) {
      candidates.push(field[LIBRARY_FALLBACK_LANGS[i]]);
    }
    for (var c = 0; c < candidates.length; c++) {
      if (typeof candidates[c] === "string" && candidates[c]) return candidates[c];
    }
    return "";
  }

  function fetchLibraryJson(url) {
    return fetch(url, { cache: "no-cache" }).then(function (response) {
      if (!response.ok) throw new Error("No se pudo cargar " + url);
      return response.json();
    });
  }

  /* Construye el boton general y la lista automatica de grupos. */
  function buildStrategyBookmarks(container) {
    if (!container) return;
    container.innerHTML = "";

    var buttonBox = document.createElement("div");
    buttonBox.className = "block-buttons";

    var strategyButton = document.createElement("a");
    strategyButton.className = "btn-outline btn-info-rules";
    strategyButton.href = withLang(pageUrl("estrategia.html"), LANG);
    strategyButton.textContent = T.navStrategy;
    buttonBox.appendChild(strategyButton);

    var groupBox = document.createElement("div");
    groupBox.className = "search-engine-topics-list block-bookmarks-groups";
    groupBox.setAttribute("role", "group");

    container.appendChild(buttonBox);
    container.appendChild(groupBox);

    loadLibraryGroups().then(function (groups) {
      groups.forEach(function (group) {
        var link = document.createElement("a");
        link.className = "search-engine-topic";
        link.href = withLang(pageUrl("estrategia.html") + "?group=" + encodeURIComponent(group.id), LANG);
        link.textContent = group.title;
        groupBox.appendChild(link);
      });
    }, function () {
      /* Si la biblioteca no carga, el boton general sigue siendo valido. */
    });
  }

  /* Carga el indice y los manifiestos de grupo, tolerando fallos parciales. */
  function loadLibraryGroups() {
    return fetchLibraryJson(LIBRARY_INDEX).then(function (index) {
      var files = Array.isArray(index && index.files) ? index.files : [];
      var requests = files.map(function (file) {
        return fetchLibraryJson(LIBRARY_BASE + file).then(
          function (group) { return { group: group, error: null }; },
          function () { return { group: null, error: file }; }
        );
      });

      return Promise.all(requests).then(function (results) {
        var groups = [];
        results.forEach(function (result) {
          if (!result.group) return;
          var group = result.group;
          groups.push({
            id: group.id,
            title: libraryTitle(group.title) || group.id,
            order: typeof group.order === "number" ? group.order : 999
          });
        });

        groups.sort(function (a, b) {
          if (a.order !== b.order) return a.order - b.order;
          return a.title.localeCompare(b.title, LANG);
        });
        return groups;
      });
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

  /* ---------- Rayo electrico sobre el cover ---------- */
  /* El rayo se dibuja en un canvas propio del cover: la portada y las
     subpaginas comparten la misma animacion. El canvas se crea por JavaScript
     para no depender del HTML de cada pagina.
     Combina los dos ejemplos de docs/examples: el crecimiento progresivo y
     las estelas de docs/examples/lightning, con el halo, el destello inicial
     y la punta afilada de docs/examples/ray.html. */
  var LIGHTNING_MAX_DENSITY = 2;
  var LIGHTNING_STEP_MS = 40;
  var LIGHTNING_MIN_SEGMENTS = 10;
  var LIGHTNING_MAX_SEGMENTS = 30;
  var LIGHTNING_MIN_LENGTH_RATIO = 0.5;
  var LIGHTNING_MAX_LENGTH_RATIO = 1.15;
  var LIGHTNING_SUBPAGE_LENGTH_RATIO = 0.62;
  var LIGHTNING_MIN_BRANCHES = 1;
  var LIGHTNING_MAX_BRANCHES = 3;
  var LIGHTNING_MIN_EDGE_MARGIN = 24;
  var LIGHTNING_MAX_EDGE_MARGIN = 100;
  var LIGHTNING_MIN_INTERVAL = 1400;
  var LIGHTNING_MAX_INTERVAL = 3800;
  var LIGHTNING_FIRST_DELAY = 300;
  var LIGHTNING_FLASH_COLOR = "rgba(80, 180, 255, ";
  var LIGHTNING_HALO_COLOR = "#4fc3f7";
  var LIGHTNING_CORE_COLOR = "#ffffff";

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomInt(min, max) {
    return Math.floor(randomBetween(min, max + 1));
  }

  function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  /* Un rayo nace en el borde superior y crece con el tiempo. Cada segmento
     avanza hacia abajo y solo se desvia de lado, nunca hacia atras.
     Los puntos de bifurcacion se fijan al crear el rayo: cada uno nace en un
     quiebre distinto del recorrido principal. */
  function createLightningBolt(x, y, options) {
    return {
      path: [{ x: x, y: y }],
      stepRange: options.stepRange,
      spreadRange: options.spreadRange,
      kinkRange: options.kinkRange,
      segmentLimit: options.segmentLimit,
      targetY: options.targetY,
      maxX: options.maxX,
      branchPoints: options.branchPoints || [],
      energy: options.energy || 0.6,
      grower: 0
    };
  }

  /* Anade un segmento al rayo. Devuelve false cuando el recorrido ya
     alcanzo su limite de segmentos o su altura objetivo. */
  function growLightningBolt(bolt) {
    var last = bolt.path[bolt.path.length - 1];
    var step = randomBetween(bolt.stepRange * 0.55, bolt.stepRange);
    var spread = randomBetween(-bolt.spreadRange, bolt.spreadRange);

    /* Cada pocos segmentos un quiebre mas marcado hace visible el cambio
       de direccion, sin retroceder hacia atras. */
    if (Math.random() < 0.25) {
      spread += randomBetween(-bolt.kinkRange, bolt.kinkRange);
    }

    var nextX = clamp(last.x + spread, 0, bolt.maxX);
    var nextY = Math.min(last.y + step, bolt.targetY);

    bolt.path.push({ x: nextX, y: nextY });

    return bolt.path.length < bolt.segmentLimit && nextY < bolt.targetY;
  }

  /* Grosor de un segmento segun su posicion en el recorrido: el rayo nace
     ancho y se adelgaza hasta terminar en punta. */
  function lightningSegmentWidths(progress) {
    var taper = Math.pow(1 - progress, 1.35);
    return {
      halo: 0.6 + taper * 5.4,
      core: 0.35 + taper * 2.65
    };
  }

  /* Dibuja el recorrido de un rayo. Cada segmento se dibuja por separado con
     su propio grosor para poder afilar la punta. Los quiebres destacados
     reciben mas brillo siguiendo la forma del propio trazado. */
  function drawLightningBolt(ctx, bolt, fade, energy) {
    var total = bolt.path.length - 1;
    if (total < 1) return;

    for (var i = 0; i < total; i++) {
      var from = bolt.path[i];
      var to = bolt.path[i + 1];
      var progress = i / total;
      var widths = lightningSegmentWidths(progress);

      /* Los quiebres con mas energia brilliancean sin anadir figuras:
         el brillo se consigue con el mismo segmento, mas opaco y con halo. */
      var kink = 1 + energy * randomBetween(0.1, 0.55);
      var alpha = clamp(fade * randomBetween(0.65, 1) * kink, 0, 1);

      /* Halo exterior cian. */
      ctx.save();
      ctx.globalAlpha = Math.min(1, alpha * 0.75);
      ctx.shadowBlur = 8 + energy * 22 * kink;
      ctx.shadowColor = LIGHTNING_HALO_COLOR;
      ctx.strokeStyle = LIGHTNING_HALO_COLOR;
      ctx.lineWidth = widths.halo;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.restore();

      /* Nucleo blanco. */
      ctx.save();
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.shadowBlur = 4 + energy * 10 * kink;
      ctx.shadowColor = LIGHTNING_CORE_COLOR;
      ctx.strokeStyle = LIGHTNING_CORE_COLOR;
      ctx.lineWidth = widths.core;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  function initCoverLightning() {
    var cover = document.querySelector("#content.home-content, #content.subpage-content");
    if (!cover) return;

    var reducedMotionQuery = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    if (reducedMotionQuery && reducedMotionQuery.matches) return;

    var canvas = document.createElement("canvas");
    canvas.className = "cover-lightning";
    canvas.setAttribute("aria-hidden", "true");
    cover.insertBefore(canvas, cover.firstChild);

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var isSubpage = cover.classList.contains("subpage-content");
    var density = Math.min(window.devicePixelRatio || 1, LIGHTNING_MAX_DENSITY);
    var bolts = [];
    var flash = 0;
    var frameId = 0;
    var visible = true;
    var lastTime = 0;
    var elapsed = 0;
    var nextBoltIn = LIGHTNING_FIRST_DELAY;

    function coverSize() {
      return { width: cover.clientWidth, height: cover.clientHeight };
    }

    function resizeCanvas() {
      var size = coverSize();
      if (!size.width || !size.height) return;
      canvas.width = Math.round(size.width * density);
      canvas.height = Math.round(size.height * density);
      ctx.setTransform(density, 0, 0, density, 0, 0);
      /* Los recorridos anteriores usan medidas previas: se descartan. */
      bolts = [];
      flash = 0;
      ctx.clearRect(0, 0, size.width, size.height);
    }

    /* Prepara los parametros del rayo segun el alto disponible del cover.
       El rayo empieza siempre en el borde superior y su longitud es
       aleatoria: puede terminar a media altura o sobrepasar el borde. */
    function boltOptions(size) {
      var ratio = isSubpage
        ? LIGHTNING_SUBPAGE_LENGTH_RATIO
        : randomBetween(LIGHTNING_MIN_LENGTH_RATIO, LIGHTNING_MAX_LENGTH_RATIO);
      var usableHeight = size.height * ratio;
      var margin = clamp(size.width * 0.1, LIGHTNING_MIN_EDGE_MARGIN, LIGHTNING_MAX_EDGE_MARGIN);
      var maxSegments = Math.round(
        clamp(usableHeight / 26, LIGHTNING_MIN_SEGMENTS, LIGHTNING_MAX_SEGMENTS)
      );

      return {
        margin: margin,
        targetY: usableHeight,
        segmentLimit: maxSegments,
        stepRange: Math.max(7, usableHeight / maxSegments),
        spreadRange: isSubpage ? 12 : 20,
        kinkRange: isSubpage ? 16 : 26
      };
    }

    /* Elige los quiebres donde nacen las ramificaciones. Se reparten a lo
       largo del recorrido para que no salgan todas juntas ni del mismo punto. */
    function chooseBranchPoints(segmentLimit) {
      var count = randomInt(LIGHTNING_MIN_BRANCHES, LIGHTNING_MAX_BRANCHES);
      var first = Math.max(3, Math.round(segmentLimit * 0.2));
      var last = Math.max(first + 1, Math.round(segmentLimit * 0.8));
      var points = [];

      for (var i = 0; i < count; i++) {
        var point = randomInt(first, last);
        /* Ninguna ramificacion nace en el mismo quiebre que otra. */
        while (points.indexOf(point) >= 0) {
          point = randomInt(first, last);
        }
        points.push(point);
      }

      return points.sort(function (a, b) { return a - b; });
    }

    function spawnLightning() {
      var size = coverSize();
      if (!size.width || !size.height) return;

      var options = boltOptions(size);
      var startX = randomBetween(
        options.margin,
        Math.max(options.margin, size.width - options.margin)
      );
      var energy = randomBetween(0.45, 1);

      bolts = [createLightningBolt(startX, 0, {
        stepRange: options.stepRange,
        spreadRange: options.spreadRange,
        kinkRange: options.kinkRange,
        segmentLimit: options.segmentLimit,
        targetY: options.targetY,
        maxX: size.width,
        branchPoints: chooseBranchPoints(options.segmentLimit),
        energy: energy
      })];

      /* Destello inicial azul: el rayo aparece de golpe sobre el cover. */
      flash = 0.22 + energy * 0.28;
    }

    /* Crea la ramificacion de un rayo: sale de un quiebre del recorrido y
       avanza hacia abajo con un recorrido corto y mas fino. La orientacion
       alterna para que las ramas no se crucen entre si. */
    function spawnBranch(bolt, size, side) {
      var origin = bolt.path[bolt.path.length - 1];
      var length = randomBetween(50, 120);

      var branch = createLightningBolt(origin.x, origin.y, {
        stepRange: Math.max(5, length / 6),
        spreadRange: 9,
        kinkRange: 12,
        segmentLimit: 6,
        targetY: Math.min(origin.y + length, size.height),
        maxX: size.width,
        energy: bolt.energy * 0.7
      });
      branch.side = side;
      bolts.push(branch);
    }

    /* Actualiza el crecimiento de los rayos y genera sus ramificaciones. */
    function updateLightning(delta) {
      var size = coverSize();

      for (var i = bolts.length - 1; i >= 0; i--) {
        var bolt = bolts[i];
        var finished = false;

        bolt.grower += delta;
        while (bolt.grower >= LIGHTNING_STEP_MS) {
          bolt.grower -= LIGHTNING_STEP_MS;
          if (!growLightningBolt(bolt)) {
            finished = true;
            break;
          }

          /* Cada quiebre marcado genera su ramificacion. */
          if (bolt.branchPoints.length && bolt.path.length >= bolt.branchPoints[0]) {
            var point = bolt.branchPoints.shift();
            var origin = bolt.path[Math.min(point, bolt.path.length - 1)];
            var side = origin.x > size.width * 0.5 ? -1 : 1;
            if (bolt.side) side = -bolt.side;
            bolt.side = side;
            spawnBranch(bolt, size, side);
          }
        }

        /* El rayo se retira al terminar: si no, bloquearia las siguientes
           descargas. La estela se desvanece sola con destination-out. */
        if (finished) {
          bolts.splice(i, 1);
        }
      }
    }

    /* Dibuja los rayos y aplica el desvanecido de las estelas. */
    function renderLightning() {
      var size = coverSize();

      if (flash > 0) {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = LIGHTNING_FLASH_COLOR + flash + ")";
        ctx.fillRect(0, 0, size.width, size.height);
        ctx.restore();
        flash *= 0.85;
        if (flash < 0.01) flash = 0;
      }

      for (var i = 0; i < bolts.length; i++) {
        var bolt = bolts[i];
        var fade = clamp(bolt.path.length / Math.max(1, bolt.segmentLimit), 0.25, 1);
        drawLightningBolt(ctx, bolt, fade, bolt.energy || 0.6);
      }

      /* Las estelas se desvanecen poco a poco con destination-out. El canvas
         no se limpia por frame: el rastro persiste hasta desaparecer. */
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, " + randomBetween(0.05, 0.14) + ")";
      ctx.fillRect(0, 0, size.width, size.height);
      ctx.restore();
    }

    function frame(now) {
      frameId = 0;
      if (!visible) return;

      if (!lastTime) lastTime = now;
      /* El delta se acota para que la reanudacion no genere saltos. */
      var delta = Math.min(now - lastTime, 100);
      lastTime = now;
      elapsed += delta;

      if (elapsed >= nextBoltIn && bolts.length === 0) {
        spawnLightning();
        elapsed = 0;
        nextBoltIn = randomBetween(LIGHTNING_MIN_INTERVAL, LIGHTNING_MAX_INTERVAL);
      }

      updateLightning(delta);
      renderLightning();

      frameId = window.requestAnimationFrame(frame);
    }

    function start() {
      if (frameId) return;
      lastTime = 0;
      frameId = window.requestAnimationFrame(frame);
    }

    function stop() {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }

    resizeCanvas();
    start();

    if (window.ResizeObserver) {
      new window.ResizeObserver(resizeCanvas).observe(cover);
    } else {
      window.addEventListener("resize", resizeCanvas);
    }

    /* El rayo se detiene cuando el cover sale de la pantalla o la pestaña
       queda oculta: evita gastar ciclos en contenido que no se ve. */
    if (window.IntersectionObserver) {
      new window.IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else stop();
      }).observe(cover);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else if (visible) start();
    });
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
  initCoverLightning();
  renderVisitCounter();
})();
