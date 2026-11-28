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
  { id: "reino", html: "pages/reino.html", script: "../js/i18n/reino/i18n.js", file: "js/i18n/reino/i18n.js" },
  { id: "normas-uxm", html: "pages/normas-uxm.html", script: "../js/i18n/normas-uxm/i18n.js", file: "js/i18n/normas-uxm/i18n.js" },
  { id: "video-tutoriales", html: "pages/video-tutoriales.html", script: "../js/i18n/video-tutoriales/i18n.js", file: "js/i18n/video-tutoriales/i18n.js" },
  { id: "estrategia", html: "pages/estrategia.html", script: "../js/i18n/estrategia/i18n.js", file: "js/i18n/estrategia/i18n.js" },
  { id: "contacto", html: "pages/contacto.html", script: "../js/i18n/contacto/i18n.js", file: "js/i18n/contacto/i18n.js" }
];

const languages = ["es", "en", "pt", "it", "de", "fr", "ja", "ru", "zh", "tr", "pl"];

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

test("los archivos i18n de pagina amplian window.I18N en los once idiomas", () => {
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
  assert.equal(rows.length, 61);

  const i18n = loadI18n("actividades-diarias");
  const canonicalCodes = Object.keys(i18n.es.adActivities);
  const expectedCodes = rows.map((row) => row.code);

  for (const language of languages) {
    const activities = i18n[language].adActivities;
    assert.deepEqual(Object.keys(activities), canonicalCodes, language);
    for (const code of expectedCodes) {
      assert.ok(activities[code], language + " debe traducir " + code);
    }
  }
});

test("las traducciones pendientes de integrar en los datos son solo CHEESE7", () => {
  const i18n = loadI18n("actividades-diarias");
  const source = read("js/activities-daily.js");
  const match = source.match(/var ACTIVITY_CODE = (\[[\s\S]*?\n  \]);/);
  const context = {};
  vm.createContext(context);
  vm.runInContext("var ACTIVITY_CODE = " + match[1], context);
  const expectedCodes = context.ACTIVITY_CODE.map((row) => row.code);

  for (const language of languages) {
    const codes = Object.keys(i18n[language].adActivities);
    const pending = codes.filter((code) => !expectedCodes.includes(code));
    assert.deepEqual(pending, ["CHEESE7", "UNDEAD"], language);
  }
});

test("los textos españoles manuales se conservan como fuente de traduccion", () => {
  const activities = loadI18n("actividades-diarias").es.adActivities;
  const expected = {
    CON1SP: { objective: "Usa Aceleración de Construcción, Activa Ministerio Construcción", resource: "Acelerador Construcción" },
    TCH1SP: { objective: "Usa Aceleración de Investigación, Activa Ministerio Investigación", resource: "Acelerador Desarrollo" },
    TCHMGH: { objective: "Aumenta el Poder de Tecnología, Buscar Investigaciones con Pergamino de Estudio", resource: "Pergamino de Estudio" },
    SHRDSR: { objective: "Consume Fragmento de Héroe SR, prioriza en tu héroe a Promover, ejemplo Robin", resource: "Fragmento de Héroe SR" },
    SHRDSS: { objective: "Consume Fragmento de Héroe SSR, prioriza en tu héroe a Promover, ejemplo Claire o Bella", resource: "Fragmento de Héroe SSR" },
    SHRDUR: { objective: "Consume Fragmento de Héroe UR, prioriza DPS > Soporte > Tanque", resource: "Fragmento de Héroe UR" },
    SKILLB: { objective: "Usa Insignia de Habilidad, Prioridad Aumentar Habilidad Héroe UR", resource: "Insignia de Habilidad" },
    SOLD1TRN: { objective: "Usa Aceleración de Entrenamiento, Activa Ministerio de Guerra", resource: "Acelerador Entrenamiento" },
    SOLDT10: { objective: "Entrena Soldado, Prioridad Promover T7 a T8", resource: "Soldados T6 > T7 > T8" },
    ELIXIR: { objective: "Generar Puntos por Capturar Edificios", resource: "Castillo del Elixir" },
    CRVNUR: { objective: "Envía Caravanas UR", resource: "4 Caravanas" },
    OPENUR: { objective: "Ejecuta Operaciones Encubiertas UR, mínimo 6 UR, la última más difícil dejarla en SSR", resource: "7 Operaciones Encubiertas" },
    ANTX: { objective: "Consume Antitoxinas x660, priorizar primer escuadrón UR", resource: "Suministros Antídoto" },
    HERBS: { objective: "Recolecta Hierbas x60, todo el día", resource: "Jardín de Hierbas Nv.10, 8H, 1.1M" },
    GRAIN: { objective: "Recolecta Trigo/Madera x100", resource: "Granja Nv.10, 6.5H, 2.2M" },
    CONMGH: { objective: "Aumenta el Poder de Un Edificio, Prefiere tiempos de construcción cortos", resource: "Mejora Edificio" },
    SCRAMBLE: { objective: "100K Puntos de Honor, Captura/Defiende una Granja en el lodo", resource: "Granjas de la Ciudad Real" },
    KWAR: { objective: "1.5M Puntos de Honor, Derrota/Pierde/Cura Soldados", resource: "Guerra de Reinos (KvK)" },
    CUMULUS: { objective: "Recolecta Cristal Purificado en Cúmulos, 30min duración", resource: "Cúmulos de Cristal" },
    STMN: { objective: "Consume Energía/Stamina, comprar 24 botellas en Shop VIP", resource: "Botella de Energía/Stamina" },
    DYBOTWAR: { objective: "Guarda Botellas de Energía/Stamina para la Fase de Guerra", resource: "Botella de Energía/Stamina" },
    DYHERBS: { objective: "Comienza a Recolectar Hierbas", resource: "Jardín de Hierbas Nv.10, 8H, 1.1M" },
    EPIUR: { objective: "Obtén Fragmentos de Epígrafe UR, usar toda clase de cofre Epígrafe", resource: "Cofres de Epígrafes" },
    RAVESS: { objective: "Consume Esencia de Cuervo, Prioridad", resource: "Esencia de Cuervo" },
    RAVFRT: { objective: "Consume Fruta de Cuervo", resource: "Fruta de Cuervo" },
    RAVCH1: { objective: "Abre Cofre de Equipo de Cuervo", resource: "Cofre de Cuervo" },
    TCKSUR: { objective: "Recluta Supervivientes, usando TODOS los Tickets de Superviviente", resource: "Ticket de Superviviente" },
    FREETS: { objective: "Usa SOLO 1 Ticket GRATIS de Superviviente", resource: "Ticket de Superviviente" },
    TCKHER: { objective: "Recluta Héroes, usando TODOS los Tickets de Héroe, +50 obtienes Héroe UR", resource: "Ticket de Héroe" },
    FREETH: { objective: "Usa SOLO 1 Ticket GRATIS de Héroe", resource: "Ticket de Héroe" },
    HEA1SP: { objective: "Usa Aceleración de Curación, Buff de Curación +150%", resource: "Acelerador Curación" },
    DYHOSPITAL: { objective: "NO Cures Soldados; Mantener en el Hospital, para usar aceleradores curación el día de Guerra", resource: "Hospital" },
    DYELITE: { objective: "Monstruos Elite Plaga, obtén Ticket de Héroe y Antitoxina", resource: "Monstruos" },
    EQGEAR: { objective: "Usa Piedra de Equipo, Prioridad en Equipo UR", resource: "Piedra de Equipo" },
    EQBPRN: { objective: "Usa Plano de Equipo, Promueve Estadísticas Adicionales UR", resource: "Plano el Equipo" },
    SHIELD: { objective: "Activa Escudos 24H, Compra Escudo Gratis 8H en Tienda de la Alianza", resource: "Escudo" },
    DYSOLDIER: { objective: "Entrena Soldados T6 o T7; Promover el Día de Preparación de Guerra", resource: "Soldado T7" },
    DYWALL: { objective: "Retira tus soldados del Muro; Día de Guerra", resource: "Muro Santuario" },
    CHEESE7: { objective: "335M de Daño al Ladrón del Queso Lv.7, 30min duración, 1.4B de daño para el MVP1", resource: "Trampa del Queso" },
    UNDEAD: { objective: "Resistir 20 Oleadas del Asedio de No Muertos, Colocar/Reforzar soldados en el Muro", resource: "Soldados en Muro" },
    DEMONW: { objective: "Rey Demonio Guerrero, Daño Héroe Ranger +50%, 4 DPS + 1 Soporte", resource: "Rey Demonio" },
    DEMONR: { objective: "Rey Demonio Montaraz, Daño Héroe Brujo +50%, 4 DPS + 1 Soporte", resource: "Rey Demonio" },
    DEMONZ: { objective: "Rey Demonio Brujo, Daño Héroe Guerrero +50%, 4 DPS + 1 Soporte", resource: "Rey Demonio" },
    BSBUILD: { objective: "★ Insignias de Habilidad, Oportunidad al Terminar Construcciones [subir 30.000 poder] ó Acelerar [50H]", resource: "Edificios" },
    BSHERO: { objective: "★ Insignias de Habilidad, Oportunidad al Usar [23.4M] Antitoxinas ó [30] Tickets de Héroe", resource: "Heroes" },
    BSRAVEN: { objective: "★ Insignias de Habilidad, Oportunidad de usar Stamina/Energía en [15] Rallys ó Fruta de Cuervo", resource: "Cuervo" },
    BSSOLDIER: { objective: "★ Insignias de Habilidad, Oportunidad de entrenar [2.800] Soldados ó Acelerar [17H] Entrenamiento", resource: "Soldados" },
    BSTECH: { objective: "★ Insignias de Habilidad, Oportunidad al Terminar Investigación [subir 30.000 poder] ó Acelerar [50H]", resource: "Investigación" },
    BSTRAIN: { objective: "Consejo: Tiempo de Entrenamiento Optimo {time}, hasta la proxima Batalla de Supervivencia Tema Soldados", resource: "Soldados" },
    OFFBUILD: { objective: "Próxima Batalla Supervivencia, Terminar Construcciones [subir 30.000 poder] ó Acelerar [50H] Construcción", resource: "Edificios" },
    OFFHERO: { objective: "Próxima Batalla Supervivencia, Usar [23.4M] Antitoxinas ó [30] Tickets de Héroe", resource: "Heroes" },
    OFFRAVEN: { objective: "Próxima Batalla Supervivencia, Usar Stamina/Energía en [15] Rallys ó Fruta de Cuervo", resource: "Cuervo" },
    OFFSOLDIER: { objective: "Próxima Batalla Supervivencia, Entrenar [2.800] Soldados ó Acelerar [17H] Entrenamiento", resource: "Soldados" },
    OFFTECH: { objective: "Próxima Batalla Supervivencia, Terminar Investigación [subir 30.000 poder] ó Acelerar [50H] Investigación", resource: "Investigación" }
  };

  for (const [code, values] of Object.entries(expected)) {
    assert.deepEqual({ ...activities[code] }, values, code);
  }
});

test("todas las traducciones de actividades cubren los codigos canonicos", () => {
  const i18n = loadI18n("actividades-diarias");
  const canonicalCodes = Object.keys(i18n.es.adActivities);
  assert.equal(canonicalCodes.length, 63);

  for (const lang of languages) {
    const activities = i18n[lang].adActivities;
    assert.equal(Object.keys(activities).length, canonicalCodes.length, lang);
    for (const code of canonicalCodes) {
      assert.equal(typeof activities[code].objective, "string", `${lang}/${code}`);
      assert.equal(typeof activities[code].resource, "string", `${lang}/${code}`);
    }
  }
});
