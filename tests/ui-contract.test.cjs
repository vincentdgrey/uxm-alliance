const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("todos los botones usan radio de 4px", () => {
  const css = read("css/style.css");
  assert.match(css, /--button-radius:\s*4px/);
  assert.match(css, /button,\s*\.btn,\s*\.btn-outline[^{]*\{[^}]*border-radius:\s*var\(--button-radius\)/s);
  assert.match(css, /\.nav-list a\.active\s*\{[^}]*border-radius:\s*var\(--button-radius\)/s);
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
  assert.match(html, /<section class="subpage-banner">\s*<h2 class="sibtitle-info banner-subpage"/);
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
  assert.match(css, /#content\.subpage-content \.subpage-title\s*\{[^}]*color:\s*#adadad/s);
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

test("el calendario se carga desde un script propio en js y sin estilos en linea", () => {
  const html = read("pages/actividades-diarias.html");
  assert.match(html, /<script src="\.\.\/js\/battle-survival-schedule\.js"><\/script>/);
  assert.doesNotMatch(html, /<script>\s*\(function \(\) \{/);
  assert.doesNotMatch(html, /ACTIVITIES\s*=\s*\[/);
  assert.ok(fs.existsSync(path.join(root, "js/battle-survival-schedule.js")));
});

test("el script del calendario se carga despues de i18n y de app", () => {
  const html = read("pages/actividades-diarias.html");
  const i18nPos = html.indexOf('src="../js/i18n.js"');
  const appPos = html.indexOf('src="../js/app.js"');
  const schedulePos = html.indexOf('src="../js/battle-survival-schedule.js"');
  assert.ok(i18nPos >= 0 && appPos >= 0 && schedulePos >= 0);
  assert.ok(i18nPos < appPos, "i18n.js debe cargarse antes que app.js");
  assert.ok(appPos < schedulePos, "battle-survival-schedule.js debe cargarse despues de app.js");
});

test("el calendario no declara subtitulo propio", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/battle-survival-schedule.js");
  assert.doesNotMatch(html, /bs-subtitle/);
  assert.doesNotMatch(js, /bs-subtitle/);
});

test("las traducciones del calendario viven solo en js/i18n.js", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/battle-survival-schedule.js");
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

test("la tabla del calendario conserva el comportamiento responsivo original", () => {
  const css = read("css/style.css");
  const js = read("js/battle-survival-schedule.js");
  assert.doesNotMatch(css, /\.battle-content\s*\{/);
  assert.doesNotMatch(css, /\.battle-content \.bs-schedule\s*\{/);
  assert.doesNotMatch(js, /max-width:\s*none/);
  assert.match(js, /\.bs-schedule \{[^}]*min-width:\s*640px/s);
  assert.match(js, /\.bs-schedule \{[^}]*max-width:\s*900px/s);
  assert.match(js, /\.bs-wrap \{[^}]*overflow-x:\s*auto/s);
});

test("el encabezado del cronograma de batalla se traduce en todos los idiomas", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/app.js");
  const i18n = read("js/i18n.js");
  assert.match(html, /data-i18n="scheduleBattleSurvival"/);
  assert.match(html, />Cronograma Batalla Supervivencia<\/h2>/);
  assert.match(js, /function applySectionTitles\(\)/);
  assert.match(js, /querySelectorAll\("\[data-i18n\]"\)/);
  assert.match(js, /setSectionTitle\(heading, T\[key\]\)/);
  assert.match(js, /applySectionTitles\(\);/);
  assert.match(js, /initial\.className = "info-initial"/);
  const matches = i18n.match(/scheduleBattleSurvival:"[^"]+"/g) || [];
  assert.equal(matches.length, 8);
  assert.match(i18n, /scheduleBattleSurvival:"Cronograma Batalla Supervivencia"/);
});

test("el calendario no altera el titulo ni el idioma de la pagina", () => {
  const html = read("pages/actividades-diarias.html");
  const js = read("js/battle-survival-schedule.js");
  assert.doesNotMatch(html, /document\.title\s*=/);
  assert.doesNotMatch(html, /document\.documentElement\.lang\s*=/);
  assert.doesNotMatch(js, /document\.title\s*=/);
  assert.doesNotMatch(js, /document\.documentElement\.lang\s*=/);
  assert.match(html, /<title>Actividades Diarias – UXM<\/title>/);
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
  assert.match(css, /\.line-divisor-scarlet\s*\{[^}]*width:\s*100%/s);
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

test("la hamburguesa se anima cada 30 segundos con desplazamientos definidos", () => {
  const css = read("css/style.css");
  assert.match(css, /@keyframes\s+uxm-nav-line-one/);
  assert.match(css, /@keyframes\s+uxm-nav-line-two/);
  assert.match(css, /30s/);
  assert.match(css, /translateX\(20px\)/);
  assert.match(css, /translateX\(10px\)/);
  const reducedMotion = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(reducedMotion, "debe existir el bloque de movimiento reducido");
  assert.match(reducedMotion[1], /\.nav-toggle-bars i:nth-child\(1\)/);
  assert.match(reducedMotion[1], /\.nav-toggle-bars i:nth-child\(2\)/);
  assert.match(reducedMotion[1], /animation:\s*none/);
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

test("el bloque de bonos de la alianza se localiza en los 8 idiomas", () => {
  const html = read("index.html");
  const js = read("js/app.js");
  const css = read("css/style.css");
  const i18n = read("js/i18n.js");

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
  assert.match(html, /<table class="info-data">/);

  for (const id of bonusIds) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(js, new RegExp(`setText\\("${id}", T\\.${id}\\)`));
    assert.ok((i18n.match(new RegExp(`\\b${id}:"`, "g")) || []).length === 8);
  }

  assert.match(i18n, /bonusAlliance:"Bonos Tecnología de la Alianza"/);
  assert.match(i18n, /bonusInProgress:"En curso"/);
  assert.equal((i18n.match(/\bbonusInProgress:"/g) || []).length, 8);

  /* El estado "en curso" se localiza mediante el atributo data-progress. */
  assert.match(html, /id="bonusCraftingSpeedup" class="in-progress" data-progress="/);
  assert.match(css, /\.in-progress::after\s*\{[^}]*content:\s*"\s*\(" attr\(data-progress\) "\)"/s);
  assert.match(js, /byId\("bonusCraftingSpeedup"\);\s*\n\s*if \(bonusInProgress\) bonusInProgress\.setAttribute\("data-progress", T\.bonusInProgress\)/);
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
