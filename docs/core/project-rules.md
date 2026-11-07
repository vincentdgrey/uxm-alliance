# Reglas del Proyecto

## System Design (Arquitectura)

### Alcance

UXM Alliance es un sitio web estático publicado en GitHub Pages. La portada vive en la raíz del repositorio y las subpáginas en `./pages/`. Los archivos de `src/` son obsoletos y están deshabilitados.

### Fuentes de verdad

| Ámbito | Fuente de verdad | Regla de sincronización |
|---|---|---|
| Datos del juego | Variables de `js/activities-daily.js` (`ACTIVITIES`, `CALENDAR`, `ACTIVITY_CODE`, `EVENT_CODE`, `PHASES`, `DAILY`) | Editar las variables del script. Los archivos `db/*.json` son obsoletos y no los carga el sitio. |
| Sitio web | Código manual actual en `index.html`, `pages/*.html`, `css/style.css`, `css/activities-daily.css`, `js/app.js`, `js/i18n.js` y `js/activities-daily.js` | Cada cambio manual del usuario se conserva y se incorpora a estas reglas. |

**Regla de cambios manuales:** cuando el usuario informa que realizó cambios manuales en HTML, CSS, JavaScript o traducciones, el agente debe revisar el diff, respetarlos sin revertirlos ni sobrescribirlos y actualizar este documento para que describa el código vigente. Si una regla anterior contradice al código manual, prevalece el código manual y la regla obsoleta debe corregirse.

### Estructura del sitio

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal (Home), en la raíz del repositorio |
| `pages/actividades-diarias.html` | Actividades Diarias |
| `pages/normas-uxm.html` | Normas UXM |
| `pages/video-tutoriales.html` | Video Tutoriales |
| `pages/estrategia.html` | Estrategia |
| `pages/contacto.html` | Contacto |
| `css/style.css` | Estilos del sitio (se carga después de Bootstrap) |
| `css/activities-daily.css` | Estilos propios de los cronogramas (solo en actividades diarias) |
| `js/i18n.js` | Textos por idioma (8 idiomas) |
| `js/app.js` | Lógica del sitio: navegación, idiomas, contenido y video |
| `js/activities-daily.js` | Script único de la subpágina de actividades diarias: datos, cronogramas y utilidades |
| `js/video-cards.js` | Tarjetas de video de YouTube (solo en video tutoriales) |
| `media/subpages/*.svg` | Fondos temáticos de las portadas de subpágina |
| `tests/ui-contract.test.cjs` | Contrato funcional y visual del sitio |

**Todas las subpáginas viven en `./pages/`.** Solo `index.html` permanece en la raíz.

### Rutas relativas

- Desde la raíz (`index.html`): los recursos son `css/...` y `js/...`; los enlaces a subpáginas son `pages/<archivo>.html`.
- Desde `./pages/`: los recursos son `../css/...` y `../js/...`; los enlaces entre subpáginas son `<archivo>.html` y el Home es `../index.html`.
- `js/app.js` resuelve la profundidad en tiempo de ejecución con `inPagesDir()`, `basePath()` y `pageUrl()`. No usar rutas absolutas (`/pages/...`), porque romperían en los sitios de proyecto de GitHub Pages.
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

1. La versión está fijada en `6.0.0-alpha.1`. No usar rangos como `@6` para evitar cambios no controlados.
2. Los atributos `integrity` (SRI) son obligatorios: si se actualiza la versión, deben recalcularse.
3. `css/style.css` se carga después del CSS de Bootstrap para que la personalización prevalezca.
4. El sitio es HTML/CSS/JS estático: funciona en GitHub Pages sin configuración adicional y requiere conexión a internet para cargar el CDN.

### Internacionalización

- `js/i18n.js` define 8 idiomas: `es`, `en`, `pt`, `it`, `fr`, `ja`, `ru` y `zh`.
- El idioma se resuelve con `?lang=<código>`; si no existe, se usa `navigator.language` y, como último recurso, inglés (`DEFAULT_LANG = "en"`).
- Cada traducción visible del sitio se controla mediante una clave de `window.I18N` y se aplica en `js/app.js` con `setText()` o una función equivalente.
- Los identificadores HTML y las claves de traducción mantienen el mismo nombre cuando el contenido pertenece a una sección concreta: `arengaTitle`, `arengaMessage`, `tutoTitle`, `allianceTitle`, `allianceMessage`, `bonusAlliance`, `bonusFastBuild`, `bonusResearchSpeedup`, `bonusCraftingSpeedup`, `bonusFastTraining`, `bonusRallyStats`, `bonusShardExchange` y `bonusInProgress`.
- La arenga española es el texto manual vigente de `index.html`; no se recupera de los bloques obsoletos de `src/`.
- `allianceMessage` usa el texto manual vigente de `index.html` como fuente y se traduce a los 8 idiomas.
- Las etiquetas de la tabla de bonos tienen su propia clave por fila, de modo que los porcentajes y las estrellas quedan fuera del ámbito de la traducción.
- La clave `visitTitle` replica el encabezado de la sección de alianza y debe existir en los 8 idiomas, aunque hoy solo la consume la navegación.
- Las introducciones de cada subpágina (`#pageLead`) se resuelven a partir de `titleKey.replace("Title", "Lead")` en `js/app.js`, de modo que cada página usa su clave `page*Lead`: `pageDailyLead`, `pageRulesLead`, `pageTutorialsLead`, `pageStrategyLead` y `pageContactLead`, presentes en los 8 idiomas.
- Las introducciones describen el contenido real de la página: ninguna vuelve a usar el marcador «Próximamente».

### Paleta base del sitio

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#e9ecef` | Fondo gris suave del sitio |
| `--panel` | `#ffffff` | Superficie de referencia para paneles |
| `--line` | `#ced4da` | Bordes y separadores |
| `--text` | `#212529` | Texto principal sobre fondo claro |
| `--muted` | `#495057` | Texto secundario |
| `--hot` | `#df1b1b` | Acento de marca e interacciones principales |
| `--cyan` | `#0d6efd` | Estados de foco e interacción |
| `--scarlet` | `#ff2400` | Acento escarlata del menú y del título principal |
| `--gray-light` | `#e9ecef` | Fondo de la portada |
| `--concrete` | `#5a5a5a` | Texto principal del título sobre el video |
| `--primary-btn` | `#2266bb` | Botones de Normas UXM |
| `--button-radius` | `4px` | Radio de botones y enlaces con aspecto de botón |

El fondo del sitio es gris suave (`#e9ecef`). Por ese fondo claro, el texto usa la paleta oscura de Bootstrap y el título del hero aplica sombra clara y oscura para conservar el contraste.

### Reglas generales de interacción

- Todo elemento seleccionable que no tenga un acento explícito usa fondo `#26b` con texto `#fff` en `hover`, `focus-visible` y estado activo.
- El anillo de foco amarillo `#ffbf47` se mantiene visible sobre fondos azules.
- Todos los botones y enlaces con apariencia de botón usan `border-radius: var(--button-radius)` (`4px`).
- El sitio usa `color-scheme: light` y fondos claros explícitos. Los fondos oscuros permitidos están definidos de forma expresa: menú lateral `rgba(0, 0, 0, .72)`, hero, overlay y backdrop.

#### Portada de subpágina

- Todas las subpáginas usan el mismo estándar de portada:
  - `<section class="subpage-content <tema>" id="content">` como contenedor de fondo a ancho completo.
  - `<div class="subpage">` como bloque centrado del contenido.
  - `<h1 id="heroTitle" class="subpage-title">` con el título agrupado en `.subpage-title-word`.
- La primera letra del título vive en `<span class="subpage-title-initial subpage-title-accent">` y se pinta en rojo escarlata `var(--scarlet)` con relieve propio. El resto de la palabra va en un `<span>` contiguo.
- `js/app.js` reconstruye el `<h1>` con `setSubpageTitle()` al aplicar el idioma, de modo que la inicial escarlata se conserva en los 8 idiomas.
- En las subpáginas la inicial escarlata queda **centrada verticalmente** respecto al resto del texto: `.subpage-title-word` usa `display: inline-flex` y `align-items: center`. El hero de portada mantiene su alineación superior con `.hero-title-word { align-items: flex-start; }`.
- El texto del título de subpágina usa el gris claro `#adadad`, tanto en `.subpage-title` como en la regla contextual `#content.subpage-content .subpage-title`.
- La portada se extiende a todo el ancho de la ventana: `#content.subpage-content` usa `max-width: none`, `width: 100%` y `background-size: cover`.
- Una capa de contraste (`#content.subpage-content::before`) garantiza la legibilidad del título, el tag y el texto introductorio sobre la ilustración.
- Cada subpágina declara su clase temática para asociar el fondo SVG correspondiente de `media/subpages/`:

| Clase | Subpágina | Fondo |
|---|---|---|
| `.subpage-rules` | Normas UXM | `media/subpages/normas-uxm.svg` |
| `.subpage-daily` | Actividades Diarias | `media/subpages/actividades-diarias.svg` |
| `.subpage-tutorials` | Video Tutoriales | `media/subpages/video-tutoriales.svg` |
| `.subpage-strategy` | Estrategia | `media/subpages/estrategia.svg` |
| `.subpage-contact` | Contacto | `media/subpages/contacto.svg` |

- Los fondos son ilustraciones SVG originales, locales y sin dependencias externas, con ambiente oscuro postapocalíptico y acentos escarlata/cian.
- El título y el tag de la subpágina usan texto claro (`#f1f3f5`) con sombra de relieve; el texto introductorio (`.welcome`) usa `#e9ecef`.
- El contenido posterior de cada subpágina (secciones informativas, anclas y banners) se conserva sin cambios, salvo las actualizaciones de contenido acordadas de forma explícita con el usuario, como las tarjetas de video de tutoriales.

## Navbar & Menu

### Navbar superior

- El elemento `<nav class="navbar topbar">` tiene fondo transparente, sin `navbar-translucent` ni `data-bs-theme="dark"`.
- La barra es fija (`position: fixed; top: 0`) y no ocupa el flujo del documento.
- `pointer-events: none` se aplica al navbar y a `.container-fluid`; solo el botón, la marca, el panel y el backdrop son interactivos.
- El botón hamburguesa no tiene borde. Sus tres líneas son de `3px`, separadas `7px`, con `box-shadow` para mantener contraste sobre el video. En las subpáginas usan `#ccc`; en la portada usan `var(--hot)` (`#df1b1b`).
- En la portada, la marca **UXM** y las líneas de la hamburguesa usan `var(--hot)` (`#df1b1b`).
- Al abrir el menú, las tres líneas cambian a `var(--scarlet)` (`#ff2400`) y la tercera se alarga desde el origen hasta quedar a `10px` del borde derecho del panel.
- El aviso periódico de navegación dura 30 segundos: la primera línea avanza `20px` y la segunda `10px` hacia la derecha, y ambas regresan a su posición original. Se suspende con el menú abierto y con `prefers-reduced-motion`.
- La marca usa en `hover` y `focus-visible` texto blanco y fondo `var(--hot)`, con anillo de foco `#ffbf47`.
- No se muestra ningún icono «X»: el menú se cierra con backdrop, `Escape` o al pulsar un enlace.

### Menú lateral

- El panel propio `<div id="navPanel" class="nav-panel">` está anclado a la izquierda: `position: fixed`, `left: 0`, `top: 0`, `height: 100dvh`, `width: 100%` y `max-width: 400px`.
- El fondo es negro translúcido `rgba(0, 0, 0, .72)` con borde derecho blanco sutil `rgba(255, 255, 255, .16)` y texto blanco.
- La entrada usa `transform: translateX(-100%)` → `translateX(0)` al añadir `.is-open`.
- El backdrop propio (`#navBackdrop`) usa `rgba(33, 37, 41, .35)` y cierra el menú con `Escape`, con el backdrop o al pulsar un enlace.
- Solo existe un panel por página. El contenido lo genera `js/app.js` en `#navList`.
- El panel es un contenedor flex vertical con `overflow-y: auto`. Los enlaces mantienen prioridad visual en la parte superior y `#sideLangs` queda al final mediante `margin-top: auto`.
- El primer enlace es la portada y usa la clave `navHome`; la ruta relativa se calcula con `basePath()` y conserva `?lang=`. En `index.html` se marca como página activa.
- Los `.nav-item` y sus enlaces ocupan todo el ancho disponible, sin borde ni aspecto de botón. En `hover` y `focus-visible` se rellenan progresivamente de rojo escarlata desde la izquierda, con texto blanco.
- La página activa se marca con `.active`, `aria-current="page"` y un punto azul. El enlace activo respeta `border-radius: var(--button-radius)`.
- Los enlaces se generan con `?lang=` para conservar el idioma y apuntan a `index.html`, `actividades-diarias.html`, `normas-uxm.html`, `video-tutoriales.html`, `estrategia.html` y `contacto.html`.

## Secciones generales

### Secciones de estilo propio

#### Hero principal

- El hero de `index.html` ocupa el ancho completo y `min-height: 90dvh` con fallback `90vh`; al final queda visible el 10 % siguiente del viewport para señalar que la página continúa.
- Usa el video `media/video-particles-cyan.mp4` con `autoplay`, `muted`, `loop` y `playsinline`, cubriendo el hero con `object-fit: cover` y una capa de gradiente para legibilidad. `media/video-particles-cyan-poster.jpg` queda como poster y fondo estático de respaldo.
- `js/app.js` fuerza el silenciado antes de llamar a `video.play()` y captura el rechazo del navegador sin ocultar el poster.
- El título general `.hero-title` usa la fuente local **Cinzel**, color `#000` y no tiene subrayado. En el hero de portada usa `var(--concrete)` (`#5a5a5a`) y una sombra multicapa con relieve de piedra.
- El título flota verticalmente `10px` en un bucle suave de 6 s. Las palabras se agrupan con `inline-flex` y `align-items: flex-start`; cada inicial mide `1.12em` y queda alineada por su borde superior.
- La inicial `U` de «Under» usa `var(--scarlet)` (`#ff2400`) con sombra propia; el resto del título usa `var(--concrete)`.
- El `<p class="tag">` aplica el mismo lenguaje de relieve, con una luz superior sin color de texto, extrusión y sombra proyectada.
- En la parte inferior del cover se incluye `.hero-scroll-cue`: un mouse dibujado con CSS y rueda animada mediante `uxm-scroll-wheel`. Enlaza a `#infoTitle`, cambia a rojo escarlata en `hover` y `focus-visible` y mantiene un anillo de foco visible.
- Con `prefers-reduced-motion: reduce`, el título queda estático, el video se pausa y se oculta, permanece visible el poster y el indicador de scroll deja de animarse.

#### Bloque de video tutorial

- La sección destacada de tutoriales usa `.extra-top-space` para añadir `padding-top: 30px`.
- `.video-tutorial` limita el contenido a `760px`, usa `display: inline-flex`, `gap: 24px`, `margin: 0 auto 40px auto` y permite el salto de línea.
- `.component-video` muestra un video vertical de `298px` de ancho, con `aspect-ratio: 298 / 530`, fondo negro, bordes redondeados de `8px` y el iframe posicionado de forma absoluta dentro del contenedor.
- `.component-buttons` apila los enlaces en columna, usa `gap: 12px`, `flex: 0 1 300px`, `min-width: 200px` y `max-width: 40%`.
- A `640px` o menos, `.video-tutorial` cambia a columna y `.component-buttons` ocupa el `100%` con margen superior de `24px`.
- El video de YouTube usa el ID `kU9m5eJxbCQ` con reproducción automática silenciada (`autoplay=1&mute=1&playsinline=1`).

#### Tarjetas de video tutorial

- La subpágina `pages/video-tutoriales.html` muestra sus videos en tarjetas `<div class="card-video">`, agrupadas en `<div class="tutorials-content">`.
- Cada tarjeta declara el video en `data-youtube-id="<ID de YouTube>"` y contiene:
  - `<div class="card-video-media">` con la miniatura `<img class="card-video-thumb">` y los controles.
  - `<button class="card-video-play">` para reproducir y `<button class="card-video-sound">` para activar el audio.
  - La descripción `<p class="text-video-learnig" id="desc-video-...">`, debajo del video.
- No usar `<video>` con URL de página de YouTube (`youtube.com/watch?v=...`): ese elemento no reproduce ese tipo de contenido. El reproductor se crea con la API de YouTube.
- `.tutorials-content` usa `display: grid` con `grid-template-columns: repeat(2, minmax(0, 1fr))`, de modo que se muestran **dos tarjetas por ancho de página**; a `640px` o menos pasa a una sola columna.
- `.card-video` se muestra como tarjeta: fondo `var(--panel)`, borde `var(--line)`, `border-radius: var(--button-radius)`, sombra suave y elevación en `hover` y `focus-within`.
- `.card-video-media` usa `aspect-ratio: 16 / 9` y oculta el contenido con `overflow: hidden`; el iframe del reproductor se posiciona de forma absoluta sobre él.
- `.text-video-learnig` es el texto descriptivo de la tarjeta, con `padding: 12px 14px 14px` y alineación izquierda.
- El contenido se carga bajo demanda: la miniatura se muestra siempre con `loading="lazy"` y el iframe del reproductor se crea únicamente cuando el visitante interactúa con la tarjeta. Así no se cargan los 10 reproductores a la vez.
- La lógica vive en `js/video-cards.js`, que se carga después de `js/app.js`. El script carga la API de YouTube (`https://www.youtube.com/iframe_api`) de forma diferida y solo una vez.
- Comportamiento de reproducción:
  - Al pasar el mouse se crea el reproductor y se reproduce **silenciado** (`autoplay=1`, `mute=1`).
  - Al hacer clic en el control de sonido se habilita el audio (`unMute` y `setVolume(100)`) y se reproduce.
  - Al salir de la tarjeta se pausa (`pauseVideo`) y al volver se reanuda conservando la preferencia de audio ya autorizada.
  - El hover solo se activa en punteros finos (`(hover: hover) and (pointer: fine)`); con `prefers-reduced-motion: reduce` no hay reproducción automática.
- **Limitación del navegador:** los navegadores bloquean el audio sin una interacción explícita del usuario, por lo que el sonido exige un clic. El hover solo puede reproducir en silencio.
- Los estados visuales se controlan con las clases `.is-playing` (tarjeta activa) y `.is-muted` (reproductor sin sonido).
- Con `prefers-reduced-motion: reduce` las transiciones de la tarjeta se desactivan.

### Contenido común de las secciones

- Los bloques comunes son `<section class="block-content-info">` y `<section class="block-content-destacated">`. Ambos usan `margin: 40px auto`, `padding: 0 10%` y alineación izquierda por defecto.
- `.center-content` centra visualmente el contenido y el subtítulo. Sin esa clase, `.sibtitle-info` permanece alineado a la izquierda.
- `.block-content-destacated` usa fondo `#d3d3d3` y texto `#ccc` como contraste frente al bloque informativo.
- Los subtítulos son `<h2 class="sibtitle-info">` y usan Cinzel, texto `var(--concrete)`, sombra gris y primera letra escarlata mediante `.info-initial`. En la subpágina de tutoriales son `<h3 class="sibtitle-info banner-divisor">` por decisión manual del usuario.
- `.dinamic-welcome` enumera la palabra «Bienvenido» de todos los idiomas definidos salvo el activo, separados por ` · `. No utiliza temporizadores ni rotación.
- `.message-welcome` y `.message-arenga` limitan el texto a `760px`, lo centran y aplican `margin: 0 auto 24px`.
- `.message-welcome p` y `.message-arenga p` eliminan el margen superior e inferior y usan `line-height: 1.7`. La arenga usa `white-space: pre-line` para conservar sus saltos de línea.
- `.block-buttons` distribuye sus dos enlaces con `gap: 10%`:
  - YouTube: borde y texto `var(--scarlet)`, icono SVG y relleno animado; abre en pestaña nueva con `rel="noopener noreferrer"`.
  - Normas UXM: borde y texto `var(--primary-btn)`, relleno animado del mismo color y ruta relativa `pages/normas-uxm.html` con `?lang=`. Nunca usar `127.0.0.1`.
- `.component-buttons` genera tres enlaces `btn-outline btn-info-rules` hacia `#learningPriority`, `#tips` y `#events` de `pages/video-tutoriales.html`, conservando `?lang=`.
- `.ha-author` se muestra en cursiva, color `#7c7c7c`, alineado a la derecha y con `padding-bottom: 2px`. Su pseudoelemento `::after` dibuja el subrayado gris.
- `.line-divisor-scarlet` dibuja una línea `3px` de rojo escarlata, `width: 100%`, centrada y con `margin: 24px auto 0`.
- `.banner-divisor` convierte los subtítulos de la subpágina de tutoriales en banners con fondo `#ccc` y texto `#3d3d3d`, manteniendo la inicial escarlata.
- `.banner-subpage` comparte el mismo estilo que `.banner-divisor` (fondo `#ccc`, texto `#3d3d3d`, `padding: 12px 16px`, centrado, sin sombra e inicial escarlata) y se usa en los encabezados de sección de la subpágina de actividades diarias.
- Los encabezados con `.banner-subpage` viven en un contenedor dedicado `<section class="subpage-banner">`, hermano de `.block-content-info` dentro de `<main>`. Ese contenedor usa `width: 100%` y el fondo del `h2` ocupa de ese modo todo el ancho de la página.
- El contenedor `.subpage-banner` usa `margin: 40px 0 12px` y `.subpage-banner + .block-content-info` anula el `margin-top` del bloque informativo para no duplicar la separación vertical.
- No usar márgenes negativos ni `100vw` para alcanzar el ancho completo: `100vw` incluye el ancho de la barra de desplazamiento y genera overflow horizontal.
- La portada contiene las secciones de bienvenida (`infoTitle`), arenga (`arengaTitle` y `arengaMessage`), video tutorial (`tutoTitle`) y alliance (`allianceTitle`, `allianceMessage` y la tabla de bonos).

### Script único de Actividades Diarias

- La subpágina `pages/actividades-diarias.html` carga un **único script propio**: `js/activities-daily.js`, al final de `<body>`, después de `js/i18n.js` y `js/app.js`.
- Este script sustituye a los anteriores `js/battle-survival-schedule.js` y `js/alliance-duel-schedule.js`, que fueron eliminados.
- Su estructura interna es:
  1. **Datos fuente de verdad**: `ACTIVITIES`, `CALENDAR`, `ACTIVITY_CODE`, `EVENT_CODE`, `PHASES` y `DAILY`, declaradas una sola vez cada una y con los horarios en UTC-2.
  2. **Utilidades compartidas**: resolución del idioma, `pad`, `appendCell`, `tzLabel`, `tzName`, `renderTzInfo` y las constantes de desplazamiento horario y días de la semana.
  3. **Inicializadores independientes**: `initBattleSurvival()` y `initAllianceDuel()`. Cada uno comprueba sus elementos antes de actuar y devuelve su función de actualización o `null`.
- Los dos cronogramas comparten **un único `setInterval`** de `1 s` que invoca las actualizaciones disponibles.
- Los estilos de ambos cronogramas viven en `css/activities-daily.css`, que se carga después de `css/style.css`. El script ya no crea ni inyecta elementos `<style>`.
- El script no usa `fetch` ni carga archivos JSON: los datos son literales dentro del propio archivo.
- El script no modifica `document.title` ni `document.documentElement.lang`: la página anfitriona conserva su título y su idioma.
- El idioma se toma de `<html data-lang>`, que fija `js/app.js`, con inglés como respaldo.

### Datos de actividades (fuente de verdad)

- La fuente de verdad de los datos son las variables de `js/activities-daily.js`:

| Variable | Registros | Contenido |
|---|---|---|
| `ACTIVITIES` | 6 | Actividades y objetivos de Battle Survival |
| `CALENDAR` | 42 | Calendario semanal de Battle Survival, 6 slots por día |
| `ACTIVITY_CODE` | 33 | Actividades codificadas (objetive, resource, point, codebs) |
| `EVENT_CODE` | 7 | Definición de eventos (es/en) |
| `PHASES` | 7 | Fases del Duelo de Alianzas (P00-P06) |
| `DAILY` | 51 | Actividades diarias del Duelo de Alianzas por día (noday) |

- Los archivos `db/*.json` son **obsoletos**: se conservan como histórico, no los carga el sitio y no deben editarse ni usarse como referencia.
- La estructura `src/` también es obsoleta y no se enlaza.
- Al modificar datos deben respetarse las referencias: todo `CALENDAR.codebs` existe en `ACTIVITIES`, todo `ACTIVITY_CODE.codebs` vacío o existente en `ACTIVITIES`, todo `DAILY.code_task` en `ACTIVITY_CODE`, todo `DAILY.event` en `EVENT_CODE` y toda fase usada en `PHASES`.

### Cronograma de Batalla de Supervivencia

- La subpágina de actividades diarias incluye el calendario de Batalla de Supervivencia dentro de `<div class="battle-content">`, en la sección `#textBS`.
- La lógica vive en `initBattleSurvival()` de `js/activities-daily.js`.
- Las traducciones del calendario viven exclusivamente en `js/i18n.js`: `bsHeaders` (cinco encabezados), `bsPast`, `bsCurrent` y `bsNext`, presentes en los 8 idiomas. El calendario no mantiene una tabla de traducciones propia.
- Los nombres de los eventos de la columna Evento se traducen con la clave `bsEvents`, indexada por `codebs` (`BUILD`, `HEROE`, `RAVEN`, `SOLDIER`, `TECH`, `STANDBY`) y presente en los 8 idiomas. El valor inglés de `ACTIVITIES.event` queda como respaldo.
- Los resaltados de la tabla no dependen del texto traducido: `bs-hl-special` se aplica al código `SOLDIER` y `bs-hl-track` a `RAVEN` y `HEROE`.
- La tabla conserva el comportamiento responsivo original: `.bs-schedule` usa `min-width: 640px` y `max-width: 900px`, y `.bs-wrap` aplica `overflow-x: auto` para el desplazamiento horizontal en pantallas pequeñas. La tabla no se estira al ancho de la página.
- El calendario actualiza los contadores con un ciclo de `1 s`.
- El subtítulo propio `bs-subtitle` se eliminó: el encabezado de la sección es el que identifica el cronograma.

### Cronograma de Duelo de Alianzas

- La subpágina de actividades diarias incluye el calendario de Duelo de Alianzas dentro de `<div class="duel-alliance-content">`, en la sección `#textAD`.
- La lógica vive en `initAllianceDuel()` de `js/activities-daily.js`.
- Las traducciones del calendario viven exclusivamente en `js/i18n.js`: `scheduleAllianceDuel` (encabezado de sección) y `adHeaders` (seis encabezados de tabla), presentes en los 8 idiomas. El calendario no mantiene una tabla de traducciones propia.
- La tabla de cada día tiene **seis columnas** en este orden:
  1. `Hora Inicio`.
  2. Columna de imagen de la tarea, cargada desde `media/glyph/<icon>.png` según el valor `icon` de `ACTIVITY_CODE`.
  3. `Tarea`, con el valor `objetive` de `ACTIVITY_CODE`.
  4. Columna de imagen del recurso, visualmente vacía y reservada a futuro.
  5. `Recurso`, con el valor `resource` de `ACTIVITY_CODE`.
  6. `Evento`, con el valor localizado de `EVENT_CODE`.
- La columna `Fase` se retiró de la tabla: la fase solo se muestra en el título del día.
- La columna `Hora Inicio` usa la vinculación `ACTIVITY_CODE.codebs → ACTIVITIES.codebs → CALENDAR.codebs`. Solo la tabla del día actual (`ad-today`) calcula contadores en vivo: `+ HH:MM:SS` mientras el horario está en curso, `T-HH:MM:SS` para el próximo horario y `End` cuando ya no queda ninguno. Cada horario de Battle Survival permanece en curso hasta que empieza el siguiente horario del día, aunque este tenga otro código; si un código tiene dos horarios en el mismo día, el contador pasa al segundo cuando termina el primero.
- Las tablas de días futuros muestran la fecha `MM/DD` de la tabla para las tareas vinculadas. Las tareas sin `codebs` muestran `—` en la columna `Hora Inicio`; el valor `DAILY.time_init` ya no se utiliza para este renderizado.
- El Duelo de Alianzas no muestra un reloj de zona horaria: se eliminaron `#ad-tzinfo`, su regla CSS y sus referencias en JavaScript.
- Las celdas de imagen usan las clases `.ad-icon`, `.ad-task-icon` y `.ad-resource-icon`; la columna conserva `32 px` de ancho y la imagen admite hasta `64 px`. La segunda columna muestra el PNG indicado por `ACTIVITY_CODE.icon`; si el archivo no existe, la imagen se oculta y la celda queda vacía. La cuarta columna continúa reservada para futuros iconos de recurso. El atributo `data-code` guarda el código de la tarea.
- El valor `resource` se toma de `ACTIVITY_CODE`; si está vacío o ausente, la celda queda vacía.
- Las filas de cada día se ordenan alfabéticamente por el nombre visible del evento, manteniendo el orden original dentro de cada grupo. Los grupos se separan con `border-bottom: 2px solid #4d7799`.
- Todas las tablas comparten el mismo `<colgroup>` (`AD_COLUMNS`) para conservar ancho y alineación entre días: `.ad-schedule` usa `table-layout: fixed`, `width: 100%` y `min-width: 760px`, con `.ad-col-time` (84 px), `.ad-col-icon` (32 px), `.ad-col-task` (automático), `.ad-col-resource` (20 %) y `.ad-col-event` (170 px). En pantallas estrechas la tabla se desplaza horizontalmente dentro de `.ad-wrap`.
- Los estilos de `.ad-item-title` son ajustes manuales del usuario y no deben alterarse: color `#4d7799`, borde `2px solid #4d7799`, `border-radius: 3px`, fondo `#9b9b9b36`, `font-size: 1.1rem` y `padding: 0 10px 0 10px`. El día actual mantiene el verde `#009922`.
- El calendario presenta los siete días desde el día actual en UTC-2, con el día actual destacado, los dos primeros paneles abiertos y conversión de horarios a la zona local del visitante.
- El subtítulo propio `ad-subtitle` se eliminó: el encabezado de la sección es el que identifica el cronograma.

### Encabezados de sección traducidos

- Los subtítulos de sección que deben traducirse declaran el atributo `data-i18n="<clave>"`.
- `js/app.js` los reconstruye con `applySectionTitles()`, que invoca `setSectionTitle()` y aplica la inicial escarlata mediante `<span class="info-initial">`, igual que el resto de subtítulos.
- `applySectionTitles()` se ejecuta antes de `applyInfoContent()`, que detecta la inicial ya presente y no la duplica.
- La clave i18n `scheduleBattleSurvival` traduce el encabezado «Cronograma Batalla Supervivencia» en los 8 idiomas.
- La clave i18n `scheduleAllianceDuel` traduce el encabezado «Duelo de Alianzas» en los 8 idiomas.
- Los encabezados de la subpágina de tutoriales usan claves propias: `tutorialLearningPriorityTitle` («Aprendizaje Prioritario»), `tutorialTipsTitle` («Dato Práctico») y `tutorialEventsTitle` («Eventos»), presentes en los 8 idiomas.
- Las claves `learningPriority`, `tips` y `events` se reservan para los botones de la portada y no deben reutilizarse para los encabezados: sus textos difieren.

### Textos traducidos con data-i18n-text

- Los textos simples que deben traducirse, como las descripciones de las tarjetas de video, declaran el atributo `data-i18n-text="<clave>"`.
- `js/app.js` los aplica con `applyTexts()`, que sustituye el `textContent` del nodo. No se inserta ninguna inicial escarlata ni se modifica la estructura del párrafo.
- `data-i18n` queda reservado para encabezados con inicial escarlata y `data-i18n-text` para párrafos y textos simples.
- Las descripciones de las tarjetas de video usan `videoTutorialPriority1..3`, `videoTutorialTip1..3` y `videoTutorialEvent1..4`, presentes en los 8 idiomas. El texto español conserva la redacción manual del usuario, incluidos sus términos, cifras y mayúsculas.
- Las descripciones detallan los objetivos, metas y condiciones de cada tutorial y evento. Al traducirlas, deben conservarse los valores del juego: `24H`, `8H`, `25%` a `60%`, `SSR`, `UR`, `Lv.6`, `225M`, `990M`, `150K`, `1.5M`, `MVP 1` y el reino `277`.
- `videoTutorialPriority1` indica **no perder soldados y evitar dar puntos al enemigo**. Cualquier traducción debe conservar esa negación: es el sentido contrario al de una lectura literal de «perder soldados».

### Contenido traducido con data-i18n-html

- Los párrafos que contienen marcado en línea, como las reglas con enlaces, declaran el atributo `data-i18n-html="<clave>"`.
- `js/app.js` los aplica con `applyRichTexts()`, que sustituye el `innerHTML` del nodo.
- Las traducciones de este tipo son **textos locales y controlados**, escritos dentro de `js/i18n.js`; no provienen de ninguna fuente externa. Por eso el uso de `innerHTML` queda acotado a estas claves de contenido estático del sitio.
- El marcado de la traducción conserva la estructura del original: mismas URL de destino y misma clase `link-info` en los enlaces.
- `data-i18n-html` queda reservado a este contenido con enlaces. Para texto plano debe usarse `data-i18n-text`, que no admite marcado.

### Atributos traducidos con data-i18n-title

- Los elementos que necesitan un texto accesible en un atributo declaran `data-i18n-title="<clave>"`.
- `js/app.js` los aplica con `applyTitles()`, que escribe el atributo `title` del nodo.
- Se usa en el `iframe` del formulario de contacto con la clave `contactFormFrameTitle`, presente en los 8 idiomas.

### Subpágina de Normas UXM

- La subpágina `pages/normas-uxm.html` contiene tres bloques localizables: `.kingdom-content`, `.alliance-content` y `.positions-content`.
- Los encabezados `#rulesKingdom`, `#rulesAlliance` y `#accendingAlliance` declaran `data-i18n` con las claves `rulesKingdomTitle`, `rulesAllianceTitle` y `rulesPositionsTitle`, presentes en los 8 idiomas.
- El contenido se localiza con claves propias:
  - Reino: `rulesKingdomK1` y `rulesKingdomK2`.
  - Alianza: `rulesAllianceA1` a `rulesAllianceA11`, más `rulesAllianceHelp` para el mensaje de ayuda final.
  - Posiciones: `rulesPositionR1` a `rulesPositionR5`, más los roles `rulesRoleDiplomat`, `rulesRoleGoddess`, `rulesRoleRecruiter` y `rulesRoleWarGod` con su texto asociado (`rulesRoleDiplomatText`, etc.).
- Las reglas de la alianza se numeran de **A1 a A11** sin repeticiones. La numeración corregida sustituye a la duplicada A9 anterior.
- Las reglas A4, A5, A6 y A9 contienen enlaces y se localizan con `data-i18n-html`.
- El enlace interno a los tutoriales dentro de A9 usa la ruta relativa `video-tutoriales.html`, nunca una ruta absoluta con `/pages/`, para no romper en los sitios de proyecto de GitHub Pages.
- Las etiquetas `K1`, `A1`, `R1` y las de los rangos son identificadores del juego y no se traducen; los nombres de los roles especiales sí.

### Formulario de contacto

- La subpágina `pages/contacto.html` incrusta el formulario de Google Forms dentro de `<div class="form-content">` mediante un `iframe` con la vista embebible `viewform?embedded=true` y `loading="lazy"`.
- El encabezado `#contactForm` se localiza con `data-i18n="contactFormTitle"` («Formulario de contacto»).
- Junto al `iframe` se ofrece un enlace alternativo a la URL corta del formulario, con `target="_blank"` y `rel="noopener noreferrer"`, cuyo texto se localiza con `contactFormOpen`.
- Los estilos viven en `css/style.css`: `.form-content` apila sus hijos, `.form-embed` limita el ancho a `760px` y `.form-frame` ocupa el `100%` del contenedor con `border: 0`.
- Este formulario es la única dependencia externa de contenido del sitio y se carga bajo demanda, sin `fetch` ni peticiones desde JavaScript.

### Bloque de bonos de la alianza

- La tabla de bonos vive en `<div class="bonus-alliance left-content">` y usa `.left-content` (`text-align: left`) para alinear el contenido a la izquierda dentro de la sección centrada.
- El encabezado usa `#bonusAlliance` y la tabla `.info-data` conserva sus estrellas, porcentajes y clases originales.
- Las etiquetas de cada bono se localizan con `bonusFastBuild`, `bonusResearchSpeedup`, `bonusCraftingSpeedup`, `bonusFastTraining`, `bonusRallyStats` y `bonusShardExchange`.
- La celda en curso (`#bonusCraftingSpeedup`) conserva la clase `.in-progress`, cuyo pseudoelemento `::after` muestra el estado localizado mediante `attr(data-progress)`. El valor se asigna en `js/app.js` con la clave `bonusInProgress`.
- Los porcentajes y las estrellas no se traducen: son valores numéricos del juego.
- La clave `bonuses` se eliminó con el bloque legado; no debe reintroducirse.
- El contenedor legado `.home-body` y el bloque `.bonus-block` no forman parte del sitio; no deben reintroducirse sin una nueva decisión del usuario.

## Footer

- El footer queda siempre al final: `body` es flex column con `min-height: 100dvh`, `#stage` crece (`flex: 1 1 auto`) y el footer usa `flex: 0 0 auto`.
- En escritorio se usa CSS Grid `1fr auto 1fr`: YouTube a la izquierda, copyright en el centro y selector de idioma a la derecha.
- A `620px` o menos, el footer pasa a una columna y centra sus contenidos.
- El enlace de YouTube incluye icono SVG, abre en pestaña nueva con `rel="noopener noreferrer"` y usa `var(--hot)` en `hover`.
- El copyright corporativo es fijo en todos los idiomas: `© 2026 UXM – Under Xtreme Madness Alliance`.
- El selector de idioma (`#langs`) es un Menu desplegable de Bootstrap (`data-bs-toggle="menu"`, `data-bs-placement="top-end"`): se abre hacia arriba y alineado a la derecha.
- Junto al disparador se muestra la etiqueta visible «Lenguaje» (`.lang-label`, clave `language`), asociada al botón mediante `aria-labelledby="langLabel langToggle"`.
- Cada idioma se muestra en su propio idioma (`Español`, `English`, `Português`, `Italiano`, `Français`, `日本語`, `Русский`, `中文`), con atributo `lang` y el activo marcado con `.selected` y `aria-current="true"`.
- El cambio de idioma conserva la página actual y añade `?lang=`.
