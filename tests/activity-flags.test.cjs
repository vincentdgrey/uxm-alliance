const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function makeEl(tag) {
  const el = {
    tagName: (tag || "").toUpperCase(),
    children: [],
    _cls: new Set(),
    _text: "",
    style: {},
    attributes: {},
    hidden: false,
    classList: {
      add(c) { el._cls.add(c); },
      remove(c) { el._cls.delete(c); },
      contains(c) { return el._cls.has(c); },
      toggle(c, on) {
        if (on === undefined) {
          if (el._cls.has(c)) el._cls.delete(c);
          else el._cls.add(c);
        } else if (on) el._cls.add(c);
        else el._cls.delete(c);
      }
    },
    setAttribute(k, v) { el.attributes[k] = v; },
    getAttribute(k) { return el.attributes[k]; },
    appendChild(c) { el.children.push(c); return c; },
    addEventListener() {}
  };
  Object.defineProperty(el, "className", {
    get() { return [...this._cls].join(" "); },
    set(v) { this._cls = new Set(String(v).split(/\s+/).filter(Boolean)); }
  });
  Object.defineProperty(el, "textContent", {
    get() { return this._text; },
    set(v) { this._text = String(v); }
  });
  Object.defineProperty(el, "offsetWidth", { get() { return 100; } });
  return el;
}

function findByClass(node, className, output = []) {
  if (node.className && String(node.className).split(/\s+/).includes(className)) output.push(node);
  for (const child of node.children || []) findByClass(child, className, output);
  return output;
}

function render(nowMs) {
  const byId = {};
  const doc = {
    documentElement: { getAttribute() { return "es"; }, setAttribute() {}, lang: "" },
    createElement: makeEl,
    getElementById(id) { return byId[id] || null; },
    addEventListener() {}
  };
  byId["bs-body"] = makeEl("tbody");
  byId["bs-tzinfo"] = makeEl("div");
  byId["ad-lists"] = makeEl("div");

  const RealDate = Date;
  let intervalCallback = null;
  let currentNowMs = nowMs;
  const ctx = {
    document: doc,
    window: {
      I18N: null,
      location: { pathname: "/pages/actividades-diarias.html", search: "" },
      setTimeout, clearTimeout
    },
    Date: class extends RealDate {
      constructor(...args) {
        if (args.length === 0) super(currentNowMs);
        else super(...args);
      }
      static now() { return currentNowMs; }
    },
    Math, JSON, Object, String, Number, Array, isNaN, parseInt, parseFloat,
    setInterval: (callback) => { intervalCallback = callback; return 1; },
    clearInterval: () => {},
    Intl, console, encodeURIComponent
  };
  ctx.window.setTimeout = setTimeout;
  ctx.window.document = doc;
  vm.createContext(ctx);

  vm.runInContext(read("js/i18n.js"), ctx);
  vm.runInContext(read("js/i18n/actividades-diarias/i18n.js"), ctx);
  vm.runInContext(read("js/activities-daily.js"), ctx);

  return {
    lists: byId["ad-lists"],
    update(nextNowMs) {
      currentNowMs = nextNowMs;
      if (intervalCallback) intervalCallback();
    }
  };
}

function flaggedRows(result, flag) {
  return findByClass(result.lists, "ad-flag-" + flag);
}

function firstFlaggedRow(result, flag) {
  return flaggedRows(result, flag)[0];
}

function stateClasses(tr) {
  return ["ad-state-countdown", "ad-state-progress", "ad-state-normal"]
    .filter((name) => tr.classList.contains(name));
}

test("la columna Contador de las tablas de Actividades usa padding de 6px vertical y 4px horizontal", () => {
  const css = read("css/activities-daily.css");
  assert.match(css, /\.ad-schedule td\.ad-time\s*\{[^}]*padding:\s*6px 4px/s);
});

test("cada flag tiene una regla CSS para su columna y estado", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /tr\.ad-flag-1\.ad-state-countdown > td\.ad-time/);
  assert.match(css, /tr\.ad-flag-1\.ad-state-progress > td\.ad-time/);
  assert.match(css, /tr\.ad-flag-2\.ad-state-countdown > td\.ad-time/);
  assert.match(css, /tr\.ad-flag-2\.ad-state-progress > td\.ad-time/);
  assert.match(css, /tr\.ad-flag-3\.ad-state-countdown > td\.ad-time/);
  assert.match(css, /tr\.ad-flag-3\.ad-state-progress > td\.ad-time/);
  assert.match(css, /tr\.ad-flag-4\.ad-state-normal > td\.ad-obj/);
  assert.match(css, /tr\.ad-flag-5\.ad-state-normal > td\.ad-obj/);
});

test("los flags 1 a 3 aplican los colores solicitados en la columna Contador", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /ad-flag-1\.ad-state-countdown > td\.ad-time\s*\{[^}]*background-color:\s*#ffee00[^}]*color:\s*#8a0000/s);
  assert.match(css, /ad-flag-1\.ad-state-progress > td\.ad-time\s*\{[^}]*background-color:\s*#8a0000[^}]*color:\s*#fffb00/s);
  assert.match(css, /ad-flag-2\.ad-state-countdown > td\.ad-time\s*\{[^}]*background-color:\s*#00ccff65/s);
  assert.match(css, /ad-flag-2\.ad-state-progress > td\.ad-time\s*\{[^}]*background-color:\s*#00578a[^}]*color:\s*#00415f/s);
  assert.match(css, /ad-flag-3\.ad-state-countdown > td\.ad-time\s*\{[^}]*background-color:\s*#ffee00/s);
  assert.match(css, /ad-flag-3\.ad-state-progress > td\.ad-time\s*\{[^}]*background-color:\s*#006ec9[^}]*color:\s*#fff/s);
});

test("los flags 4 y 5 aplican los colores solicitados en la columna Tarea", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /ad-flag-4\.ad-state-normal > td\.ad-obj\s*\{[^}]*background-color:\s*#004e8d65[^}]*color:\s*#003d6e/s);
  assert.match(css, /ad-flag-5\.ad-state-normal > td\.ad-obj\s*\{[^}]*background-color:\s*#80808049[^}]*color:\s*#115a96/s);
});

test("las animaciones de los flags recorren los colores indicados y respetan movimiento reducido", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /@keyframes uxm-ad-flag-1-countdown\s*\{[\s\S]*?#ffee00[\s\S]*?#ffee002f[\s\S]*?#9b0000/);
  assert.match(css, /@keyframes uxm-ad-flag-1-progress\s*\{[\s\S]*?#8a0000[\s\S]*?#ff0000/);
  assert.match(css, /@keyframes uxm-ad-flag-2-progress\s*\{[\s\S]*?#00578a[\s\S]*?#00aeff/);
  assert.match(css, /@keyframes uxm-ad-flag-3-progress\s*\{[\s\S]*?#006fc96c[\s\S]*?#006ec9/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation:\s*none/);
});

test("el indicador flag actualiza los estados T-, + y normal del contador", () => {
  /* Viernes 13 de noviembre de 2026: SCRAMBLE comienza a las 12:00 UTC-2. */
  const before = Date.parse("2026-11-13T13:59:59Z");
  const result = render(before);
  const row = firstFlaggedRow(result, 1);

  assert.ok(row, "debe existir una fila con flag 1");
  assert.deepEqual(stateClasses(row), ["ad-state-countdown"]);
  assert.match(findByClass(row, "ad-time")[0].textContent, /^T-/);

  result.update(Date.parse("2026-11-13T14:00:00Z"));
  assert.deepEqual(stateClasses(row), ["ad-state-progress"]);
  assert.match(findByClass(row, "ad-time")[0].textContent, /^\+/);

  result.update(Date.parse("2026-11-13T15:00:00Z"));
  assert.deepEqual(stateClasses(row), ["ad-state-normal"]);
  assert.equal(findByClass(row, "ad-time")[0].textContent, "End");
});

test("las filas con flag conservan su clase y las filas sin flag no reciben estados", () => {
  const result = render(Date.parse("2026-11-13T14:00:00Z"));
  const rows = [];
  (function walk(node) {
    for (const child of node.children || []) {
      if (child.tagName === "TR") rows.push(child);
      walk(child);
    }
  })(result.lists);

  assert.ok(rows.some((row) => row.classList.contains("ad-flag-1")));
  assert.ok(rows.some((row) => row.classList.contains("ad-flag-3")));
  assert.ok(rows.some((row) => row.classList.contains("ad-flag-5")));
  assert.ok(rows.some((row) => !row.className.includes("ad-flag-")));
  assert.ok(rows.filter((row) => !row.className.includes("ad-flag-")).every((row) => stateClasses(row).length === 0));
});
