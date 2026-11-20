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

/* Recoge solo las filas del cuerpo de la tabla: las del encabezado
   no contienen celdas de Contador ni estados. */
function allRows(node, output = []) {
  for (const child of node.children || []) {
    if (child.tagName === "TBODY") {
      for (const row of child.children || []) {
        if (row.tagName === "TR") output.push(row);
      }
      continue;
    }
    allRows(child, output);
  }
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

/* ---------- Localizadores de celdas ---------- */

/* Devuelve la celda de Tarea de la primera fila cuyo objetivo coincide. */
function taskCellByObjective(result, fragment) {
  for (const row of allRows(result.lists)) {
    const objective = findByClass(row, "ad-objective")[0];
    if (objective && objective.textContent.indexOf(fragment) >= 0) return objective;
  }
  return null;
}

function timeCellOf(row) {
  return findByClass(row, "ad-time")[0];
}

function rowByTaskCode(result, code) {
  for (const row of allRows(result.lists)) {
    const icon = findByClass(row, "ad-task-icon")[0];
    if (icon && icon.getAttribute("data-code") === code) return row;
  }
  return null;
}

function stateClasses(tr) {
  return ["ad-state-countdown", "ad-state-progress", "ad-state-normal"]
    .filter((name) => tr.classList.contains(name));
}

/* ---------- Datos de referencia ----------
   Los indicadores se declaran por letra en la fuente de verdad:
   flag marca la columna Tarea y ani marca la columna Contador. */
const FLAG_WITH_TIME = "A";
const FLAG_IMPORTANT = "I";
const FLAG_WAR = "W";

/* Devuelve el instante UTC-2 de una hora concreta del viernes de la semana
   en curso, de modo que la prueba siga siendo valida en cualquier fecha. */
function fridayAt(hour, minute, second) {
  const now = new Date();
  /* getUTCDay: 0 domingo, 5 viernes. El calendario usa UTC-2. */
  const daysSinceFriday = (now.getUTCDay() + 7 - 5) % 7;
  const friday = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysSinceFriday
  ));
  return Date.parse(friday.toISOString().slice(0, 10) + "T" +
    String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":" +
    String(second).padStart(2, "0") + "Z") + 2 * 3600 * 1000;
}

/* ---------- Estructura del CSS ---------- */

test("la columna Contador de las tablas de Actividades usa padding de 6px vertical y 4px horizontal", () => {
  const css = read("css/activities-daily.css");
  assert.match(css, /\.ad-schedule td\.ad-time\s*\{[^}]*padding:\s*6px 4px/s);
});

test("el codigo obsoleto de indicadores ad-flag- ya no esta en el CSS", () => {
  const css = read("css/activities-daily.css");
  assert.ok(!/\.ad-flag-/.test(css), "no deben quedar selectores ad-flag-");
  assert.ok(!/uxm-ad-flag-/.test(css), "no deben quedar animaciones uxm-ad-flag-");
});

test("cada indicador flag declara su regla de estilo en la columna Tarea", () => {
  const css = read("css/activities-daily.css");

  const expected = {
    a: { background: "#8a000050", color: "#ffee00" },
    w: { background: "#ffee0050", color: "#115a96" },
    i: { background: "#80808050", color: "#115a96" },
    s: { background: "#006d0050", color: "#fff" }
  };

  for (const [flag, style] of Object.entries(expected)) {
    const rule = css.match(new RegExp(
      "\\.ad-schedule td\\.ad-objective\\.ad-task-flag-" + flag + "\\s*\\{[^}]*\\}", "s"
    ));
    assert.ok(rule, "falta la regla de la columna Tarea para el flag " + flag);
    assert.match(rule[0], new RegExp("background-color:\\s*" + style.background + ";"));
    assert.match(rule[0], new RegExp("color:\\s*" + style.color + ";"));
    assert.match(rule[0], /border-radius:\s*4px/);
  }
});

test("las reglas de flag no alcanzan a la columna Contador", () => {
  const css = read("css/activities-daily.css");
  for (const flag of ["a", "w", "i", "s"]) {
    const rules = css.match(new RegExp("ad-task-flag-" + flag + "[^\\{]*\\{[^}]*\\}", "g")) || [];
    for (const rule of rules) {
      assert.ok(!rule.includes("ad-time"), "el flag " + flag + " no debe aplicarse al contador");
    }
  }
});

test("cada indicador ani declara su regla en la columna Contador segun el estado", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /ad-state-countdown > td\.ad-time\.ad-counter-ani-a\s*\{[^}]*background-color:\s*#ffee00[^}]*color:\s*#8a0000/s);
  assert.match(css, /ad-state-progress > td\.ad-time\.ad-counter-ani-a\s*\{[^}]*background-color:\s*#8a0000[^}]*color:\s*#fffb00/s);
  assert.match(css, /ad-state-countdown > td\.ad-time\.ad-counter-ani-i\s*\{[^}]*background-color:\s*#00578a[^}]*color:\s*#00415f/s);
  assert.match(css, /ad-state-progress > td\.ad-time\.ad-counter-ani-i\s*\{[^}]*background-color:\s*#00578a[^}]*color:\s*#00415f/s);
  assert.match(css, /ad-state-progress > td\.ad-time\.ad-counter-ani-s\s*\{[^}]*font-weight:\s*bold/s);
});

test("las animaciones ani recorren los colores indicados y respetan movimiento reducido", () => {
  const css = read("css/activities-daily.css");

  assert.match(css, /@keyframes uxm-ad-counter-ani-a-countdown\s*\{[\S\s]*?#ffee00[\S\s]*?#ffee002f[\S\s]*?#9b0000/);
  assert.match(css, /@keyframes uxm-ad-counter-ani-a-progress\s*\{[\S\s]*?#8a0000[\S\s]*?#ff0000/);
  assert.match(css, /@keyframes uxm-ad-counter-ani-i-progress\s*\{[\S\s]*?#00578a[\S\s]*?#00aeff/);
  assert.match(css, /@keyframes uxm-ad-counter-ani-s-progress\s*\{[\S\s]*?#009400[\S\s]*?#333/);

  /* Todas las animaciones de los indicadores usan la misma duracion. */
  const animations = css.match(/animation:\s*uxm-ad-counter-ani-[a-z-]+\s+1\.8s ease-in-out infinite/g) || [];
  assert.equal(animations.length, 4);

  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\S\s]*?animation:\s*none/);
});

/* ---------- Estados del contador ---------- */

test("el contador con hora propia recorre cuenta regresiva, progreso y finalizado", () => {
  /* El viernes SCRAMBLE comienza a las 12:00 UTC-2 y dura una hora. */
  const result = render(fridayAt(11, 59, 59));
  const row = rowByTaskCode(result, "SCRAMBLE");

  assert.ok(row, "debe existir la fila de SCRAMBLE");
  assert.deepEqual(stateClasses(row), ["ad-state-countdown"]);
  assert.match(timeCellOf(row).textContent, /^T-/);

  result.update(fridayAt(12, 0, 0));
  assert.deepEqual(stateClasses(row), ["ad-state-progress"]);
  assert.match(timeCellOf(row).textContent, /^\+/);

  result.update(fridayAt(13, 0, 0));
  assert.deepEqual(stateClasses(row), ["ad-state-normal"]);
  assert.equal(timeCellOf(row).textContent, "--:--:--");
});

test("el contador vinculado a Battle Survival dura cuatro horas por omision", () => {
  /* ANTX esta vinculada a HEROE, que empieza el lunes a las 16:00 UTC-2. */
  const result = render(fridayAt(11, 0, 0));
  const row = rowByTaskCode(result, "ANTX");

  /* La tabla activa es la del viernes; la fila de ANTX pertenece al lunes. */
  assert.ok(row, "debe existir la fila de ANTX");
  assert.deepEqual(stateClasses(row), ["ad-state-normal"]);
});

test("una tarea sin horario ni vinculo deja el contador vacio", () => {
  const result = render(fridayAt(12, 0, 0));
  const rows = allRows(result.lists);

  const empty = rows.filter((row) => {
    const cell = timeCellOf(row);
    return cell && cell.textContent === "";
  });

  assert.ok(empty.length > 0, "debe existir al menos una tarea sin contador");
  for (const row of empty) {
    assert.deepEqual(stateClasses(row), ["ad-state-normal"]);
  }
});

test("las tablas futuras muestran la fecha MM/DD y no calculan contadores", () => {
  const result = render(fridayAt(12, 0, 0));
  const rows = allRows(result.lists);
  const dates = rows
    .map((row) => timeCellOf(row))
    .filter((cell) => cell && /^\d{2}\/\d{2}$/.test(cell.textContent));

  assert.ok(dates.length > 0, "las tablas futuras deben mostrar fechas MM/DD");

  /* Ninguna fila futura puede estar en cuenta regresiva o en progreso. */
  for (const row of rows) {
    const cell = timeCellOf(row);
    if (cell && /^\d{2}\/\d{2}$/.test(cell.textContent)) {
      assert.deepEqual(stateClasses(row), ["ad-state-normal"]);
    }
  }
});

/* ---------- Separacion entre flag y ani ---------- */

test("el indicador flag se aplica solo a la columna Tarea", () => {
  const result = render(fridayAt(12, 0, 0));

  for (const flag of [FLAG_WITH_TIME, FLAG_IMPORTANT, FLAG_WAR]) {
    const row = allRows(result.lists).find((tr) =>
      findByClass(tr, "ad-task-flag-" + flag.toLowerCase()).length > 0
    );
    assert.ok(row, "debe existir una fila con el flag " + flag);

    const task = findByClass(row, "ad-objective")[0];
    assert.ok(task.classList.contains("ad-task-flag-" + flag.toLowerCase()));

    const counter = timeCellOf(row);
    assert.ok(!counter.className.includes("ad-task-flag-"),
      "el flag no debe aplicarse a la columna Contador");
  }
});

test("el indicador ani se aplica solo a la columna Contador", () => {
  const result = render(fridayAt(12, 0, 0));

  const row = allRows(result.lists).find((tr) =>
    findByClass(tr, "ad-counter-ani-a").length > 0
  );
  assert.ok(row, "debe existir una fila con el indicador ani A");

  const counter = timeCellOf(row);
  assert.ok(counter.classList.contains("ad-counter-ani-a"));

  const task = findByClass(row, "ad-objective")[0];
  assert.ok(!task.className.includes("ad-counter-ani-"),
    "el indicador ani no debe aplicarse a la columna Tarea");
});

test("las filas sin flag ni ani no reciben clases de indicador", () => {
  const result = render(fridayAt(12, 0, 0));
  const rows = allRows(result.lists);

  assert.ok(rows.some((row) => !row.className.includes("ad-task-flag-")));
  assert.ok(rows.some((row) => !row.className.includes("ad-counter-ani-")));

  for (const row of rows) {
    const counter = timeCellOf(row);
    const task = findByClass(row, "ad-objective")[0];
    if (counter && task) {
      assert.ok(!counter.className.includes("ad-task-flag-"));
      assert.ok(!task.className.includes("ad-counter-ani-"));
    }
  }
});

test("el estado del contador se aplica a las filas con y sin indicadores", () => {
  const result = render(fridayAt(12, 0, 0));
  const rows = allRows(result.lists);

  /* Todas las filas declaran un estado: cuenta regresiva, progreso o normal. */
  for (const row of rows) {
    assert.equal(stateClasses(row).length, 1);
  }
});
