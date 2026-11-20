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
  { id: "oeste", labelKey: "kingdomTowerWest", x: -6, z: -6 },
  { id: "norte", labelKey: "kingdomTowerNorth", x: 6, z: -6 },
  { id: "este", labelKey: "kingdomTowerEast", x: 6, z: 6 },
  { id: "sur", labelKey: "kingdomTowerSouth", x: -6, z: 6 }
];

/* Santuarios: ciudades adicionales colocadas sobre el mismo plano.
   Edita esta lista para anadir, quitar o reubicar santuarios.
   variant: "blue" | "white". level: numero opcional mostrado en la etiqueta. */
const SANCTUARIES = [
  { id: "santuario-azul", nameKey: "kingdomSanctuaryBlue", variant: "blue", level: 25, x: -13, z: 4 },
  { id: "santuario-blanco", nameKey: "kingdomSanctuaryWhite", variant: "white", level: 30, x: 13, z: -4 }
];

const CASTLE_HALF = 7.5;      /* Lado del cuadrado del castillo */
const GROUND_HALF = 18;       /* Lado del plano de juego */
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
  tower: 0x1c4f8c,
  wall: 0x8fa8c4,
  grid: 0x9aa7b4,
  blue: 0x2f9bff,
  blueDark: 0x1b6fc4,
  white: 0xdfe7ef,
  whiteDark: 0x9fb0c2
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

/* Coloca una pieza centrada en x/z con su base a la altura y. */
function place(object, x, y, z) {
  object.position.set(x, y, z);
  return object;
}

/* ---------- Ciudad Real ---------- */

/* Torre con forma de pieza de ajedrez: base ancha, fuste estrecho,
   corona mas ancha y cuatro almenas cuadradas. Sin detalles adicionales. */
function buildTower(color) {
  const group = new THREE.Group();

  const base = edges(new THREE.BoxGeometry(1.6, 0.35, 1.6), color, 0.95);
  base.position.y = 0.175;
  group.add(base);

  const shaft = edges(new THREE.BoxGeometry(1.05, 1.9, 1.05), color, 1);
  shaft.position.y = 0.35 + 0.95;
  group.add(shaft);

  const crown = edges(new THREE.BoxGeometry(1.35, 0.28, 1.35), color, 1);
  crown.position.y = 0.35 + 1.9 + 0.14;
  group.add(crown);

  const merlonHeight = 0.26;
  const merlonY = 0.35 + 1.9 + 0.28 + merlonHeight / 2;
  const offset = 0.48;
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

/* Ciudad Real: cuerpo principal, torreon central, puerta y almenas. */
function buildCastle() {
  const group = new THREE.Group();

  /* Plataforma del castillo */
  const platform = edges(new THREE.BoxGeometry(CASTLE_HALF * 2, 0.4, CASTLE_HALF * 2), COLORS.wall, 0.8);
  platform.position.y = 0.2;
  group.add(platform);

  /* Cuerpo principal */
  const body = edges(new THREE.BoxGeometry(7.4, 2.6, 7.4), COLORS.castle, 1);
  body.position.y = 0.4 + 1.3;
  group.add(body);

  /* Torreon central */
  const keep = edges(new THREE.BoxGeometry(3.6, 3.1, 3.6), COLORS.castleLight, 1);
  keep.position.y = 0.4 + 2.6 + 1.55;
  group.add(keep);

  /* Almenas del cuerpo principal */
  const merlonHeight = 0.34;
  const bodyMerlonY = 0.4 + 2.6 + merlonHeight / 2;
  const bodyOffset = 3.25;
  for (let i = 0; i < 4; i++) {
    const sign = i < 2 ? -1 : 1;
    const along = i % 2 === 0 ? -bodyOffset + 1.4 : bodyOffset - 1.4;
    const merlonA = edges(new THREE.BoxGeometry(0.42, merlonHeight, 0.42), COLORS.castle, 1);
    merlonA.position.set(along, bodyMerlonY, sign * bodyOffset);
    group.add(merlonA);
    const merlonB = edges(new THREE.BoxGeometry(0.42, merlonHeight, 0.42), COLORS.castle, 1);
    merlonB.position.set(sign * bodyOffset, bodyMerlonY, along);
    group.add(merlonB);
  }

  /* Almenas del torreon */
  const keepMerlonY = 0.4 + 2.6 + 3.1 + merlonHeight / 2;
  const keepOffset = 1.5;
  for (let i = 0; i < 4; i++) {
    const sign = i < 2 ? -1 : 1;
    const along = i % 2 === 0 ? -keepOffset + 0.7 : keepOffset - 0.7;
    const merlonA = edges(new THREE.BoxGeometry(0.34, merlonHeight, 0.34), COLORS.castleLight, 1);
    merlonA.position.set(along, keepMerlonY, sign * keepOffset);
    group.add(merlonA);
    const merlonB = edges(new THREE.BoxGeometry(0.34, merlonHeight, 0.34), COLORS.castleLight, 1);
    merlonB.position.set(sign * keepOffset, keepMerlonY, along);
    group.add(merlonB);
  }

  /* Puerta: solo el contorno del vano en la fachada sur */
  const gate = edges(new THREE.BoxGeometry(1.6, 1.7, 0.08), COLORS.castleLight, 1);
  gate.position.set(0, 0.4 + 0.85, 3.74);
  group.add(gate);

  /* Muro perimetral con una abertura para la puerta */
  const wallHeight = 1.1;
  const wallY = 0.4 + wallHeight / 2;
  const wallThickness = 0.35;
  const wallOffset = CASTLE_HALF - 0.2;

  const northWall = edges(new THREE.BoxGeometry(wallOffset * 2, wallHeight, wallThickness), COLORS.wall, 0.75);
  northWall.position.set(0, wallY, -wallOffset);
  group.add(northWall);

  const eastWall = edges(new THREE.BoxGeometry(wallThickness, wallHeight, wallOffset * 2), COLORS.wall, 0.75);
  eastWall.position.set(wallOffset, wallY, 0);
  group.add(eastWall);

  const westWall = edges(new THREE.BoxGeometry(wallThickness, wallHeight, wallOffset * 2), COLORS.wall, 0.75);
  westWall.position.set(-wallOffset, wallY, 0);
  group.add(westWall);

  /* Muro sur partido en dos tramos para dejar la puerta */
  const southSpan = (wallOffset * 2 - 2.2) / 2;
  const southOffset = 1.1 + southSpan / 2;
  const southWallA = edges(new THREE.BoxGeometry(southSpan, wallHeight, wallThickness), COLORS.wall, 0.75);
  southWallA.position.set(-southOffset, wallY, wallOffset);
  group.add(southWallA);
  const southWallB = edges(new THREE.BoxGeometry(southSpan, wallHeight, wallThickness), COLORS.wall, 0.75);
  southWallB.position.set(southOffset, wallY, wallOffset);
  group.add(southWallB);

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

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
  camera.position.set(16, 16, 20);

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
  controls.maxDistance = 60;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.target.set(0, 1.5, 0);

  /* Suelo con cuadrícula */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(GROUND_HALF * 2, GROUND_HALF * 2),
    new THREE.MeshBasicMaterial({ color: 0xe7ebf0 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const grid = new THREE.GridHelper(GROUND_HALF * 2, 24, COLORS.grid, COLORS.grid);
  grid.material.transparent = true;
  grid.material.opacity = 0.45;
  scene.add(grid);

  /* Ejes cardinales: norte hacia -Z, este hacia +X */
  const cardinals = [
    { label: "N", position: [0, 0.02, -GROUND_HALF + 1.2], color: COLORS.castle },
    { label: "S", position: [0, 0.02, GROUND_HALF - 1.2], color: COLORS.wall },
    { label: "E", position: [GROUND_HALF - 1.2, 0.02, 0], color: COLORS.wall },
    { label: "O", position: [-GROUND_HALF + 1.2, 0.02, 0], color: COLORS.wall }
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
  castleLabel.position.set(0, 0.4 + 2.6 + 3.1 + 0.9, 0);
  scene.add(castleLabel);

  /* Torres */
  TOWERS.forEach(function (tower) {
    const group = buildTower(COLORS.tower);
    place(group, tower.x, 0.4, tower.z);
    scene.add(group);

    const label = makeLabel("kingdom-render-label kingdom-render-label-tower", text(tower.labelKey));
    label.position.set(tower.x, 0.4 + 2.79, tower.z);
    scene.add(label);
  });

  /* Santuarios */
  SANCTUARIES.forEach(function (sanctuary) {
    const group = buildSanctuary(sanctuary.variant);
    place(group, sanctuary.x, 0, sanctuary.z);
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

  /* Vista inicial y vista superior */
  const homePosition = new THREE.Vector3(16, 16, 20);
  const homeTarget = new THREE.Vector3(0, 1.5, 0);
  const topPosition = new THREE.Vector3(0.01, 32, 0.01);

  function render() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  function setView(position, target) {
    camera.position.copy(position);
    controls.target.copy(target);
    controls.update();
    render();
  }

  controls.addEventListener("change", render);

  const topButton = document.getElementById("kingdomRenderTop");
  const resetButton = document.getElementById("kingdomRenderReset");
  if (topButton) {
    topButton.addEventListener("click", function () {
      setView(topPosition, new THREE.Vector3(0, 0, 0));
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      setView(homePosition, homeTarget);
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

  controls.update();
  render();

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
