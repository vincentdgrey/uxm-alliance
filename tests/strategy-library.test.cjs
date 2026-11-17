const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const readJson = (file) => JSON.parse(read(file));

const languages = ["es", "en", "pt", "it", "fr", "ja", "ru", "zh", "tr"];

const libraryFiles = fs
  .readdirSync(path.join(root, "db/library"))
  .filter((file) => file.endsWith(".json") && file !== "index.json")
  .sort();

test("el indice de la biblioteca lista los archivos de tema existentes", () => {
  const index = readJson("db/library/index.json");

  assert.ok(Array.isArray(index.files), "index.json necesita una lista de archivos");
  assert.ok(index.files.length > 0, "el indice no puede estar vacio");

  for (const file of index.files) {
    assert.ok(
      fs.existsSync(path.join(root, "db/library", file)),
      `el indice referencia ${file} y el archivo debe existir`
    );
  }

  for (const file of libraryFiles) {
    assert.ok(index.files.includes(file), `${file} debe estar en el indice`);
  }
});

test("cada tema declara la estructura minima de la biblioteca", () => {
  for (const file of libraryFiles) {
    const topic = readJson(path.join("db/library", file));

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

test("los identificadores de tema son unicos", () => {
  const ids = libraryFiles.map((file) => readJson(path.join("db/library", file)).id);

  assert.equal(new Set(ids).size, ids.length, "no puede haber ids repetidos");
});

test("los titulos en español son los temas base de la biblioteca", () => {
  const titles = libraryFiles
    .map((file) => readJson(path.join("db/library", file)))
    .sort((a, b) => a.order - b.order)
    .map((topic) => topic.title.es);

  assert.deepEqual(
    titles,
    ["Héroes", "Novatos", "Guerra de Reinos", "Duelo de Alianzas"],
    "los temas base se mantienen en el orden planificado"
  );
});

test("los temas se ordenan por order y de forma alfabetica en el desempate", () => {
  const topics = libraryFiles.map((file) => readJson(path.join("db/library", file)));

  const sorted = topics.slice().sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.es.localeCompare(b.title.es, "es");
  });

  assert.deepEqual(
    sorted.map((topic) => topic.id),
    ["hero", "rookie", "kingdom-war", "alliance-duel"]
  );
});

test("la pagina de estrategia carga su script de biblioteca", () => {
  const html = read("pages/estrategia.html");

  assert.match(html, /<script src="\.\.\/js\/strategy-library\.js"><\/script>/);
  assert.match(html, /class="searchEngine-elements row g-4"/);
  assert.match(html, /id="searchEngineTopics"/);
  assert.match(html, /id="searchEngineTree"/);
  assert.match(html, /id="searchEngineContents"/);
});

test("el buscador separa el campo de busqueda y el arbol de temas", () => {
  const html = read("pages/estrategia.html");

  assert.match(html, /col-12 col-lg-6 searchEngine-panel/);
  assert.equal((html.match(/col-12 col-lg-6 searchEngine-panel/g) || []).length, 2);
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

test("los estilos de la biblioteca estan definidos", () => {
  const css = read("css/style.css");

  for (const selector of [
    /\.searchEngine-elements/,
    /\.searchEngine-panel/,
    /\.searchEngine-tree-list/,
    /\.searchEngine-topics-list/,
    /\.searchEngine-contents/,
    /\.searchEngine-article/,
    /\.searchEngine-section-media/,
    /\.searchEngine-image/
  ]) {
    assert.match(css, selector);
  }
});
