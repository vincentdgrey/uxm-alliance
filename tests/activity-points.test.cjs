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

function rowByTaskCode(result, code) {
  for (const row of allRows(result.lists)) {
    const icon = findByClass(row, "ad-task-icon")[0];
    if (icon && icon.getAttribute("data-code") === code) return row;
  }
  return null;
}

/* Filas del cuerpo de la tabla del dia actual. */
function todayRows(result) {
  const item = result.lists.children[0];
  const body = item.children.find((c) => String(c.className).includes("ad-item-body"));
  const table = body.children[0].children[0];
  const tbody = table.children.find((c) => c.tagName === "TBODY");
  return tbody.children;
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

/* ---------- Actividades BS ---------- */

test("las actividades BS solo existen en la tabla del dia actual", () => {
  const result = render(fridayAt(12, 0, 0));

  const rows = allRows(result.lists);
  const bsRows = rows.filter((row) => row.classList.contains("ad-bs-task"));

  assert.ok(bsRows.length > 0, "el dia actual debe incluir filas BS");
  /* BSBUILD, BSHERO, BSRAVEN, BSSOLDIER y BSTECH. */
  assert.equal(bsRows.length, 5);
});

test("una actividad BS solo es visible con su contador en estado de progreso", () => {
  /* El viernes el horario de HEROE empieza a las 04:00 UTC-2. */
  const result = render(fridayAt(5, 0, 0));
  const hero = rowByTaskCode(result, "BSHERO");

  assert.ok(hero, "debe existir la fila BSHERO");
  assert.ok(!hero.classList.contains("ad-bs-hidden"), "en progreso la fila es visible");

  /* Los horarios de los demas codigos siguen en cuenta regresiva. */
  const build = rowByTaskCode(result, "BSBUILD");
  assert.ok(build, "debe existir la fila BSBUILD");
  assert.ok(build.classList.contains("ad-bs-hidden"), "en cuenta regresiva la fila se oculta");

  /* Pasado el tiempo del horario vinculado la fila se oculta. */
  result.update(fridayAt(12, 0, 0));
  assert.ok(hero.classList.contains("ad-bs-hidden"), "fuera de progreso la fila se oculta");
});

test("las actividades BS conservan el orden de la fuente de verdad", () => {
  const result = render(fridayAt(5, 0, 0));

  const bsCodes = allRows(result.lists)
    .filter((row) => row.classList.contains("ad-bs-task"))
    .map((row) => findByClass(row, "ad-task-icon")[0].getAttribute("data-code"));

  assert.deepEqual(bsCodes, ["BSBUILD", "BSHERO", "BSRAVEN", "BSSOLDIER", "BSTECH"]);
});

test("las filas BS se agregan al final del grupo de tareas del dia actual", () => {
  const result = render(fridayAt(5, 0, 0));

  const rows = todayRows(result);
  const firstBsIndex = rows.findIndex((row) => row.classList.contains("ad-bs-task"));

  assert.ok(firstBsIndex > 0, "las filas BS van despues de las tareas normales");
  /* A partir de la primera fila BS solo hay filas BS. */
  for (let i = firstBsIndex; i < rows.length; i++) {
    assert.ok(rows[i].classList.contains("ad-bs-task"), "el grupo BS va al final");
  }
});

test("el grupo Battle Survival se separa de los demas eventos", () => {
  const result = render(fridayAt(5, 0, 0));

  const rows = todayRows(result);
  const firstBsIndex = rows.findIndex((row) => row.classList.contains("ad-bs-task"));

  /* La ultima fila del grupo anterior lleva el separador. */
  const previous = rows[firstBsIndex - 1];
  assert.ok(previous.classList.contains("ad-event-separator"), "el grupo anterior debe cerrarse con separador");

  /* Las filas BS pertenecen al mismo evento: no se separan entre si. */
  for (let i = firstBsIndex; i < rows.length; i++) {
    assert.ok(!rows[i].classList.contains("ad-event-separator"), "las filas BS no se separan entre si");
  }
});

test("el contador BS muestra el tiempo restante de la duracion de cuatro horas", () => {
  /* El viernes el horario de HEROE empieza a las 04:00 UTC-2. */
  const result = render(fridayAt(6, 47, 39));
  const hero = rowByTaskCode(result, "BSHERO");

  const elapsed = findByClass(hero, "ad-bs-elapsed")[0];
  const remaining = findByClass(hero, "ad-bs-remaining")[0];

  assert.equal(elapsed.textContent, "+ 02:47:39");
  assert.equal(remaining.textContent, "01:12:21");

  /* El tiempo restante se recalcula en cada tick. */
  result.update(fridayAt(6, 48, 39));
  assert.equal(elapsed.textContent, "+ 02:48:39");
  assert.equal(remaining.textContent, "01:11:21");
});

test("el tiempo restante solo aparece con el contador en estado de progreso", () => {
  const result = render(fridayAt(3, 0, 0));
  const build = rowByTaskCode(result, "BSBUILD");

  /* A las 03:00 el horario de BUILD todavia no ha comenzado. */
  const remaining = findByClass(build, "ad-bs-remaining")[0];
  assert.equal(remaining.textContent, "", "sin progreso no hay tiempo restante");
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
