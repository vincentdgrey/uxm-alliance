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
  assert.match(html, /<section class="block-content-info">/);
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
  assert.match(css, /\.block-buttons \.btn-outline\s*\{[^}]*border-width:\s*1px/s);
  assert.match(css, /\.block-buttons \.btn-outline\s*\{[^}]*border-style:\s*solid/s);
  assert.match(css, /\.block-buttons \.btn-info-youtube\s*\{[^}]*border:\s*1px solid var\(--scarlet\)/s);
  assert.match(css, /\.block-buttons \.btn-info-rules\s*\{[^}]*border:\s*1px solid var\(--primary-btn\)/s);
  assert.doesNotMatch(css, /color:\s*none/);
  assert.match(css, /\.hero-video \.tag\s*\{[^}]*color:\s*#f1f3f5/s);
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
  assert.match(html, /<section class="block-content-destacated">/);
  assert.match(css, /\.block-content-info,\s*\.block-content-destacated\s*\{[^}]*max-width:\s*960px/s);
  assert.match(css, /\.block-content-destacated\s*\{[^}]*background-color:\s*#424d61/s);
  assert.match(css, /\.block-content-destacated\s*\{[^}]*color:\s*#ccc/s);
});

test("el autor de la arenga se muestra en cursiva, a la derecha y subrayado", () => {
  const css = read("css/style.css");
  assert.match(css, /\.ha-author\s*\{[^}]*font-style:\s*italic/s);
  assert.match(css, /\.ha-author\s*\{[^}]*color:\s*#aaa/s);
  assert.match(css, /\.ha-author\s*\{[^}]*text-align:\s*right/s);
  assert.match(css, /\.ha-author\s*\{[^}]*border-bottom:\s*1px solid #aaa/s);
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

test("el divisor escarlata ocupa el 96% con 2% libre a cada lado", () => {
  const css = read("css/style.css");
  assert.match(css, /\.line-divisor-scarlet\s*\{[^}]*width:\s*96%/s);
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

test("la navbar es fija y usa el gris inicial de la hamburguesa", () => {
  const css = read("css/style.css");
  assert.match(css, /\.topbar\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.topbar\s*\{[^}]*top:\s*0/s);
  assert.match(css, /\.nav-toggle-bars i\s*\{[^}]*background:\s*#ccc/s);
  assert.match(css, /\.topbar-brand\s*\{[^}]*color:\s*#ccc/s);
});

test("la hamburguesa se anima cada 60 segundos con desplazamientos definidos", () => {
  const css = read("css/style.css");
  assert.match(css, /@keyframes\s+uxm-nav-line-one/);
  assert.match(css, /@keyframes\s+uxm-nav-line-two/);
  assert.match(css, /60s/);
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

test("la hamburguesa usa gris claro en la portada y cambia a escarlata al abrir el menú", () => {
  const css = read("css/style.css");
  assert.match(css, /\.nav-toggle-bars i\s*\{[^}]*background:\s*#ccc/s);
  assert.match(css, /\.home-topbar\s+\.nav-toggle-bars i\s*\{[^}]*background:\s*#ccc/s);
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
  assert.match(css, /\.home-topbar\s+\.topbar-brand\s*\{[^}]*color:\s*#ccc/s);
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
  assert.match(css, /\.hero-title-accent\s*\{[^}]*text-shadow:[^}]*rgba\(122,\s*17,\s*0/s);
  assert.match(css, /\.hero-video\s+\.tag\s*\{[^}]*text-shadow:[^}]*;/s);
});

test("las iniciales del hero se alinean arriba, crecen y usan los colores solicitados", () => {
  const html = read("index.html");
  const css = read("css/style.css");
  assert.match(html, /hero-title-word/);
  assert.match(html, /hero-title-initial/);
  assert.match(html, /hero-title-accent/);
  assert.match(css, /\.hero-title-word\s*\{[^}]*align-items:\s*flex-start/s);
  assert.match(css, /\.hero-title-initial\s*\{[^}]*font-size:\s*1\.12em/s);
  assert.match(css, /\.hero-title-accent\s*\{[^}]*color:\s*var\(--scarlet\)/s);
  assert.match(css, /\.hero-video\s+\.hero-title\s*\{[^}]*color:\s*var\(--concrete\)/s);
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
    assert.equal(value, 'copyright:"© 2026 UXM – Under Xtreme Madness"');
  }
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
