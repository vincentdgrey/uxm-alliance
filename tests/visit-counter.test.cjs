const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const htmlFiles = [
  "index.html",
  "pages/actividades-diarias.html",
  "pages/reino.html",
  "pages/normas-uxm.html",
  "pages/video-tutoriales.html",
  "pages/estrategia.html",
  "pages/contacto.html"
];

const languages = ["es", "en", "pt", "it", "fr", "ja", "ru", "zh", "tr"];

test("todas las paginas incluyen el contador de visitas en el footer", () => {
  for (const file of htmlFiles) {
    const html = read(file);
    assert.match(html, /<p id="visitCounter" class="visit-counter"><\/p>/, file);
    assert.match(html, /<footer class="site-footer">[\s\S]*id="visitCounter"[\s\S]*<\/footer>/, file);
  }
});

test("el contador se ubica despues del copyright y antes del selector de idioma", () => {
  for (const file of htmlFiles) {
    const html = read(file);
    const copyright = html.indexOf('id="copyright"');
    const counter = html.indexOf('id="visitCounter"');
    const langs = html.indexOf('id="langs"');
    assert.ok(copyright >= 0 && counter > copyright && langs > counter, file);
  }
});

test("el contador se muestra con texto de 10px en color #ccc", () => {
  const css = read("css/style.css");
  assert.match(css, /\.visit-counter\s*\{[^}]*font-size:\s*10px/s);
  assert.match(css, /\.visit-counter\s*\{[^}]*color:\s*#ccc/s);
});

test("el contador se ubica en la columna central del footer, bajo el copyright", () => {
  const css = read("css/style.css");
  assert.match(css, /\.visit-counter\s*\{[^}]*grid-column:\s*2[^}]*grid-row:\s*2/s);
  assert.match(css, /@media\s*\(max-width:\s*620px\)\s*\{[^@]*\.visit-counter\s*\{[^}]*grid-column:\s*1[^}]*grid-row:\s*auto/s);
});

test("el texto del contador esta traducido en los nueve idiomas", () => {
  const i18n = read("js/i18n.js");
  const matches = i18n.match(/visitCounter:"[^"]+"/g) || [];
  assert.equal(matches.length, 9);
  for (const value of matches) {
    assert.match(value, /\{n\}/, value);
  }
  for (const lang of languages) {
    const block = new RegExp(`${lang}:\\s*\\{[\\s\\S]*?visitCounter:"([^"]+)"`).exec(i18n);
    assert.ok(block, `falta visitCounter en ${lang}`);
  }
});

test("el contador se apoya solo en el almacenamiento local del navegador", () => {
  const js = read("js/app.js");
  assert.match(js, /localStorage/);
  assert.match(js, /sessionStorage/);
  assert.match(js, /uxmVisitCount/);
  assert.match(js, /uxmVisitSession/);
  assert.match(js, /function renderVisitCounter\(\)/);
  assert.match(js, /renderVisitCounter\(\);\s*\}\)\(\);\s*$/);
});

test("el almacenamiento bloqueado no rompe el sitio", () => {
  const js = read("js/app.js");
  assert.match(js, /try\s*\{[^}]*store\.getItem/s);
  assert.match(js, /try\s*\{[^}]*store\.setItem/s);
});

test("con el almacenamiento bloqueado el contador queda oculto", () => {
  const js = read("js/app.js");
  const start = js.indexOf("/* ---------- Contador de visitas local ---------- */");
  const end = js.indexOf("/* ---------- Tabla de bonos de la alianza ---------- */");
  const block = js.slice(start, end);

  const blocked = {
    getItem() { throw new Error("almacenamiento bloqueado"); },
    setItem() { throw new Error("almacenamiento bloqueado"); }
  };
  const el = { textContent: "" };
  const context = {
    Date,
    parseInt,
    String,
    window: { sessionStorage: blocked, localStorage: blocked },
    T: { visitCounter: "Visits on this browser: {n}" },
    LANG: "en",
    byId: (id) => (id === "visitCounter" ? el : null)
  };
  vm.createContext(context);
  vm.runInContext(block + "\nrenderVisitCounter();", context);

  assert.equal(el.textContent, "", "el contador no debe mostrarse sin almacenamiento");
});

test("la visita se cuenta una sola vez por sesion de 30 minutos", () => {
  const js = read("js/app.js");
  const start = js.indexOf("/* ---------- Contador de visitas local ---------- */");
  const end = js.indexOf("/* ---------- Tabla de bonos de la alianza ---------- */");
  const block = js.slice(start, end);

  const makeStorage = () => {
    const map = new Map();
    return {
      map,
      getItem: (k) => (map.has(k) ? map.get(k) : null),
      setItem: (k, v) => map.set(k, String(v))
    };
  };

  const local = makeStorage();
  const session = makeStorage();
  const el = { textContent: "" };
  const context = {
    Date,
    parseInt,
    String,
    window: { sessionStorage: session, localStorage: local },
    T: { visitCounter: "Visits on this browser: {n}" },
    LANG: "en",
    byId: (id) => (id === "visitCounter" ? el : null)
  };
  vm.createContext(context);
  vm.runInContext(block + "\nrenderVisitCounter();", context);
  assert.equal(el.textContent, "Visits on this browser: 1");

  vm.runInContext(block + "\nrenderVisitCounter();", context);
  assert.equal(el.textContent, "Visits on this browser: 1", "no debe contar de nuevo en la misma sesion");

  session.map.delete("uxmVisitSession");
  vm.runInContext(block + "\nrenderVisitCounter();", context);
  assert.equal(el.textContent, "Visits on this browser: 2", "una nueva sesion si cuenta");
});
