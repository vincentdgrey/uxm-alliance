const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const pages = [
  { id: "index", html: "index.html", script: "js/i18n/index/i18n.js", file: "js/i18n/index/i18n.js" },
  { id: "actividades-diarias", html: "pages/actividades-diarias.html", script: "../js/i18n/actividades-diarias/i18n.js", file: "js/i18n/actividades-diarias/i18n.js" },
  { id: "normas-uxm", html: "pages/normas-uxm.html", script: "../js/i18n/normas-uxm/i18n.js", file: "js/i18n/normas-uxm/i18n.js" },
  { id: "video-tutoriales", html: "pages/video-tutoriales.html", script: "../js/i18n/video-tutoriales/i18n.js", file: "js/i18n/video-tutoriales/i18n.js" },
  { id: "estrategia", html: "pages/estrategia.html", script: "../js/i18n/estrategia/i18n.js", file: "js/i18n/estrategia/i18n.js" },
  { id: "contacto", html: "pages/contacto.html", script: "../js/i18n/contacto/i18n.js", file: "js/i18n/contacto/i18n.js" }
];

const languages = ["es", "en", "pt", "it", "fr", "ja", "ru", "zh", "tr"];

function loadI18n(pageId) {
  const page = pages.find((item) => item.id === pageId);
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(read("js/i18n.js"), context);
  vm.runInContext(read(page.file), context);
  return context.window.I18N;
}

test("cada pagina carga el nucleo y su archivo i18n antes de app.js", () => {
  for (const page of pages) {
    const html = read(page.html);
    const corePos = html.indexOf(page.id === "index" ? 'src="js/i18n.js"' : 'src="../js/i18n.js"');
    const pagePos = html.indexOf(`src="${page.script}"`);
    const appPos = html.indexOf(page.id === "index" ? 'src="js/app.js"' : 'src="../js/app.js"');
    assert.ok(corePos >= 0, `${page.id} debe cargar js/i18n.js`);
    assert.ok(pagePos >= 0, `${page.id} debe cargar ${page.script}`);
    assert.ok(appPos >= 0, `${page.id} debe cargar app.js`);
    assert.ok(corePos < pagePos && pagePos < appPos, `${page.id} debe respetar el orden i18n`);
  }
});

test("cada pagina carga solo su propio archivo i18n especifico", () => {
  for (const page of pages) {
    const html = read(page.html);
    for (const other of pages) {
      if (other.id === page.id) continue;
      assert.ok(!html.includes(other.script), `${page.id} no debe cargar ${other.script}`);
    }
  }
});

test("los archivos i18n de pagina amplian window.I18N en los nueve idiomas", () => {
  for (const page of pages) {
    const i18n = loadI18n(page.id);
    assert.deepEqual(Object.keys(i18n).sort(), [...languages].sort(), page.id);
    for (const lang of languages) {
      assert.equal(typeof i18n[lang].name, "string", `${page.id}/${lang} necesita nombre`);
      assert.ok(Object.keys(i18n[lang]).length > 1, `${page.id}/${lang} necesita textos propios`);
    }
  }
});

test("los codigos de actividades coinciden con ACTIVITY_CODE", () => {
  const source = read("js/activities-daily.js");
  const match = source.match(/var ACTIVITY_CODE = (\[[\s\S]*?\n  \]);/);
  assert.ok(match, "debe existir ACTIVITY_CODE");
  const context = {};
  vm.createContext(context);
  vm.runInContext("var ACTIVITY_CODE = " + match[1], context);
  const rows = context.ACTIVITY_CODE;
  assert.equal(rows.length, 45);

  const i18n = loadI18n("actividades-diarias");
  const expectedCodes = rows.map((row) => row.code);
  for (const language of languages) {
    assert.equal(Object.keys(i18n[language].adActivities).join(","), expectedCodes.join(","), language);
  }
});

test("los textos españoles manuales se conservan como fuente de traduccion", () => {
  const activities = loadI18n("actividades-diarias").es.adActivities;
  const expected = {
    CON1SP: { objetive: "Usa Aceleración de Construcción", resource: "Activa Ministerio Construcción" },
    TCH1SP: { objetive: "Usa Aceleración de Investigación", resource: "Activa Ministerio Investigación" },
    TCHMGH: { objetive: "Aumenta el Poder de Tecnología", resource: "Buscar Investigaciones con Pergamino de Estudio" },
    SHRDSR: { objetive: "Consume Fragmento de Héroe SR", resource: "Tienda Santuario" },
    SHRDSS: { objetive: "Consume Fragmento de Héroe SSR", resource: "Tienda Santuario" },
    SHRDUR: { objetive: "Consume Fragmento de Héroe UR", resource: "Tienda Santuario" },
    SKILLB: { objetive: "Usa Insignia de Habilidad", resource: "Aumenta Habilidad Heroe UR" },
    SOLD1TRN: { objetive: "Usa Aceleración de Entrenamiento", resource: "Activa Ministro de Guerra" },
    SOLDT10: { objetive: "Entrena Soldado, Prioridad Promoverlos", resource: "Soldados T6 > T7 > T8" },
    ELIXIR: { objetive: "Puntos por Captura de Edificios", resource: "Castillo del Elixir" },
    CRVNUR: { objetive: "Envía Caravanas UR", resource: "4 Caravanas" },
    OPENUR: { objetive: "Ejecuta Operaciones Encubiertas UR", resource: "7 Operaciones Encubiertas" },
    SCRAMBLE: { objetive: "100K Puntos de Honor, Captura/Defiende una Granja en el lodo", resource: "Granjas de la Ciudad Real en el Lodo" },
    KWAR: { objetive: "1.5M Puntos de Honor, Derrota/Pierde/Sana Soldados", resource: "Guerra de Reinos" }
  };

  for (const [code, values] of Object.entries(expected)) {
    assert.deepEqual({ ...activities[code] }, values, code);
  }
});

test("todas las traducciones de actividades cubren los 45 codigos", () => {
  const i18n = loadI18n("actividades-diarias");
  for (const lang of languages) {
    const activities = i18n[lang].adActivities;
    assert.equal(Object.keys(activities).length, 45, lang);
    for (const code of Object.keys(activities)) {
      assert.equal(typeof activities[code].objetive, "string", `${lang}/${code}`);
      assert.equal(typeof activities[code].resource, "string", `${lang}/${code}`);
    }
  }
});
