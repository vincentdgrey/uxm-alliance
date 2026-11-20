const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

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
const cssFiles = [
  "css/style.css",
  "css/activities-daily.css",
  "css/reino.css",
  "css/estrategia.css"
];
const jsFiles = [
  "js/app.js",
  "js/i18n.js",
  "js/activities-daily.js",
  "js/reino.js",
  "js/reino-castle.js",
  "js/alliance-bonuses.js",
  "js/strategy-library.js",
  "js/video-cards.js"
];

/* Identificadores tecnicos heredados que ya no deben reaparecer.
   La lista mantiene la regla de nomenclatura en el tiempo. */
const legacyIdentifiers = [
  "objetive",
  "arengaTitle",
  "arengaMessage",
  "block-content-destacated",
  "dinamic-welcome",
  "message-arenga",
  "block-booksmarks",
  "text-video-learnig",
  "banner-divisor",
  "line-divisor-"
];

/* Identificadores que solo pueden aparecer como palabra completa. */
const legacyWholeWords = [
  "ad-obj"
];

/* Identificadores en espanol que solo deben existir en textos visibles. */
const legacyJsIdentifiers = [
  "arengaTitle",
  "arengaMessage",
  "objetive"
];

test("ningun archivo activo usa los identificadores tecnicos heredados", () => {
  const files = [...htmlFiles, ...cssFiles, ...jsFiles];
  for (const file of files) {
    const source = read(file);
    for (const legacy of legacyIdentifiers) {
      assert.ok(
        !source.includes(legacy),
        file + " no debe contener el identificador heredado " + legacy
      );
    }
    for (const legacy of legacyWholeWords) {
      const pattern = new RegExp("(?<![\\w-])" + legacy + "(?![\\w-])");
      assert.ok(
        !pattern.test(source),
        file + " no debe contener el identificador heredado " + legacy
      );
    }
  }
});

test("las clases CSS propias siguen el formato kebab-case en minusculas", () => {
  for (const file of cssFiles) {
    const source = read(file);
    const selectors = source.match(/\.[_a-zA-Z][_a-zA-Z0-9-]*/g) || [];
    for (const selector of selectors) {
      const name = selector.slice(1);
      /* Se excluyen los decimales y los nombres propios de librerias externas. */
      if (!/^[a-z]/.test(name)) continue;
      assert.match(
        name,
        /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
        file + " declara la clase ." + name + " fuera del formato kebab-case"
      );
    }
  }
});

test("los identificadores JavaScript no contienen palabras en espanol", () => {
  for (const file of jsFiles) {
    const source = read(file);
    for (const legacy of legacyJsIdentifiers) {
      assert.ok(
        !source.includes(legacy),
        file + " no debe declarar el identificador " + legacy
      );
    }
    /* Los identificadores declarados no usan tildes ni caracteres no ASCII. */
    const declarations = source.match(/\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g) || [];
    for (const declaration of declarations) {
      const name = declaration.split(/\s+/).pop();
      assert.match(
        name,
        /^[A-Za-z_$][A-Za-z0-9_$]*$/,
        file + " declara el identificador no permitido " + name
      );
    }
  }
});

test("las clases HTML propias no usan el prefijo searchEngine en camelCase", () => {
  for (const file of htmlFiles) {
    const source = read(file);
    const classes = source.match(/class="([^"]*)"/g) || [];
    for (const attribute of classes) {
      const value = attribute.replace(/^class="/, "").replace(/"$/, "");
      for (const name of value.split(/\s+/)) {
        if (!name) continue;
        assert.ok(
          !name.includes("searchEngine-"),
          file + " usa la clase heredada " + name
        );
      }
    }
  }
});

test("las clases CSS del buscador usan el prefijo kebab-case search-engine", () => {
  /* Solo se revisan las clases: los identificadores DOM mantienen camelCase. */
  for (const file of [cssFiles[3], "js/strategy-library.js", "js/app.js"]) {
    const source = read(file);
    const classes = source.match(/class(?:Name)?\s*=\s*"([^"]*)"/g) || [];
    for (const attribute of classes) {
      const value = attribute.replace(/^.*=\s*"/, "").replace(/"$/, "");
      for (const name of value.split(/\s+/)) {
        if (!name) continue;
        assert.ok(
          !name.includes("searchEngine-"),
          file + " usa la clase heredada " + name
        );
      }
    }
    const selectors = source.match(/\.[_a-zA-Z][_a-zA-Z0-9-]*/g) || [];
    for (const selector of selectors) {
      assert.ok(
        !selector.includes("searchEngine-"),
        file + " usa el selector heredado " + selector
      );
    }
  }
});
