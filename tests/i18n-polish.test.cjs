const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const libraryRoot = path.join(root, "db/library");

function loadI18n(pageId) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(read("js/i18n.js"), context);
  vm.runInContext(read(`js/i18n/${pageId}/i18n.js`), context);
  return context.window.I18N;
}

function walkFiles(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...walkFiles(full));
    else if (name.endsWith(".json") && name !== "index.json") out.push(full);
  }
  return out;
}

/* ---------- Nucleo comun ---------- */

test("el nucleo comun declara el polaco con su nombre propio", () => {
  const i18n = loadI18n("actividades-diarias");
  assert.equal(i18n.pl.name, "Polski");
  assert.equal(typeof i18n.pl.navHome, "string");
  assert.equal(typeof i18n.pl.navDaily, "string");
  assert.equal(typeof i18n.pl.navStrategy, "string");
  assert.equal(typeof i18n.pl.visitCounter, "string");
  /* El contador conserva el marcador de sustitucion. */
  assert.ok(i18n.pl.visitCounter.includes("{n}"));
});

test("el polaco declara las mismas claves que el espanol", () => {
  const i18n = loadI18n("actividades-diarias");
  const es = Object.keys(i18n.es).sort();
  const pl = Object.keys(i18n.pl).sort();
  assert.deepEqual(pl, es);
});

/* ---------- Paginas ---------- */

const pages = [
  "actividades-diarias",
  "normas-uxm",
  "video-tutoriales",
  "estrategia",
  "contacto",
  "reino",
  "index"
];

test("cada pagina declara el polaco con todas sus claves", () => {
  for (const pageId of pages) {
    const i18n = loadI18n(pageId);
    const es = Object.keys(i18n.es).sort();
    const pl = Object.keys(i18n.pl).sort();
    assert.deepEqual(pl, es, pageId + " debe declarar las mismas claves que el espanol");

    for (const key of es) {
      const value = i18n.pl[key];
      /* Las claves pueden ser textos o mapas de actividades. */
      assert.ok(
        typeof value === "string" || (value && typeof value === "object"),
        `${pageId}/pl/${key} debe ser texto o mapa`
      );
    }
  }
});
test("el polaco mantiene el orden canonico de las actividades y los eventos", () => {
  const i18n = loadI18n("actividades-diarias");

  assert.deepEqual(
    Object.keys(i18n.pl.adActivities),
    Object.keys(i18n.es.adActivities)
  );
  assert.deepEqual(Object.keys(i18n.pl.adEvents), Object.keys(i18n.es.adEvents));
  assert.deepEqual(Object.keys(i18n.pl.adPhases), Object.keys(i18n.es.adPhases));
  assert.deepEqual(Object.keys(i18n.pl.bsEvents), Object.keys(i18n.es.bsEvents));
});

test("el polaco traduce las actividades de Battle Survival", () => {
  const i18n = loadI18n("actividades-diarias");
  for (const code of ["BSBUILD", "BSHERO", "BSRAVEN", "BSSOLDIER", "BSTECH"]) {
    const activity = i18n.pl.adActivities[code];
    assert.ok(activity, "falta " + code);
    assert.ok(activity.objective.includes("★"), code + " conserva la estrella de habilidad");
    assert.ok(activity.objective.length > 0, code + " tiene objetivo");
    assert.ok(activity.resource.length > 0, code + " tiene recurso");
  }
});

/* ---------- Deteccion por navegador ---------- */

test("la deteccion por navegador reconoce el polaco", () => {
  const app = read("js/app.js");

  /* La deteccion reduce el idioma del navegador a su codigo de dos letras. */
  assert.match(app, /navigator\.language \|\| navigator\.userLanguage/);
  assert.match(app, /\.toLowerCase\(\)\.split\("-"\)/
    , "el idioma se reduce tomando la parte anterior al guion");
  assert.match(app, /return window\.I18N\[base\] \? base : DEFAULT_LANG/);
  assert.match(app, /var DEFAULT_LANG = "en"/);
});

test("el parametro lang admite el polaco", () => {
  for (const file of ["js/app.js", "js/reino.js", "js/reino-castle.js", "js/activities-daily.js"]) {
    const js = read(file);
    assert.match(js, /\[a-zA-Z\]\{2\}/, file + " acepta codigos de dos letras");
    assert.match(js, /window\.I18N\[/, file + " valida el idioma contra window.I18N");
  }
});

test("el selector de idiomas enumeracion el polaco automaticamente", () => {
  const app = read("js/app.js");
  assert.match(app, /Object\.keys\(window\.I18N\)\.forEach/);
  assert.match(app, /item\.textContent = window\.I18N\[code\]\.name/);
});

/* ---------- Biblioteca estrategica ---------- */

test("cada archivo de la biblioteca declara el bloque polaco", () => {
  for (const file of walkFiles(libraryRoot)) {
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const rel = path.relative(libraryRoot, file);

    if (json.title) {
      assert.equal(typeof json.title.pl, "string", `${rel} necesita title en polaco`);
    }
    if (json.summary) {
      assert.equal(typeof json.summary.pl, "string", `${rel} necesita summary en polaco`);
    }
    if (json.keywords) {
      assert.ok(Array.isArray(json.keywords.pl), `${rel} necesita keywords en polaco`);
    }
    for (const section of json.sections || []) {
      assert.equal(typeof section.title.pl, "string", `${rel} necesita title de seccion en polaco`);
      if (section.paragraphs) {
        assert.ok(Array.isArray(section.paragraphs.pl), `${rel} necesita paragraphs en polaco`);
      }
      if (section.items) {
        assert.ok(Array.isArray(section.items.pl), `${rel} necesita items en polaco`);
      }
    }
  }
});

test("las listas de la biblioteca polaca tienen la misma longitud que las canonicas", () => {
  for (const file of walkFiles(libraryRoot)) {
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const rel = path.relative(libraryRoot, file);

    if (json.keywords) {
      assert.equal(
        json.keywords.pl.length,
        json.keywords.es.length,
        `${rel} debe tener las mismas palabras clave`
      );
    }
    for (const section of json.sections || []) {
      for (const field of ["paragraphs", "items"]) {
        if (!section[field]) continue;
        assert.equal(
          section[field].pl.length,
          section[field].es.length,
          `${rel}/${field} debe tener los mismos elementos`
        );
      }
    }
  }
});

/* ---------- Busqueda ---------- */

test("la busqueda ignora los diacriticos polacos", () => {
  const js = read("js/strategy-library.js");

  assert.ok(
    js.includes('.replace(/ł/g, "l")'),
    "la letra l con crossed se normaliza a l"
  );
  assert.match(js, /\.normalize\("NFD"\)/);
  assert.ok(
    js.includes("[\\u0300-\\u036f]"),
    "se eliminan los diacriticos combinantes"
  );
});

/* ---------- Unicode ---------- */

test("el polaco no usa caracteres CJK ni cirilicos", () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(read("js/i18n.js"), context);
  for (const pageId of pages) {
    vm.runInContext(read(`js/i18n/${pageId}/i18n.js`), context);
  }
  const i18n = context.window.I18N;

  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;
  const cyrillic = /\p{Script=Cyrillic}/u;

  const collect = (value, output = []) => {
    if (typeof value === "string") { output.push(value); return output; }
    if (Array.isArray(value)) { value.forEach((v) => collect(v, output)); return output; }
    if (value && typeof value === "object") {
      Object.keys(value).forEach((k) => collect(value[k], output));
    }
    return output;
  };

  for (const text of collect(i18n.pl)) {
    assert.doesNotMatch(text, cjk, "el polaco no debe contener CJK");
    assert.doesNotMatch(text, cyrillic, "el polaco no debe contener cirilico");
  }
});
