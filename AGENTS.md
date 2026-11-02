# AGENTS.md - UXM Alliance

Configuración para agentes de IA. Este archivo garantiza continuidad del proyecto entre sesiones.

---

## Descripción del Proyecto

1. Pagina web pura, alojamiento final cloud en Github Pages, carpeta root del website `src/`.
2. Cada archivo en `src/pages/section` es un **bloque-script** independiente que funciona sin librerías externas, útiles para prototipos.
3. sin dependencias de red (sin fetch/CORS), en lo posible.
4. Determinando el lenguaje del navegador (navigator.language + ?lang=es) cambiar el texto según el idioma disponible: español, ingles, portugués, italiano, turco, francés, chino, japones. default:ingles.
5. Include Bootstrap’s CSS and JavaScript files via CDN. CDNs (Content Delivery Networks) are services that provides copies of libraries for your website.
6. usar como base de conocimiento para implementar elementos html https://getbootstrap.com/docs/6.0/components/accordion/

---

## Estructura de Carpetas

```
uxm-alliance/
├── AGENTS.md          # Este archivo - configuración para agentes
├── README.md          # Descripción breve del proyecto
├── src/               # root web site
|   ├── css            # archivos de estilos del sitio web
|   |   └── style.css
|   ├── js             # archivos javascript del sitio web
|   |   ├── i18n.js    # Textos por idioma
|   |   └── app.js     # Lógica sitio web
|   ├── media          # archivos multimedia
|   |   └── video-particles-cyan.mp4  # video cover pagina de inicio
|   ├── pages/         # Subpáginas del sitio web
|   |   ├── section    # carpeta Bloques-script (un archivo = un bloque)
|   |   ├── actividades-diarias.html  # Actividades Diarias
|   |   ├── normas-uxm.html           # Normas UXM
|   |   ├── video-tutoriales.html     # Video Tutoriales
|   |   ├── estrategia.html           # Estrategia
|   |   └── contacto.html             # Contacto
|   └── index.html     # Archivo principal sitio web (única página en la raíz)
├── db/                # Datos fuente en JSON (referencia base absoluta)
├── bin/               # Scripts utilitarios windows/wsl
├── prompt/            # Instrucciones de sesión
└── docs/              # Documentación del proyecto
    ├── architecture/  # Decisiones de diseño y patrones
    ├── core/          # Reglas del proyecto y alcance
    └── tracking/      # Changelog y milestones
```

---

## Sitio Web (./src/)

1. **Bootstrap 6 por CDN obligatorio**: versión fijada `6.0.0-alpha.1` (jsDelivr) con `integrity` SRI y `crossorigin`. Sin npm ni paso de build: el sitio sigue siendo estático y funciona en GitHub Pages.
2. `css/style.css` se carga **después** del CSS de Bootstrap para que la personalización prevalezca.
3. **Barra superior**: `<nav class="navbar topbar">` con fondo **transparente** y texto en el color estándar del esquema claro (`--fg-2` / `--fg-body`). Superpuesta y con `pointer-events: none` para no bloquear el Home.
4. **Menú lateral**: panel propio (`<div id="navPanel" class="nav-panel">`), fijo en el borde **izquierdo**, a pantalla completa (`100dvh`) y con `max-width: 400px`, fondo gris claro translúcido (`rgba(248, 249, 250, .6)`) y entrada animada desde la izquierda. Enlaces minimalistas (sin aspecto de botón); la página activa se marca con un punto azul. Backdrop propio (`#navBackdrop`) y cierre con `Escape` o al pulsar un enlace. Un solo panel por página, con los enlaces generados por `js/app.js`.
5. **Hamburguesa**: sin borde, la animación solo cambia la forma de las barras (nunca el color) y **no se muestra icono "X"** al abrir.
6. **Fondo gris suave** `--bg: #e9ecef`, con texto oscuro (`--text: #212529`) y sombras recalculadas.
7. **Footer**: siempre al fondo (body flex + `min-height: 100dvh`), en grid `1fr auto 1fr`: YouTube a la izquierda, copyright en el centro y **selector de idioma a la derecha**.
8. **Selector de idioma**: `Menu` desplegable de Bootstrap (`data-bs-toggle="menu"`, `data-bs-placement="top-end"`), se abre hacia arriba. Cada idioma se muestra en su propio idioma con atributo `lang`; conserva `?lang=` al cambiar. Se acompaña de la etiqueta visible **«Lenguaje»** (clave `language`).
9. **Rutas**: las subpáginas están en `./pages/`; usa rutas **relativas** (`../css`, `../js`, `../index.html`). `js/app.js` las resuelve con `inPagesDir()`, `basePath()` y `pageUrl()`. Nunca rutas absolutas (`/pages/...`): rompen en sitios de proyecto de GitHub Pages.
10. **Estados seleccionables**: `hover`, `focus-visible` y `active` usan fondo `#26b` con texto `#fff` (nunca texto oscuro sobre azul). Anillo de foco `#ffbf47`.
11. **Enlace principal**: el navbar muestra **"Inicio UXM"** y apunta a `index.html` (o `../index.html` desde `./pages/`).
12. **Hero principal**: a pantalla completa (`100dvh`) y ancho completo, con video de fondo `multimedia/video-particles-cyan.mp4` (`autoplay muted loop playsinline`). El `heroTitle` debe animarse simulando suavemente flotando en su posición en bucle; con `prefers-reduced-motion` se muestra estático y sin video, con imagen de fondo estatica.

> Detalle completo en `docs/core/project-rules.md`.

---

## Convenciones de Bloques-Script

Cada archivo en `src/pages/section` DEBE cumplir:

1. **Solo `<div>` + `<script>`**: No incluir `<html>`, `<head>`, `<body>`, ni `<style>`.
2. **CSS inyectado vía JS**: Los estilos se crean dinámicamente desde el script usando un elemento `<style>` inyectado al DOM.
3. **Sin librerías externas**: Vanilla JS, compatible con ES5 (var, function, sin arrow functions ni let/const).
4. **Datos embebidos**: Toda la data necesaria va dentro del script (sin fetch, sin CORS, sin dependencias de red).
5. **100% autónomo**: Cada bloque funciona por sí solo al pegarlo en Google Sites.
6. **IIFE**: Todo el código se envuelve en `(function () { "use strict"; ... })();`.
7. **Prefijo de clases**: Cada bloque usa un prefijo único (ej: `bs-` para battle-survival) para evitar colisiones en Google Sites.

---

## Zona Horaria Base

**UTC-2** es la zona horaria origen donde se registran todos los datos de actividades.

- Los horarios en `db/*.json` están en UTC-2.
- Cada bloque-script o script del sitio web convierte los horarios a la zona local del visitante automáticamente.
- Fórmula: `UTC = hora_origen + 2h` → luego se convierte a la zona del navegador.

---

## Paleta de Colores Estándar

Todos los bloques-script deben usar esta paleta para acciones o elementos de importancia:

| Token     | Hex       | Uso                                    |
|-----------|-----------|----------------------------------------|
| `success` | #009922 | Acciones completadas, estado en curso  |
| `primary` | #26b    | Elementos principales, headers, títulos|
| `warning` | #e95612 | Alertas preventivas, próximos eventos  |
| `alert`   | #df1b1b | Errores, eventos críticos              |

Colores neutros complementarios (no requieren token):

```css
/* texto base */
.texto-base {font-weight: 300; text-align: center; color: #213247; font-size: 13pt; line-height: 1.6;}
.texto-secundario {color: #aaa;}
.bordes-tabla-standard {border: 1px solid #eee;}
.texto-pasado-atenuado {color: #b3b3b3;}
.texto-success-2 {background-color: #00ff39; color: #00821d;}
.texto-tracking-1 {background-color: #727374; color: #ebebeb;}
.texto-tracking-2 {background-color: #008cff; color: #003882;}
.texto-special-1 {background-color: #ffee00; color: #b65200;}

```
---

## Flujo de Trabajo

1. **Plan**: Usar modo Plan para decisiones de arquitectura antes de construir.
2. **Explore**: Antes de modificar código existente, usar `@explore` para entender la estructura.
3. **Build**: Al escribir `GO`, ejecutar tareas secuencialmente.
4. **Review**: Usar `@review` tras completar una feature.
5. **Debug**: Usar `@debug` para investigar problemas.

---

## Reglas de Commits Atómicos

Tras cada modificación exitosa, generar commits individuales por concepto (no agrupar cambios no relacionados):

Formato conventional commits:

- `feat [scope]: descripcion` - nueva funcionalidad
- `fix [scope]: descripcion` - corrección de bug
- `refactor [scope]: descripcion` - refactorización
- `upd [scope]: descripcion` - modificación de capa o ajuste
- `rem [scope]: descripcion` - eliminación
- `release [version]: descripcion` - release gitflow

---

## Bloques-Script Google Site Existentes

| Archivo | Prefijo | Descripción |
|---|---|---|
| `src/pages/section/battle-survival-schedule.html` | `bs-` | Calendario semanal Battle Survival con counter en tiempo real |
| `src/pages/section/alliance-duel-schedule.html` | `ad-` | Listados contraíbles de actividades diarias Duelo de Alianzas (7 días, hoy destacado) |

---

## Datos Fuente (db/)

| Archivo | Descripción |
|---|---|
| `db/calendar-battle-survival.json` | Calendario semanal (42 slots, 6 por día) |
| `db/activity-battle-survival.json` | Actividades y objetivos de Battle Survival |
| `db/activity-duel-alliance.json` | Actividades y fases de Duel Alliance |
| `db/activity-daily-alliance.json` | Actividades diarias Duelo de Alianzas por día (noday) |
| `db/activity-code.json` | Actividades codificadas (objetive, point, phase) |
| `db/event-code.json` | Definición de eventos (es/en) |
| `db/alliance-duel-phase.json` | Fases del Duelo de Alianzas (P01-P06) |

> Los datos en `db/` son la fuente de verdad. Al actualizar un bloque-script, sincronizar los datos embebidos con estos archivos.
