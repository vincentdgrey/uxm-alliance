const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const appSource = read("js/app.js");

/* Ejecuta js/app.js sobre un DOM simulado y devuelve los trazos del canvas.
   El cover se identifica por sus clases para que el modulo decida el perfil
   de rayo de la portada o de las subpaginas. */
function runLightning({ width, height, subpage, frames = 420 }) {
  const strokes = [];
  const fills = [];
  let current = null;

  const context2d = {
    globalAlpha: 1,
    strokeStyle: "",
    lineWidth: 1,
    fillStyle: "",
    shadowColor: "",
    shadowBlur: 0,
    lineCap: "",
    lineJoin: "",
    globalCompositeOperation: "source-over",
    setTransform() {},
    save() {},
    restore() {},
    beginPath() {},
    moveTo(x, y) { current = { from: { x, y }, to: null }; },
    lineTo(x, y) { current.to = { x, y }; },
    stroke() {
      if (current) {
        strokes.push({
          width: context2d.lineWidth,
          color: context2d.strokeStyle,
          from: current.from,
          to: current.to
        });
      }
      current = null;
    },
    clearRect() {},
    fillRect() {
      fills.push({ color: context2d.fillStyle, operation: context2d.globalCompositeOperation });
    }
  };

  const canvas = {
    width: 0,
    height: 0,
    style: {},
    className: "",
    attributes: {},
    setAttribute(key, value) { this.attributes[key] = value; },
    getContext() { return context2d; }
  };

  const coverClasses = subpage ? "subpage-content subpage-rules" : "home-content";
  const cover = {
    clientWidth: width,
    clientHeight: height,
    className: coverClasses,
    firstChild: null,
    insertBefore(node) { this.firstChild = node; },
    classList: { contains(name) { return coverClasses.split(" ").indexOf(name) >= 0; } }
  };

  let frameCallback = null;
  const win = {
    devicePixelRatio: 1,
    location: { pathname: "/index.html", search: "" },
    navigator: { language: "es" },
    matchMedia: (query) => ({ matches: false, media: query }),
    requestAnimationFrame(callback) { frameCallback = callback; return 1; },
    cancelAnimationFrame() { frameCallback = null; },
    addEventListener() {},
    setTimeout() {},
    ResizeObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } },
    IntersectionObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } }
  };

  const documentStub = {
    documentElement: { lang: "", setAttribute() {} },
    getElementById() { return null; },
    querySelector(selector) { return selector.indexOf("home-content") >= 0 ? cover : null; },
    createElement(tag) { return tag === "canvas" ? canvas : { tagName: tag }; },
    querySelectorAll() { return []; },
    body: { classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } } },
    addEventListener() {}
  };

  const sandbox = {
    window: win,
    document: documentStub,
    navigator: win.navigator,
    console,
    Math,
    Date,
    JSON,
    fetch() { return Promise.reject(new Error("sin red")); }
  };
  sandbox.window.I18N = {
    en: { welcome: "w", name: "English", language: "Language" },
    es: { welcome: "w", name: "Espanol", language: "Idioma" }
  };
  sandbox.window.sessionStorage = { getItem() { return null; }, setItem() { return true; } };
  sandbox.window.localStorage = { getItem() { return null; }, setItem() { return true; } };

  vm.createContext(sandbox);
  vm.runInContext(appSource, sandbox);

  let time = 0;
  for (let frame = 0; frame < frames; frame++) {
    time += 16;
    const callback = frameCallback;
    frameCallback = null;
    if (callback) callback(time);
  }

  return { strokes, fills, cover, canvas };
}

const profiles = [
  { label: "portada", width: 1440, height: 900, subpage: false },
  { label: "subpagina", width: 1440, height: 420, subpage: true },
  { label: "subpagina movil", width: 390, height: 360, subpage: true }
];

for (const profile of profiles) {
  test("el rayo de la " + profile.label + " nace en el borde superior y nunca retrocede", () => {
    const { strokes } = runLightning(profile);
    const drawn = strokes.filter((stroke) => stroke.to);

    assert.ok(drawn.length > 0, "debe dibujarse algun segmento");

    const regressions = drawn.filter((stroke) => stroke.to.y < stroke.from.y - 0.001);
    assert.equal(regressions.length, 0, "ningun segmento puede retroceder verticalmente");

    const startY = Math.min(...drawn.map((stroke) => stroke.from.y));
    assert.ok(startY <= 0.001, "el rayo debe comenzar en el borde superior");
  });

  test("el rayo de la " + profile.label + " se mantiene dentro del cover", () => {
    const { strokes } = runLightning(profile);
    const drawn = strokes.filter((stroke) => stroke.to);

    for (const stroke of drawn) {
      assert.ok(stroke.to.x >= -0.5, "el punto no sale por la izquierda");
      assert.ok(stroke.to.x <= profile.width + 0.5, "el punto no sale por la derecha");
      assert.ok(stroke.to.y >= -0.5, "el punto no sale por arriba");
    }
  });

  test("el rayo de la " + profile.label + " empieza grueso y termina en punta", () => {
    const { strokes } = runLightning(profile);
    const drawn = strokes.filter((stroke) => stroke.to);
    const widths = drawn.map((stroke) => stroke.width);

    assert.ok(Math.max(...widths) >= 3, "la base del rayo debe ser gruesa");
    assert.ok(Math.min(...widths) <= 1, "la punta del rayo debe ser fina");

    /* El grosor del primer segmento supera al del ultimo. */
    const first = drawn[0].width;
    const last = drawn[drawn.length - 1].width;
    assert.ok(first > last, "el rayo debe adelgazar hacia su final");
  });

  test("el destello inicial de la " + profile.label + " usa el azul del ejemplo y decae", () => {
    const { fills } = runLightning(profile);
    const flashes = fills
      .map((fill) => {
        const match = String(fill.color).match(/rgba\(80,\s*180,\s*255,\s*([0-9.]+)\)/);
        return match ? parseFloat(match[1]) : null;
      })
      .filter((value) => value !== null);

    assert.ok(flashes.length > 0, "debe existir el destello azul inicial");
    assert.ok(Math.max(...flashes) >= 0.3, "el destello debe ser notorio");
    assert.ok(Math.min(...flashes) < 0.05, "el destello debe desvanecerse");
  });

  test("la " + profile.label + " conserva las estelas sin borrar el canvas en cada frame", () => {
    const { fills } = runLightning(profile);
    const fades = fills.filter((fill) => fill.operation === "destination-out");

    assert.ok(fades.length > 0, "las estelas deben desvanecerse con destination-out");
  });
}

test("el rayo del cover no usa figuras geometricas ni sonido", () => {
  assert.doesNotMatch(appSource, /createRadialGradient/);
  assert.doesNotMatch(appSource, /arc\(/);
  assert.doesNotMatch(appSource, /AudioContext|createOscillator|<audio/i);
});

test("el rayo del cover no altera el alto de la seccion", () => {
  const css = read("css/style.css");

  /* El canvas es absoluto: no participa del flujo del documento. */
  assert.match(css, /\.cover-lightning\s*\{[^}]*position:\s*absolute/s);
  assert.match(css, /\.cover-lightning\s*\{[^}]*pointer-events:\s*none/s);
  assert.doesNotMatch(css, /\.cover-lightning\s*\{[^}]*position:\s*static/s);
});
