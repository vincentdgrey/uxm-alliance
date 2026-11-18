const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const readJson = (file) => JSON.parse(read(file));

const languages = ["es", "en", "pt", "it", "fr", "ja", "ru", "zh", "tr"];
const libraryRoot = path.join(root, "db/library");
const groupFiles = fs
  .readdirSync(libraryRoot)
  .filter((file) => file.endsWith(".json") && file !== "index.json")
  .sort();

function readGroup(file) {
  return readJson(path.join("db/library", file));
}

function readTopic(file) {
  return readJson(path.join("db/library", file));
}

function topicFiles() {
  const files = [];
  for (const groupFile of groupFiles) {
    const group = readGroup(groupFile);
    for (const topicFile of group.topics || []) files.push(topicFile);
  }
  return files;
}

test("el indice de la biblioteca lista los manifiestos de grupo existentes", () => {
  const index = readJson("db/library/index.json");

  assert.ok(Array.isArray(index.files), "index.json necesita una lista de archivos");
  assert.ok(index.files.length > 0, "el indice no puede estar vacio");

  for (const file of index.files) {
    assert.ok(
      fs.existsSync(path.join(libraryRoot, file)),
      `el indice referencia ${file} y el archivo debe existir`
    );
  }

  for (const file of groupFiles) {
    assert.ok(index.files.includes(file), `${file} debe estar en el indice`);
  }
});

test("cada grupo declara su estructura y referencia temas existentes", () => {
  for (const file of groupFiles) {
    const group = readGroup(file);

    assert.equal(typeof group.id, "string", `${file} necesita id`);
    assert.ok(group.id.length > 0, `${file} necesita id`);
    assert.equal(typeof group.order, "number", `${file} necesita order`);
    assert.ok(Array.isArray(group.topics), `${file} necesita topics`);

    for (const language of languages) {
      assert.equal(typeof group.title[language], "string", `${file}/${language} necesita title`);
    }

    for (const topicFile of group.topics) {
      assert.ok(
        fs.existsSync(path.join(libraryRoot, topicFile)),
        `${file} referencia ${topicFile} y el archivo debe existir`
      );
    }
  }
});

test("cada tema declara la estructura minima de la biblioteca", () => {
  for (const file of topicFiles()) {
    const topic = readTopic(file);

    assert.equal(typeof topic.id, "string", `${file} necesita id`);
    assert.ok(topic.id.length > 0, `${file} necesita id`);
    assert.equal(typeof topic.order, "number", `${file} necesita order`);
    assert.ok(Array.isArray(topic.sections), `${file} necesita sections`);
    assert.ok(Array.isArray(topic.keywords.es), `${file} necesita keywords por idioma`);
    assert.ok(Array.isArray(topic.keywords.en), `${file} necesita keywords por idioma`);

    for (const language of languages) {
      assert.equal(typeof topic.title[language], "string", `${file}/${language} necesita title`);
      assert.equal(typeof topic.summary[language], "string", `${file}/${language} necesita summary`);
      assert.ok(Array.isArray(topic.keywords[language]), `${file}/${language} necesita keywords`);
    }
  }
});

test("los identificadores de grupo y tema son unicos", () => {
  const groupIds = groupFiles.map((file) => readGroup(file).id);
  const topicIds = topicFiles().map((file) => readTopic(file).id);

  assert.equal(new Set(groupIds).size, groupIds.length, "no puede haber ids de grupo repetidos");
  assert.equal(new Set(topicIds).size, topicIds.length, "no puede haber ids de tema repetidos");
});

test("todos los archivos de tema de la biblioteca estan referenciados por un grupo", () => {
  const referenced = new Set(topicFiles());
  const stored = [];

  for (const entry of fs.readdirSync(libraryRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    for (const file of fs.readdirSync(path.join(libraryRoot, entry.name))) {
      if (file.endsWith(".json")) stored.push(`${entry.name}/${file}`);
    }
  }

  assert.deepEqual(stored.sort(), Array.from(referenced).sort());
});

test("los grupos y temas iniciales mantienen el orden planificado", () => {
  const groups = groupFiles
    .map((file) => readGroup(file))
    .sort((a, b) => a.order - b.order);
  const topics = groups.flatMap((group) =>
    group.topics
      .map((file) => readTopic(file))
      .sort((a, b) => a.order - b.order)
  );

  assert.deepEqual(
    groups.map((group) => group.title.es),
    ["Hero", "Novatos", "Guerra de Reinos", "Duelo de Alianza"]
  );

  assert.deepEqual(
    topics.map((topic) => topic.title.es),
    [
      "Facciones",
      "Equipamiento",
      "Habilidades",
      "Clases",
      "Onboarding",
      "Normas",
      "Caravanas",
      "Incursiones",
      "Donar",
      "Rallys",
      "Equipamiento",
      "Buscador de Tesoros",
      "Escudos",
      "Ataque a Reinos",
      "Defensa del Reino",
      "Reserva",
      "Mejorar del Cuervo",
      "Desarrollo del Territorio",
      "Investigación Tecnológica",
      "Crecimiento de Héroes",
      "Preparación para la Guerra",
      "Asalto al Enemigo"
    ]
  );
});

test("cada grupo y cada tema declaran su fecha de actualizacion", () => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  for (const file of groupFiles) {
    const group = readGroup(file);

    assert.equal(typeof group.updated, "string", `${file} necesita updated`);
    assert.match(group.updated, datePattern, `${file} necesita una fecha YYYY-MM-DD`);
    assert.ok(!isNaN(Date.parse(group.updated)), `${file} necesita una fecha valida`);
  }

  for (const file of topicFiles()) {
    const topic = readTopic(file);

    assert.equal(typeof topic.updated, "string", `${file} necesita updated`);
    assert.match(topic.updated, datePattern, `${file} necesita una fecha YYYY-MM-DD`);
    assert.ok(!isNaN(Date.parse(topic.updated)), `${file} necesita una fecha valida`);
  }
});

test("el render muestra la fecha de actualizacion como elemento time", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /function updatedDate\(source\)/);
  assert.match(js, /function formatUpdated\(value\)/);
  assert.match(js, /function renderUpdated\(source, className\)/);
  assert.match(js, /element\("time", "searchEngine-updated-date"/);
  assert.match(js, /time\.setAttribute\("datetime", value\)/);
  /* La fecha se formatea en el idioma activo y siempre en UTC. */
  assert.match(js, /timeZone:\s*"UTC"/);
  assert.match(js, /renderUpdated\(topic, "searchEngine-updated searchEngine-topic-updated"\)/);
  assert.match(js, /renderUpdated\(group, "searchEngine-updated searchEngine-tree-group-updated"\)/);
});

test("la etiqueta de la fecha de actualizacion esta traducida en los nueve idiomas", () => {
  const i18n = read("js/i18n/estrategia/i18n.js");
  const found = i18n.match(/searchEngineUpdated:"[^"]*"/g) || [];

  assert.equal(found.length, 9, "searchEngineUpdated debe existir en los 9 idiomas");
});

test("la biblioteca strategies declara los estilos de la fecha", () => {
  const css = read("css/estrategia.css");

  assert.match(css, /\.searchEngine-updated\s*\{/);
  assert.match(css, /\.searchEngine-updated-date\s*\{/);
  assert.match(css, /\.searchEngine-tree-group-updated\s*\{/);
});

test("la pagina de estrategia carga su script y su hoja de estilos propios", () => {
  const html = read("pages/estrategia.html");

  assert.match(html, /<script src="\.\.\/js\/strategy-library\.js"><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\.\.\/css\/estrategia\.css">/);
  assert.match(html, /class="searchEngine-elements row g-4"/);
  assert.match(html, /id="searchEngineTopics"/);
  assert.match(html, /id="searchEngineTree"/);
  assert.match(html, /id="searchEngineContents"/);
});

test("el buscador separa el campo de busqueda y el arbol de temas", () => {
  const html = read("pages/estrategia.html");

  assert.match(html, /col-6 col-lg-6 searchEngine-panel/);
  assert.equal((html.match(/col-6 col-lg-6 searchEngine-panel/g) || []).length, 2);
  assert.match(html, /<input type="search" class="form-control" id="searchEngineInput"/);
  assert.match(html, /role="status" aria-live="polite"/);
});

test("el script de la biblioteca no inserta html desde los datos", () => {
  const js = read("js/strategy-library.js");

  assert.doesNotMatch(js, /\.innerHTML\s*=/);
  assert.match(js, /textContent/);
  assert.match(js, /fetchJson\(INDEX_FILE\)/);
  assert.match(js, /LIBRARY_BASE = "\.\.\/db\/library\/"/);
});

test("la busqueda ignora mayusculas y diacriticos", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /normalize\("NFD"\)/);
  assert.match(js, /\[\\u0300-\\u036f\]/g);
  assert.match(js, /indexOf\(needle\)/);
});

test("el render localiza listas por idioma y aplana los mapas", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /function localizeList\(field\)/);
  assert.match(js, /function flatten\(field\)/);
  assert.match(js, /searchEngine-paragraph/);
  assert.match(js, /searchEngine-list/);
  assert.match(js, /img\.loading = "lazy"/);
});

test("la busqueda recorre el texto de las secciones", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /function sectionText\(section\)/);
  assert.match(js, /entry\.sections\[i\]\.text\.indexOf\(needle\)/);
  assert.match(js, /flatten\(section\.paragraphs\)/);
  assert.match(js, /flatten\(section\.items\)/);
});

test("la localizacion admite cadenas y listas en los mapas por idioma", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /function localizeList\(field\)/);
  assert.match(js, /if \(Array\.isArray\(value\) && value\.length\) return value\.join\(" "\)/);
  assert.match(js, /return value\.map\(String\)/);
});

test("los textos de la biblioteca estan traducidos en los nueve idiomas", () => {
  const i18n = read("js/i18n/estrategia/i18n.js");
  const keys = [
    "searchEngineTitle",
    "searchEngineTopicsLabel",
    "searchEngineSearchLabel",
    "searchEngineSearchPlaceholder",
    "searchEngineClear",
    "searchEngineTreeTitle",
    "searchEngineInitial",
    "searchEngineLoading",
    "searchEngineLoadError",
    "searchEngineNoResults",
    "searchEngineResults",
    "searchEngineTopicEmpty"
  ];

  for (const key of keys) {
    const found = i18n.match(new RegExp(`${key}:"[^"]*"`, "g")) || [];
    assert.equal(found.length, 9, `${key} debe existir en los 9 idiomas`);
  }

  assert.match(i18n, /pageStrategyTitle:"Biblioteca Estratégica"/);
});

test("los estilos de la biblioteca estan definidos en su hoja propia", () => {
  const css = read("css/estrategia.css");

  for (const selector of [
    /\.searchEngine-elements/,
    /\.searchEngine-panel/,
    /\.searchEngine-tree-list/,
    /\.searchEngine-tree-group/,
    /\.searchEngine-tree-topic/,
    /\.searchEngine-topics-list/,
    /\.searchEngine-contents/,
    /\.searchEngine-article/,
    /\.searchEngine-section-media/,
    /\.searchEngine-image/
  ]) {
    assert.match(css, selector);
  }
});

test("el arbol de grupos es accesible y permite expandir las carpetas", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /aria-expanded/);
  assert.match(js, /aria-controls/);
  assert.match(js, /searchEngine-tree-group/);
  assert.match(js, /searchEngine-tree-topic/);
  assert.match(js, /subList\.hidden\s*=\s*!expanded/);
});

test("los grupos del arbol empiezan contraidos y sus temas ocultos", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /var expanded = false/);
  assert.match(js, /subList\.hidden\s*=\s*!expanded/);
});

test("el arbol de temas limita su alto y permite desplazamiento vertical", () => {
  const css = read("css/estrategia.css");

  assert.match(css, /#searchEngineTree\s*\{[^}]*max-height:\s*250px/s);
  assert.match(css, /#searchEngineTree\s*\{[^}]*overflow-y:\s*auto/s);
});

test("los temas de acceso rapido se muestran como enlaces textuales sin estilo de boton", () => {
  const js = read("js/strategy-library.js");
  const css = read("css/estrategia.css");

  assert.match(js, /element\("button", "searchEngine-topic"/);
  assert.doesNotMatch(js, /element\("button", "btn btn-outline-primary searchEngine-topic"/);
  assert.match(css, /\.searchEngine-topic\s*\{[^}]*border:\s*0/s);
  assert.match(css, /\.searchEngine-topic\s*\{[^}]*background:\s*transparent/s);
});

test("al seleccionar un tema se expande su grupo para mostrarlo", () => {
  const js = read("js/strategy-library.js");

  assert.match(js, /function expandTopicGroup\(id\)/);
  assert.match(js, /topic\.group\.setExpanded\(true\)/);
  assert.match(js, /expandTopicGroup\(id\)/);
});
