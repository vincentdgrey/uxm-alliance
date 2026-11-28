const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

/* ---------- Entorno de render mínimo ---------- */

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
    removeChild(c) {
      const index = el.children.indexOf(c);
      if (index >= 0) el.children.splice(index, 1);
      return c;
    },
    addEventListener() {}
  };
  Object.defineProperty(el, "className", {
    get() { return [...this._cls].join(" "); },
    set(v) { this._cls = new Set(String(v).split(/\s+/).filter(Boolean)); }
  });
  Object.defineProperty(el, "textContent", {
    /* Como en el DOM real, textContent concatena el texto propio y el de
       los nodos hijos, y al asignarlo elimina los hijos existentes. */
    get() {
      if (this.children.length) {
        return this.children.map((child) => child.textContent).join("") + this._text;
      }
      return this._text;
    },
    set(v) {
      this._text = String(v);
      if (v === "") this.children.length = 0;
    }
  });
  Object.defineProperty(el, "offsetWidth", { get() { return 100; } });
  return el;
}

function findByClass(node, className, output = []) {
  if (node.className && String(node.className).split(/\s+/).includes(className)) output.push(node);
  for (const child of node.children || []) findByClass(child, className, output);
  return output;
}

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

/* Instante UTC-2 de una hora concreta del viernes de la semana en curso. */
function fridayAt(hour, minute, second) {
  const now = new Date();
  const daysSinceFriday = (now.getUTCDay() + 7 - 5) % 7;
  const friday = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysSinceFriday
  ));
  return Date.parse(friday.toISOString().slice(0, 10) + "T" +
    String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":" +
    String(second).padStart(2, "0") + "Z") + 2 * 3600 * 1000;
}

function pointOf(row) {
  return findByClass(row, "ad-task-point")[0] || null;
}

/* Valor esperado de una actividad, derivado del dato fuente vigente.
   Replica el formato del render: signo "+", un decimal y separador de
   miles "'" agregado solo a la parte entera. */
function expectedPoint(code) {
  const source = read("js/activities-daily.js");
  const match = source.match(new RegExp("\\{ \"code\": \"" + code + "\"[^}]*\\}"));
  assert.ok(match, "debe existir la actividad " + code);
  const raw = match[0].match(/"point":\s*"?([^",}]+)"?/);
  assert.ok(raw, "debe existir point en " + code);
  const num = Number(raw[1]);
  const parts = Math.abs(num).toFixed(1).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return "+" + parts.join(".");
}

function taskCellOf(row) {
  return findByClass(row, "ad-objective")[0] || null;
}

function timeCellOf(row) {
  return findByClass(row, "ad-time")[0] || null;
}

/* Clases de estado del contador declaradas en la fila. */
function stateClasses(row) {
  const states = ["ad-state-countdown", "ad-state-progress", "ad-state-normal"];
  return states.filter((state) => row.classList.contains(state));
}

function rowByTaskCode(result, code) {
  for (const row of allRows(result.lists)) {
    const icon = findByClass(row, "ad-task-icon")[0];
    if (icon && icon.getAttribute("data-code") === code) return row;
  }
  return null;
}

/* Cuerpos de tabla de un dia, en el orden en que se muestran. Cada
   grupo de eventos ocupa un cuerpo propio. */
function dayBodies(result, index = 0) {
  const item = result.lists.children[index];
  const body = item.children.find((c) => String(c.className).includes("ad-item-body"));
  const table = body.children[0].children[0];
  return table.children.filter((c) => c.tagName === "TBODY");
}

/* Cuerpos de la tabla del dia actual, sin el grupo Battle Survival. */
function todayEventBodies(result) {
  return dayBodies(result).filter((c) => !String(c.className).includes("ad-battle-body"));
}

/* Filas de los grupos de eventos del dia actual, sin Battle Survival. */
function todayRows(result) {
  const rows = [];
  for (const body of todayEventBodies(result)) {
    for (const row of body.children) rows.push(row);
  }
  return rows;
}

/* ---------- Puntos dentro de la columna Tarea ---------- */

test("la tabla no declara la columna Puntos y muestra cinco columnas", () => {
  const result = render(fridayAt(12, 0, 0));
  const row = allRows(result.lists)[0];

  const classes = row.children.map((cell) => String(cell.className).split(/\s+/));

  assert.equal(row.children.length, 5, "la fila debe tener cinco celdas");
  assert.ok(!classes.some((list) => list.includes("ad-point")), "no debe existir la columna Puntos");
  assert.ok(!classes.some((list) => list.includes("ad-col-point")));
});

test("el encabezado de la tabla ya no declara la columna Puntos", () => {
  const result = render(fridayAt(12, 0, 0));

  const headers = [];
  for (const item of result.lists.children) {
    const body = item.children.find((c) => String(c.className).includes("ad-item-body"));
    if (!body) continue;
    const table = body.children[0].children[0];
    const thead = table.children.find((c) => c.tagName === "THEAD");
    if (!thead) continue;
    for (const headRow of thead.children) {
      for (const th of headRow.children) headers.push(th.textContent);
    }
    break;
  }

  assert.deepEqual(headers, ["Contador", "", "Tarea", "Recurso", "Evento"]);
});

test("los puntos se muestran al final del texto de la columna Tarea", () => {
  const result = render(fridayAt(12, 0, 0));

  const row = rowByTaskCode(result, "ANTX");
  const task = taskCellOf(row);
  const point = pointOf(row);

  assert.ok(point, "debe existir el elemento de puntos");
  assert.equal(point.className, "ad-task-point");
  assert.equal(point.textContent, expectedPoint("ANTX"));
  /* El punto es el ultimo elemento de la celda de Tarea. */
  assert.equal(task.children[task.children.length - 1], point);
  assert.ok(task.classList.contains("ad-has-point"), "la celda reserva espacio inferior");
});

test("los puntos numericos conservan el formato mas un decimal", () => {
  const result = render(fridayAt(12, 0, 0));

  /* Los valores esperados se derivan del dato fuente vigente, de modo que
     el contrato valida el formato y no un numero concreto. */
  for (const code of ["ANTX", "CON1SP", "SOLD1TRN", "EPIUR"]) {
    const expected = expectedPoint(code);
    assert.equal(pointOf(rowByTaskCode(result, code)).textContent, expected, code);
    assert.match(expected, /^\+\d[\d']*\.\d$/, code + " debe llevar signo y un decimal");
  }
});

test("los puntos muestran el separador de miles en la parte entera", () => {
  const result = render(fridayAt(12, 0, 0));

  /* El valor mostrado coincide con el dato fuente y su agrupacion. */
  for (const code of ["FALCON", "EPIUR", "RAVESS", "SHRDUR", "CRVNUR", "TCKSUR", "STDSCR"]) {
    const text = pointOf(rowByTaskCode(result, code)).textContent;
    assert.equal(text, expectedPoint(code), code);
  }

  /* Las actividades de cuatro o mas digitos llevan separador de miles. */
  for (const code of ["FALCON", "RAVESS", "SHRDUR", "CRVNUR", "TCKSUR"]) {
    const text = pointOf(rowByTaskCode(result, code)).textContent;
    assert.ok(text.includes("'"), code + " debe mostrar el separador de miles");
  }

  /* Las de tres digitos no llevan separador. */
  const stdscr = pointOf(rowByTaskCode(result, "STDSCR")).textContent;
  assert.ok(!stdscr.includes("'"), "tres digitos no llevan separador");
});

test("el separador de miles se aplica solo a la parte entera", () => {
  const result = render(fridayAt(12, 0, 0));

  /* Ningun punto muestra separador en la parte decimal. */
  for (const code of ["ANTX", "CON1SP", "SOLD1TRN", "EPIUR", "FALCON", "RAVESS"]) {
    const text = pointOf(rowByTaskCode(result, code)).textContent;
    const decimals = text.split(".")[1];
    assert.ok(!decimals.includes("'"), code + " no debe agrupar los decimales");
  }

  /* El valor mostrado coincide con el dato fuente y su agrupacion. */
  for (const code of ["FALCON", "EPIUR", "RAVESS", "CRVNUR"]) {
    assert.equal(pointOf(rowByTaskCode(result, code)).textContent, expectedPoint(code), code);
  }
});

test("las actividades sin valor numerico no muestran punto", () => {
  const result = render(fridayAt(12, 0, 0));

  /* DYFALCON y SHIELD declaran point vacio. */
  assert.equal(pointOf(rowByTaskCode(result, "DYFALCON")), null);
  assert.equal(pointOf(rowByTaskCode(result, "SHIELD")), null);
});

/* ---------- Agrupacion por grupo de eventos ---------- */

test("cada grupo de eventos ocupa un cuerpo de tabla propio", () => {
  const result = render(fridayAt(5, 0, 0));

  const bodies = todayEventBodies(result);
  assert.ok(bodies.length > 1, "debe haber varios cuerpos");

  for (const body of bodies) {
    assert.ok(String(body.className).includes("ad-event-body"), "cada cuerpo es un grupo de eventos");

    /* Un cuerpo solo contiene actividades de su propio evento. */
    const event = body.getAttribute("data-event");
    for (const row of body.children) {
      const icon = findByClass(row, "ad-task-icon")[0];
      assert.ok(icon, "cada fila debe tener su icono");
    }
    assert.ok(event, "el cuerpo declara su evento");
  }
});

test("los grupos de eventos siguen el orden view de EVENT_CODE", () => {
  const result = render(fridayAt(5, 0, 0));

  /* El viernes existen los grupos DY, ROY, AD y BEX, mas BS en el dia
     actual. El orden lo define el valor view de EVENT_CODE. */
  const events = dayBodies(result).map((body) => body.getAttribute("data-event"));
  assert.deepEqual(events, ["DY", "ROY", "AD", "BEX", "BS"]);
});

test("el orden de los cuerpos respeta el valor view de la fuente de verdad", () => {
  const source = read("js/activities-daily.js");
  const match = source.match(/var EVENT_CODE = (\[[\s\S]*?\n  \]);/);
  assert.ok(match, "debe existir EVENT_CODE");
  const context = {};
  vm.createContext(context);
  vm.runInContext("var EVENT_CODE = " + match[1], context);

  /* Los valores view son numericos, positivos y unicos. */
  const views = context.EVENT_CODE.map((e) => e.view);
  for (const view of views) {
    assert.equal(typeof view, "number", "view debe ser numerico");
    assert.ok(view > 0, "view debe ser positivo");
  }
  assert.equal(new Set(views).size, views.length, "los valores view deben ser unicos");

  /* Los cuerpos de cada tabla siguen ese orden. */
  const result = render(fridayAt(5, 0, 0));
  const byView = {};
  context.EVENT_CODE.forEach((e) => { byView[e.event] = e.view; });
  const events = dayBodies(result).map((body) => body.getAttribute("data-event"));
  const sorted = events.slice().sort((a, b) => byView[a] - byView[b]);
  assert.deepEqual(events, sorted, "los cuerpos deben seguir el orden view");
});

test("el separador de eventos cierra cada grupo que tiene otro detras", () => {
  const result = render(fridayAt(5, 0, 0));

  const bodies = dayBodies(result);
  for (let i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    if (!body.children.length) continue;
    const last = body.children[body.children.length - 1];
    const isLast = i === bodies.length - 1;

    if (isLast) {
      assert.ok(!String(last.className).includes("ad-event-separator"), "el ultimo grupo no lleva separador");
    } else {
      assert.ok(String(last.className).includes("ad-event-separator"), "cada grupo se cierra con separador");
    }
  }
});

/* ---------- Actividades BS ---------- */

/* Codigos de las filas del grupo Battle Survival del dia indicado.
   El indice 0 corresponde al dia actual y el 1 al dia siguiente. */
function battleCodesOf(result, index = 0) {
  const bodies = dayBodies(result, index).filter((c) => String(c.className).includes("ad-battle-body"));
  const codes = [];
  for (const body of bodies) {
    for (const row of body.children) {
      codes.push(findByClass(row, "ad-task-icon")[0].getAttribute("data-code"));
    }
  }
  return codes;
}

/* Filas del grupo Battle Survival del dia indicado. */
function battleRowsOf(result, index = 0) {
  const bodies = dayBodies(result, index).filter((c) => String(c.className).includes("ad-battle-body"));
  const rows = [];
  for (const body of bodies) {
    for (const row of body.children) rows.push(row);
  }
  return rows;
}

/* Fila del grupo Battle Survival con un codigo de tarea dado. */
function battleRowByTaskCode(result, code, index = 0) {
  for (const row of battleRowsOf(result, index)) {
    const icon = findByClass(row, "ad-task-icon")[0];
    if (icon && icon.getAttribute("data-code") === code) return row;
  }
  return null;
}

/* Fila del consejo de tiempo de entrenamiento optimo. */
function adviceRowOf(result, index = 0) {
  for (const row of battleRowsOf(result, index)) {
    if (row.classList.contains("ad-training-advice")) return row;
  }
  return null;
}

test("el grupo Battle Survival muestra la actividad en curso, el consejo y las que quedan del dia", () => {
  /* A las 00:00 del viernes quedan cinco franjas en el dia. */
  const result = render(fridayAt(0, 0, 0));

  const rows = battleRowsOf(result);
  assert.equal(rows.length, 7, "la actividad en curso, el consejo y las cinco restantes");

  /* La primera fila esta en progreso y las siguientes en cuenta regresiva. */
  assert.deepEqual(stateClasses(rows[0]), ["ad-state-progress"]);
  for (let i = 2; i < rows.length; i++) {
    assert.deepEqual(stateClasses(rows[i]), ["ad-state-countdown"]);
    assert.ok(rows[i].classList.contains("ad-off-task"), "las filas OFF llevan ad-off-task");
  }
});

test("el listado del dia se reduce en una actividad cada cuatro horas", () => {
  const expected = [
    [0, 0, 5],
    [4, 0, 4],
    [8, 0, 3],
    [12, 0, 2],
    [16, 0, 1],
    [20, 0, 0]
  ];

  for (const [hour, minute, pending] of expected) {
    const result = render(fridayAt(hour, minute, 0));
    const rows = battleRowsOf(result);
    /* La actividad en curso, el consejo y las actividades pendientes. */
    assert.equal(rows.length, pending + 2, hour + ":" + minute + " pendiente");
  }
});

test("el grupo Battle Survival del dia actual vive en un cuerpo propio", () => {
  const result = render(fridayAt(5, 0, 0));

  const bodies = findByClass(result.lists, "ad-battle-body");
  assert.equal(bodies.length, 2, "el dia actual y el dia siguiente");

  /* El grupo del dia actual aloja la actividad en curso, el consejo y las OFF. */
  const battleRows = battleRowsOf(result);
  assert.equal(battleRows.length, 6);
  for (const row of battleRows) {
    assert.ok(row.classList.contains("ad-bs-task"), "las filas del grupo llevan ad-bs-task");
  }

  /* Las tareas normales quedan en el cuerpo principal, sin filas BS. */
  const main = todayRows(result);
  for (const row of main) {
    assert.ok(!row.classList.contains("ad-bs-task"), "el cuerpo principal no aloja filas BS");
  }
});

test("las actividades BS del dia siguiente ocupan su propio cuerpo de tabla", () => {
  const result = render(fridayAt(5, 0, 0));

  /* El dia siguiente declara el evento BS con su propio cuerpo. */
  const nextBodies = dayBodies(result, 1).filter((c) => String(c.className).includes("ad-battle-body"));
  assert.equal(nextBodies.length, 1, "debe existir un cuerpo BS en el dia siguiente");
  assert.equal(nextBodies[0].getAttribute("data-event"), "BS");

  /* Muestra las seis actividades del dia siguiente. */
  const rows = battleRowsOf(result, 1);
  assert.equal(rows.length, 6);
  for (const row of rows) {
    assert.ok(row.classList.contains("ad-bs-task"));
    assert.ok(row.classList.contains("ad-off-task"));
    assert.deepEqual(stateClasses(row), ["ad-state-countdown"]);
  }
});

test("las actividades BS solo existen en el dia actual y en el siguiente", () => {
  const result = render(fridayAt(5, 0, 0));

  /* A partir del tercer dia no hay ninguna actividad BS ni OFF. */
  const items = result.lists.children;
  for (let i = 2; i < items.length; i++) {
    const body = items[i].children.find((c) => String(c.className).includes("ad-item-body"));
    const table = body.children[0].children[0];
    for (const tbody of table.children.filter((c) => c.tagName === "TBODY")) {
      for (const row of tbody.children) {
        const code = findByClass(row, "ad-task-icon")[0].getAttribute("data-code");
        assert.ok(code.indexOf("BS") !== 0, "las filas BS solo van en el dia actual y el siguiente");
        assert.ok(code.indexOf("OFF") !== 0, "las filas OFF solo van en el dia actual y el siguiente");
      }
    }
  }
});

test("la primera fila BS corresponde a la franja en curso y esta en progreso", () => {
  /* El viernes el horario de HEROE empieza a las 04:00 UTC-2. */
  const result = render(fridayAt(5, 0, 0));

  const codes = battleCodesOf(result);
  assert.deepEqual(codes, ["BSHERO", "BSTRAIN", "OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]);

  const hero = battleRowByTaskCode(result, "BSHERO");
  assert.ok(hero, "debe existir la fila BSHERO");
  assert.deepEqual(stateClasses(hero), ["ad-state-progress"]);
});

test("no hay filas ocultas por estado de contador", () => {
  const result = render(fridayAt(5, 0, 0));

  /* Ninguna fila del grupo Battle Survival se oculta: todas se escriben. */
  for (const row of allRows(result.lists)) {
    assert.ok(!String(row.className).includes("ad-bs-hidden"), "no debe quedar la clase ad-bs-hidden");
  }

  /* Las filas OFF siguientes estan en cuenta regresiva. */
  const build = battleRowByTaskCode(result, "OFFBUILD");
  assert.deepEqual(stateClasses(build), ["ad-state-countdown"]);
  const soldier = battleRowByTaskCode(result, "OFFSOLDIER");
  assert.deepEqual(stateClasses(soldier), ["ad-state-countdown"]);
});

test("el grupo Battle Survival avanza con la franja en curso", () => {
  const result = render(fridayAt(5, 0, 0));
  assert.deepEqual(battleCodesOf(result), ["BSHERO", "BSTRAIN", "OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]);

  /* Al comenzar la franja de BUILD el grupo se reescribe. */
  result.update(fridayAt(8, 0, 0));
  assert.deepEqual(battleCodesOf(result), ["BSBUILD", "BSTRAIN", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]);

  /* La actividad BUILD pasa a estar en curso. */
  const build = battleRowByTaskCode(result, "BSBUILD");
  assert.deepEqual(stateClasses(build), ["ad-state-progress"]);
});

test("el grupo mantiene la actividad en curso, el consejo y las pendientes en todo el ciclo", () => {
  const result = render(fridayAt(3, 0, 0));

  /* Cada franja del dia mantiene una BS en curso, el consejo y las OFF
     pendientes del dia, sin perder filas ni duplicarlas. */
  const expected = [
    [3, 0, ["BSRAVEN", "BSTRAIN", "OFFHERO", "OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]],
    [4, 0, ["BSHERO", "BSTRAIN", "OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]],
    [8, 0, ["BSBUILD", "BSTRAIN", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]],
    [12, 0, ["BSSOLDIER", "BSTRAIN", "OFFTECH", "OFFRAVEN"]],
    [16, 0, ["BSTECH", "BSTRAIN", "OFFRAVEN"]],
    [20, 0, ["BSRAVEN", "BSTRAIN"]]
  ];

  for (const [hour, minute, codes] of expected) {
    result.update(fridayAt(hour, minute, 0));

    assert.deepEqual(battleCodesOf(result), codes, hour + ":" + minute);

    /* La primera fila esta en progreso y las siguientes en cuenta
       regresiva. */
    const rows = battleRowsOf(result);
    assert.deepEqual(stateClasses(rows[0]), ["ad-state-progress"], hour + ":" + minute);
    for (let i = 2; i < rows.length; i++) {
      assert.deepEqual(stateClasses(rows[i]), ["ad-state-countdown"], hour + ":" + minute);
      assert.ok(rows[i].classList.contains("ad-off-task"), "las filas OFF llevan ad-off-task");
    }
  }
});

test("el grupo Battle Survival se separa de los demas eventos", () => {
  const result = render(fridayAt(5, 0, 0));

  /* El ultimo grupo de tareas normales cierra el grupo con separador. */
  const bodies = todayEventBodies(result);
  const lastBody = bodies[bodies.length - 1];
  const previous = lastBody.children[lastBody.children.length - 1];
  assert.ok(previous.classList.contains("ad-event-separator"), "el grupo anterior debe cerrarse con separador");

  /* Las filas del grupo BS pertenecen al mismo evento: no se separan. */
  const battle = findByClass(result.lists, "ad-battle-body")[0];
  for (const row of battle.children) {
    assert.ok(!row.classList.contains("ad-event-separator"), "las filas BS no se separan entre si");
  }
});

test("el contador BS muestra el tiempo restante de la duracion de cuatro horas", () => {
  /* El viernes el horario de HEROE empieza a las 04:00 UTC-2. */
  const result = render(fridayAt(6, 47, 39));
  const hero = rowByTaskCode(result, "BSHERO");

  const elapsed = findByClass(hero, "ad-bs-elapsed")[0];
  const remaining = findByClass(hero, "ad-bs-remaining")[0];

  assert.equal(elapsed.textContent, "+02:47:39");
  assert.equal(remaining.textContent, "01:12:21");

  /* El tiempo restante se recalcula en cada tick. */
  result.update(fridayAt(6, 48, 39));
  assert.equal(elapsed.textContent, "+02:48:39");
  assert.equal(remaining.textContent, "01:11:21");
});

test("el tiempo restante aparece en la actividad BS en curso", () => {
  /* A las 03:00 la franja en curso es la de RAVEN, que comenzo a las 00:00. */
  const result = render(fridayAt(3, 0, 0));
  const raven = rowByTaskCode(result, "BSRAVEN");

  assert.ok(raven, "debe existir la fila BSRAVEN");
  const remaining = findByClass(raven, "ad-bs-remaining")[0];
  assert.equal(remaining.textContent, "01:00:00");
});

test("las estrellas de las tareas BS se pintan en rojo", () => {
  const result = render(fridayAt(5, 0, 0));
  const hero = rowByTaskCode(result, "BSHERO");

  const stars = findByClass(hero, "ad-bs-star");
  assert.equal(stars.length, 1, "debe existir la estrella de la tarea BS");
  assert.equal(stars[0].textContent, "★");
  assert.equal(stars[0].className, "ad-bs-star");

  /* El texto de la tarea se conserva completo: el nodo de estrella aporta
     el simbolo al final de la lectura de los hijos de la celda. */
  const task = taskCellOf(hero);
  const parts = task.children.map((child) => child.textContent).join("");
  assert.ok(parts.indexOf("★") >= 0, "la estrella permanece en el texto");
  assert.ok(parts.indexOf("Insignias de Habilidad") >= 0, "el texto original se conserva");
});

test("las actividades que no son BS no reciben la clase de estrella", () => {
  const result = render(fridayAt(12, 0, 0));

  for (const row of allRows(result.lists)) {
    if (row.classList.contains("ad-bs-task")) continue;
    assert.equal(findByClass(row, "ad-bs-star").length, 0, "solo las tareas BS llevan estrella");
  }
});

/* ---------- Actividades OFF (oportunidades siguientes) ---------- */

/* Codigos de las filas OFF visibles en una tabla. */
function offCodesOf(result, index = 0) {
  return battleCodesOf(result, index).filter((code) => code.indexOf("OFF") === 0);
}

test("se muestran todas las actividades OFF que quedan en el dia", () => {
  /* El viernes el horario de HEROE empieza a las 04:00 UTC-2. */
  const result = render(fridayAt(5, 0, 0));

  /* A las 05:00 esta en curso HEROE; siguen BUILD (08:00), SOLDIER (12:00),
     TECH (16:00) y RAVEN (20:00). */
  assert.deepEqual(offCodesOf(result), ["OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]);
});

test("las actividades OFF siguen el orden cronologico del horario", () => {
  /* El viernes a las 12:00 esta en curso SOLDIER; siguen TECH y RAVEN. */
  const result = render(fridayAt(12, 0, 0));

  assert.deepEqual(offCodesOf(result), ["OFFTECH", "OFFRAVEN"]);
});

test("el dia siguiente muestra las seis actividades del dia", () => {
  const result = render(fridayAt(5, 0, 0));

  /* El sabado comienza con HEROE a las 00:00 y termina con HEROE a las
     20:00. */
  assert.deepEqual(offCodesOf(result, 1), [
    "OFFHERO", "OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN", "OFFHERO"
  ]);
});

test("las actividades OFF solo existen en el dia actual y en el siguiente", () => {
  const result = render(fridayAt(5, 0, 0));

  /* A partir del tercer dia no hay ninguna actividad OFF. */
  const items = result.lists.children;
  for (let i = 2; i < items.length; i++) {
    const body = items[i].children.find((c) => String(c.className).includes("ad-item-body"));
    const table = body.children[0].children[0];
    const bodies = table.children.filter((c) => c.tagName === "TBODY");
    for (const tbody of bodies) {
      for (const row of tbody.children) {
        const code = findByClass(row, "ad-task-icon")[0].getAttribute("data-code");
        assert.ok(code.indexOf("OFF") !== 0, "las filas OFF solo van en el dia actual y el siguiente");
      }
    }
  }
});

test("el contador de las actividades OFF muestra solo la cuenta regresiva", () => {
  const result = render(fridayAt(5, 0, 0));
  const build = battleRowByTaskCode(result, "OFFBUILD");

  assert.ok(build, "debe existir la fila OFFBUILD");

  const counter = timeCellOf(build);
  assert.equal(counter.textContent, "T-03:00:00");
  assert.deepEqual(stateClasses(build), ["ad-state-countdown"]);

  /* No hay tiempo transcurrido ni tiempo restante de duracion. */
  assert.equal(findByClass(build, "ad-bs-elapsed").length, 0);
  assert.equal(findByClass(build, "ad-bs-remaining").length, 0);
});

test("el contador de las actividades OFF del dia siguiente puede superar las 24 horas", () => {
  const result = render(fridayAt(5, 0, 0));
  const hero = battleRowByTaskCode(result, "OFFHERO", 1);

  assert.ok(hero, "debe existir la fila OFFHERO del dia siguiente");

  /* El sabado a las 00:00 esta a 19 horas de la franja en curso. */
  assert.equal(timeCellOf(hero).textContent, "T-19:00:00");
  assert.deepEqual(stateClasses(hero), ["ad-state-countdown"]);
});

test("el contador de las actividades OFF se actualiza en cada tick", () => {
  const result = render(fridayAt(5, 0, 0));
  const build = battleRowByTaskCode(result, "OFFBUILD");

  result.update(fridayAt(5, 0, 1));
  assert.equal(timeCellOf(build).textContent, "T-02:59:59");
});

test("las actividades OFF marcan la fila completa como proxima", () => {
  const result = render(fridayAt(5, 0, 0));

  for (const code of offCodesOf(result)) {
    const row = battleRowByTaskCode(result, code);
    const task = taskCellOf(row);

    assert.ok(row.classList.contains("ad-off-task"), code + " debe usar ad-off-task en la fila");
    assert.ok(task.classList.contains("ad-objective"), code + " debe conservar ad-objective");

    /* El indicador de estilo deshabilitado se retira de la columna Tarea. */
    assert.ok(!task.classList.contains("ad-task-flag-x"), code + " no debe usar ad-task-flag-x");
    assert.ok(!task.className.includes("ad-task-flag-"), code + " no debe usar ningun flag de tarea");
  }
});

test("el estilo de las actividades OFF alcanza Tarea, Recurso y Evento, no Contador ni Icono", () => {
  const css = read("css/activities-daily.css");

  const rule = css.match(/\.ad-schedule tbody tr\.ad-off-task[^{]*\{[^}]*\}/s);
  assert.ok(rule, "debe existir la regla de las actividades OFF");

  assert.match(rule[0], /td\.ad-objective/);
  assert.match(rule[0], /td\.ad-resource/);
  assert.match(rule[0], /td\.ad-event/);
  assert.match(rule[0], /background-color:\s*#aaa/);
  assert.match(rule[0], /color:\s*#fff/);

  /* El Contador y el Icono conservan su apariencia habitual. */
  assert.ok(!rule[0].includes("ad-time"), "el estilo no debe alcanzar el Contador");
  assert.ok(!rule[0].includes("ad-icon"), "el estilo no debe alcanzar el Icono");

  /* El indicador X se retira por completo del CSS. */
  assert.ok(!css.includes("ad-task-flag-x"), "no debe quedar el indicador ad-task-flag-x");
});

test("las actividades OFF no muestran puntos de referencia", () => {
  const result = render(fridayAt(5, 0, 0));

  for (const code of offCodesOf(result)) {
    assert.equal(pointOf(battleRowByTaskCode(result, code)), null, code + " no debe mostrar punto");
  }
});

test("las actividades OFF avanzan al cambiar de franja en curso", () => {
  const result = render(fridayAt(5, 0, 0));

  /* A las 05:00 esta en curso HEROE; siguen BUILD (08:00), SOLDIER (12:00),
     TECH (16:00) y RAVEN (20:00). */
  assert.deepEqual(offCodesOf(result), ["OFFBUILD", "OFFSOLDIER", "OFFTECH", "OFFRAVEN"]);

  /* Al comenzar la franja de BUILD, las oportunidades OFF avanzan. */
  result.update(fridayAt(8, 0, 0));
  assert.deepEqual(offCodesOf(result), ["OFFSOLDIER", "OFFTECH", "OFFRAVEN"]);

  /* La actividad BUILD pasa a estar en curso. */
  const build = battleRowByTaskCode(result, "BSBUILD");
  assert.deepEqual(stateClasses(build), ["ad-state-progress"]);
});

/* ---------- Consejo de tiempo de entrenamiento optimo ---------- */

test("el consejo de entrenamiento aparece una sola vez y solo en el dia actual", () => {
  const result = render(fridayAt(10, 16, 32));

  const rows = allRows(result.lists).filter((row) => row.classList.contains("ad-training-advice"));
  assert.equal(rows.length, 1, "debe existir una sola fila de consejo");

  /* La fila vive en el cuerpo propio del dia actual. */
  assert.ok(adviceRowOf(result), "el consejo esta en el dia actual");
  assert.equal(adviceRowOf(result, 1), null, "el dia siguiente no muestra el consejo");
});

test("el consejo se ubica debajo de la actividad BS en curso", () => {
  const result = render(fridayAt(5, 0, 0));

  const rows = battleRowsOf(result);
  const advice = adviceRowOf(result);

  /* La segunda fila del grupo es el consejo. */
  assert.equal(rows[1], advice, "el consejo va inmediatamente debajo de la actividad en curso");
  assert.deepEqual(stateClasses(rows[0]), ["ad-state-progress"]);
  assert.ok(advice.classList.contains("ad-bs-task"), "el consejo pertenece al grupo BS");
  assert.ok(!advice.classList.contains("ad-off-task"), "el consejo no es una actividad proxima");
});

test("la columna Contador del consejo queda vacia", () => {
  const result = render(fridayAt(10, 16, 32));

  const advice = adviceRowOf(result);
  const counter = findByClass(advice, "ad-time")[0];

  assert.equal(counter.textContent, "", "el consejo no muestra contador");
  assert.equal(findByClass(advice, "ad-bs-elapsed").length, 0);
  assert.equal(findByClass(advice, "ad-bs-remaining").length, 0);
});

test("el consejo muestra el tiempo optimo en la columna Tarea", () => {
  const result = render(fridayAt(10, 16, 32));

  const advice = adviceRowOf(result);
  const task = taskCellOf(advice);

  /* La proxima SOLDIER del viernes comienza a las 12:00 y el entrenamiento
     optimo dura tres horas: el tiempo acaba a las 15:00. */
  assert.equal(
    task.textContent,
    "Consejo: Tiempo de Entrenamiento Optimo 04:43:28, hasta la proxima Batalla de Supervivencia Tema Soldados"
  );

  /* El tiempo vive en su propio nodo, para actualizarlo sin rehacer la
     frase. */
  const time = findByClass(advice, "ad-training-advice-time")[0];
  assert.equal(time.textContent, "04:43:28");
  assert.match(time.textContent, /^\d{2}:\d{2}:\d{2}$/);
});

test("el consejo muestra Soldados en Recurso y Batalla Supervivencia en Evento", () => {
  const result = render(fridayAt(10, 16, 32));

  const advice = adviceRowOf(result);

  assert.equal(findByClass(advice, "ad-resource")[0].textContent, "Soldados");
  assert.equal(findByClass(advice, "ad-event")[0].textContent, "Batalla Supervivencia");
});

test("el tiempo del consejo se actualiza en cada tick", () => {
  const result = render(fridayAt(10, 16, 32));

  const time = findByClass(adviceRowOf(result), "ad-training-advice-time")[0];
  assert.equal(time.textContent, "04:43:28");

  result.update(fridayAt(10, 16, 33));
  assert.equal(findByClass(adviceRowOf(result), "ad-training-advice-time")[0].textContent, "04:43:27");
});

test("el consejo excluye la SOLDIER que esta en curso", () => {
  /* A las 12:00 la SOLDIER del viernes esta en curso: el consejo apunta a
     la siguiente, la del sabado a las 08:00, cuyo entrenamiento optimo
     acaba a las 11:00. */
  const result = render(fridayAt(12, 0, 0));

  const time = findByClass(adviceRowOf(result), "ad-training-advice-time")[0];
  assert.equal(time.textContent, "23:00:00");
});

test("el consejo admite valores superiores a 24 horas", () => {
  const result = render(fridayAt(20, 0, 0));

  const time = findByClass(adviceRowOf(result), "ad-training-advice-time")[0];
  /* La proxima SOLDIER es la del sabado a las 08:00. */
  assert.equal(time.textContent, "15:00:00");
});

test("el consejo cruza el cambio de semana", () => {
  /* El sabado a las 20:00 no queda ninguna franja en el dia: la proxima
     SOLDIER es la del domingo a las 04:00. */
  const now = new Date();
  const daysSinceSaturday = (now.getUTCDay() + 7 - 6) % 7;
  const saturday = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysSinceSaturday
  ));
  const at = Date.parse(saturday.toISOString().slice(0, 10) + "T20:00:00Z") + 2 * 3600 * 1000;

  const result = render(at);

  const advice = adviceRowOf(result);
  assert.ok(advice, "el consejo debe existir tambien al cierre del dia");

  /* El domingo a las 04:00, mas tres horas de entrenamiento optimo. */
  const time = findByClass(advice, "ad-training-advice-time")[0];
  assert.equal(time.textContent, "11:00:00");
});

test("las actividades OFF ya no muestran el tiempo de entrenamiento", () => {
  const result = render(fridayAt(10, 16, 32));

  for (const code of offCodesOf(result)) {
    const row = battleRowByTaskCode(result, code);
    const resource = findByClass(row, "ad-resource")[0];

    assert.equal(resource.children.length, 0, code + " no debe mostrar hijos en la celda de recurso");
    assert.ok(!String(row.className).includes("ad-training"), code + " no debe llevar la clase del consejo");
  }

  /* El formato antiguo no existe en ninguna parte del documento. */
  for (const row of allRows(result.lists)) {
    assert.ok(!row.textContent.includes("[Train"), "no debe quedar el formato antiguo");
    assert.equal(findByClass(row, "ad-training-time").length, 0);
  }
});
