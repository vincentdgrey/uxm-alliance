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
    interval: () => intervalCallback,
    update(nextNowMs) {
      currentNowMs = nextNowMs;
      if (intervalCallback) intervalCallback();
    }
  };
}

function phaseTitles(result) {
  return findByClass(result.lists, "ad-title-phase").map((el) => el.textContent);
}

test("la fase actual muestra el tiempo restante hasta el reset de las 00:00:00 UTC-2", () => {
  const cases = [
    { time: "2026-11-10T12:00:00Z", expected: "T-14:00:00" },
    { time: "2026-11-10T12:34:56Z", expected: "T-13:25:04" },
    { time: "2026-11-11T01:59:59Z", expected: "T-00:00:01" }
  ];

  for (const item of cases) {
    const result = render(Date.parse(item.time));
    const titles = phaseTitles(result);
    assert.match(titles[0], new RegExp("\\s" + item.expected + "$"), item.time);
  }
});

test("la cuenta atras comienza en 24 horas al iniciar la fase", () => {
  const result = render(Date.parse("2026-11-10T02:00:00Z"));
  assert.match(phaseTitles(result)[0], /T-24:00:00$/);
});

test("los paneles futuros no muestran contador de final de fase", () => {
  const result = render(Date.parse("2026-11-10T12:00:00Z"));
  const titles = phaseTitles(result);

  assert.equal(titles.length, 7);
  for (let i = 1; i < titles.length; i++) {
    assert.doesNotMatch(titles[i], /T-\d{2}:\d{2}:\d{2}/, "panel futuro " + i);
  }
});

test("el contador de fase se actualiza cada segundo con el temporizador compartido", () => {
  let nowMs = Date.parse("2026-11-10T12:00:00Z");
  const result = render(nowMs);
  assert.match(phaseTitles(result)[0], /T-14:00:00$/);

  nowMs += 1000;
  result.update(nowMs);
  assert.match(phaseTitles(result)[0], /T-13:59:59$/);
});

test("al cruzar el reset se reconstruye el calendario con la nueva fase", () => {
  let nowMs = Date.parse("2026-11-11T01:59:59Z");
  const result = render(nowMs);
  assert.match(phaseTitles(result)[0], /T-00:00:01$/);

  nowMs += 1000;
  result.update(nowMs);
  const titlesAfterReset = phaseTitles(result);
  assert.ok(titlesAfterReset.length >= 1);
  assert.match(titlesAfterReset[0], /T-00:00:01$/);
});
