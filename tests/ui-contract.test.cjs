const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("los botones usan el radio de 4px y el menu lateral el ajuste manual de 1px", () => {
  const css = read("css/style.css");
  assert.match(css, /--button-radius:\s*4px/);
  assert.match(css, /button,\s*\.btn,\s*\.btn-outline[^{]*\{[^}]*border-radius:\s*var\(--button-radius\)/s);
  assert.match(css, /\.nav-list a\s*\{[^}]*border-radius:\s*1px/s);
});

test("la portada incluye la sección informativa con el subtítulo centrado", () => {
  const html = read("index.html");
  assert.match(html, /<section class="block-content-info center-content">/);
  assert.match(html, /<h2 class="sibtitle-info"[^>]*>/);
  assert.match(html, /<p class="dinamic-welcome"[^>]*><\/p>/);
  assert.match(html, /<div class="message-welcome">\s*<p id="welcomeMessage">/s);
  assert.match(html, /<div class="block-buttons"[^>]*>/);
});

test("el saludo dinámico excluye el idioma activo y separa los demás con puntos", () => {
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.match(js, /welcomeTexts/);
  assert.match(js, /code\s*!==\s*LANG/);
  assert.match(js, /\.join\(" · "\)/);
  assert.doesNotMatch(js, /setInterval/);
  assert.ok((i18n.match(/welcome:"[^"]+"/g) || []).length >= 8);
});

test("la sección informativa incluye botones de YouTube y Normas UXM", () => {
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.match(js, /buildInfoButtons/);
  assert.match(js, /youtube\.com\/@VincentDantesGrey\/videos/);
  assert.match(js, /normas-uxm\.html/);
  assert.doesNotMatch(js, /127\.0\.0\.1/);
  assert.match(i18n, /youtubeLabel:"YouTube"/);
  assert.match(i18n, /rulesLabel:"Normas UXM"/);
});

test("los botones informativos declaran borde y el tag del hero usa un color válido", () => {
  const css = read("css/style.css");
  assert.match(css, /\.block-buttons \.btn-outline,\s*\.component-buttons \.btn-outline\s*\{[^}]*border-width:\s*1px/s);
  assert.match(css, /\.block-buttons \.btn-outline,\s*\.component-buttons \.btn-outline\s*\{[^}]*border-style:\s*solid/s);
  assert.match(css, /\.block-buttons \.btn-info-youtube,\s*\.component-buttons \.btn-info-youtube\s*\{[^}]*border:\s*1px solid var\(--scarlet\)/s);
  assert.match(css, /\.block-buttons \.btn-info-rules,\s*\.component-buttons \.btn-info-rules\s*\{[^}]*border:\s*1px solid var\(--primary-btn\)/s);
  assert.doesNotMatch(css, /color:\s*none/);
  assert.match(css, /\.hero-video \.tag,\s*\.subpage \.tag\s*\{[^}]*color:\s*#f1f3f5/s);
});

test("el bloque de video tutorial usa YouTube vertical y botones flexibles", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  const js = read("js/app.js");
  assert.match(html, /<div class="video-tutorial">[\s\S]*?<div class="component-video">[\s\S]*?youtube\.com\/embed\/kU9m5eJxbCQ\?autoplay=1&amp;mute=1&amp;playsinline=1[\s\S]*?<\/div>/);
  assert.match(html, /<div class="component-buttons" id="videoTutorialButtons"><\/div>/);
  assert.match(css, /\.video-tutorial\s*\{[^}]*max-width:\s*760px/s);
  assert.match(css, /\.video-tutorial\s*\{[^}]*display:\s*inline-flex/s);
  assert.match(css, /\.video-tutorial\s*\{[^}]*gap:\s*24px/s);
  assert.match(css, /\.component-video\s*\{[^}]*width:\s*298px/s);
  assert.match(css, /\.component-video\s*\{[^}]*aspect-ratio:\s*298 \/ 530/s);
  assert.match(css, /\.component-buttons\s*\{[^}]*flex-direction:\s*column/s);
  assert.match(css, /\.component-buttons\s*\{[^}]*max-width:\s*40%/s);
  assert.match(css, /@media\s*\(max-width:\s*640px\)/);
  assert.match(js, /VIDEO_TUTORIAL_SECTIONS/);
  assert.match(js, /pageUrl\("video-tutoriales\.html"\)/);
  assert.match(js, /#"\s*\+\s*section\.id/);
});

test("los botones enlazan las tres secciones de tutoriales con idioma y ancla", () => {
  const js = read("js/app.js");
  assert.match(js, /id:\s*"learningPriority"/);
  assert.match(js, /id:\s*"tips"/);
  assert.match(js, /id:\s*"events"/);
  assert.match(js, /withLang\(pageUrl\("video-tutoriales\.html"\), LANG\)/);
});

test("la subpágina de tutoriales usa banners y anclas únicas", () => {
  const html = read("pages/video-tutoriales.html");
  const css = read("css/style.css");
  assert.match(html, /id="learningPriority"/);
  assert.match(html, /id="tips"/);
  assert.match(html, /id="events"/);
  assert.equal((html.match(/id="tips"/g) || []).length, 1);
  assert.match(css, /\.banner-divisor,\s*\.banner-subpage\s*\{[^}]*background-color:\s*#ccc/s);
  assert.match(css, /\.banner-divisor,\s*\.banner-subpage\s*\{[^}]*color:\s*#3d3d3d/s);
});

test("las tarjetas de video tutorial se identifican de forma única", () => {
  const html = read("pages/video-tutoriales.html");
  assert.equal((html.match(/class="card-video"/g) || []).length, 10);
  const ids = [...html.matchAll(/id="(desc-video-[^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, 10);
  assert.equal(new Set(ids).size, 10);
  const videos = [...html.matchAll(/data-youtube-id="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(videos.length, 10);
  assert.equal(new Set(videos).size, 10);
});

test("las tarjetas no usan elementos video con paginas de YouTube", () => {
  const html = read("pages/video-tutoriales.html");
  assert.doesNotMatch(html, /<video[^>]*youtube\.com\/watch/s);
  assert.doesNotMatch(html, /<video[^>]*src=/s);
  assert.equal((html.match(/<video/gi) || []).length, 0);
});

test("cada tarjeta declara su video, miniatura y controles", () => {
  const html = read("pages/video-tutoriales.html");
  assert.equal((html.match(/class="card-video-media"/g) || []).length, 10);
  assert.equal((html.match(/class="card-video-thumb"/g) || []).length, 10);
  assert.equal((html.match(/class="card-video-play"/g) || []).length, 10);
  assert.equal((html.match(/class="card-video-sound"/g) || []).length, 10);
  assert.equal((html.match(/loading="lazy"/g) || []).length, 10);
  assert.equal((html.match(/i\.ytimg\.com\/vi\//g) || []).length, 10);
  assert.match(html, /class="text-video-learnig" id="desc-video-p1"/);
});

test("las tarjetas se muestran de a dos por ancho y se apilan en movil", () => {
  const css = read("css/style.css");
  assert.match(css, /\.tutorials-content\s*\{[^}]*display:\s*grid/s);
  assert.match(css, /\.tutorials-content\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /\.card-video\s*\{[^}]*display:\s*flex/s);
  assert.match(css, /\.card-video\s*\{[^}]*flex-direction:\s*column/s);
  assert.match(css, /\.card-video\s*\{[^}]*border-radius:\s*var\(--button-radius\)/s);
  assert.match(css, /\.card-video-media\s*\{[^}]*aspect-ratio:\s*16 \/ 9/s);
  assert.match(css, /\.text-video-learnig\s*\{[^}]*padding:\s*12px 14px 14px/s);
  assert.match(css, /@media\s*\(max-width:\s*640px\)\s*\{[^}]*\.tutorials-content\s*\{\s*grid-template-columns:\s*1fr/s);
});

test("el reproductor se crea bajo demanda y exige un clic para el audio", () => {
  const js = read("js/video-cards.js");
  assert.match(js, /https:\/\/www\.youtube\.com\/iframe_api/);
  assert.match(js, /autoplay:\s*1/);
  assert.match(js, /mute:\s*1/);
  assert.match(js, /playsinline:\s*1/);
  assert.match(js, /unMute\(\)/);
  assert.match(js, /setVolume\(100\)/);
  assert.match(js, /mouseenter/);
  assert.match(js, /mouseleave/);
  assert.match(js, /pauseVideo\(\)/);
  assert.match(js, /prefers-reduced-motion/);
  assert.match(js, /\(hover: hover\) and \(pointer: fine\)/);
});

test("el script de tarjetas se carga despues de i18n y de app", () => {
  const html = read("pages/video-tutoriales.html");
  const i18nPos = html.indexOf('src="../js/i18n.js"');
  const appPos = html.indexOf('src="../js/app.js"');
  const cardsPos = html.indexOf('src="../js/video-cards.js"');
  assert.ok(i18nPos >= 0 && appPos >= 0 && cardsPos >= 0);
  assert.ok(i18nPos < appPos, "i18n.js debe cargarse antes que app.js");
  assert.ok(appPos < cardsPos, "video-cards.js debe cargarse despues de app.js");
  assert.ok(fs.existsSync(path.join(root, "js/video-cards.js")));
});

test("las descripciones de las tarjetas se traducen con data-i18n-text", () => {
  const html = read("pages/video-tutoriales.html");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.equal((html.match(/data-i18n-text="videoTutorial/g) || []).length, 10);
  assert.match(js, /function applyTexts\(\)/);
  assert.match(js, /querySelectorAll\("\[data-i18n-text\]"\)/);
  assert.match(js, /applyTexts\(\);/);
  const keys = [
    "videoTutorialPriority1", "videoTutorialPriority2", "videoTutorialPriority3",
    "videoTutorialTip1", "videoTutorialTip2", "videoTutorialTip3",
    "videoTutorialEvent1", "videoTutorialEvent2", "videoTutorialEvent3", "videoTutorialEvent4"
  ];
  for (const key of keys) {
    const found = i18n.match(new RegExp(`${key}:"[^"]+"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }
});

test("los encabezados de tutoriales se traducen con claves propias", () => {
  const html = read("pages/video-tutoriales.html");
  const i18n = read("js/i18n.js");
  assert.match(html, /id="learningPriority" data-i18n="tutorialLearningPriorityTitle"/);
  assert.match(html, /id="tips" data-i18n="tutorialTipsTitle"/);
  assert.match(html, /id="events" data-i18n="tutorialEventsTitle"/);
  for (const key of ["tutorialLearningPriorityTitle", "tutorialTipsTitle", "tutorialEventsTitle"]) {
    const found = i18n.match(new RegExp(`${key}:"[^"]+"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }
  assert.match(i18n, /tutorialLearningPriorityTitle:"Aprendizaje Prioritario"/);
  assert.match(i18n, /tutorialTipsTitle:"Dato Práctico"/);
  assert.match(i18n, /tutorialEventsTitle:"Eventos"/);
});

test("los botones de la portada conservan sus etiquetas originales", () => {
  const i18n = read("js/i18n.js");
  assert.match(i18n, /learningPriority:"Prioritario"/);
  assert.match(i18n, /tips:"Tips"/);
  assert.match(i18n, /events:"Eventos"/);
});

test("el banner de subpágina comparte estilo con el divisor y ocupa todo el ancho", () => {
  const css = read("css/style.css");
  assert.match(css, /\.banner-divisor,\s*\.banner-subpage\s*\{[^}]*padding:\s*12px 16px/s);
  assert.match(css, /\.banner-divisor,\s*\.banner-subpage\s*\{[^}]*text-align:\s*center/s);
  assert.match(css, /\.banner-divisor \.info-initial,\s*\.banner-subpage \.info-initial\s*\{[^}]*color:\s*var\(--scarlet\)/s);
  assert.match(css, /\.subpage-banner\s*\{[^}]*width:\s*100%/s);
  assert.doesNotMatch(css, /\.banner-subpage\s*\{[^}]*margin-left:\s*-/s);
  assert.doesNotMatch(css, /\.banner-subpage\s*\{[^}]*margin-right:\s*-/s);
});

test("el banner de subpágina usa un contenedor dedicado fuera del bloque informativo", () => {
  const html = read("pages/actividades-diarias.html");
  const css = read("css/style.css");
  assert.match(html, /<section class="subpage-banner">\s*<h3 class="sibtitle-info banner-subpage"/);
  assert.match(css, /\.subpage-banner \.banner-subpage\s*\{[^}]*margin:\s*0/s);
  assert.match(css, /\.subpage-banner \+ \.block-content-info\s*\{[^}]*margin-top:\s*0/s);
  assert.doesNotMatch(html, /<section class="block-content-info">\s*<h2 class="sibtitle-info banner-subpage"/);
});

test("la inicial escarlata del título de subpágina se centra verticalmente", () => {
  const css = read("css/style.css");
  assert.match(css, /\.subpage-title-word\s*\{[^}]*align-items:\s*center/s);
  assert.match(css, /\.hero-title-word\s*\{[^}]*align-items:\s*flex-start/s);
});

test("el título de subpágina usa el color gris claro solicitado", () => {
  const css = read("css/style.css");
  assert.match(css, /\.subpage-title\s*\{[^}]*color:\s*#adadad/s);
  assert.match(css, /#content\.subpage-content \.subpage-title\s*\{[^}]*color:\s*#565656/s);
});

test("todas las subpáginas usan el estándar de portada subpage-content", () => {
  const pages = [
    { file: "pages/actividades-diarias.html", theme: "subpage-daily", initial: "A" },
    { file: "pages/normas-uxm.html", theme: "subpage-rules", initial: "N" },
    { file: "pages/video-tutoriales.html", theme: "subpage-tutorials", initial: "V" },
    { file: "pages/estrategia.html", theme: "subpage-strategy", initial: "E" },
    { file: "pages/contacto.html", theme: "subpage-contact", initial: "C" }
  ];

  for (const page of pages) {
    const html = read(page.file);
    assert.match(html, new RegExp(`<section class="subpage-content ${page.theme}" id="content">`));
    assert.match(html, /<div class="subpage">/);
    assert.match(html, /<h1 id="heroTitle" class="subpage-title">/);
    assert.match(html, /<span class="subpage-title-word">/);
    assert.match(html, new RegExp(`<span class="subpage-title-initial subpage-title-accent">${page.initial}</span>`));
    assert.doesNotMatch(html, /class="hero-title"/);
    assert.doesNotMatch(html, /subpage-cover/);
  }
});

test("la portada de subpágina usa fondo a ancho completo con capa de contraste", () => {
  const css = read("css/style.css");
  assert.match(css, /#content\.subpage-content\s*\{[^}]*max-width:\s*none/s);
  assert.match(css, /#content\.subpage-content\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /#content\.subpage-content\s*\{[^}]*background-size:\s*cover/s);
  assert.match(css, /#content\.subpage-content::before\s*\{[^}]*content:\s*""/s);
});

test("cada subpágina asocia su fondo SVG temático", () => {
  const css = read("css/style.css");
  const themes = {
    "subpage-rules": "normas-uxm.svg",
    "subpage-daily": "actividades-diarias.svg",
    "subpage-tutorials": "video-tutoriales.svg",
    "subpage-strategy": "estrategia.svg",
    "subpage-contact": "contacto.svg"
  };

  for (const [theme, file] of Object.entries(themes)) {
    assert.match(css, new RegExp(`\\.${theme}\\s*\\{[^}]*background-image:\\s*url\\("\\.\\./media/subpages/${file}"\\)`, "s"));
    assert.ok(fs.existsSync(path.join(root, "media/subpages", file)), "debe existir " + file);
  }
});

test("el título de subpágina conserva la inicial escarlata al cambiar de idioma", () => {
  const js = read("js/app.js");
  const css = read("css/style.css");
  assert.match(js, /function setSubpageTitle\(el, title\)/);
  assert.match(js, /word\.className = "subpage-title-word"/);
  assert.match(js, /initial\.className = "subpage-title-initial subpage-title-accent"/);
  assert.match(js, /h1\.className\.indexOf\("subpage-title"\) >= 0/);
  assert.match(css, /\.hero-title-accent,\s*\.subpage-title-accent\s*\{[^}]*color:\s*var\(--scarlet\)/s);
});

test("los subtítulos informativos usan H2, Cinzel, inicial escarlata y sombra gris", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  const js = read("js/app.js");
  assert.doesNotMatch(html, /<h3 class="sibtitle-info/);
  assert.ok((html.match(/<h2 class="sibtitle-info/g) || []).length >= 4);
  assert.match(css, /\.sibtitle-info\s*\{[^}]*font-family:\s*"Cinzel", Georgia, "Times New Roman", serif/s);
  assert.match(css, /\.sibtitle-info\s*\{[^}]*text-shadow:[^}]*rgba\(33,\s*33,\s*33/s);
  assert.match(css, /\.sibtitle-info \.info-initial\s*\{[^}]*color:\s*var\(--scarlet\)/s);
  assert.match(js, /querySelectorAll\("\.sibtitle-info"\)/);
});

test("el bloque destacado comparte layout y usa fondo azul grisáceo", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  assert.match(html, /<section class="block-content-destacated center-content extra-top-space">/);
  assert.match(css, /\.block-content-destacated\s*\{[^}]*background-color:\s*#d3d3d3/s);
  assert.match(css, /\.block-content-destacated\s*\{[^}]*color:\s*#ccc/s);
});

test("los bloques informativos se centran solo con center-content y usan padding responsive", () => {
  const css = read("css/style.css");
  assert.match(css, /\.block-content-info,\s*\.block-content-destacated\s*\{[^}]*padding:\s*0 10%/s);
  assert.match(css, /\.block-content-info,\s*\.block-content-destacated\s*\{[^}]*text-align:\s*left/s);
  assert.match(css, /\.block-content-info\.center-content,\s*\.block-content-destacated\.center-content\s*\{[^}]*text-align:\s*center/s);
});

test("actividades diarias incluye el calendario de batalla de supervivencia", () => {
  const html = read("pages/actividades-diarias.html");
  assert.match(html, /<div class="battle-content">[\s\S]*?<table class="bs-schedule">[\s\S]*?<tbody id="bs-body"><\/tbody>[\s\S]*?<\/div>/);
  assert.match(html, /id="bs-tzinfo"/);
});

test("la subpagina carga un unico script propio y su hoja de estilos", () => {
  const html = read("pages/actividades-diarias.html");

  assert.match(html, /<script src="\.\.\/js\/activities-daily\.js"><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\.\.\/css\/activities-daily\.css">/);

  /* Los scripts reemplazados no deben volver a referenciarse. */
  assert.doesNotMatch(html, /battle-survival-schedule\.js/);
  assert.doesNotMatch(html, /alliance-duel-schedule\.js/);

  /* No se incrusta codigo ni estilos en linea. */
  assert.doesNotMatch(html, /<script>\s*\(function \(\) \{/);
  assert.doesNotMatch(html, /ACTIVITIES\s*=\s*\[/);
  assert.doesNotMatch(html, /<style/);

  assert.ok(fs.existsSync(path.join(root, "js/activities-daily.js")));
  assert.ok(fs.existsSync(path.join(root, "css/activities-daily.css")));
});

test("los scripts de calendario sustituidos ya no existen", () => {
  assert.ok(!fs.existsSync(path.join(root, "js/battle-survival-schedule.js")));
  assert.ok(!fs.existsSync(path.join(root, "js/alliance-duel-schedule.js")));
});

test("el script se carga despues de i18n y de app", () => {
  const html = read("pages/actividades-diarias.html");
  const i18nPos = html.indexOf('src="../js/i18n.js"');
  const appPos = html.indexOf('src="../js/app.js"');
  const dailyPos = html.indexOf('src="../js/activities-daily.js"');
  assert.ok(i18nPos >= 0 && appPos >= 0 && dailyPos >= 0);
  assert.ok(i18nPos < appPos, "i18n.js debe cargarse antes que app.js");
  assert.ok(appPos < dailyPos, "activities-daily.js debe cargarse despues de app.js");
});

test("los estilos del calendario viven en su propia hoja y no se inyectan", () => {
  const js = read("js/activities-daily.js");
  const css = read("css/activities-daily.css");

  /* El script ya no crea ni inyecta elementos de estilo. */
  assert.doesNotMatch(js, /var\s+CSS\s*=/);
  assert.doesNotMatch(js, /createElement\("style"\)/);
  assert.doesNotMatch(js, /styleSheet/);
  assert.doesNotMatch(js, /appendChild\(styleEl\)/);

  /* Las reglas se conservan en la hoja propia. */
  assert.match(css, /\.bs-wrap \{[^}]*overflow-x:\s*auto/s);
  assert.match(css, /\.bs-schedule \{[^}]*min-width:\s*640px/s);
  assert.match(css, /\.bs-schedule \{[^}]*max-width:\s*900px/s);
  assert.match(css, /\.ad-wrap \{[^}]*overflow-x:\s*auto/s);
  assert.match(css, /\.ad-item\.ad-open \.ad-item-body \{[^}]*display:\s*block/s);
  assert.match(css, /tr\.bs-current td \{[^}]*background:\s*#069726/s);
  assert.match(css, /\.ad-item\.ad-today \.ad-item-title \{[^}]*background:\s*#009922/s);
});

test("el calendario no declara subtitulo propio", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/activities-daily.js");
  assert.doesNotMatch(html, /bs-subtitle/);
  assert.doesNotMatch(js, /bs-subtitle/);
});

test("las traducciones del calendario viven solo en js/i18n.js", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/activities-daily.js");
  const i18n = read("js/i18n.js");
  assert.doesNotMatch(html, /var I18N\s*=\s*\{/);
  assert.doesNotMatch(js, /var I18N\s*=\s*\{/);
  assert.match(js, /window\.I18N/);
  assert.match(js, /T\.bsHeaders/);
  assert.match(js, /T\.bsPast/);
  assert.match(js, /T\.bsCurrent/);
  assert.match(js, /T\.bsNext/);
  const headers = i18n.match(/bsHeaders:\[/g) || [];
  assert.equal(headers.length, 8);
  for (const key of ["bsPast", "bsCurrent", "bsNext"]) {
    const found = i18n.match(new RegExp(`${key}:"[^"]+"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }
});

test("el mensaje de supervivencia se traduce en todos los idiomas", () => {
  const html = read("pages/actividades-diarias.html");
  const i18n = read("js/i18n.js");

  assert.match(html, /id="survivalMessage" data-i18n-text="survivalMessage"/);
  const matches = i18n.match(/survivalMessage:"[^"]+"/g) || [];
  assert.equal(matches.length, 8);
  assert.match(i18n, /survivalMessage:"Ciclo automatico de actividades calculado según el horario del navegador web\."/);
});

test("los titulos del duelo de alianzas muestran el reset local en formato MM/DD HH:mm", () => {
  const js = read("js/activities-daily.js");

  assert.match(js, /function phaseTitle\(noday\)/);
  assert.match(js, /function resetTitle\(resetMs\)/);
  assert.match(js, /var reset = new Date\(resetMs\)/);
  assert.match(js, /return "· " \+ pad\(reset\.getMonth\(\) \+ 1\) \+ "\/" \+ pad\(reset\.getDate\(\)\) \+ " " \+/);
  assert.match(js, /pad\(reset\.getHours\(\)\) \+ ":" \+ pad\(reset\.getMinutes\(\)\)/);
  assert.match(js, /var resetMs = startDayMs \+ k \* 86400000 \+ SRC_TO_UTC_MS/);
  assert.match(js, /phase\.className = "ad-title-phase"/);
  assert.match(js, /phase\.textContent = phaseTitle\(noday\)/);
  assert.match(js, /reset\.className = "ad-title-reset"/);
  assert.match(js, /reset\.textContent = resetTitle\(resetMs\)/);
  assert.doesNotMatch(js, /dayTitle\(noday\) \+ " · " \+ DAY_ABBR\[noday\]/);
});

test("el titulo del duelo de alianzas alinea la fase a la izquierda y el reset a la derecha", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /\.ad-item-title \{[^}]*display:\s*flex/s);
  assert.match(css, /\.ad-item-title \{[^}]*align-items:\s*center/s);
  assert.match(css, /\.ad-title-phase \{[^}]*text-align:\s*left/s);
  assert.match(css, /\.ad-title-reset \{[^}]*margin-left:\s*auto/s);
  assert.match(css, /\.ad-title-reset \{[^}]*font-size:\s*0\.75rem/s);
  assert.match(css, /\.ad-title-reset \{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.ad-arrow \{[^}]*flex:\s*0 0 auto/s);
});

test("la tabla del calendario conserva el comportamiento responsivo original", () => {
  const css = read("css/style.css");
  const dailyCss = read("css/activities-daily.css");
  const js = read("js/activities-daily.js");

  assert.doesNotMatch(css, /\.battle-content \.bs-schedule\s*\{/);
  assert.doesNotMatch(dailyCss, /\.battle-content \.bs-schedule\s*\{/);
  assert.doesNotMatch(js, /max-width:\s*none/);
  assert.match(dailyCss, /\.bs-schedule \{[^}]*min-width:\s*640px/s);
  assert.match(dailyCss, /\.bs-schedule \{[^}]*max-width:\s*900px/s);
  assert.match(dailyCss, /\.bs-wrap \{[^}]*overflow-x:\s*auto/s);
});

test("el encabezado del cronograma de batalla se traduce en todos los idiomas", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.match(html, /data-i18n="scheduleBattleSurvival"/);
  assert.match(html, />Cronograma Batalla Supervivencia<\/h3>/);
  assert.match(js, /function applySectionTitles\(\)/);
  assert.match(js, /querySelectorAll\("\[data-i18n\]"\)/);
  assert.match(js, /setSectionTitle\(heading, T\[key\]\)/);
  assert.match(js, /applySectionTitles\(\);/);
  assert.match(js, /initial\.className = "info-initial"/);
  const matches = i18n.match(/scheduleBattleSurvival:"[^"]+"/g) || [];
  assert.equal(matches.length, 8);
  assert.match(i18n, /scheduleBattleSurvival:"Cronograma Batalla Supervivencia"/);
});

test("actividades diarias incluye el calendario de duelo de alianzas sin informacion de zona horaria", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/activities-daily.js");
  const css = read("css/activities-daily.css");

  assert.match(html, /<div class="duel-alliance-content">[\s\S]*?<div id="ad-lists"><\/div>[\s\S]*?<\/div>/);
  assert.doesNotMatch(html, /id="ad-tzinfo"/);
  assert.doesNotMatch(js, /ad-tzinfo/);
  assert.doesNotMatch(css, /#ad-tzinfo/);
});

test("el duelo de alianzas vincula sus tareas con los horarios de battle survival", () => {
  const js = read("js/activities-daily.js");

  assert.match(js, /a && a\.codebs/);
  assert.match(js, /slotsByCodebs/);
  assert.match(js, /function counterState\(codebs, noday, nowSec\)/);
  assert.match(js, /function linkedDateLabel\(startDayMs, offset, noday, codebs\)/);
  assert.match(js, /var allDaySlots = slotsByDay\[noday\] \|\| \[\]/);
  assert.match(js, /var endSec = s \+ 1 < allDaySlots\.length \? allDaySlots\[s \+ 1\]\.sec : 86400/);
  assert.match(js, /allDaySlots\[s\]\.codebs === codebs && nowSec >= allDaySlots\[s\]\.sec && nowSec < endSec/);
  assert.match(js, /"T-"/);
  assert.match(js, /"\+ "/);
  assert.match(js, /"End"/);
  assert.match(js, /pad\(loc\.getUTCMonth\(\) \+ 1\) \+ "\/" \+ pad\(loc\.getUTCDate\(\)\)/);
  assert.match(js, /var nowSec = origin\.getUTCHours\(\) \* 3600 \+ origin\.getUTCMinutes\(\) \* 60 \+ origin\.getUTCSeconds\(\)/);
  assert.doesNotMatch(js, /ad-past/);
});

test("el contador del duelo de alianzas usa server_time con server_duration", () => {
  const js = read("js/activities-daily.js");

  /* La hora propia del servidor tiene prioridad sobre el vinculo codebs. */
  assert.match(js, /function parseClock\(value\)/);
  assert.match(js, /function serverCounterState\(serverTime, serverDuration, nowSec\)/);
  assert.match(js, /if \(nowSec < startSec\) return "T-" \+ fmtCounter\(startSec - nowSec\)/);
  assert.match(js, /if \(nowSec < endSec\) return "\+ " \+ fmtCounter\(nowSec - startSec\)/);
  assert.match(js, /return "End";/);
  assert.match(js, /if \(offset === 0 && r\.server_time\)/);
  assert.match(js, /serverCounterState\(r\.server_time, r\.server_duration, nowSec\) \|\| "—"/);

  /* El tick mantiene el mismo estado para las filas con hora propia. */
  assert.match(js, /counter\.td\.textContent = serverCounterState\(counter\.serverTime, counter\.serverDuration, nowSec\)/);
});

test("los datos de los cronogramas viven en el script unificado y no dependen de red", () => {
  const js = read("js/activities-daily.js");

  assert.doesNotMatch(js, /\bfetch\s*\(/);
  assert.doesNotMatch(js, /XMLHttpRequest/);
  assert.doesNotMatch(js, /var I18N\s*=\s*\{/);
  assert.doesNotMatch(js, /document\.title\s*=/);
  assert.doesNotMatch(js, /document\.documentElement\.lang\s*=/);
  assert.match(js, /window\.I18N/);
  assert.match(js, /T\.adHeaders/);

  /* Los datos obsoletos de db no se cargan ni se leen. */
  assert.doesNotMatch(js, /db\//);
  assert.doesNotMatch(js, /\.json/);
});

test("las variables de datos son la fuente de verdad y estan completas", () => {
  const js = read("js/activities-daily.js");

  const readArray = (name) => {
    const start = js.indexOf("var " + name + " = [");
    assert.notEqual(start, -1, name + " debe estar declarado");
    const end = js.indexOf("\n  ];", start);
    const body = js.slice(start + ("var " + name + " = ").length, end).replace(/,\s*$/, "");
    return JSON.parse(body + "]");
  };

  const activities = readArray("ACTIVITIES");
  const calendar = readArray("CALENDAR");
  const activityCode = readArray("ACTIVITY_CODE");
  const eventCode = readArray("EVENT_CODE");
  const phases = readArray("PHASES");
  const daily = readArray("DAILY");

  assert.equal(activities.length, 6);
  assert.equal(calendar.length, 42);
  assert.equal(activityCode.length, 43);
  assert.equal(eventCode.length, 8);
  assert.equal(phases.length, 7);
  assert.equal(daily.length, 71);

  /* Cada variable se declara una sola vez. */
  for (const name of ["ACTIVITIES", "CALENDAR", "ACTIVITY_CODE", "EVENT_CODE", "PHASES", "DAILY"]) {
    const found = js.match(new RegExp("var " + name + " =", "g")) || [];
    assert.equal(found.length, 1, name + " debe declararse una sola vez");
  }

  /* La columna de recurso existe en ACTIVITY_CODE. */
  assert.ok(activityCode.every((a) => "resource" in a));
  assert.ok(activityCode.some((a) => "resource" in a));
});

test("los datos de los cronogramas mantienen su integridad referencial", () => {
  const js = read("js/activities-daily.js");

  const readArray = (name) => {
    const start = js.indexOf("var " + name + " = [");
    assert.notEqual(start, -1, name + " debe estar declarado");
    const end = js.indexOf("\n  ];", start);
    const body = js.slice(start + ("var " + name + " = ").length, end).replace(/,\s*$/, "");
    return JSON.parse(body + "]");
  };

  const activities = readArray("ACTIVITIES");
  const calendar = readArray("CALENDAR");
  const activityCode = readArray("ACTIVITY_CODE");
  const eventCode = readArray("EVENT_CODE");
  const phases = readArray("PHASES");
  const daily = readArray("DAILY");

  const activityCodes = new Set(activities.map((a) => a.codebs));
  const codedActivities = new Set(activityCode.map((a) => a.code));
  const events = new Set(eventCode.map((e) => e.event));
  const phaseIds = new Set(phases.map((p) => p.phase));

  /* Cada slot del calendario apunta a una actividad existente. */
  for (const slot of calendar) {
    assert.ok(activityCodes.has(slot.codebs), "codet " + slot.codet + " debe existir en ACTIVITIES");
  }

  /* La vinculacion con Battle Survival solo usa codigos existentes. */
  for (const activity of activityCode) {
    assert.ok("codebs" in activity, activity.code + " debe declarar codebs");
    assert.ok(!activity.codebs || activityCodes.has(activity.codebs), activity.code + " debe usar un codebs valido");
  }

  /* Cada tarea diaria apunta a una actividad codificada y a un evento existente. */
  for (const row of daily) {
    assert.ok(codedActivities.has(row.code_task), "code_task " + row.code_task + " debe existir en ACTIVITY_CODE");
    assert.ok(events.has(row.event), "event " + row.event + " debe existir en EVENT_CODE");
  }

  /* Las fases usadas por el calendario diario existen en PHASES. */
  for (const row of daily) {
    if (!row.phase) continue;
    const normalized = row.phase.replace(/^PH/, "P");
    assert.ok(phaseIds.has(normalized), "fase " + row.phase + " debe existir en PHASES");
  }

  /* El calendario cubre los siete dias con seis slots por dia. */
  const perDay = {};
  for (const slot of calendar) perDay[slot.noday] = (perDay[slot.noday] || 0) + 1;
  assert.equal(Object.keys(perDay).length, 7);
  for (const day of Object.keys(perDay)) assert.equal(perDay[day], 6, "noday " + day + " debe tener 6 slots");

  /* Toda hora propia del servidor declara su duracion en formato hh:mm:ss. */
  const clock = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
  const serverRows = daily.filter((row) => row.server_time);
  assert.equal(serverRows.length, 9);
  for (const row of serverRows) {
    assert.match(row.server_time, clock, "server_time de " + row.code_task + " debe usar hh:mm:ss");
    assert.match(row.server_duration, clock, "server_duration de " + row.code_task + " debe usar hh:mm:ss");
    const [, , m, s] = clock.exec(row.server_duration);
    assert.ok(+m < 60 && +s < 60, "server_duration de " + row.code_task + " debe ser una hora valida");
  }
});

test("los horarios de los datos siguen expresados en UTC-2", () => {
  const js = read("js/activities-daily.js");
  assert.match(js, /var SRC_TO_UTC_MS = 2 \* 3600 \* 1000/);
});

test("el encabezado y las tablas del duelo de alianzas se traducen en todos los idiomas", () => {
  const html = read("pages/actividades-diarias.html");
  const i18n = read("js/i18n.js");

  assert.match(html, /id="textAD" data-i18n="scheduleAllianceDuel"/);
  assert.match(html, />Duelo de Alianzas<\/h3>/);

  const titles = i18n.match(/scheduleAllianceDuel:"[^"]+"/g) || [];
  const headers = i18n.match(/adHeaders:\[/g) || [];
  assert.equal(titles.length, 8);
  assert.equal(headers.length, 8);
  assert.match(i18n, /scheduleAllianceDuel:"Duelo de Alianzas"/);
  assert.match(i18n, /adHeaders:\["Contador", "", "Tarea", "", "Recurso", "Evento"\]/);

  /* La columna de fase se retiro de la tabla. */
  assert.doesNotMatch(i18n, /adHeaders:\[[^\]]*"Fase"/);
});

test("los encabezados del duelo de alianzas tienen seis columnas en los 8 idiomas", () => {
  const i18n = read("js/i18n.js");

  const blocks = i18n.split(/^  [a-z]{2}: \{/m).slice(1);
  assert.equal(blocks.length, 8);

  for (const block of blocks) {
    const match = block.match(/adHeaders:\[([^\]]*)\]/);
    assert.ok(match, "cada idioma debe declarar adHeaders");
    const values = match[1].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    assert.equal(values.length, 6, "adHeaders debe tener seis columnas");

    /* Contador, Tarea, Recurso y Evento llevan texto; las de imagen van vacias. */
    assert.notEqual(values[0], "");
    assert.equal(values[1], "");
    assert.notEqual(values[2], "");
    assert.equal(values[3], "");
    assert.notEqual(values[4], "");
    assert.notEqual(values[5], "");
  }
});

test("la tabla del duelo de alianzas usa seis columnas con iconos reservados", () => {
  const js = read("js/activities-daily.js");
  const css = read("css/activities-daily.css");

  /* Orden de las columnas: hora, icono, tarea, icono, recurso, evento. */
  assert.match(js, /appendCell\(tr, timeTxt, "ad-time"\)/);
  assert.match(js, /appendIconCell\(tr, "ad-task-icon", r\.code_task\)/);
  assert.match(js, /appendCell\(tr, a \? activityText\(r\.code_task, "objetive"\) : r\.code_task, "ad-obj"\)/);
  assert.match(js, /appendIconCell\(tr, "ad-resource-icon", r\.code_task\)/);
  assert.match(js, /appendCell\(tr, a \? activityText\(r\.code_task, "resource"\) : "", "ad-resource"\)/);
  assert.match(js, /appendCell\(tr, eventLabel\(r\), "ad-event"\)/);

  /* La columna de fase ya no se renderiza. */
  assert.doesNotMatch(js, /ad-phase/);
  assert.doesNotMatch(css, /\.ad-phase/);

  /* El recurso se toma de la traduccion con respaldo en los datos. */
  assert.match(js, /activityText\(r\.code_task, "resource"\)/);
});

test("las tablas del duelo de alianzas comparten ancho y anchos de columna", () => {
  const js = read("js/activities-daily.js");
  const css = read("css/activities-daily.css");

  /* Todas las tablas reciben el mismo colgroup. */
  assert.match(js, /var AD_COLUMNS = \[/);
  assert.match(js, /function buildColGroup\(\)/);
  assert.match(js, /table\.appendChild\(buildColGroup\(\)\)/);

  /* Anchos compartidos y ancho minimo comun. */
  assert.match(css, /\.ad-schedule \{[^}]*min-width:\s*760px/s);
  assert.match(css, /\.ad-schedule \{[^}]*table-layout:\s*fixed/s);
  assert.match(css, /\.ad-schedule \{[^}]*width:\s*100%/s);
  assert.match(css, /\.ad-col-time \{[^}]*width:\s*84px/s);
  assert.match(css, /\.ad-col-icon \{[^}]*width:\s*32px/s);
  assert.match(css, /\.ad-col-resource \{[^}]*width:\s*20%/s);
  assert.match(css, /\.ad-col-event \{[^}]*width:\s*170px/s);

  /* Las columnas de imagen conservan el tamaño definido manualmente. */
  assert.match(css, /\.ad-icon img \{[^}]*max-width:\s*64px/s);
  assert.match(css, /\.ad-icon img \{[^}]*height:\s*24px/s);
});

test("el duelo de alianzas ordena por evento y muestra iconos de tarea", () => {
  const js = read("js/activities-daily.js");
  const css = read("css/activities-daily.css");

  /* Orden alfabetico por el evento visible, estable dentro de cada grupo. */
  assert.match(js, /function sortRowsByEvent\(rows\)/);
  assert.match(js, /eventLabel\(a\.row\)\.localeCompare\(eventLabel\(b\.row\), LANG\)/);
  assert.match(js, /return cmp !== 0 \? cmp : a\.index - b\.index/);
  assert.match(js, /var rows = sortRowsByEvent\(byDay\[noday\] \|\| \[\]\)/);

  /* Separador de 2 px unicamente entre grupos de eventos. */
  assert.match(js, /rows\[i\]\.event !== nextRow\.event/);
  assert.match(js, /row\.className \+= " ad-event-separator"/);
  assert.match(css, /\.ad-schedule tbody tr\.ad-event-separator td \{[^}]*border-bottom:\s*2px solid #4d7799/s);

  /* La segunda columna carga el PNG indicado por ACTIVITY_CODE.icon. */
  assert.match(js, /activity && activity\.icon/);
  assert.match(js, /img\.src = "\.\.\/media\/glyph\/" \+ encodeURIComponent\(activity\.icon\) \+ "\.png"/);
  assert.match(js, /img\.addEventListener\("error", function \(\) \{/);
  assert.match(js, /img\.style\.display = "none"/);
});

test("los eventos de battle survival se traducen y los resaltados no dependen del idioma", () => {
  const js = read("js/activities-daily.js");
  const i18n = read("js/i18n.js");

  const blocks = i18n.split(/^  [a-z]{2}: \{/m).slice(1);
  assert.equal(blocks.length, 8);

  for (const block of blocks) {
    const match = block.match(/bsEvents:\{([^}]*)\}/);
    assert.ok(match, "cada idioma debe declarar bsEvents");
    const codes = [...match[1].matchAll(/([A-Z]+):"/g)].map((m) => m[1]);
    assert.deepEqual(codes, ["BUILD", "HEROE", "RAVEN", "SOLDIER", "TECH", "STANDBY"]);
  }

  /* El render usa la traduccion con el valor ingles como respaldo. */
  assert.match(js, /events\[c\.codebs\] \|\| actMap\[c\.codebs\]\.event/);
  assert.match(js, /T\.bsEvents/);

  /* Los resaltados dependen del codigo y no del texto traducido. */
  assert.match(js, /hlSpecial: c\.codebs === "SOLDIER"/);
  assert.match(js, /hlTrack: c\.codebs === "RAVEN" \|\| c\.codebs === "HEROE"/);
  assert.doesNotMatch(js, /indexOf\("soldiers"\)/);
  assert.doesNotMatch(js, /indexOf\("raven"\)/);
});

test("los estilos manuales del titulo del duelo de alianzas se conservan", () => {
  const css = read("css/activities-daily.css");

  /* Valores definidos manualmente por el usuario. */
  assert.match(css, /\.ad-item-title \{[^}]*font-size:\s*1\.2rem/s);
  assert.match(css, /\.ad-item-title \{[^}]*color:\s*#4d7799/s);
  assert.match(css, /\.ad-item-title \{[^}]*border:\s*2px solid #4d7799/s);
  assert.match(css, /\.ad-item-title \{[^}]*border-radius:\s*3px/s);
  assert.match(css, /\.ad-item-title \{[^}]*background:\s*#9b9b9b36/s);
  assert.match(css, /\.ad-item-title \{[^}]*padding:\s*2px 10px 2px 10px/s);
  assert.match(css, /\.ad-item-title \{[^}]*box-shadow:\s*0 3px 5px rgba\(8, 47, 58, \.9\)/s);
  assert.match(css, /\.ad-item\.ad-today \.ad-item-title \{[^}]*background:\s*#009922/s);
  assert.match(css, /\.ad-item\.ad-today \.ad-item-title \{[^}]*border:\s*2px solid #009922/s);
});

test("el texto introductorio de actividades diarias explica el contenido de la pagina", () => {
  const i18n = read("js/i18n.js");
  const matches = i18n.match(/pageDailyLead:"[^"]+"/g) || [];
  assert.equal(matches.length, 8);
  assert.match(i18n, /pageDailyLead:"Detalles de las actividades diarias que te ayudaran a mejorar diariamente\."/);
});

test("el calendario no altera el titulo ni el idioma de la pagina", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/activities-daily.js");
  assert.doesNotMatch(html, /document\.title\s*=/);
  assert.doesNotMatch(html, /document\.documentElement\.lang\s*=/);
  assert.doesNotMatch(js, /document\.title\s*=/);
  assert.doesNotMatch(js, /document\.documentElement\.lang\s*=/);
  assert.match(html, /<title>Actividades Diarias – UXM<\/title>/);
});

test("los dos cronogramas comparten un unico temporizador", () => {
  const js = read("js/activities-daily.js");
  const intervals = js.match(/setInterval\s*\(/g) || [];
  assert.equal(intervals.length, 1, "debe existir un solo setInterval");
  assert.match(js, /function initBattleSurvival\(\)/);
  assert.match(js, /function initAllianceDuel\(\)/);
});

test("el autor de la arenga se muestra en cursiva, a la derecha y en gris", () => {
  const css = read("css/style.css");
  assert.match(css, /\.ha-author\s*\{[^}]*font-style:\s*italic/s);
  assert.match(css, /\.ha-author\s*\{[^}]*color:\s*#7c7c7c/s);
  assert.match(css, /\.ha-author\s*\{[^}]*text-align:\s*right/s);
  assert.match(css, /\.ha-author::after\s*\{[^}]*content:\s*""/s);
  assert.match(css, /\.ha-author::after\s*\{[^}]*border-bottom:\s*1px solid #7c7c7c/s);
});

test("la arenga conserva los saltos de línea de la traducción", () => {
  const css = read("css/style.css");
  assert.match(css, /\.message-arenga p\s*\{[^}]*white-space:\s*pre-line/s);
});

test("se eliminó join y el mouse apunta a la sección informativa", () => {
  const html = read("index.html");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.doesNotMatch(html, /id="join"/);
  assert.doesNotMatch(js, /setText\("join"/);
  assert.doesNotMatch(i18n, /\bjoin:/);
  assert.match(html, /id="heroScrollCue"[^>]*href="#infoTitle"/);
  assert.match(read("css/style.css"), /#infoTitle\s*\{[^}]*scroll-margin-top/s);
});

test("el divisor escarlata ocupa todo el ancho disponible", () => {
  const css = read("css/style.css");
  assert.match(css, /\.line-divisor-scarlet,\s*\.line-divisor-grey\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.line-divisor-scarlet\s*\{[^}]*border-top:\s*3px solid var\(--scarlet\)/s);
  assert.match(css, /\.line-divisor-scarlet\s*\{[^}]*margin:[^;]*auto/s);
});

test("el menú lateral incluye un selector de idioma independiente al final", () => {
  const html = read("index.html");
  const js = read("js/app.js");
  const css = read("css/style.css");
  assert.match(html, /id="sideLangs"/);
  assert.match(js, /prefix \+ "LangToggle"/);
  assert.match(js, /prefix \+ "LangLabel"/);
  assert.match(js, /buildLangSelector\(sideLangsBox, "side", "top-start"\)/);
  assert.match(css, /\.nav-panel\s*\{[^}]*display:\s*flex/s);
  assert.match(css, /\.side-langs\s*\{[^}]*margin-top:\s*auto/s);
});

test("la navbar es fija y usa el acento caliente en la portada", () => {
  const css = read("css/style.css");
  assert.match(css, /\.topbar\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.topbar\s*\{[^}]*top:\s*0/s);
  assert.match(css, /\.nav-toggle-bars i\s*\{[^}]*background:\s*#ccc/s);
  assert.match(css, /\.home-topbar\s+\.nav-toggle-bars i\s*\{[^}]*background:\s*var\(--hot\)/s);
  assert.match(css, /\.home-topbar\s+\.topbar-brand\s*\{[^}]*color:\s*var\(--hot\)/s);
});

test("el borde del boton de menu lo recorre un punto escarlata que se apaga", () => {
  const css = read("css/style.css");

  /* El punto se dibuja con un pseudoelemento, sin depender del HTML. */
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*content:\s*""/s);
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*border-radius:\s*50%/s);
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*background:\s*var\(--hot\)/s);
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*opacity:\s*0/s);
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*animation:\s*uxm-nav-border-dot\s+30s/s);
  assert.match(css, /@keyframes\s+uxm-nav-border-dot/);

  /* El recorrido apaga el punto al final del ciclo. */
  const keyframes = css.match(/@keyframes\s+uxm-nav-border-dot\s*\{([\s\S]*?)\n\}/);
  assert.ok(keyframes, "debe existir la animacion del punto");
  assert.match(keyframes[1], /opacity:\s*0/);
  assert.match(keyframes[1], /opacity:\s*1/);
  assert.match(keyframes[1], /left:\s*calc\(100% \+ 2px\)/);
  assert.match(keyframes[1], /top:\s*calc\(100% \+ 2px\)/);

  /* Las barras ya no se desplazan: solo se mantiene el alargamiento de la tercera. */
  assert.doesNotMatch(css, /@keyframes\s+uxm-nav-line-one/);
  assert.doesNotMatch(css, /@keyframes\s+uxm-nav-line-two/);
  assert.doesNotMatch(css, /translateX\(20px\)/);
  assert.doesNotMatch(css, /translateX\(10px\)/);

  /* Con el menu abierto el punto se oculta. */
  assert.match(css, /\.nav-open\s+\.nav-toggle::after\s*\{[^}]*animation:\s*none/s);
  assert.match(css, /\.nav-open\s+\.nav-toggle::after\s*\{[^}]*opacity:\s*0/s);

  /* Con movimiento reducido el punto no se anima. */
  const reducedMotion = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(reducedMotion, "debe existir el bloque de movimiento reducido");
  assert.match(reducedMotion[1], /\.nav-toggle::after/);
  assert.match(reducedMotion[1], /animation:\s*none/);
});

test("el texto UXM, las barras y el punto comparten color y sombra", () => {
  const css = read("css/style.css");

  /* La sombra se declara una sola vez como variable compartida. */
  assert.match(css, /--nav-uxm-shadow:\s*0 1px 3px rgba\(8,\s*47,\s*58,\s*\.65\)/);
  assert.match(css, /\.home-topbar\s*\{[^}]*--nav-uxm-shadow:\s*0 1px 3px rgba\(8,\s*47,\s*58,\s*\.9\)/s);

  /* El texto UXM, las barras y el punto la consumen. */
  assert.match(css, /\.topbar-brand\s*\{[^}]*text-shadow:\s*var\(--nav-uxm-shadow\)/s);
  assert.match(css, /\.nav-toggle-bars i\s*\{[^}]*box-shadow:\s*var\(--nav-uxm-shadow\)/s);
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*box-shadow:\s*var\(--nav-uxm-shadow\)/s);

  /* El punto comparte el rojo de UXM en la portada. */
  assert.match(css, /\.home-topbar\s+\.topbar-brand\s*\{[^}]*color:\s*var\(--hot\)/s);
  assert.match(css, /\.nav-toggle::after\s*\{[^}]*background:\s*var\(--hot\)/s);

  /* No queda ninguna sombra literal duplicada en esos tres elementos. */
  assert.doesNotMatch(css, /\.nav-toggle::after\s*\{[^}]*rgba\(255,\s*36,\s*0/s);
});

test("el menú lateral incluye el enlace localizado de inicio", () => {
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.match(js, /navHome/);
  assert.match(js, /basePath\(\)\s*\+\s*"index\.html"/);
  assert.match(i18n, /navHome:"Inicio"/);
  assert.ok((i18n.match(/navHome:/g) || []).length >= 8);
});

test("la portada incluye un mouse animado que enlaza al contenido", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.match(html, /hero-scroll-cue/);
  assert.match(html, /href="#infoTitle"/);
  assert.match(css, /\.hero-scroll-cue/);
  assert.match(css, /@keyframes\s+uxm-scroll-wheel/);
  assert.match(js, /heroScrollCue.*setAttribute\("aria-label",\s*T\.scrollCue\)/);
  assert.ok((i18n.match(/scrollCue:/g) || []).length >= 8);
});

test("el menú lateral nunca supera 400px y la tercera línea alcanza el borde menos 10px", () => {
  const css = read("css/style.css");
  assert.match(css, /\.nav-panel\s*\{[\s\S]*?max-width:\s*400px/);
  assert.doesNotMatch(css, /\.nav-panel\s*\{[\s\S]*?min-width:\s*400px/);
  assert.match(css, /\.nav-open\s+\.nav-toggle-bars\s+i:nth-child\(3\)/);
  assert.match(css, /--nav-toggle-line-end:\s*calc\(var\(--nav-panel-width\) - var\(--nav-toggle-line-origin\) - 10px\)/);
});

test("la hamburguesa usa el acento caliente en la portada y cambia a escarlata al abrir el menú", () => {
  const css = read("css/style.css");
  assert.match(css, /\.home-topbar\s+\.nav-toggle-bars i\s*\{[^}]*background:\s*var\(--hot\)/s);
  assert.match(css, /\.nav-open\s+\.nav-toggle-bars i\s*\{[^}]*background:\s*var\(--scarlet\)/s);
});

test("los enlaces del menú se rellenan de escarlata al recibir hover o foco", () => {
  const css = read("css/style.css");
  assert.match(css, /\.nav-list a\s*\{[^}]*background-image:\s*linear-gradient/s);
  assert.match(css, /\.nav-list a:hover,\s*\.nav-list a:focus-visible\s*\{[^}]*background-size:\s*100% 100%/s);
  assert.match(css, /\.nav-list a:hover,\s*\.nav-list a:focus-visible\s*\{[^}]*color:\s*#fff/s);
  assert.match(css, /\.nav-list a\.active:hover,\s*\.nav-list a\.active:focus-visible\s*\{[^}]*color:\s*#fff/s);
});

test("la portada distingue el hero y la marca con clases específicas", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  assert.match(html, /<body class="home-page">/);
  assert.match(html, /<nav class="navbar topbar home-topbar"[^>]*>/);
  assert.match(css, /\.home-topbar\s+\.topbar-brand\s*\{[^}]*color:\s*var\(--hot\)/s);
  assert.match(css, /\.hero-video\s*\{[^}]*min-height:\s*90vh/s);
  assert.match(css, /\.hero-video\s*\{[^}]*min-height:\s*90dvh/s);
});

test("el menú lateral usa fondo negro translúcido y texto blanco", () => {
  const css = read("css/style.css");
  assert.match(css, /\.nav-panel\s*\{[^}]*background:\s*rgba\(0,\s*0,\s*0,\s*\.72\)/s);
  assert.match(css, /\.nav-list a\s*\{[^}]*color:\s*#fff/s);
  assert.match(css, /\.nav-list\s+\.nav-item\s*\{[^}]*width:\s*100%/s);
});

test("el título y el tag del hero usan sombras de relieve", () => {
  const css = read("css/style.css");
  assert.match(css, /\.hero-video\s+\.hero-title\s*\{[^}]*text-shadow:[^}]*0 12px 30px/s);
  assert.match(css, /\.hero-title-accent,\s*\.subpage-title-accent\s*\{[^}]*text-shadow:[^}]*rgba\(122,\s*17,\s*0/s);
  assert.match(css, /\.hero-video\s+\.tag,\s*\.subpage\s+\.tag\s*\{[^}]*text-shadow:[^}]*;/s);
});

test("las iniciales del hero se alinean arriba, crecen y usan los colores solicitados", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  assert.match(html, /hero-title-word/);
  assert.match(html, /hero-title-initial/);
  assert.match(html, /hero-title-accent/);
  assert.match(css, /\.hero-title-word\s*\{[^}]*align-items:\s*flex-start/s);
  assert.match(css, /\.hero-title-initial,\s*\.subpage-title-initial\s*\{[^}]*font-size:\s*1\.12em/s);
  assert.match(css, /\.hero-title-accent,\s*\.subpage-title-accent\s*\{[^}]*color:\s*var\(--scarlet\)/s);
  assert.match(css, /\.hero-video\s+\.hero-title\s*\{[^}]*color:\s*#313131/s);
});

test("el hero usa fuente de piedra, sombra profunda y no tiene subrayado", () => {
  const css = read("css/style.css");
  assert.match(css, /font-family:\s*"Cinzel"/);
  assert.match(css, /text-shadow:[^;]*;/);
  assert.doesNotMatch(css, /\.hero-video\s+\.hero-title\s*\{[^}]*border-bottom/s);
  assert.match(css, /@keyframes\s+uxm-title-float/);
});

test("el selector de idioma declara un fondo claro explícito", () => {
  const css = read("css/style.css");
  assert.match(css, /\.lang-menu\s*\{[^}]*background-color:\s*#fff/s);
  assert.match(css, /\.langs\s*\{[^}]*color-scheme:\s*light/s);
});

test("todas las traducciones usan el copyright corporativo solicitado", () => {
  const i18n = read("js/i18n.js");
  const matches = i18n.match(/copyright:"[^"]+"/g) || [];
  assert.ok(matches.length >= 8);
  for (const value of matches) {
    assert.equal(value, 'copyright:"© 2026 UXM – Under Xtreme Madness Alliance"');
  }
});

test("las secciones de portada traducidas están conectadas en todos los idiomas", () => {
  const html = read("index.html");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");

  for (const id of ["arengaTitle", "arengaMessage", "tutoTitle", "allianceTitle", "allianceMessage"]) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(js, new RegExp(`setText\\("${id}", T\\.${id}\\)`));
    assert.ok((i18n.match(new RegExp(`\\b${id}:"`, "g")) || []).length === 8);
  }

  assert.match(i18n, /arengaMessage:"Bajo las llamas más aplastantes,/);
  assert.match(i18n, /allianceMessage:"Conoce nuestra Alianza, buscamos ayudar a todos del reino 277/);
  assert.equal((i18n.match(/allianceMessage:""/g) || []).length, 0);
});

test("el bloque de bonos de la alianza se genera desde los datos y se localiza en los 8 idiomas", () => {
  const html = read("index.html");
  const js = read("js/app.js");
  const css = read("css/style.css");
  const i18n = read("js/i18n.js");
  const data = read("js/alliance-bonuses.js");

  const bonusIds = [
    "bonusAlliance",
    "bonusFastBuild",
    "bonusResearchSpeedup",
    "bonusCraftingSpeedup",
    "bonusFastTraining",
    "bonusRallyStats",
    "bonusShardExchange"
  ];

  assert.match(html, /<div class="bonus-alliance left-content">/);
  assert.match(html, /<table class="info-data">\s*<tbody id="allianceBonusBody"><\/tbody>\s*<\/table>/s);
  assert.match(html, /<script src="js\/alliance-bonuses\.js"><\/script>/);

  /* Los datos viven en su propio archivo y no se duplican en el HTML. */
  assert.match(data, /window\.ALLIANCE_BONUSES = \[/);
  assert.doesNotMatch(html, /id="bonusFastBuild"/);
  assert.doesNotMatch(html, /id="bonusResearchSpeedup"/);

  for (const id of bonusIds) {
    if (id !== "bonusAlliance") {
      assert.match(data, new RegExp(`"key": "${id}"`));
      assert.ok((i18n.match(new RegExp(`\\b${id}:"`, "g")) || []).length === 8);
    }
  }
  assert.match(js, /setText\("bonusAlliance", T\.bonusAlliance\)/);
  assert.match(js, /name\.id = bonus\.key/);

  assert.match(i18n, /bonusAlliance:"Bonos Tecnología de la Alianza"/);
  assert.match(i18n, /bonusInProgress:"En curso"/);
  assert.equal((i18n.match(/\bbonusInProgress:"/g) || []).length, 8);

  /* El estado "en curso" se localiza mediante el atributo data-progress. */
  assert.match(js, /name\.className = "in-progress"/);
  assert.match(js, /name\.setAttribute\("data-progress", T\.bonusInProgress\)/);
  assert.match(css, /\.in-progress::after\s*\{[^}]*content:\s*"\s*\(" attr\(data-progress\) "\)"/s);

  /* La estrella es decorativa y las claves repetidas se descartan. */
  assert.match(js, /icon\.setAttribute\("scope", "row"\)/);
  assert.match(js, /icon\.setAttribute\("aria-hidden", "true"\)/);
  assert.match(js, /seen\[bonus\.key\]/);
});

test("la portada no conserva el bloque de bonos legado", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");

  assert.doesNotMatch(html, /class="home-body"/);
  assert.doesNotMatch(html, /class="bonus-block"/);
  assert.doesNotMatch(html, /id="bonusTitle"/);
  assert.doesNotMatch(html, /id="bonuses"/);
  assert.doesNotMatch(css, /\.home-body/);
  assert.doesNotMatch(css, /\.bonus-block/);
  assert.doesNotMatch(css, /\.bonuses/);
  assert.doesNotMatch(js, /\bBONUSES\b/);
  assert.doesNotMatch(js, /bonusTitle/);
  assert.doesNotMatch(i18n, /\bbonuses:/);
});

test("el video declara poster, reproducción automática silenciada y fallback", () => {
  const html = read("index.html");
  const js = read("js/app.js");
  assert.match(html, /<video[^>]*autoplay[^>]*muted[^>]*loop[^>]*playsinline/);
  assert.match(html, /poster="media\/video-particles-cyan-poster\.jpg"/);
  assert.match(js, /\.play\(\)/);
  assert.match(js, /\.catch\(/);
  assert.ok(fs.existsSync(path.join(root, "media/video-particles-cyan-poster.jpg")));
});

/* ---------- Introducciones de subpágina ---------- */

test("las introducciones de subpágina anuncian el contenido real de cada página", () => {
  const i18n = read("js/i18n.js");

  const leads = {
    pageRulesLead: "¡Código de conducta de nuestra alianza para trabajar unidos!",
    pageTutorialsLead: "¡Tu mejor guía visual para sobrevivir en el juego y dar pelea!",
    pageStrategyLead: "Instrucciones tácticas que te ayudarán en los eventos y en tu proyección de crecimiento de héroes.",
    pageContactLead: "Escríbenos para compartir tu opinión o informarnos sobre saqueos, y comparte nuestro canal de YouTube @VincentDantesGrey."
  };

  for (const [key, text] of Object.entries(leads)) {
    /* Las traducciones pueden contener comillas, así que se cuenta la clave
       por su declaración y no por el cierre de la cadena. Sin \b porque no
       funciona con caracteres CJK. */
    const found = i18n.match(new RegExp(`${key}:"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
    assert.ok(
      i18n.includes(`${key}:"${text}"`),
      key + " debe conservar el texto español vigente"
    );
  }

  /* Las introducciones ya no son marcadores de contenido pendiente. */
  assert.doesNotMatch(i18n, /pageRulesLead:"Próximamente/);
  assert.doesNotMatch(i18n, /pageTutorialsLead:"Próximamente/);
  assert.doesNotMatch(i18n, /pageStrategyLead:"Próximamente/);
  assert.doesNotMatch(i18n, /pageContactLead:"Escríbenos por el canal/);
});

/* ---------- Normas UXM ---------- */

test("los encabezados de las normas se traducen con claves propias", () => {
  const html = read("pages/normas-uxm.html");
  const i18n = read("js/i18n.js");

  assert.match(html, /id="rulesKingdom" data-i18n="rulesKingdomTitle"/);
  assert.match(html, /id="rulesAlliance" data-i18n="rulesAllianceTitle"/);
  assert.match(html, /id="accendingAlliance" data-i18n="rulesPositionsTitle"/);

  for (const key of ["rulesKingdomTitle", "rulesAllianceTitle", "rulesPositionsTitle"]) {
    const found = i18n.match(new RegExp(`${key}:"[^"]+"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }

  assert.match(i18n, /rulesKingdomTitle:"Normas del Reino 277"/);
  assert.match(i18n, /rulesAllianceTitle:"Normas de la Alianza"/);
  assert.match(i18n, /rulesPositionsTitle:"Posiciones y Roles"/);
});

test("cada bloque de las normas declara su clave de traducción", () => {
  const html = read("pages/normas-uxm.html");

  assert.match(html, /<div class="kingdom-content">[\s\S]*?data-i18n-text="rulesKingdomK1"[\s\S]*?data-i18n-text="rulesKingdomK2"/);
  assert.match(html, /<div class="alliance-content">[\s\S]*?data-i18n-text="rulesAllianceA1"[\s\S]*?data-i18n-text="rulesAllianceA11"/);
  assert.match(html, /<div class="positions-content">[\s\S]*?data-i18n-text="rulesPositionR1"[\s\S]*?data-i18n-text="rulesRoleWarGodText"/);

  /* El mensaje de ayuda del bloque de la alianza también se traduce. */
  assert.match(html, /data-i18n-text="rulesAllianceHelp"/);
});

test("las reglas de la alianza se numeran de A1 a A11 sin repeticiones", () => {
  const html = read("pages/normas-uxm.html");

  const labels = [...html.matchAll(/<dt>(A\d+)\.<\/dt>/g)].map((m) => m[1]);
  const expected = Array.from({ length: 11 }, (_, i) => `A${i + 1}`);

  assert.deepEqual(labels, expected);
  assert.equal(new Set(labels).size, labels.length);
});

test("las reglas con enlaces se localizan con data-i18n-html y conservan sus enlaces", () => {
  const html = read("pages/normas-uxm.html");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");

  const richKeys = ["rulesAllianceA4", "rulesAllianceA5", "rulesAllianceA6", "rulesAllianceA9"];

  for (const key of richKeys) {
    assert.match(html, new RegExp(`data-i18n-html="${key}"`));
    const found = i18n.match(new RegExp(`${key}:"[^"]*"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }

  /* El motor de traduccion reconoce el contenido con marcado. */
  assert.match(js, /function applyRichTexts\(\)/);
  assert.match(js, /querySelectorAll\("\[data-i18n-html\]"\)/);
  assert.match(js, /applyRichTexts\(\);/);

  /* Las URL de los enlaces no cambian con el idioma. */
  assert.match(html, /href="https:\/\/youtube\.com\/shorts\/gq-YtFJryok"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/shorts\/0InXLpMJIvg"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=wWOcYrf1R9c"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=dSniK89OYKk"/);
  assert.match(html, /class="link-info"/);

  /* El enlace interno a los tutoriales es relativo, para GitHub Pages. */
  assert.match(html, /data-i18n-html="rulesAllianceA9"[\s\S]*?href="video-tutoriales\.html"/);
  assert.doesNotMatch(html, /href="\/pages\/video-tutoriales\.html"/);
});

test("las reglas y los roles se localizan en los 8 idiomas", () => {
  const i18n = read("js/i18n.js");

  const keys = [
    "rulesKingdomK1", "rulesKingdomK2",
    "rulesAllianceA1", "rulesAllianceA2", "rulesAllianceA3", "rulesAllianceA4",
    "rulesAllianceA5", "rulesAllianceA6", "rulesAllianceA7", "rulesAllianceA8",
    "rulesAllianceA9", "rulesAllianceA10", "rulesAllianceA11", "rulesAllianceHelp",
    "rulesPositionR1", "rulesPositionR2", "rulesPositionR3", "rulesPositionR4", "rulesPositionR5",
    "rulesRoleDiplomat", "rulesRoleDiplomatText",
    "rulesRoleGoddess", "rulesRoleGoddessText",
    "rulesRoleRecruiter", "rulesRoleRecruiterText",
    "rulesRoleWarGod", "rulesRoleWarGodText"
  ];

  for (const key of keys) {
    const found = i18n.match(new RegExp(`\\b${key}:"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }
});

/* ---------- Formulario de contacto ---------- */

test("la página de contacto incrusta el formulario y ofrece el enlace alternativo", () => {
  const html = read("pages/contacto.html");
  const i18n = read("js/i18n.js");

  assert.match(html, /<h3 class="sibtitle-info" id="contactForm" data-i18n="contactFormTitle">/);
  assert.match(html, /<div class="form-content">[\s\S]*?<iframe class="form-frame"[\s\S]*?<\/div>/);

  /* El formulario incrustado usa la vista embebible de Google Forms. */
  assert.match(html, /src="https:\/\/docs\.google\.com\/forms\/d\/e\/[^"]+\/viewform\?embedded=true"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /data-i18n-title="contactFormFrameTitle"/);
  assert.match(html, /title="Formulario de contacto de UXM"/);

  /* El enlace alternativo apunta al formulario corto y es seguro. */
  assert.match(html, /href="https:\/\/forms\.gle\/hMnvZXTBjM81mPsL9"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);

  for (const key of ["contactFormTitle", "contactFormOpen", "contactFormFrameTitle"]) {
    const found = i18n.match(new RegExp(`${key}:"[^"]+"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }
});

test("el iframe del formulario se adapta al ancho de la pagina", () => {
  const css = read("css/style.css");

  assert.match(css, /\.form-content\s*\{[^}]*display:\s*flex/s);
  assert.match(css, /\.form-embed\s*\{[^}]*max-width:\s*760px/s);
  assert.match(css, /\.form-frame\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.form-frame\s*\{[^}]*border:\s*0/s);
  assert.match(css, /\.form-fallback\s*\{[^}]*text-align:\s*center/s);
});

test("el titulo accesible del iframe se localiza con data-i18n-title", () => {
  const js = read("js/app.js");

  assert.match(js, /function applyTitles\(\)/);
  assert.match(js, /querySelectorAll\("\[data-i18n-title\]"\)/);
  assert.match(js, /setAttribute\("title", title\)/);
  assert.match(js, /applyTitles\(\);/);
});

/* ---------- Traducciones de la portada ---------- */

test("los textos de tutoriales y estrategia de la portada se traducen en los 8 idiomas", () => {
  const html = read("index.html");
  const i18n = read("js/i18n.js");

  /* Los parrafos usan data-i18n-text y el subtitulo data-i18n. */
  assert.match(html, /<p id="tutorialsMessage" data-i18n-text="tutorialsMessage">/);
  assert.match(html, /<p id="strategyMessage" data-i18n-text="strategyMessage">/);
  assert.match(html, /<h2 class="sibtitle-info" id="strategyTitle" data-i18n="strategyTitle">/);

  for (const key of ["tutorialsMessage", "strategyTitle", "strategyMessage"]) {
    const found = i18n.match(new RegExp(`\\b${key}:"[^"]+"`, "g")) || [];
    assert.equal(found.length, 8, key + " debe existir en los 8 idiomas");
  }

  /* El texto español conserva la redaccion manual de index.html. */
  assert.match(i18n, /tutorialsMessage:"Videos de guia y ayuda, para los nuevos integrantes al juego/);
  assert.match(i18n, /strategyTitle:"Biblioteca Estratégica"/);
  assert.match(i18n, /strategyMessage:"Buscaremos distintas formas de ayudar/);
});

/* ---------- Traducciones de actividades, fases y eventos ---------- */

test("las actividades, fases y eventos del duelo de alianzas se traducen en los 8 idiomas", () => {
  const js = read("js/activities-daily.js");
  const i18n = read("js/i18n.js");

  const blocks = i18n.split(/^  [a-z]{2}: \{/m).slice(1);
  assert.equal(blocks.length, 8);

  /* El codigo de cada actividad debe estar en el mapa de los 8 idiomas. */
  const activityCode = [...js.matchAll(/"code": "([A-Z0-9]+)"/g)].map((m) => m[1]);
  assert.equal(activityCode.length, 43);

  for (const block of blocks) {
    const activities = block.match(/adActivities:\{([\s\S]*?)\n\s{8}adPhases:/);
    assert.ok(activities, "cada idioma debe declarar adActivities");

    for (const code of activityCode) {
      assert.match(activities[1], new RegExp(`\\b${code}:\\{objetive:"[^"]*",resource:"[^"]*"\\}`),
        code + " debe declararse con objetivo y recurso");
    }

    const phases = block.match(/adPhases:\{([^}]*)\}/);
    assert.ok(phases, "cada idioma debe declarar adPhases");
    for (const phase of ["P00", "P01", "P02", "P03", "P04", "P05", "P06"]) {
      assert.match(phases[1], new RegExp(`\\b${phase}:"[^"]+"`), phase + " debe estar traducido");
    }

    const events = block.match(/adEvents:\{([^}]*)\}/);
    assert.ok(events, "cada idioma debe declarar adEvents");
    for (const event of ["DY", "AD", "KVK", "ROY", "BS", "EQ", "BEX", "CUM"]) {
      assert.match(events[1], new RegExp(`\\b${event}:"[^"]+"`), event + " debe estar traducido");
    }
  }
});

test("el render del duelo de alianzas usa las traducciones con respaldo en los datos", () => {
  const js = read("js/activities-daily.js");

  /* El ingles actua como respaldo antes de recurrir al dato original. */
  assert.match(js, /var T_EN = window\.I18N\[FALLBACK_LANG\] \|\| T/);
  assert.match(js, /function activityText\(code, field\)/);
  assert.match(js, /function phaseText\(phase\)/);
  assert.match(js, /T\.adActivities && T\.adActivities\[code\]/);
  assert.match(js, /T_EN\.adActivities && T_EN\.adActivities\[code\]/);
  assert.match(js, /T\.adPhases && T\.adPhases\[phase\]/);
  assert.match(js, /T\.adEvents && T\.adEvents\[r\.event\]/);

  /* Los codigos y los datos de origen no se traducen. */
  assert.match(js, /actMap\[a\.code\] = a/);
  assert.match(js, /activity\.icon/);
});

test("las fases y los eventos se muestran traducidos en el duelo de alianzas", () => {
  const js = read("js/activities-daily.js");

  assert.match(js, /return ph \? phaseText\(ph\) : NO_PHASE_TITLE/);
  assert.match(js, /var localized = T\.adEvents && T\.adEvents\[r\.event\]/);
  assert.match(js, /phase\.textContent = phaseTitle\(noday\)/);
});

/* ---------- Aviso de cierre inminente ---------- */

test("el contador de la proxima actividad se avisa cuando falta una hora o menos", () => {
  const js = read("js/activities-daily.js");
  const css = read("css/activities-daily.css");

  /* La ventana de aviso es de una hora. */
  assert.match(js, /var ALERT_WINDOW_SEC = 3600/);

  /* El contador de la proxima actividad se resalta siempre, con independencia
     del evento asignado, y es el unico que genera el aviso. */
  assert.match(js, /var counterSpecial = rel === 1 \|\| \(rel > 0 && slot\.hlSpecial\)/);
  assert.match(js, /"bs-counter" \+ \(counterSpecial \? " bs-hl-special" : ""\)/);
  assert.match(js, /alert: rel === 1/);

  /* La alerta no depende del evento ni del cierre de dia. */
  assert.doesNotMatch(js, /alert: rel === 1 && slot\.dayEnd/);
  assert.doesNotMatch(js, /alert: rel === 1 && slot\.hlSpecial/);

  /* La clase se alterna sobre la fila, dentro de la ventana y sin anadir texto. */
  assert.match(js, /c\.tr\.classList\.toggle\("bs-imminent", !!c\.alert && remaining > 0 && remaining <= ALERT_WINDOW_SEC\)/);
  assert.doesNotMatch(js, /bs-imminent[^;]*textContent\s*=/);

  /* El estilo se aplica al contador, al estado y al evento de esa fila. */
  const aviso = css.match(/\.bs-schedule tbody tr\.bs-next\.bs-row-third\.bs-imminent > td\.[^{]*\{([^}]*)\}/);
  assert.ok(aviso, "debe existir la regla del aviso sobre la fila");
  assert.match(css, /\.bs-schedule tbody tr\.bs-next\.bs-row-third\.bs-imminent > td\.bs-counter,/);
  assert.match(css, /\.bs-schedule tbody tr\.bs-next\.bs-row-third\.bs-imminent > td\.bs-status,/);
  assert.match(css, /\.bs-schedule tbody tr\.bs-next\.bs-row-third\.bs-imminent > td\.bs-event\s*\{/);
  assert.match(aviso[1], /color:\s*#ffee00/);
  assert.match(aviso[1], /background-color:\s*var\(--scarlet\)/);

  /* Las celdas de actividades y servidor quedan fuera del aviso. */
  assert.doesNotMatch(css, /bs-imminent > td\.bs-activities/);
  assert.doesNotMatch(css, /bs-imminent > td\.bs-server/);

  /* El fondo varia suavemente entre escarlata y escarlata oscuro. */
  const keyframes = css.match(/@keyframes\s+uxm-bs-counter-alert\s*\{([\s\S]*?)\n\}/);
  assert.ok(keyframes, "debe existir la animacion del aviso");
  assert.match(keyframes[1], /var\(--scarlet\)/);
  assert.match(keyframes[1], /50%\s*\{\s*background-color:\s*#8f1200/);

  /* Con movimiento reducido el fondo queda fijo. */
  const reducedMotion = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(reducedMotion, "debe existir el bloque de movimiento reducido");
  assert.match(reducedMotion[1], /bs-imminent/);
  assert.match(reducedMotion[1], /animation:\s*none/);
});

/* ---------- Comportamiento dinamico del aviso ---------- */

/* Minimal DOM para ejecutar js/activities-daily.js en un instante concreto.
   className y classList se mantienen sincronizados, como en el navegador. */
function renderBattleSurvival(nowMs) {
  const vm = require("node:vm");

  const makeEl = (tag) => {
    const el = {
      tagName: (tag || "").toUpperCase(),
      children: [],
      _cls: new Set(),
      _text: "",
      style: {},
      attributes: {},
      hidden: false,
      classList: {
        add(c) { el._cls.add(c); },
        remove(c) { el._cls.delete(c); },
        contains(c) { return el._cls.has(c); },
        toggle(c, on) {
          if (on === undefined) {
            if (el._cls.has(c)) el._cls.delete(c); else el._cls.add(c);
          } else if (on) el._cls.add(c); else el._cls.delete(c);
        }
      },
      setAttribute(k, v) { el.attributes[k] = v; },
      getAttribute(k) { return el.attributes[k]; },
      appendChild(c) { el.children.push(c); return c; },
      addEventListener() {}
    };
    Object.defineProperty(el, "className", {
      get() { return [...el._cls].join(" "); },
      set(v) { el._cls = new Set(String(v).split(/\s+/).filter(Boolean)); }
    });
    Object.defineProperty(el, "textContent", {
      get() { return el._text; },
      set(v) { el._text = String(v); }
    });
    Object.defineProperty(el, "offsetWidth", { get() { return 100; } });
    return el;
  };

  const byId = {};
  const doc = {
    documentElement: { getAttribute() { return "es"; }, setAttribute() {}, lang: "" },
    createElement: makeEl,
    getElementById(id) { return byId[id] || null; },
    addEventListener() {}
  };
  byId["bs-body"] = makeEl("tbody");
  byId["bs-tzinfo"] = makeEl("div");
  byId["ad-lists"] = makeEl("div");

  const RealDate = Date;
  const ctx = {
    document: doc,
    window: {
      I18N: null,
      location: { pathname: "/pages/actividades-diarias.html", search: "" },
      setTimeout, clearTimeout
    },
    Date: class extends RealDate {
      constructor(...args) { if (args.length === 0) super(nowMs); else super(...args); }
      static now() { return nowMs; }
    },
    Math, JSON, Object, String, Number, Array, isNaN, parseInt, parseFloat,
    setInterval: () => 0, clearInterval: () => {},
    Intl, console, encodeURIComponent
  };
  ctx.window.setTimeout = setTimeout;
  ctx.window.document = doc;
  vm.createContext(ctx);

  vm.runInContext(read("js/i18n.js"), ctx);
  vm.runInContext(read("js/activities-daily.js"), ctx);

  const rows = [];
  (function walk(node) {
    for (const child of node.children || []) {
      if (child.tagName === "TR") rows.push(child);
      walk(child);
    }
  })(byId["bs-body"]);

  return rows;
}

test("el aviso se activa exactamente desde T-01:00:00 hasta T-00:00:01", () => {
  /* El instante se expresa en UTC-2: el desplazamiento de origen es de 2 h. */
  const SRC_TO_UTC_MS = 2 * 3600 * 1000;
  const at = (minutesToNext) => Date.UTC(2026, 10, 10, 12, 0) - minutesToNext * 60000 + SRC_TO_UTC_MS;

  const cases = [
    { minutes: 61, alertado: false },
    { minutes: 60, alertado: true },
    { minutes: 59, alertado: true },
    { minutes: 13.33, alertado: true },
    { minutes: 0.01, alertado: true }
  ];

  for (const { minutes, alertado } of cases) {
    const rows = renderBattleSurvival(at(minutes));
    const next = rows.find((r) => r.className.includes("bs-row-third"));
    assert.ok(next, "debe existir la fila de la proxima actividad");

    const tieneAviso = next.classList.contains("bs-imminent");
    assert.equal(tieneAviso, alertado,
      "con " + minutes + " minutos restantes el aviso es " + (alertado ? "activo" : "inactivo"));

    /* El contador conserva su texto con formato T- y no recibe texto extra. */
    assert.match(next.children[0].textContent, /^T- /);
  }
});

test("el aviso afecta al contador, al estado y al evento de la proxima actividad", () => {
  const SRC_TO_UTC_MS = 2 * 3600 * 1000;
  const now = Date.UTC(2026, 10, 10, 12, 0) - 30 * 60000 + SRC_TO_UTC_MS;
  const rows = renderBattleSurvival(now);

  const alertadas = rows.filter((r) => r.classList.contains("bs-imminent"));
  assert.equal(alertadas.length, 1, "solo una fila puede estar alertada");

  /* Es la fila inmediatamente siguiente a la actual. */
  const indiceActual = rows.findIndex((r) => r.className.includes("bs-current"));
  assert.equal(rows.indexOf(alertadas[0]), indiceActual + 1);

  const fila = alertadas[0];

  /* Contador, Estado y Evento reciben el aviso. */
  assert.ok(fila.children[0].classList.contains("bs-counter"));
  assert.ok(fila.children[1].classList.contains("bs-status"));
  assert.ok(fila.children[2].classList.contains("bs-event"));

  /* Su contador lleva siempre el resaltado especial, sea cual sea el evento. */
  assert.ok(fila.children[0].classList.contains("bs-hl-special"));

  /* Actividades y Servidor no se ven afectados por el aviso. */
  assert.ok(!fila.children[3].classList.contains("bs-imminent"));
  assert.ok(!fila.children[4].classList.contains("bs-imminent"));

  /* Ninguna otra fila queda marcada. */
  for (const otra of rows) {
    if (otra === fila) continue;
    assert.ok(!otra.classList.contains("bs-imminent"),
      "ninguna otra fila puede estar alertada");
  }
});

/* ---------- Regresion de las traducciones japonesas ---------- */

test("las traducciones japonesas no contienen textos corruptos", () => {
  const i18n = read("js/i18n.js");

  /* Fragmentos que se corregieron: no deben reaparecer en ningun idioma. */
  const corruptos = [
    "rob得ます", "Cwす", "領土的建筑", "兵士的训练", "雾囲気",
    "散发的", "estimar", "精 essence", "1.5MHonor", "ポイント上加算"
  ];
  for (const fragmento of corruptos) {
    assert.ok(!i18n.includes(fragmento), "no debe existir el fragmento " + JSON.stringify(fragmento));
  }

  /* El bloque japones conserva sus valores del juego. */
  const jaStart = i18n.indexOf('  ja: { name:"日本語"');
  const jaEnd = i18n.indexOf('  ru: { name:"Русский"');
  assert.ok(jaStart >= 0 && jaEnd > jaStart, "debe existir el bloque japones");
  const ja = i18n.slice(jaStart, jaEnd);

  assert.match(ja, /videoTutorialTip1:"王宮で大臣の公式な職位を申請すると、/);
  assert.match(ja, /videoTutorialEvent3:"[^"]*1\.5MのHonorポイント/);
  assert.match(ja, /videoTutorialEvent4:"[^"]*150KのHonorポイント/);
  assert.match(ja, /bsEvents:\{ BUILD:"領土の建設"/);
  assert.match(ja, /SOLDIER:"兵士の訓練"/);
  assert.match(ja, /rulesRoleDiplomatText:"良好な雰囲気と同盟内のコミュニケーションを守ります。/);
  assert.match(ja, /rulesPositionR2:"時折参加するプレイヤー/);
  assert.match(ja, /rulesPositionR4:"リーダーチーム：同盟を支援し、メンバーを励ます/);
  assert.match(ja, /rulesPositionR5:"[^"]*判断して追放します/);
  assert.match(ja, /RAVESS:\{objetive:"レイベンのエッセンスを1個消費する"/);

  /* Los valores del juego no se alteran al corregir. */
  for (const valor of ["25%", "60%", "1.5M", "150K", "225M", "990M", "Lv.6", "MVP 1", "277"]) {
    assert.ok(ja.includes(valor), "el japones debe conservar " + valor);
  }
});

test("solo los japones y los chinos contienen caracteres CJK", () => {
  const i18n = read("js/i18n.js");
  const blocks = i18n.split(/^  ([a-z]{2}): \{/m).slice(1);

  assert.equal(blocks.length / 2, 8);
  for (let i = 0; i < blocks.length; i += 2) {
    const lang = blocks[i];
    const body = blocks[i + 1];
    if (lang === "ja" || lang === "zh") continue;
    const cjk = body.match(/[一-鿿]/g);
    assert.ok(!cjk, lang + " no debe contener caracteres CJK");
  }
});

