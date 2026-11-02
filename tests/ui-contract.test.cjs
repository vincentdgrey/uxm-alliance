const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("el menú lateral nunca supera 400px y la tercera línea alcanza el borde menos 10px", () => {
  const css = read("css/style.css");
  assert.match(css, /\.nav-panel\s*\{[\s\S]*?max-width:\s*400px/);
  assert.doesNotMatch(css, /\.nav-panel\s*\{[\s\S]*?min-width:\s*400px/);
  assert.match(css, /\.nav-open\s+\.nav-toggle-bars\s+i:nth-child\(3\)/);
  assert.match(css, /--nav-toggle-line-end:\s*calc\(var\(--nav-panel-width\) - var\(--nav-toggle-line-origin\) - 10px\)/);
});

test("la hamburguesa usa gris claro en la portada y cambia a escarlata al abrir el menú", () => {
  const css = read("css/style.css");
  assert.match(css, /\.nav-toggle-bars i\s*\{[^}]*background:\s*var\(--text\)/s);
  assert.match(css, /\.home-topbar\s+\.nav-toggle-bars i\s*\{[^}]*background:\s*var\(--gray-light\)/s);
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
  assert.match(css, /\.home-topbar\s+\.topbar-brand\s*\{[^}]*color:\s*var\(--gray-light\)/s);
  assert.match(css, /\.hero-video\s*\{[^}]*min-height:\s*calc\(100dvh - 20px\)/s);
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
