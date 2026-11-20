/* Plano 3D interactivo de la Ciudad Real del Reino 277.
   Dependencias: Three.js (modulo), OrbitControls y CSS2DRenderer.
   Se monta sobre el contenedor #kingdomRender de pages/reino.html. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

/* ---------- Datos del plano (fuente de verdad del visor) ---------- */

/* Las cuatro torres del castillo. La torre Norte ocupa la esquina noreste
   del cuadrado, con el norte hacia -Z y el este hacia +X. */
const TOWERS = [
  { id: "west", labelKey: "kingdomTowerWest", x: -6, z: -6 },
  { id: "north", labelKey: "kingdomTowerNorth", x: 6, z: -6 },
  { id: "east", labelKey: "kingdomTowerEast", x: 6, z: 6 },
  { id: "south", labelKey: "kingdomTowerSouth", x: -6, z: 6 }
];

/* Santuarios: ciudades adicionales colocadas sobre el mismo plano.
   Edita esta lista para anadir, quitar o reubicar santuarios.
   variant: "blue" | "white". level: numero opcional mostrado en la etiqueta. */
const SANCTUARIES = [
  { id: "sanctuary-blue", nameKey: "kingdomSanctuaryBlue", variant: "blue", level: 25, x: -13, z: 4 },
  { id: "sanctuary-white", nameKey: "kingdomSanctuaryWhite", variant: "white", level: 30, x: 13, z: -4 }
];

const CASTLE_HALF = 7.5;       /* Lado del cuadrado del castillo */
const MUD_HALF = 18;           /* Lado del cuadrado de lodo */
const CELL_SIZE = 1.5;         /* Lado de una celda de la cuadrícula */
const GRASS_CELLS = 20;        /* Celdas de cesped alrededor del lodo, por lado */
const GRASS_HALF = MUD_HALF + GRASS_CELLS * CELL_SIZE;
const FALLBACK_LANG = "en";

/* ---------- Textos ---------- */

function resolveLang() {
  const attr = document.documentElement.getAttribute("data-lang");
  if (attr && window.I18N && window.I18N[attr]) return attr;
  const match = /[?&]lang=([a-zA-Z]{2})/.exec(window.location.search);
  if (match && window.I18N[match[1].toLowerCase()]) return match[1].toLowerCase();
  const base = ((navigator.language || navigator.userLanguage || "").toLowerCase().split("-"))[0];
  return window.I18N && window.I18N[base] ? base : FALLBACK_LANG;
}

const LANG = resolveLang();

function text(key) {
  const i18n = window.I18N || {};
  const active = i18n[LANG] || {};
  if (active[key]) return active[key];
  const fallback = i18n[FALLBACK_LANG] || {};
  return fallback[key] || key;
}

/* ---------- Geometria wireframe ---------- */

const COLORS = {
  castle: 0x2266bb,
  castleLight: 0x4f8fd6,
  castleRoof: 0x1c4f8c,
  tower: 0x1c4f8c,
  base: 0x8d9196,        /* Base gris del castillo */
  grid: 0x9aa7b4,
  blue: 0x2f9bff,
  blueDark: 0x1b6fc4,
  white: 0xdfe7ef,
  whiteDark: 0x9fb0c2,
  mud: 0x8a6a48,         /* Lodo */
  grass: 0x6f9153        /* Cesped */
};

/* Devuelve las aristas de una geometria como LineSegments. */
function edges(geometry, color, opacity) {
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: opacity })
  );
  geometry.dispose();
  return line;
}

/* Superficie plana opaca, usada para terreno y bases. */
function surface(width, depth, color) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, depth),
    new THREE.MeshBasicMaterial({ color: color })
  );
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

/* ---------- Torretas ---------- */

/* Torreta cilindrica inspirada en la pieza de ajedrez: base ancha,
   fuste estrecho, corona mas ancha y cuatro almenas alrededor.
   Sin detalles adicionales y siempre menor que la Ciudad Real. */
function buildTower(color) {
  const group = new THREE.Group();
  const segments = 12;

  const base = edges(new THREE.CylinderGeometry(0.95, 1.05, 0.35, segments), color, 0.95);
  base.position.y = 0.175;
  group.add(base);

  const shaft = edges(new THREE.CylinderGeometry(0.58, 0.66, 1.9, segments), color, 1);
  shaft.position.y = 0.35 + 0.95;
  group.add(shaft);

  const crown = edges(new THREE.CylinderGeometry(0.82, 0.7, 0.28, segments), color, 1);
  crown.position.y = 0.35 + 1.9 + 0.14;
  group.add(crown);

  const merlonHeight = 0.26;
  const merlonY = 0.35 + 1.9 + 0.28 + merlonHeight / 2;
  const offset = 0.56;
  const merlons = [
    [-offset, -offset], [offset, -offset], [-offset, offset], [offset, offset]
  ];
  merlons.forEach(function (position) {
    const merlon = edges(new THREE.BoxGeometry(0.3, merlonHeight, 0.3), color, 1);
    merlon.position.set(position[0], merlonY, position[1]);
    group.add(merlon);
  });

  return group;
}

/* ---------- Ciudad Real ---------- */

/* Torrecilla interior con tejado conico, al estilo de la referencia. */
function buildInnerTurret(color, roofColor, radius, wallHeight, roofHeight) {
  const group = new THREE.Group();

  const walls = edges(new THREE.CylinderGeometry(radius, radius * 1.08, wallHeight, 8), color, 1);
  walls.position.y = wallHeight / 2;
  group.add(walls);

  const roof = edges(new THREE.ConeGeometry(radius * 1.28, roofHeight, 8), roofColor, 1);
  roof.position.y = wallHeight + roofHeight / 2;
  group.add(roof);

  return group;
}

/* Ciudad Real: conjunto escalonado con torreon central, torrecillas
   interiores con tejado, cuerpos laterales, entrada y escalones. */
function buildCastle() {
  const group = new THREE.Group();
  const baseY = 0.4;

  /* Plataforma gris del castillo: unica base, sin muros. */
  const platform = surface(CASTLE_HALF * 2, CASTLE_HALF * 2, COLORS.base);
  platform.position.y = baseY;
  group.add(platform);

  const platformEdge = edges(new THREE.BoxGeometry(CASTLE_HALF * 2, 0.4, CASTLE_HALF * 2), COLORS.base, 1);
  platformEdge.position.y = 0.2;
  group.add(platformEdge);

  /* Cuerpo principal */
  const body = edges(new THREE.BoxGeometry(6.6, 2.4, 6.6), COLORS.castle, 1);
  body.position.y = baseY + 1.2;
  group.add(body);

  /* Almenas del cuerpo principal */
  const merlonHeight = 0.32;
  const bodyMerlonY = baseY + 2.4 + merlonHeight / 2;
  const bodyOffset = 3.05;
  for (let i = 0; i < 4; i++) {
    const sign = i < 2 ? -1 : 1;
    const along = i % 2 === 0 ? -bodyOffset + 1.3 : bodyOffset - 1.3;
    const merlonA = edges(new THREE.BoxGeometry(0.4, merlonHeight, 0.4), COLORS.castle, 1);
    merlonA.position.set(along, bodyMerlonY, sign * bodyOffset);
    group.add(merlonA);
    const merlonB = edges(new THREE.BoxGeometry(0.4, merlonHeight, 0.4), COLORS.castle, 1);
    merlonB.position.set(sign * bodyOffset, bodyMerlonY, along);
    group.add(merlonB);
  }

  /* Segundo cuerpo, mas estrecho y algo mas alto: escalona la silueta */
  const upper = edges(new THREE.BoxGeometry(4.6, 1.5, 4.6), COLORS.castleLight, 1);
  upper.position.y = baseY + 2.4 + 0.75;
  group.add(upper);

  /* Torreon central con tejado conico */
  const keep = edges(new THREE.BoxGeometry(2.4, 2.9, 2.4), COLORS.castleLight, 1);
  keep.position.y = baseY + 2.4 + 1.5 + 1.45;
  group.add(keep);

  const keepRoof = edges(new THREE.ConeGeometry(1.95, 1.9, 8), COLORS.castleRoof, 1);
  keepRoof.position.y = baseY + 2.4 + 1.5 + 2.9 + 0.95;
  group.add(keepRoof);

  /* Almenas de la base del torreon */
  const keepMerlonY = baseY + 2.4 + 1.5 + 0.16;
  const keepOffset = 1.05;
  for (let i = 0; i < 4; i++) {
    const sign = i < 2 ? -1 : 1;
    const along = i % 2 === 0 ? -keepOffset + 0.45 : keepOffset - 0.45;
    const merlonA = edges(new THREE.BoxGeometry(0.3, 0.32, 0.3), COLORS.castleLight, 1);
    merlonA.position.set(along, keepMerlonY, sign * keepOffset);
    group.add(merlonA);
    const merlonB = edges(new THREE.BoxGeometry(0.3, 0.32, 0.3), COLORS.castleLight, 1);
    merlonB.position.set(sign * keepOffset, keepMerlonY, along);
    group.add(merlonB);
  }

  /* Torrecillas interiores con tejado en las cuatro esquinas */
  const innerOffset = 2.35;
  const innerTurrets = [
    [-innerOffset, -innerOffset], [innerOffset, -innerOffset],
    [-innerOffset, innerOffset], [innerOffset, innerOffset]
  ];
  innerTurrets.forEach(function (position) {
    const turret = buildInnerTurret(COLORS.castleLight, COLORS.castleRoof, 0.62, 2.1, 1.35);
    turret.position.set(position[0], baseY + 2.4, position[1]);
    group.add(turret);
  });

  /* Cuerpos laterales: anexos mas bajos que rompen la simetria plana */
  const sideA = edges(new THREE.BoxGeometry(2.1, 1.6, 2.6), COLORS.castle, 1);
  sideA.position.set(-2.35, baseY + 0.8, 2.55);
  group.add(sideA);

  const sideB = edges(new THREE.BoxGeometry(2.4, 1.4, 2.1), COLORS.castle, 1);
  sideB.position.set(2.5, baseY + 0.7, -2.45);
  group.add(sideB);

  /* Entrada: portal y escalones al sur */
  const gate = edges(new THREE.BoxGeometry(1.5, 1.6, 0.1), COLORS.castleLight, 1);
  gate.position.set(0, baseY + 0.8, 3.34);
  group.add(gate);

  const stepWidths = [2.4, 1.9, 1.4];
  stepWidths.forEach(function (width, index) {
    const step = edges(new THREE.BoxGeometry(width, 0.22, 0.5), COLORS.castleLight, 1);
    step.position.set(0, baseY + 0.11 + index * 0.22, 3.55 + index * 0.5);
    group.add(step);
  });

  return group;
}

/* ---------- Santuario ---------- */

/* Santuario de formas angulares escalonadas, inspirado en el icono del juego. */
function buildSanctuary(variant) {
  const group = new THREE.Group();
  const main = variant === "white" ? COLORS.white : COLORS.blue;
  const dark = variant === "white" ? COLORS.whiteDark : COLORS.blueDark;

  const base = edges(new THREE.CylinderGeometry(1.5, 1.7, 0.35, 8), dark, 0.95);
  base.position.y = 0.175;
  group.add(base);

  const lower = edges(new THREE.CylinderGeometry(1.05, 1.35, 0.75, 6), main, 1);
  lower.position.y = 0.35 + 0.375;
  group.add(lower);

  const middle = edges(new THREE.CylinderGeometry(0.72, 0.95, 0.6, 6), main, 1);
  middle.position.y = 0.35 + 0.75 + 0.3;
  group.add(middle);

  const top = edges(new THREE.ConeGeometry(0.62, 1.15, 6), main, 1);
  top.position.y = 0.35 + 0.75 + 0.6 + 0.575;
  group.add(top);

  return group;
}

/* ---------- Etiquetas CSS2D ---------- */

function makeLabel(className, html) {
  const element = document.createElement("div");
  element.className = className;
  element.innerHTML = html;
  return new CSS2DObject(element);
}

/* ---------- Escena ---------- */

function buildScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f6f9);

  const width = container.clientWidth || 640;
  const height = container.clientHeight || 420;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
  camera.position.set(0, 26, 34);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(width, height);
  labelRenderer.domElement.className = "kingdom-render-labels";
  container.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 8;
  controls.maxDistance = 160;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.target.set(0, 1.5, 0);

  /* Terreno: cesped exterior y lodo central. */
  const grass = surface(GRASS_HALF * 2, GRASS_HALF * 2, COLORS.grass);
  grass.position.y = 0;
  scene.add(grass);

  const mud = surface(MUD_HALF * 2, MUD_HALF * 2, COLORS.mud);
  mud.position.y = 0.02;
  scene.add(mud);

  /* Cuadricula sobre todo el territorio */
  const cells = Math.round((GRASS_HALF * 2) / CELL_SIZE);
  const grid = new THREE.GridHelper(GRASS_HALF * 2, cells, COLORS.grid, COLORS.grid);
  grid.position.y = 0.05;
  grid.material.transparent = true;
  grid.material.opacity = 0.45;
  scene.add(grid);

  /* Ejes cardinales: norte hacia -Z, este hacia +X */
  const cardinals = [
    { label: "N", position: [0, 0.06, -GRASS_HALF + 1.4], color: COLORS.castle },
    { label: "S", position: [0, 0.06, GRASS_HALF - 1.4], color: COLORS.castle },
    { label: "E", position: [GRASS_HALF - 1.4, 0.06, 0], color: COLORS.castle },
    { label: "O", position: [-GRASS_HALF + 1.4, 0.06, 0], color: COLORS.castle }
  ];
  cardinals.forEach(function (cardinal) {
    const label = makeLabel("kingdom-render-cardinal", cardinal.label);
    label.position.set(cardinal.position[0], cardinal.position[1], cardinal.position[2]);
    label.element.style.color = "#" + new THREE.Color(cardinal.color).getHexString();
    scene.add(label);
  });

  /* Ciudad Real */
  const castle = buildCastle();
  scene.add(castle);

  const castleLabel = makeLabel("kingdom-render-label kingdom-render-label-city", text("kingdomCastleName"));
  castleLabel.position.set(0, 0.4 + 2.4 + 1.5 + 2.9 + 1.9 + 0.8, 0);
  scene.add(castleLabel);

  /* Torres */
  TOWERS.forEach(function (tower) {
    const group = buildTower(COLORS.tower);
    group.position.set(tower.x, 0.4, tower.z);
    scene.add(group);

    const label = makeLabel("kingdom-render-label kingdom-render-label-tower", text(tower.labelKey));
    label.position.set(tower.x, 0.4 + 2.79, tower.z);
    scene.add(label);
  });

  /* Santuarios */
  SANCTUARIES.forEach(function (sanctuary) {
    const group = buildSanctuary(sanctuary.variant);
    group.position.set(sanctuary.x, 0, sanctuary.z);
    scene.add(group);

    const name = text(sanctuary.nameKey);
    const level = sanctuary.level ? " " + sanctuary.level : "";
    const label = makeLabel(
      "kingdom-render-label kingdom-render-label-sanctuary kingdom-render-label-" + sanctuary.variant,
      name + level
    );
    label.position.set(sanctuary.x, 3.05, sanctuary.z);
    scene.add(label);
  });

  /* Vistas: en ambas el norte queda hacia arriba (norte hacia -Z). */
  const homePosition = new THREE.Vector3(0, 26, 34);
  const homeTarget = new THREE.Vector3(0, 2, 0);
  const topPosition = new THREE.Vector3(0, 74, 0.001);

  function render() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  function setView(position, target, up) {
    camera.up.copy(up);
    camera.position.copy(position);
    controls.target.copy(target);
    camera.lookAt(target);
    controls.update();
    render();
  }

  const upTop = new THREE.Vector3(0, 0, -1);
  const upHome = new THREE.Vector3(0, 1, 0);

  controls.addEventListener("change", render);

  const topButton = document.getElementById("kingdomRenderTop");
  const resetButton = document.getElementById("kingdomRenderReset");
  if (topButton) {
    topButton.addEventListener("click", function () {
      setView(topPosition, new THREE.Vector3(0, 0, 0), upTop);
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      setView(homePosition, homeTarget, upHome);
    });
  }

  /* Redimensionado del visor */
  function resize() {
    const nextWidth = container.clientWidth || width;
    const nextHeight = container.clientHeight || height;
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(nextWidth, nextHeight);
    labelRenderer.setSize(nextWidth, nextHeight);
    render();
  }

  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(container);
  } else {
    window.addEventListener("resize", resize);
  }

  /* Vista inicial orientada al norte, igual que la vista superior. */
  setView(homePosition, homeTarget, upHome);

  return { render: render, resize: resize };
}

/* ---------- Init ---------- */

function init() {
  const container = document.getElementById("kingdomRender");
  if (!container) return;

  const fallback = document.getElementById("kingdomRenderFallback");
  const description = document.getElementById("kingdomRenderDescription");

  if (description) {
    description.textContent = text("kingdomRenderDescription");
  }

  try {
    buildScene(container);
    if (fallback) fallback.hidden = true;
    container.setAttribute("data-ready", "true");
  } catch (error) {
    /* Sin WebGL o sin contexto valido se conserva el mensaje alternativo. */
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = text("kingdomRenderFallback");
    }
    if (window.console && console.warn) console.warn("No se pudo iniciar el plano 3D:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
