# Reglas del Proyecto

## System Design (Arquitectura)

### Alcance

UXM Alliance es un sitio web estático publicado en GitHub Pages. La portada vive en la raíz del repositorio y las subpáginas en `./pages/`. Los archivos de `src/` son obsoletos y están deshabilitados.

### Fuentes de verdad

| Ámbito | Fuente de verdad | Regla de sincronización |
|---|---|---|
| Datos del juego | `db/*.json` | Los datos embebidos en cualquier bloque-script deben coincidir con estos archivos. |
| Sitio web | Código manual actual en `index.html`, `pages/*.html`, `css/style.css`, `js/app.js` y `js/i18n.js` | Cada cambio manual del usuario se conserva y se incorpora a estas reglas. |

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
| `js/i18n.js` | Textos por idioma (8 idiomas) |
| `js/app.js` | Lógica del sitio: navegación, idiomas, contenido y video |
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
- El contenido posterior de cada subpágina (secciones informativas, anclas y banners) se conserva sin cambios.

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

### Contenido común de las secciones

- Los bloques comunes son `<section class="block-content-info">` y `<section class="block-content-destacated">`. Ambos usan `margin: 40px auto`, `padding: 0 10%` y alineación izquierda por defecto.
- `.center-content` centra visualmente el contenido y el subtítulo. Sin esa clase, `.sibtitle-info` permanece alineado a la izquierda.
- `.block-content-destacated` usa fondo `#d3d3d3` y texto `#ccc` como contraste frente al bloque informativo.
- Los subtítulos son `<h2 class="sibtitle-info">` y usan Cinzel, texto `var(--concrete)`, sombra gris y primera letra escarlata mediante `.info-initial`.
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
- La portada contiene las secciones de bienvenida (`infoTitle`), arenga (`arengaTitle` y `arengaMessage`), video tutorial (`tutoTitle`) y alliance (`allianceTitle`, `allianceMessage` y la tabla de bonos).

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
