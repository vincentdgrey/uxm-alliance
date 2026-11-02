# Reglas del Proyecto

## Alcance

UXM Alliance es un conjunto de bloques-script autónomos para Google Sites que muestran información del juego (calendarios, actividades, contadores en tiempo real).

Además, el repositorio incluye un **sitio web estático** (GitHub Pages) con navegación, página principal y subpáginas.

## Fuente de Verdad

Los datos en `db/*.json` son la fuente de verdad. Al actualizar un bloque-script, los datos embebidos deben sincronizarse con estos archivos.

## Bloques Existentes

| Archivo | Prefijo | Descripción |
|---|---|---|
| `src/battle-survival-schedule.html` | `bs-` | Calendario semanal Battle Survival con counter en tiempo real |

## Datos Fuente

| Archivo | Descripción |
|---|---|
| `db/calendar-battle-survival.json` | Calendario semanal (42 slots, 6 por día) |
| `db/activity-battle-survival.json` | Actividades y objetivos de Battle Survival |
| `db/activity-duel-alliance.json` | Actividades y fases de Duel Alliance |

## Sitio Web

### Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal (Home), en la raíz del repositorio |
| `pages/actividades-diarias.html` | Actividades Diarias |
| `pages/normas-uxm.html` | Normas UXM |
| `pages/video-tutoriales.html` | Video Tutoriales |
| `pages/estrategia.html` | Estrategia |
| `pages/contacto.html` | Contacto |
| `css/style.css` | Estilos del sitio (se carga después de Bootstrap) |
| `js/i18n.js` | Textos por idioma (9 idiomas) |
| `js/app.js` | Lógica del sitio (menú, idiomas, video y título animado) |

**Todas las subpáginas viven en `./pages/`.** Solo `index.html` permanece en la raíz.

Reglas de rutas (relativas, para que funcionen en GitHub Pages con subruta de proyecto):

- Desde la raíz (`index.html`): los recursos son `css/...` y `js/...`; los enlaces a subpáginas son `pages/<archivo>.html`.
- Desde `./pages/`: los recursos son `../css/...` y `../js/...`; los enlaces entre subpáginas son `<archivo>.html` y el Home es `../index.html`.
- `js/app.js` resuelve la profundidad en tiempo de ejecución con las funciones `inPagesDir()`, `basePath()` y `pageUrl()`. No usar rutas absolutas (`/pages/...`), porque romperían en los sitios de proyecto de GitHub Pages.
- El cambio de idioma conserva la página actual añadiendo `?lang=<código>`.

### Bootstrap 6 (CDN obligatorio)

El sitio usa **Bootstrap 6** cargado exclusivamente por CDN (jsDelivr), sin paso de build ni `npm`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-B/GM4XqrwHnWXNOWMbloTmrYXZg10cakYGmpfsR/bbzQ6JAJI4ihuyADKLnBgrCe" crossorigin="anonymous">
<script type="module" src="https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-1a/pXj49ZQ1aHEmrJ+gMw1otqoVsYwlEnlD8mIfY2TV03r20Y0CN7uqx1tQogjPL" crossorigin="anonymous"></script>
```

Reglas:

1. La versión está **fijada** (`6.0.0-alpha.1`, versión estable oficial de Bootstrap 6). No usar rangos como `@6` para evitar cambios no controlados.
2. Los atributos `integrity` (SRI) son obligatorios: si se actualiza la versión, deben recalcularse.
3. `css/style.css` se carga **después** del CSS de Bootstrap para que la personalización del sitio prevalezca.
4. El sitio es HTML/CSS/JS estático: funciona en **GitHub Pages** sin configuración adicional. Requiere conexión a internet para cargar el CDN.

### Componentes Bootstrap en uso

| Componente | Uso |
|---|---|
| Navbar (`<nav class="navbar topbar">`) | Barra superior transparente, superpuesta y con texto en el color estándar del esquema claro |
| Panel de navegación propio (`<div id="navPanel" class="nav-panel">`) | Menú lateral fijo anclado a la **izquierda**, a pantalla completa y con animación de entrada |
| Menu (`<div class="menu">` + `data-bs-toggle="menu"`) | Lista desplegable del selector de idioma, con `data-bs-placement="top-end"` |
| Grid y utilities | Layout del contenido y del footer |

### Colores del sitio

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#e9ecef` | Fondo gris suave del sitio |
| `--panel` | `#ffffff` | Superficie de referencia para paneles |
| `--line` | `#ced4da` | Bordes y separadores |
| `--text` | `#212529` | Texto principal sobre fondo claro |
| `--muted` | `#495057` | Texto secundario |
| `--hot` | `#df1b1b` | Acento (marca UXM, YouTube) |
| `--cyan` | `#0d6efd` | Estados de foco e interacción |

El fondo del sitio es **gris suave** (`#e9ecef`, equivalente a `bs-gray-200`). Por ese fondo claro, el texto del sitio usa la paleta oscura de Bootstrap (`bs-gray-900` / `bs-gray-700`) y el título del hero aplica sombra clara y oscura para conservar el contraste.

### Navbar (barra superior)

- Elemento `<nav class="navbar topbar">` con **fondo transparente** (`background-color: transparent`, sin `navbar-translucent` ni `data-bs-theme="dark"`).
- El texto usa el **color estándar** del esquema claro de Bootstrap (`--navbar-color: var(--fg-2)`, `--navbar-brand-color: var(--fg-body)`).
- Transparente, superpuesto (`position: absolute`), sin fondo ni borde.
- `pointer-events: none` en el navbar y en su `.container-fluid` para no bloquear el Home; solo el botón hamburguesa, la marca y el panel de navegación son interactivos.
- El botón hamburguesa **no tiene borde** y su animación solo cambia la forma de las barras (nunca el color).
- No se muestra ningún icono "X": el menú se cierra con backdrop, `Escape` o al pulsar un enlace.

### Menú lateral

- Panel propio **anclado a la izquierda**: `position: fixed`, `left: 0`, `top: 0`, `height: 100dvh`, `width: 100%` y `max-width: 400px`. El ancho nunca supera 400 px en escritorio ni en móvil.
- Fondo gris claro translúcido `rgba(248, 249, 250, .6)` (40 % de transparencia) sobre el fondo base `#e9ecef`, con texto gris oscuro `#212529`.
- Entrada animada desde la izquierda: `transform: translateX(-100%)` → `translateX(0)` al añadir la clase `.is-open`.
- La hamburguesa usa tres líneas sólidas de `3px` separadas `7px`. Al abrir, la tercera línea se alarga desde su origen hasta quedar a `10px` del borde derecho del panel; al cerrar recupera su ancho inicial. La animación nunca cambia el color ni forma un icono «X».
- Backdrop propio (`#navBackdrop`) con `rgba(33, 37, 41, .35)`; cierre con `Escape`, con el backdrop o al pulsar un enlace.
- Un único panel por página con `id="navPanel"`; el contenido lo genera `js/app.js` en `#navList`.
- Enlaces **minimalistas**: sin fondo, borde ni aspecto de botón; en `hover`/`focus-visible` cambian a `#26b` y la página activa se marca con un punto azul (`.active::after`).
- Enlaces generados con `?lang=` para conservar el idioma: `actividades-diarias.html`, `normas-uxm.html`, `video-tutoriales.html`, `estrategia.html`, `contacto.html` (con prefijo `pages/` cuando se viewing desde la raíz).
- La página activa se marca con `aria-current="page"` y la clase `.active`.

### Hero principal (página de inicio)

- El hero de `index.html` ocupa el ancho completo y `min-height: 100dvh`; el contenido posterior se mantiene limitado a `960px` en `.home-body`.
- Video de fondo `media/video-particles-cyan.mp4` con `autoplay`, `muted`, `loop` y `playsinline`, cubriendo el hero con `object-fit: cover` y una capa de gradiente para legibilidad. El MP4 usa H.264 y `yuv420p`; `media/video-particles-cyan-poster.jpg` queda como poster y fondo estático de respaldo.
- `js/app.js` fuerza el silenciado antes de llamar a `video.play()` y captura el rechazo del navegador sin ocultar el poster.
- El `heroTitle` usa la fuente local **Cinzel**, no tiene subrayado y aplica una sombra multicapa con relieve de piedra. Flota verticalmente `8px` en un bucle suave de 6 s sin abandonar su posición central.
- Con `prefers-reduced-motion: reduce` el título se muestra estático, el video se pausa y se oculta, y permanece visible el poster estático.

### Esquema de color y copyright

- El sitio usa `color-scheme: light` y fondos claros explícitos. No aplica fondos negros implícitos; los fondos oscuros permitidos están definidos de forma expresa (hero, overlay y backdrop).
- El selector de idioma usa siempre esquema claro, con superficie `#fff`, texto oscuro y borde `--line`.
- El copyright corporativo es fijo en todos los idiomas: `© 2026 UXM – Under Xtreme Madness`.

### Estilos de selección (hover / focus / active)

Regla general del sitio: **todo elemento seleccionable usa fondo `#26b` (primary) con texto `#fff`** en `hover`, `focus-visible` y estado activo. Nunca texto oscuro sobre fondo azul.

| Elemento | Regla |
|---|---|
| Enlaces del menú (`.nav-list a`) | Estilo minimalista: sin fondo ni borde; `hover`/`focus-visible` con color `#26b` y foco con `box-shadow: 0 2px 0 #ffbf47`; la página activa muestra un punto azul |
| Opciones del desplegable de idioma (`.lang-menu .menu-item`) | Fondo `#26b` + texto blanco; el estado `.selected` mantiene el fondo y en hover pasa a `#1a53a0` |
| Disparador del desplegable (`.lang-toggle`) | Fondo `#26b` + texto blanco en hover y foco |
| Marca del navbar (`.topbar-brand`) | Fondo `#26b` + texto blanco en hover y foco |

El anillo de foco usa `#ffbf47` (amarillo) porque mantiene la visibilidad sobre el fondo azul.

### Footer

- Siempre al fondo de la página: `body` es flex column con `min-height: 100dvh`, `#stage` crece (`flex: 1 1 auto`) y el footer queda al final (`flex: 0 0 auto`). Con contenido que excede el alto de pantalla, la página se vuelve continua con scroll normal.
- Distribución de escritorio (CSS Grid `1fr auto 1fr`): **YouTube a la izquierda, copyright en el centro y selector de idioma a la derecha**.
- El selector de idioma (`#langs`) es un **Menu desplegable de Bootstrap** (`data-bs-toggle="menu"`, `data-bs-placement="top-end"`): se abre hacia arriba y alineado a la derecha.
- Junto al disparador se muestra la etiqueta visible **«Lenguaje»** (`.lang-label`, clave `language` de `i18n.js`, traducida a `Language`, `Idioma`, `Lingua`, `Langue`, `言語`, `Язык`, `语言`), asociada al botón mediante `aria-labelledby="langLabel langToggle"`.
- Cada idioma se muestra **en su propio idioma** (`Español`, `English`, `Português`, `Italiano`, `Français`, `日本語`, `Русский`, `中文`), con atributo `lang` y el activo marcado con `.selected` + `aria-current="true"`.
- El cambio de idioma conserva la página actual y añade el parámetro `?lang=`.
