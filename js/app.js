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
  var LIGHTNING_MIN_SEGMENTS = 10;
  var LIGHTNING_MAX_SEGMENTS = 30;
  var LIGHTNING_SEGMENT_LENGTH = 16;
  var LIGHTNING_MIN_LENGTH_RATIO = 0.5;
  var LIGHTNING_MAX_LENGTH_RATIO = 1.15;
  var LIGHTNING_SUBPAGE_LENGTH_RATIO = 0.62;
  var LIGHTNING_MIN_BRANCHES = 1;
  var LIGHTNING_MAX_BRANCHES = 3;
  var LIGHTNING_MIN_EDGE_MARGIN = 24;
  var LIGHTNING_MAX_EDGE_MARGIN = 100;
  /* Triangulo de propagacion: el rayo crece dentro de un triangulo
     isoceles con inclinacion aleatoria. */
  var LIGHTNING_CONE_MIN_ANGLE = 6;
  var LIGHTNING_CONE_MAX_ANGLE = 26;
  var LIGHTNING_TILT_MAX_DEGREES = 28;
  /* Deslizamientos laterales largos: pueden alcanzar la mitad del cover. */
  var LIGHTNING_LONG_JUMP_RATIO = 0.5;
  var LIGHTNING_LONG_JUMP_CHANCE = 0.22;
  var LIGHTNING_LONG_JUMP_MIN_RATIO = 0.08;
  /* Corridas de igual direccion: evitan la oscilacion regular del trazado. */
  var LIGHTNING_RUN_MIN = 1;
  var LIGHTNING_RUN_MAX = 4;
  /* Cada linea crece con su propio ritmo. */
  var LIGHTNING_MIN_STEP_MS = 22;
  var LIGHTNING_MAX_STEP_MS = 68;
  var LIGHTNING_BRANCH_MIN_STEP_MS = 16;
  var LIGHTNING_BRANCH_MAX_STEP_MS = 46;
  var LIGHTNING_MIN_SPEED_SCALE = 0.75;
  var LIGHTNING_MAX_SPEED_SCALE = 1.35;
  /* Planificador de apariciones: varias descargas escalonadas, nunca a la vez. */
  var LIGHTNING_MAX_ACTIVE_BOLTS = 3;
  var LIGHTNING_MIN_START_GAP = 300;
  var LIGHTNING_MAX_START_GAP = 700;
  var LIGHTNING_MIN_INTERVAL = 1400;
  var LIGHTNING_MAX_INTERVAL = 3800;
  var LIGHTNING_CLUSTER_MIN_INTERVAL = 400;
  var LIGHTNING_CLUSTER_MAX_INTERVAL = 1100;
  var LIGHTNING_CLUSTER_CHANCE = 0.35;
  var LIGHTNING_FIRST_DELAY = 300;
  /* Desvanecimiento coordinado: el grupo se apaga en bloque. */
  var LIGHTNING_GROUP_FADE_MS = 320;
  /* Separacion minima entre los quiebres de bifurcacion. */
  var LIGHTNING_BRANCH_MIN_GAP = 3;
  /* Las ramas se dibujan mas finas que el rayo principal. */
  var LIGHTNING_BRANCH_WIDTH_SCALE = 0.72;
  /* Cono de las ramificaciones: mas estrecho que el del rayo principal. */
  var LIGHTNING_BRANCH_CONE_MIN_ANGLE = 4;
  var LIGHTNING_BRANCH_CONE_MAX_ANGLE = 14;
  /* Margen angular entre conos para que no se superpongan. */
  var LIGHTNING_CONE_SEPARATION_MARGIN = 5;
  /* Las ramas pueden inclinarse mas que el rayo principal. */
  var LIGHTNING_BRANCH_MAX_TILT_DEGREES = 72;
  /* Distancia minima entre los extremos de dos ramificaciones. */
  var LIGHTNING_BRANCH_END_MIN_DISTANCE = 70;
  /* Longitudes relativas de las ramificaciones: cortas, medias y largas. */
  var LIGHTNING_BRANCH_LENGTH_RATIOS = [0.55, 0.85, 1.15];
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

  /* Diferencia angular absoluta entre dos ejes, en grados. */
  function angleBetweenDegrees(a, b) {
    var diff = Math.abs(a - b) * 180 / Math.PI;
    if (diff > 180) diff = 360 - diff;
    return diff;
  }

  /* Un rayo nace en el borde superior y crece con el tiempo. Cada segmento
     avanza hacia abajo y solo se desvia de lado, nunca hacia atras.
     Los puntos de bifurcacion se fijan al crear el rayo: cada uno nace en un
     quiebre distinto del recorrido principal. */
  function createLightningBolt(x, y, options) {
    /* El triangulo de propagacion se define en coordenadas locales y luego
       se inclina de forma aleatoria alrededor del vertice. */
    var tilt = randomBetween(-LIGHTNING_TILT_MAX_DEGREES, LIGHTNING_TILT_MAX_DEGREES) * Math.PI / 180;
    var coneAngle = randomBetween(LIGHTNING_CONE_MIN_ANGLE, LIGHTNING_CONE_MAX_ANGLE) * Math.PI / 180;

    return {
      path: [{ x: x, y: y }],
      apexX: x,
      apexY: y,
      tilt: tilt,
      coneAngle: coneAngle,
      /* Eje y normal del triangulo, ya inclinados. */
      axisX: Math.sin(tilt),
      axisY: Math.cos(tilt),
      normalX: Math.cos(tilt),
      normalY: -Math.sin(tilt),
      depth: 0,
      height: options.height,
      stepRange: options.stepRange,
      stepMs: options.stepMs || LIGHTNING_MIN_STEP_MS,
      speedScale: options.speedScale || 1,
      segmentLimit: options.segmentLimit,
      maxX: options.maxX,
      minX: options.minX || 0,
      maxY: options.maxY || 0,
      branchPoints: options.branchPoints || [],
      energy: options.energy || 0.6,
      isBranch: !!options.isBranch,
      widthScale: options.widthScale || 1,
      side: 1,
      runLeft: randomInt(LIGHTNING_RUN_MIN, LIGHTNING_RUN_MAX),
      grower: 0
    };
  }

  /* Semiancho del triangulo a la profundidad actual. */
  function lightningConeWidth(bolt) {
    return bolt.depth * Math.tan(bolt.coneAngle);
  }

  /* Convierte las coordenadas locales del triangulo en coordenadas de
     pantalla, ya inclinadas. */
  function lightningLocalToScreen(bolt, depth, offset) {
    return {
      x: bolt.apexX + bolt.axisX * depth + bolt.normalX * offset,
      y: bolt.apexY + bolt.axisY * depth + bolt.normalY * offset
    };
  }

  /* Anade un segmento al rayo. Devuelve false cuando se agotan los
     segmentos disponibles.
     El punto se calcula dentro del triangulo de propagacion: se avanza sobre
     el eje inclinado y se desplaza lateralmente hasta el semiancho que
     permite la profundidad alcanzada. El desplazamiento lateral mantiene la
     misma direccion durante varias corridas, de modo que el trazado no
     oscile de forma regular. */
  function growLightningBolt(bolt) {
    var last = bolt.path[bolt.path.length - 1];
    var step = randomBetween(bolt.stepRange * 0.55, bolt.stepRange) * bolt.speedScale;

    /* Corridas de igual direccion: el rayo no zigzaguea de forma simetrica. */
    if (bolt.runLeft <= 0) {
      bolt.side = -bolt.side;
      bolt.runLeft = randomInt(LIGHTNING_RUN_MIN, LIGHTNING_RUN_MAX);
    }
    bolt.runLeft--;

    var depth = bolt.depth + step;
    var halfWidth = lightningConeWidth({ depth: depth, coneAngle: bolt.coneAngle });

    /* Desplazamiento lateral dentro del semiancho disponible. */
    var offset = bolt.side * randomBetween(halfWidth * 0.15, halfWidth);

    /* Deslizamiento largo ocasional: salta a otra zona del triangulo. */
    if (Math.random() < LIGHTNING_LONG_JUMP_CHANCE) {
      var room = bolt.maxX - bolt.minX;
      var jump = randomBetween(room * LIGHTNING_LONG_JUMP_MIN_RATIO, room * LIGHTNING_LONG_JUMP_RATIO);
      var limit = Math.min(jump, halfWidth * 2);
      offset = clamp(
        offset + bolt.side * randomBetween(limit * 0.4, limit),
        -halfWidth,
        halfWidth
      );
    }

    var next = lightningLocalToScreen(bolt, depth, offset);

    /* Si el punto se sale del cover o retrocede, se busca otro dentro de la
       seccion valida del triangulo. El avance vertical nunca se invierte. */
    var attempts = 0;
    while (
      attempts < 12 &&
      (next.x < bolt.minX || next.x > bolt.maxX || next.y > bolt.maxY || next.y <= last.y)
    ) {
      attempts++;
      depth = bolt.depth + step * randomBetween(0.5, 1);
      halfWidth = lightningConeWidth({ depth: depth, coneAngle: bolt.coneAngle });
      offset = clamp(
        randomBetween(-halfWidth, halfWidth),
        -halfWidth,
        halfWidth
      );
      next = lightningLocalToScreen(bolt, depth, offset);
    }

    /* Si la inclinacion Consigue que el descento sea nulo, el rayo avanza
       sobre el eje: el recorrido nunca retrocede verticalmente. */
    if (next.y <= last.y) {
      depth = bolt.depth + step;
      next = lightningLocalToScreen(bolt, depth, 0);
    }
    if (next.y <= last.y) {
      return false;
    }

    /* Si no se ha encontrado un punto valido dentro del cover, el rayo
       termina aqui: nunca se dibuja fuera de sus limites. */
    if (next.x < bolt.minX || next.x > bolt.maxX || next.y > bolt.maxY) {
      return false;
    }

    /* Ultimo recurso: el punto se recorta al cover para que ninguna
       inclinacion lo deje fuera. */
    next.x = clamp(next.x, bolt.minX, bolt.maxX);

    bolt.depth = depth;
    bolt.path.push({ x: next.x, y: next.y });

    return bolt.path.length < bolt.segmentLimit;
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
  function drawLightningBolt(ctx, bolt, fade, energy, widthScale) {
    var total = bolt.path.length - 1;
    if (total < 1) return;
    var scale = widthScale || 1;

    for (var i = 0; i < total; i++) {
      var from = bolt.path[i];
      var to = bolt.path[i + 1];
      var progress = i / total;
      var widths = lightningSegmentWidths(progress);
      widths.halo *= scale;
      widths.core *= scale;

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
    var groups = [];
    var groupCounter = 0;
    var flash = 0;
    var frameId = 0;
    var visible = true;
    var lastTime = 0;
    var elapsed = 0;
    var nextBoltIn = LIGHTNING_FIRST_DELAY;
    var lastStartAt = -LIGHTNING_MAX_START_GAP;

    /* Numero de descargas principales visibles. Las ramificaciones cuelgan de
       su rayo y no cuentan como descargas independientes. */
    function activeMainBolts() {
      var count = 0;
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].fade > 0) count++;
      }
      return count;
    }

    /* Calcula cuando debe aparecer la siguiente descarga. Se alternan grupos
       de relampagos cercanos con pausas mas largas para que el ritmo sea
       natural y no una cadencia constante. */
    function scheduleNextDischarge(active) {
      if (active > 0 && Math.random() < LIGHTNING_CLUSTER_CHANCE) {
        return randomBetween(LIGHTNING_CLUSTER_MIN_INTERVAL, LIGHTNING_CLUSTER_MAX_INTERVAL);
      }
      return randomBetween(LIGHTNING_MIN_INTERVAL, LIGHTNING_MAX_INTERVAL);
    }

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
      groups = [];
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

      /* El numero de segmentos depende del alto recorrido: los covers bajos
         necesitan mas segmentos y mas pequenos para dibujar un zigzag
         completo con la misma apertura. */
      var maxSegments = Math.round(
        clamp(usableHeight / LIGHTNING_SEGMENT_LENGTH, LIGHTNING_MIN_SEGMENTS, LIGHTNING_MAX_SEGMENTS)
      );

      return {
        margin: margin,
        height: usableHeight,
        targetY: usableHeight,
        segmentLimit: maxSegments,
        stepRange: usableHeight / maxSegments
      };
    }

    /* Reparte las longitudes de las ramificaciones. Cada una recibe una
       recorrido distinto: corta, media o larga, sin repetir. */
    function chooseLengthRatios(count) {
      var pool = LIGHTNING_BRANCH_LENGTH_RATIOS.slice(0, count);
      /* Se mezcla el orden para que no siempre sean cortas, medias y largas. */
      for (var i = pool.length - 1; i > 0; i--) {
        var j = randomInt(0, i);
        var swap = pool[i];
        pool[i] = pool[j];
        pool[j] = swap;
      }
      return pool;
    }

    /* Elige los quiebres donde nacen las ramificaciones. Se reparten en
       zonas a lo largo del recorrido y con una separacion minima, para que
       no salgan juntas ni se superpongan entre si. */
    function chooseBranchPoints(segmentLimit, count) {
      /* La primera ramificacion nace pronto: la descarga debe mostrar al
         menos una aunque el rayo principal se detenga antes de tiempo. */
      var first = Math.max(2, Math.round(segmentLimit * 0.15));
      var last = Math.max(first + 1, Math.round(segmentLimit * 0.8));
      var span = last - first;
      var points = [];

      /* Cada rama ocupa una franja distinta del recorrido. */
      var zone = span / count;
      for (var i = 0; i < count; i++) {
        var zoneStart = first + Math.round(zone * i);
        var zoneEnd = first + Math.round(zone * (i + 1)) - 1;
        if (zoneEnd < zoneStart) zoneEnd = zoneStart;

        var point = randomInt(zoneStart, zoneEnd);
        /* Ninguna ramificacion nace junto a otra. */
        var attempts = 0;
        while (attempts < 12 && points.some(function (other) {
          return Math.abs(other - point) < LIGHTNING_BRANCH_MIN_GAP;
        })) {
          attempts++;
          point = randomInt(zoneStart, zoneEnd);
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

      /* Cada descarga nace con su propio ritmo de crecimiento. */
      var bolt = createLightningBolt(startX, 0, {
        height: options.height,
        stepRange: options.stepRange,
        stepMs: randomInt(LIGHTNING_MIN_STEP_MS, LIGHTNING_MAX_STEP_MS),
        speedScale: randomBetween(LIGHTNING_MIN_SPEED_SCALE, LIGHTNING_MAX_SPEED_SCALE),
        segmentLimit: options.segmentLimit,
        maxX: size.width,
        minX: 0,
        maxY: size.height,
        branchPoints: [],
        energy: energy
      });

      bolts.push(bolt);

      /* La descarga agrupa el rayo principal y sus ramificaciones: todos
         comparten el mismo desvanecimiento. */
      var group = {
        main: bolt,
        bolts: [bolt],
        coneGroupId: ++groupCounter,
        fade: 1,
        fading: false,
        elapsed: 0,
        mainDone: false,
        branchSides: [],
        branchTilts: [],
        branchEnds: [],
        lengthRatios: []
      };
      bolt.group = group;

      /* El numero de ramificaciones se decide una vez y lo comparten los
         puntos de bifurcacion y las longitudes. */
      var branchCount = randomInt(LIGHTNING_MIN_BRANCHES, LIGHTNING_MAX_BRANCHES);
      bolt.branchPoints = chooseBranchPoints(options.segmentLimit, branchCount);
      group.lengthRatios = chooseLengthRatios(branchCount);

      groups.push(group);

      /* Destello inicial azul: el rayo aparece de golpe sobre el cover. */
      flash = Math.max(flash, 0.22 + energy * 0.28);
    }

    /* Crea la ramificacion de un rayo: sale de un quiebre del recorrido y
       avanza hacia abajo con un recorrido corto y mas fino. La orientacion
       alterna para que las ramas no se crucen entre si. */
    function spawnBranch(bolt, size, side, lengthRatio) {
      var origin = bolt.path[bolt.path.length - 1];
      var group = bolt.group || null;

      /* La rama es un relampago completo con su propio cono. Su cono se
         separa del cono principal: ambos solo comparten el punto de
         bifurcacion y no se superponen. */
      var branchCone = randomBetween(
        LIGHTNING_BRANCH_CONE_MIN_ANGLE,
        LIGHTNING_BRANCH_CONE_MAX_ANGLE
      ) * Math.PI / 180;

      /* Angulo necesario para que los conos no se pisen. */
      var needed = bolt.coneAngle + branchCone + LIGHTNING_CONE_SEPARATION_MARGIN * Math.PI / 180;

      /* Se prueban los dos lados y se elige el que mas se aleja del cono
         principal, del cono de las ramas anteriores y del borde del cover. */
      var verticalRoom = Math.max(40, size.height - origin.y);
      var candidates = [];
      for (var direction = -1; direction <= 1; direction += 2) {
        var tilt = bolt.tilt + direction * (needed + randomBetween(0, 0.25));
        var limit = LIGHTNING_BRANCH_MAX_TILT_DEGREES * Math.PI / 180;

        /* El tilt se acota al espacio que hay hacia ese lado. */
        var room = direction > 0 ? size.width - origin.x : origin.x;
        var sideLimit = Math.min(
          limit,
          Math.atan2(Math.max(0, room), verticalRoom)
        );
        var limited = clamp(tilt, -sideLimit, sideLimit);

        /* La separacion respecto al cono principal se mide con el tilt
           acotado: es la que evita la superposicion real. */
        var separation = angleBetweenDegrees(limited, bolt.tilt) -
          (bolt.coneAngle * 180 / Math.PI) - (branchCone * 180 / Math.PI);

        /* No se reutiliza la direccion de una rama anterior. */
        var apart = 0;
        if (group) {
          for (var i = 0; i < group.branchTilts.length; i++) {
            apart = Math.max(apart, angleBetweenDegrees(limited, group.branchTilts[i]));
          }
        }
        candidates.push({
          tilt: limited,
          separation: separation,
          apart: apart,
          direction: direction
        });
      }

      if (!candidates.length) {
        candidates.push({
          tilt: clamp(
            bolt.tilt + side * needed,
            -LIGHTNING_BRANCH_MAX_TILT_DEGREES * Math.PI / 180,
            LIGHTNING_BRANCH_MAX_TILT_DEGREES * Math.PI / 180
          ),
          separation: 0,
          direction: side
        });
      }

      /* Se prefiere el cono que conserva la separacion con el principal y
         que mas se aparta de las ramas ya existentes. */
      candidates.sort(function (a, b) {
        if (Math.abs(b.separation - a.separation) > 0.001) return b.separation - a.separation;
        return b.apart - a.apart;
      });
      var chosen = candidates[0];

      /* Longitud propia: corta, media o larga segun la descarga. */
      var remaining = Math.max(40, size.height - origin.y);
      var ratio = lengthRatio || randomBetween(0.55, 1.15);
      var length = remaining * ratio;

      /* El cono ya viene acotado por el espacio disponible. Cuando el
         borde del cover impide separar la rama del cono principal, se
         prefiere el lado con mas espacio. */
      var chosenTilt = chosen.tilt;

      /* El extremo de la rama debe separarse de los extremos de las ramas
         ya existentes: dos o tres ramificaciones no terminan en el mismo
         punto. La distancia minima se ajusta al tamano del cover. */
      var minEndDistance = Math.min(
        LIGHTNING_BRANCH_END_MIN_DISTANCE,
        Math.max(24, size.width * 0.06)
      );
      if (group && group.branchEnds.length) {
        var attempts = 0;
        while (attempts < 10) {
          attempts++;
          var candidate = lightningLocalToScreen({
            apexX: origin.x,
            apexY: origin.y,
            axisX: Math.sin(chosenTilt),
            axisY: Math.cos(chosenTilt)
          }, length, 0);

          var tooClose = false;
          for (var e = 0; e < group.branchEnds.length; e++) {
            var other = group.branchEnds[e];
            var distance = Math.sqrt(
              Math.pow(candidate.x - other.x, 2) + Math.pow(candidate.y - other.y, 2)
            );
            if (distance < minEndDistance) tooClose = true;
          }

          if (!tooClose) break;

          /* Se ajustan la longitud y la inclinacion para alejar el
             extremo de los ya existentes. */
          length = length * randomBetween(0.75, 1.3);
          var adjust = chosen.direction * randomBetween(4, 14) * Math.PI / 180;
          chosenTilt = clamp(
            chosenTilt + adjust,
            -LIGHTNING_BRANCH_MAX_TILT_DEGREES * Math.PI / 180,
            LIGHTNING_BRANCH_MAX_TILT_DEGREES * Math.PI / 180
          );
        }
      }

      var branch = createLightningBolt(origin.x, origin.y, {
        height: length,
        stepRange: Math.max(5, length / 10),
        stepMs: randomInt(LIGHTNING_BRANCH_MIN_STEP_MS, LIGHTNING_BRANCH_MAX_STEP_MS),
        speedScale: randomBetween(LIGHTNING_MIN_SPEED_SCALE, LIGHTNING_MAX_SPEED_SCALE),
        segmentLimit: Math.round(
          clamp(length / LIGHTNING_SEGMENT_LENGTH, LIGHTNING_MIN_SEGMENTS, LIGHTNING_MAX_SEGMENTS)
        ),
        maxX: size.width,
        minX: 0,
        maxY: size.height,
        isBranch: true,
        energy: bolt.energy * 0.7
      });

      /* Se adopta el cono separado elegido, acotado al cover. */
      branch.tilt = chosenTilt;
      branch.coneAngle = branchCone;
      branch.axisX = Math.sin(branch.tilt);
      branch.axisY = Math.cos(branch.tilt);
      branch.normalX = Math.cos(branch.tilt);
      branch.normalY = -Math.sin(branch.tilt);
      branch.side = chosen.direction;
      branch.widthScale = LIGHTNING_BRANCH_WIDTH_SCALE;

      /* La rama pertenece al grupo de su rayo principal: comparte con el
         el mismo desvanecimiento. */
      branch.group = group;

      /* El extremo previsto de la rama: debe separarse de los extremos
         de las ramas ya existentes de esta descarga. */
      var end = lightningLocalToScreen(branch, branch.height, 0);
      branch.endX = end.x;
      branch.endY = end.y;

      if (group) {
        group.bolts.push(branch);
        group.branchTilts.push(branch.tilt);
        group.branchEnds.push({ x: branch.endX, y: branch.endY });
      }

      bolts.push(branch);
    }

    /* Actualiza el crecimiento de los rayos y genera sus ramificaciones.
       El grupo de descarga se apaga en bloque: cuando el rayo principal
       termina, sus ramificaciones dejan de crecer y se desvanecen con el. */
    function updateLightning(delta) {
      var size = coverSize();

      for (var i = bolts.length - 1; i >= 0; i--) {
        var bolt = bolts[i];
        var finished = false;

        /* Un rayo que se esta desvanecendo ya no crece: el desvanecimiento
           es comun a toda la descarga. */
        if (bolt.group && bolt.group.fading) continue;

        /* Un rayo que ya termino su recorrido no vuelve a crecer. */
        if (bolt.completed) continue;

        bolt.grower += delta;
        while (bolt.grower >= bolt.stepMs) {
          bolt.grower -= bolt.stepMs;
          if (!growLightningBolt(bolt)) {
            finished = true;
            break;
          }

          /* Cada quiebre marcado genera su ramificacion. */
          if (bolt.branchPoints.length && bolt.path.length >= bolt.branchPoints[0]) {
            var point = bolt.branchPoints.shift();
            var origin = bolt.path[Math.min(point, bolt.path.length - 1)];

            /* La orientacion preferente se alterna: una rama se abre hacia
               un lado del eje principal y la siguiente hacia el contrario,
               para reducir la superposicion entre ellas. */
            var side = origin.x > size.width * 0.5 ? -1 : 1;
            if (bolt.group) {
              var used = bolt.group.branchSides.length;
              side = used % 2 === 0 ? -side : side;
              bolt.group.branchSides.push(side);
            }
            bolt.side = side;

            /* No se crean ramas si el grupo ya se esta desvanecendo: la
               descarga se apaga completa. */
            if (!bolt.group || !bolt.group.fading) {
              var ratio = 0;
              if (bolt.group && bolt.group.lengthRatios.length) {
                ratio = bolt.group.lengthRatios.shift();
              }
              spawnBranch(bolt, size, side, ratio);
            }
          }
        }

        /* El rayo principal marca el final de su crecimiento, pero permanece
           visible: el grupo se apaga cuando sus ramificaciones terminen. */
        if (finished && !bolt.isBranch) {
          bolt.completed = true;
          var group = bolt.group;
          if (group) {
            group.mainDone = true;
            group.elapsed = 0;
            /* No se crean mas ramificaciones. */
            bolt.branchPoints = [];
          }
        }

        /* Una rama terminada ya no crece. */
        if (finished && bolt.isBranch) {
          bolt.completed = true;
        }
      }

      /* El grupo se apaga cuando no queda ningun rayo en crecimiento y el
         principal ya termino: ninguno sobrevive a otro. */
      for (var g = groups.length - 1; g >= 0; g--) {
        var current = groups[g];
        if (!current.mainDone) continue;

        var growing = false;
        for (var b = 0; b < current.bolts.length; b++) {
          if (!current.bolts[b].completed) growing = true;
        }

        if (growing) {
          /* Las ramas terminan su recorrido antes de que se apague el
             grupo: se acelera su crecimiento para no alargar la descarga. */
          current.elapsed += delta;
          for (var c = 0; c < current.bolts.length; c++) {
            var member = current.bolts[c];
            if (member.isBranch && !member.completed) member.grower += delta * 2;
          }
          continue;
        }

        if (!current.fading) {
          current.fading = true;
          current.elapsed = 0;
        }
      }

      /* Avance del desvanecimiento de cada grupo. */
      for (var f = groups.length - 1; f >= 0; f--) {
        var current = groups[f];
        if (!current.fading) continue;

        current.elapsed += delta;
        current.fade = Math.max(0, 1 - current.elapsed / LIGHTNING_GROUP_FADE_MS);

        /* El grupo desaparece cuando ya no queda opacidad. */
        if (current.fade <= 0) {
          for (var b = 0; b < current.bolts.length; b++) {
            var index = bolts.indexOf(current.bolts[b]);
            if (index >= 0) bolts.splice(index, 1);
          }
          groups.splice(f, 1);
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

        /* Todo el grupo comparte el mismo factor de desvanecimiento. */
        if (bolt.group) fade *= bolt.group.fade;

        drawLightningBolt(ctx, bolt, fade, bolt.energy || 0.6, bolt.widthScale || 1);
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

      /* El planificador permite varias descargas escalonadas en el cover,
         nunca iniciadas en el mismo instante. */
      if (elapsed >= nextBoltIn && activeMainBolts() < LIGHTNING_MAX_ACTIVE_BOLTS) {
        var gap = Math.max(LIGHTNING_MIN_START_GAP, randomInt(LIGHTNING_MIN_START_GAP, LIGHTNING_MAX_START_GAP));
        if (now - lastStartAt >= gap) {
          spawnLightning();
          lastStartAt = now;
          elapsed = 0;
          nextBoltIn = scheduleNextDischarge(activeMainBolts());
        } else {
          /* Todavia no ha pasado la separacion minima: se espera un poco. */
          nextBoltIn = gap - (now - lastStartAt);
        }
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
