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
function runLightning({ width, height, subpage, frames = 420, instrument }) {
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

  /* Se usa una secuencia pseudoaleatoria fija: las comprobaciones sobre la
     forma del rayo no deben depender del azar real. */
  let seed = 20260124;
  const seededMath = Object.create(Math);
  seededMath.random = function () {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const sandbox = {
    global: {},
    window: win,
    document: documentStub,
    navigator: win.navigator,
    console,
    Math: seededMath,
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
  vm.runInContext(instrument ? instrument(appSource) : appSource, sandbox);

  let time = 0;
  for (let frame = 0; frame < frames; frame++) {
    time += 16;
    const callback = frameCallback;
    frameCallback = null;
    if (callback) callback(time);
  }

  return { strokes, fills, cover, canvas, sandbox };
}

/* Instrumenta el fuente para registrar cada rayo con su triangulo de
   propagacion: vertice, inclinacion, apertura, altura y ritmo. */
function trackGrowth(source) {
  return source
    .replace(
      "  function growLightningBolt(bolt) {",
      "  function growLightningBolt(bolt) {\n" +
      "    if (!global.__bolts) global.__bolts = [];\n" +
      "    if (!global.__index) global.__index = new Map();\n" +
      "    if (!global.__index.has(bolt)) {\n" +
      "      global.__index.set(bolt, global.__bolts.length);\n" +
      "      global.__bolts.push({\n" +
      "        points: [],\n" +
      "        apex: { x: bolt.apexX, y: bolt.apexY },\n" +
      "        tilt: bolt.tilt,\n" +
      "        coneAngle: bolt.coneAngle,\n" +
      "        height: bolt.height,\n" +
      "        stepMs: bolt.stepMs,\n" +
      "        isBranch: bolt.isBranch,\n" +
      "        group: bolt.group,\n" +
      "        branchPoints: bolt.branchPoints.length\n" +
      "      });\n" +
      "    }"
    )
    .replace(
      "    bolt.path.push({ x: next.x, y: next.y });",
      "    bolt.path.push({ x: next.x, y: next.y });\n" +
      "    global.__bolts[global.__index.get(bolt)].points.push({ x: next.x, y: next.y });"
    );
}

/* Instrumenta el fuente para seguir los grupos de descarga y comprobar que
   ninguna ramificacion sobrevive a su rayo principal. */
function trackGroups(source) {
  return source
    .replace(
      "    function frame(now) {",
      "    function frame(now) {\n" +
      "      if (!global.__orphans) global.__orphans = [];\n" +
      "      var __orphan = 0;\n" +
      "      for (var __i = 0; __i < bolts.length; __i++) {\n" +
      "        var __bolt = bolts[__i];\n" +
      "        if (__bolt.isBranch && (!__bolt.group || __bolt.group.fade <= 0)) __orphan++;\n" +
      "      }\n" +
      "      global.__orphans.push(__orphan);"
    )
    .replace(
      "          current.fading = true;",
      "          current.fading = true;\n" +
      "          if (!global.__fades) global.__fades = [];\n" +
      "          global.__fades.push({ branches: current.bolts.length, at: global.__now });"
    )
    .replace(
      "            group.mainComplete = true;",
      "            group.mainComplete = true;\n" +
      "            if (!global.__completed) global.__completed = [];\n" +
      "            global.__completed.push({ at: global.__now, branches: group.bolts.length });"
    )
    .replace(
      "    function frame(now) { global.__now = now;",
      "    function frame(now) { global.__now = now;"
    )
    .replace(
      "    function frame(now) {",
      "    function frame(now) { global.__now = global.__now || 0;"
    );
}

/* Instrumenta el fuente para registrar las descargas y sus ramificaciones. */
function trackDischarges(source) {
  return source
    .replace(
      "      bolts.push(bolt);",
      "      if (!global.__discharges) global.__discharges = [];\n" +
      "      if (!global.__now) global.__now = 0;\n" +
      "      global.__discharges.push({ branches: 0, branchPoints: bolt.branchPoints.length, at: global.__now, id: global.__discharges.length });\n" +
      "      bolt.testId = global.__discharges[global.__discharges.length - 1].id;\n" +
      "      bolts.push(bolt);"
    )
    .replace(
      "      branch.group = bolt.group || null;",
      "      if (bolt.testId !== undefined && global.__discharges[bolt.testId]) {\n" +
      "        global.__discharges[bolt.testId].branches++;\n" +
      "      }\n" +
      "      branch.group = bolt.group || null;"
    )
    .replace(
      "    function frame(now) {",
      "    function frame(now) { global.__now = now;"
    );
}

/* Comprueba que un punto pertenece al triangulo de propagacion del rayo. */
function pointInsideTriangle(bolt, point) {
  const axisX = Math.sin(bolt.tilt);
  const axisY = Math.cos(bolt.tilt);
  const normalX = Math.cos(bolt.tilt);
  const normalY = -Math.sin(bolt.tilt);
  const dx = point.x - bolt.apex.x;
  const dy = point.y - bolt.apex.y;
  const depth = dx * axisX + dy * axisY;
  const offset = dx * normalX + dy * normalY;
  const halfWidth = depth * Math.tan(bolt.coneAngle);
  return Math.abs(offset) <= halfWidth + 1;
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

  test("los puntos del rayo de la " + profile.label + " permanecen dentro de su triangulo", () => {
    const { sandbox } = runLightning({
      width: profile.width,
      height: profile.height,
      subpage: profile.subpage,
      frames: 1200,
      instrument: trackGrowth
    });

    const bolts = (sandbox.global.__bolts || []).filter((bolt) => bolt.points.length > 4);
    assert.ok(bolts.length > 0, "deben generarse rayos en " + profile.label);

    for (const bolt of bolts) {
      for (let i = 0; i < bolt.points.length; i++) {
        assert.ok(
          pointInsideTriangle(bolt, bolt.points[i]),
          "el punto debe quedar dentro del triangulo en " + profile.label
        );
        if (i > 0) {
          assert.ok(
            bolt.points[i].y > bolt.points[i - 1].y - 0.001,
            "el rayo nunca retrocede verticalmente en " + profile.label
          );
        }
      }
    }
  });

  test("el triangulo de la " + profile.label + " se abre con la profundidad", () => {
    const { sandbox } = runLightning({
      width: profile.width,
      height: profile.height,
      subpage: profile.subpage,
      frames: 1200,
      instrument: trackGrowth
    });

    const bolts = (sandbox.global.__bolts || []).filter((bolt) => bolt.points.length > 6);
    assert.ok(bolts.length > 0, "deben generarse rayos en " + profile.label);

    for (const bolt of bolts) {
      /* La apertura se mide en el sistema local del triangulo: es la
         distancia del eje, que crece con la profundidad. */
      const axisX = Math.sin(bolt.tilt);
      const axisY = Math.cos(bolt.tilt);
      const normalX = Math.cos(bolt.tilt);
      const normalY = -Math.sin(bolt.tilt);
      const local = bolt.points.map((point) => {
        const dx = point.x - bolt.apex.x;
        const dy = point.y - bolt.apex.y;
        return { depth: dx * axisX + dy * axisY, offset: dx * normalX + dy * normalY };
      });

      const third = Math.max(1, Math.floor(local.length / 3));
      const upper = local.slice(0, third);
      const lower = local.slice(-third);
      const upperDepth = Math.max(...upper.map((point) => point.depth));
      const lowerDepth = Math.max(...lower.map((point) => point.depth));

      assert.ok(
        lowerDepth > upperDepth,
        "la profundidad debe crecer a lo largo del recorrido en " + profile.label
      );

      /* El semiancho disponible crece con la profundidad, de modo que el
         recorrido puede apartarse mas del eje en la parte baja. */
      const lowerLimit = lowerDepth * Math.tan(bolt.coneAngle);
      const upperLimit = upperDepth * Math.tan(bolt.coneAngle);
      assert.ok(
        lowerLimit > upperLimit,
        "la seccion util debe abrirse con la profundidad en " + profile.label
      );
    }
  });
}

test("cada rayo crece dentro de un triangulo de propagacion propio", () => {
  /* El triangulo se define con vertice, altura, apertura e inclinacion. */
  assert.match(appSource, /apexX:/);
  assert.match(appSource, /apexY:/);
  assert.match(appSource, /tilt:/);
  assert.match(appSource, /coneAngle:/);
  assert.match(appSource, /LIGHTNING_CONE_MIN_ANGLE/);
  assert.match(appSource, /LIGHTNING_CONE_MAX_ANGLE/);
  assert.match(appSource, /LIGHTNING_TILT_MAX_DEGREES/);

  /* El desplazamiento lateral se limita al semiancho de la seccion. */
  assert.match(appSource, /function lightningConeWidth\(bolt\)/);
  assert.match(appSource, /function lightningLocalToScreen\(bolt, depth, offset\)/);

  /* No debe quedar la oscilacion regular anterior. */
  assert.doesNotMatch(appSource, /LIGHTNING_SPREAD_MIN_FACTOR/);
  assert.doesNotMatch(appSource, /LIGHTNING_SPREAD_MAX_FACTOR/);
  assert.doesNotMatch(appSource, /bolt\.side = -bolt\.side;\s*\n\s*\n\s*\/\* La linea central/);
});

test("cada rayo tiene una inclinacion y una apertura propias", () => {
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 2400,
    instrument: trackGrowth
  });

  const bolts = (sandbox.global.__bolts || []).filter((bolt) => bolt.points.length > 4);
  const tilts = new Set(bolts.map((bolt) => bolt.tilt.toFixed(4)));
  const cones = new Set(bolts.map((bolt) => bolt.coneAngle.toFixed(4)));

  assert.ok(tilts.size > 1, "los rayos deben inclinarse de forma distinta");
  assert.ok(cones.size > 1, "los rayos deben tener aperturas distintas");
});

test("el trazado no mantiene una alternancia lateral regular", () => {
  /* El patron de latido cardiaco aparecia cuando cada segmento cambiaba de
     lado obligatoriamente. Ahora hay corridas de igual direccion. */
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 2400,
    instrument: trackGrowth
  });

  const bolts = (sandbox.global.__bolts || []).filter((bolt) => bolt.points.length > 6);
  let withRun = 0;

  for (const bolt of bolts) {
    const signs = [];
    for (let i = 1; i < bolt.points.length; i++) {
      signs.push(Math.sign(bolt.points[i].x - bolt.points[i - 1].x));
    }
    let run = 1;
    let found = false;
    for (let i = 1; i < signs.length; i++) {
      if (signs[i] !== 0 && signs[i] === signs[i - 1]) {
        run++;
        if (run >= 2) found = true;
      } else {
        run = 1;
      }
    }
    if (found) withRun++;
  }

  assert.ok(
    withRun > 0,
    "los rayos deben presentar tramos en la misma direccion"
  );
});

test("cada descarga genera entre una y tres ramificaciones", () => {
  for (const profile of profiles) {
    const { sandbox } = runLightning({
      width: profile.width,
      height: profile.height,
      subpage: profile.subpage,
      frames: 2400,
      instrument: trackDischarges
    });

    const discharges = sandbox.global.__discharges || [];
    assert.ok(discharges.length > 1, "deben producirse varias descargas en " + profile.label);

    /* La ultima descarga puede seguir en curso: se verifican las completas. */
    const complete = discharges.slice(0, -1);
    for (const discharge of complete) {
      assert.ok(
        discharge.branches >= 1 && discharge.branches <= 3,
        "la descarga debe generar entre una y tres ramificaciones"
      );
      assert.ok(
        discharge.branches === discharge.branchPoints,
        "la descarga debe generar todas las ramificaciones planificadas"
      );
      assert.ok(
        discharge.branchPoints >= 1 && discharge.branchPoints <= 3,
        "la descarga debe planear entre una y tres ramificaciones"
      );
    }
  }
});

test("las ramificaciones son relampagos independientes con su propio triangulo", () => {
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 2400,
    instrument: trackGrowth
  });

  const bolts = sandbox.global.__bolts || [];
  const mains = bolts.filter((bolt) => !bolt.isBranch && bolt.points.length > 4);
  const branches = bolts.filter((bolt) => bolt.isBranch);

  assert.ok(mains.length > 0, "deben generarse relampagos principales");
  assert.ok(branches.length > 0, "deben generarse ramificaciones");

  /* Cada rama nace en un quiebre del relampago principal. */
  for (const branch of branches) {
    const parent = mains.find(
      (bolt) =>
        branch.apex.y >= bolt.apex.y &&
        branch.apex.y <= Math.max(...bolt.points.map((point) => point.y))
    );
    assert.ok(parent, "cada rama debe nacer dentro del recorrido de un rayo principal");
  }

  /* Las ramas tienen su propia inclinacion y su propio ritmo. */
  const branchTilts = new Set(branches.map((branch) => branch.tilt.toFixed(4)));
  const branchSteps = new Set(branches.map((branch) => branch.stepMs));
  assert.ok(branchTilts.size > 1, "las ramas deben inclinarse de forma distinta");
  assert.ok(branchSteps.size > 1, "las ramas deben crecer a distinta velocidad");
});

test("los relampagos nunca se inician al mismo tiempo", () => {
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 4000,
    instrument: trackDischarges
  });

  const discharges = sandbox.global.__discharges || [];
  assert.ok(discharges.length > 3, "deben repetirse las descargas");

  for (let i = 1; i < discharges.length; i++) {
    assert.ok(
      discharges[i].at > discharges[i - 1].at,
      "dos descargas nunca empiezan en el mismo instante"
    );
  }
});

test("ninguna ramificacion sobrevive a su relampago principal", () => {
  /* El grupo de descarga se apaga en bloque: cuando el rayo principal
     termina, sus ramificaciones dejan de crecer y se desvanecen con el. */
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 3000,
    instrument: trackGroups
  });

  const orphans = sandbox.global.__orphans || [];
  assert.ok(orphans.length > 0, "deben registrarse los frames de la simulacion");

  const maxOrphans = Math.max(...orphans);
  assert.equal(
    maxOrphans,
    0,
    "ninguna ramificacion puede quedar visible cuando su grupo ya se apago"
  );
});

test("el grupo de descarga se desvanece de forma coordinada", () => {
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 3000,
    instrument: trackGroups
  });

  const fades = sandbox.global.__fades || [];
  assert.ok(fades.length > 0, "deben producirse grupos que se apaguen");

  /* Cada grupo que se apaga conserva sus ramificaciones hasta el final. */
  for (const fade of fades) {
    assert.ok(fade.branches >= 1, "el grupo debe conservar sus miembros al apagarse");
  }

  /* El desvanecimiento se aplica a todo el grupo por igual. */
  assert.match(appSource, /LIGHTNING_GROUP_FADE_MS/);
  assert.match(appSource, /current\.fade = Math\.max\(0, 1 - current\.elapsed \/ LIGHTNING_GROUP_FADE_MS\)/);
  assert.match(appSource, /fade \*= bolt\.group\.fade/);
});

test("las ramificaciones se reparten y no nacen juntas", () => {
  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 3000,
    instrument: trackGrowth
  });

  const bolts = (sandbox.global.__bolts || []).filter((bolt) => !bolt.isBranch);
  assert.ok(bolts.length > 0, "deben generarse relampagos principales");

  /* La separacion minima entre quiebres esta declarada. */
  assert.match(appSource, /LIGHTNING_BRANCH_MIN_GAP/);
  const gap = appSource.match(/LIGHTNING_BRANCH_MIN_GAP\s*=\s*(\d+)/);
  assert.ok(gap && Number(gap[1]) >= 2, "debe existir una separacion minima entre quiebres");

  /* Las ramas se dibujan mas finas que el rayo principal. */
  assert.match(appSource, /LIGHTNING_BRANCH_WIDTH_SCALE/);
  const scale = appSource.match(/LIGHTNING_BRANCH_WIDTH_SCALE\s*=\s*([0-9.]+)/);
  assert.ok(scale && Number(scale[1]) < 1, "las ramas deben ser mas finas que el rayo principal");
});

test("las ramificaciones tienen un cono propio y separado del principal", () => {
  /* La rama declara su propia apertura y direccion, y estas se separan del
     cono del relampago principal. */
  assert.match(appSource, /LIGHTNING_BRANCH_CONE_MIN_ANGLE/);
  assert.match(appSource, /LIGHTNING_BRANCH_CONE_MAX_ANGLE/);
  assert.match(appSource, /LIGHTNING_BRANCH_ANGLE_MARGIN/);
  assert.match(appSource, /LIGHTNING_BRANCH_MAX_TILT/);
  assert.match(appSource, /function isBranchSectorFree\(bolt, tilt, coneAngle\)/);

  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 3000,
    instrument: trackGrowth
  });

  const bolts = sandbox.global.__bolts || [];
  const mains = bolts.filter((bolt) => !bolt.isBranch && bolt.points.length > 4);
  const branches = bolts.filter((bolt) => bolt.isBranch);
  assert.ok(branches.length > 0, "deben generarse ramificaciones");

  /* La apertura de la rama es menor o igual que la del principal. */
  for (const branch of branches) {
    if (!branch.group) continue;
    const parent = mains.find((bolt) => bolt.group === branch.group);
    if (!parent) continue;
    assert.ok(
      branch.coneAngle <= parent.coneAngle + 0.001,
      "la apertura de la rama no debe superar la del principal"
    );
  }

  /* Los conos de las ramas se separan del cono del principal. */
  for (const branch of branches) {
    if (!branch.group) continue;
    const parent = mains.find((bolt) => bolt.group === branch.group);
    if (!parent) continue;
    const separation = Math.abs(branch.tilt - parent.tilt);
    const required = parent.coneAngle + branch.coneAngle;
    assert.ok(
      separation >= required - 0.02,
      "el cono de la rama debe separarse del cono del principal"
    );
  }
});

test("los extremos de las ramificaciones de una descarga quedan separados", () => {
  /* La longitud de cada rama se elige para que su extremo no coincida con
     el de las ramas anteriores. */
  assert.match(appSource, /LIGHTNING_BRANCH_END_GAP/);
  const gap = appSource.match(/LIGHTNING_BRANCH_END_GAP\s*=\s*(\d+)/);
  assert.ok(gap && Number(gap[1]) > 0, "debe existir una distancia minima entre extremos");
  assert.match(appSource, /usedEnds/);
});

test("el relampago principal permanece visible hasta que sus ramas terminan", () => {
  /* El grupo solo se apaga cuando el principal y todas sus ramas han
     completado su recorrido. */
  assert.match(appSource, /group\.mainComplete = true/);
  assert.match(appSource, /if \(!current\.mainComplete\) continue/);
  assert.match(appSource, /current\.fading = true/);
  assert.match(appSource, /LIGHTNING_BRANCH_FINISH_BOOST/);

  const { sandbox } = runLightning({
    width: 1440,
    height: 900,
    subpage: false,
    frames: 3000,
    instrument: trackGroups
  });

  const completed = sandbox.global.__completed || [];
  const fades = sandbox.global.__fades || [];
  assert.ok(completed.length > 0, "deben completarse relampagos principales");
  assert.ok(fades.length > 0, "deben desvanecerse grupos");

  /* El desvanecimiento nunca ocurre antes de completar el principal. */
  for (let i = 0; i < Math.min(completed.length, fades.length); i++) {
    assert.ok(
      fades[i].at >= completed[i].at,
      "el grupo no puede apagarse antes de terminar el rayo principal"
    );
  }
});

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
