# Changelog

## [261104b] - 2026-11-04

### Added
- Tarjetas `<div class="card-video">` en la subpágina de Video Tutoriales, con el video de YouTube, la miniatura y la descripción `<p class="text-video-learnig">` debajo.
- Script propio `js/video-cards.js` con la lógica de reproducción, cargado después de `js/app.js`.
- Reproducción bajo demanda: la miniatura se muestra con `loading="lazy"` y el iframe del reproductor se crea solo cuando el visitante interactúa con la tarjeta.
- Controles de reproducción y de activación de audio (`button.card-video-play` y `button.card-video-sound`) en cada tarjeta.
- Traducción de las descripciones: `js/app.js` incorpora `applyTexts()`, que aplica el atributo `data-i18n-text` a los textos simples.
- Claves i18n `tutorialLearningPriorityTitle`, `tutorialTipsTitle` y `tutorialEventsTitle` para los encabezados de tutoriales, en los 8 idiomas.
- Claves i18n `videoTutorialPriority1..3`, `videoTutorialTip1..3` y `videoTutorialEvent1..4` para las descripciones de las tarjetas, en los 8 idiomas.

### Changed
- `.tutorials-content` usa `display: grid` con `grid-template-columns: repeat(2, minmax(0, 1fr))`: dos tarjetas por ancho de página, y una sola columna a `640px` o menos.
- `.card-video` adopta apariencia de tarjeta con fondo, borde, radio, sombra y elevación en `hover` y `focus-within`; el área de video usa `aspect-ratio: 16 / 9`.
- El hover reproduce el video en silencio, el clic en el control de sonido habilita el audio y al salir de la tarjeta el video se pausa. Con `prefers-reduced-motion: reduce` no hay reproducción automática.
- Los encabezados de tutoriales pasaron de `<h2>` a `<h3>` y «TIPS» se renombró a «Dato Práctico», conservando la redacción manual del usuario.
- Se amplían las descripciones de las 10 tarjetas de video con los objetivos, metas y condiciones de cada evento, y se actualizan en los 8 idiomas. La descripción de `videoTutorialPriority1` ahora indica correctamente **no perder soldados y evitar dar puntos al enemigo**, corrigiendo la redacción anterior que decía lo contrario.

### Removed
- Los elementos `<video src="youtube.com/watch...">`, que no podían reproducir las páginas de YouTube.

## [261104] - 2026-11-04

### Added
- Calendario de Batalla de Supervivencia en la subpágina de Actividades Diarias, dentro de `<div class="battle-content">`, con la tabla de slots, contadores en vivo y zona horaria local.
- Script propio `js/battle-survival-schedule.js` con la lógica del calendario, cargado después de `js/i18n.js` y `js/app.js`.
- Contenedor dedicado `<section class="subpage-banner">` para los encabezados de sección de Actividades Diarias, con `width: 100%` y sin márgenes negativos.
- Traducción del encabezado de sección: `js/app.js` incorpora `applySectionTitles()` y `setSectionTitle()`, que aplican el atributo `data-i18n` conservando la inicial escarlata.
- Clave i18n `scheduleBattleSurvival` («Cronograma Batalla Supervivencia») en los 8 idiomas.
- Claves i18n `bsHeaders`, `bsPast`, `bsCurrent` y `bsNext` del calendario en los 8 idiomas, incluido el ruso.

### Changed
- La inicial escarlata de los títulos de subpágina queda centrada verticalmente con el resto del texto: `.subpage-title-word` usa `align-items: center` y `.hero-title-word` conserva `align-items: flex-start`.
- El texto de los títulos de subpágina usa el gris claro `#adadad` en `.subpage-title` y en `#content.subpage-content .subpage-title`.
- El encabezado `#textBS` pasa de «Batalla Supervivencia» a «Cronograma Batalla Supervivencia».
- El calendario toma el idioma de `<html data-lang>` y usa `window.I18N`; ya no mantiene su propia tabla de traducciones ni su propia resolución de idioma.
- La tabla del calendario conserva el comportamiento responsivo original (`min-width: 640px`, `max-width: 900px` y scroll horizontal en `.bs-wrap`) y ya no se estira al ancho de la página.

### Removed
- Las asignaciones `document.title` y `document.documentElement.lang` del script del calendario, para no sobrescribir el título ni el idioma de la página anfitriona.
- El subtítulo propio del calendario (`<div class="bs-subtitle">`) y su regla CSS, además de su asignación en JavaScript.
- Los márgenes negativos de `.banner-subpage` y las reglas de ancho completo de `.battle-content` y `.battle-content .bs-schedule`.

## [261103] - 2026-11-03

### Added
- Sección informativa `.block-content-info` en la portada con subtítulos `<h2 class="sibtitle-info">`, mensaje de bienvenida localizado, saludos dinámicos y dos botones de acción.
- Botones `btn-outline` para YouTube (escarlata) y Normas UXM (`#2266bb`), con relleno animado y rutas relativas compatibles con GitHub Pages.
- Selector de idioma al final del menú lateral (`#sideLangs`), con IDs independientes y apertura hacia arriba (`top-start`).
- Divisor `.line-divisor-scarlet` de `3px`, ancho `96%` y margen libre del 2 % en cada extremo.
- Bloque `.video-tutorial` en la portada con video de YouTube `kU9m5eJxbCQ` y tres botones hacia las secciones de tutoriales.
- Secciones de la subpágina de tutoriales con banners `.banner-divisor` y anclas `#learningPriority`, `#tips` y `#events`.

### Changed
- Todos los botones del sitio usan `border-radius: 4px` mediante el token `--button-radius`; los enlaces activos del menú lateral también respetan ese radio.
- Los subtítulos `.sibtitle-info` usan la fuente local Cinzel, texto gris concreto, sombra gris y la primera letra en rojo escarlata en todos los títulos; el de bienvenida permanece centrado.
- `.block-content-info` y `.block-content-destacated` usan `padding: 0 10%` y alineación izquierda por defecto; `.center-content` habilita el centrado visual.
- `.block-content-destacated` comparte el layout de `.block-content-info` y usa fondo `#d3d3d3` con texto `#ccc`.
- `.dinamic-welcome` muestra las traducciones de «Bienvenido» de todos los idiomas salvo el activo, separadas por ` · `, sin rotación ni temporizadores.
- `.ha-author` se muestra en cursiva, `#aaa`, alineado a la derecha y con subrayado de `1px solid #aaa`.
- El texto español de `.message-arenga` se conserva según la redacción manual de `index.html`.

### Removed
- Elemento `<h2 id="join"></h2>`, su asignación en `js/app.js`, la clave i18n `join` y su regla CSS; el indicador de scroll apunta a `#infoTitle`.

## [261102] - 2026-11-02

### Added
- Hero principal con video de fondo `media/video-particles-cyan.mp4` (`autoplay`, `muted`, `loop`, `playsinline`) y poster de respaldo.
- Tipografía local Cinzel y sombra de piedra para el `heroTitle`, sin subrayado y con flotación vertical suave.
- Panel de navegación propio con backdrop y animación de entrada desde la izquierda.

### Changed
- El menú lateral deja de usar el `Drawer` de Bootstrap: ahora es un panel fijo a la izquierda, a pantalla completa (`100dvh`), con ancho máximo de `400px` y fondo negro translúcido `rgba(0, 0, 0, .72)` con texto blanco.
- La navbar pasa a `position: fixed` y la marca **"Inicio UXM"** adopta gris `#ccc`.
- La hamburguesa usa tres líneas de `3px` separadas `7px` inicialmente en gris `#ccc`; cada 60 s la primera avanza `20px` y la segunda `10px` antes de regresar. Al abrir, las tres cambian a rojo escarlata y la tercera se alarga hasta quedar a `10px` del borde derecho.
- El menú lateral incorpora un primer enlace localizado a la portada mediante la clave `navHome`.
- Los `.nav-item` y enlaces del menú ocupan todo el ancho y se rellenan progresivamente de rojo escarlata con texto blanco al recibir `hover` o `focus-visible`; la página activa se marca con un punto azul.
- El cierre del menú se realiza con `Escape`, backdrop o al pulsar un enlace, devolviendo el foco al botón hamburguesa.
- El selector de idioma queda fijado en esquema claro y el copyright corporativo es `© 2026 UXM – Under Xtreme Madness` en todos los idiomas.
- El hero de la portada ocupa el 90 % del viewport, dejando visible el 10 % siguiente para indicar que la página continúa.
- El título principal agrupa cada palabra con alineación superior, eleva sus iniciales a `1.12em`, pinta la `U` de “Under” en rojo escarlata y usa gris concreto `#b8b8b2` para el resto.
- El título y el tag del hero aplican sombras de relieve multicapa; la inicial `U` usa una sombra propia en tonos rojos.
- La portada incorpora un mouse animado en la parte inferior del cover que enlaza al contenido mediante `#join`.

### Removed
- Elemento `<p id="welcome" class="welcome"></p>` de la página principal, su asignación en `js/app.js` y las claves `welcome` de `js/i18n.js`.

## [261101] - 2026-11-01

### Added
- Sitio web estático en la raíz del repositorio (`index.html` + `pages/`) para GitHub Pages.
- Menú lateral deslizante con las secciones: Actividades Diarias, Normas UXM, Video Tutoriales, Estrategia y Contacto.
- Título hero "Under Xtreme Madness" con sombra y aparición progresiva de las letras desde el centro.
- Footer persistente: enlace de YouTube con icono SVG en el extremo izquierdo y copyright en el derecho.
- Selector de idioma en el footer con 9 idiomas (es, en, pt, it, fr, ja, ru, zh), conservando `?lang=` entre páginas.
- Bootstrap 6 (`6.0.0-alpha.1`) por CDN con SRI en las 6 páginas del sitio.
- Etiqueta visible **«Lenguaje»** junto al selector desplegable, traducida en los 9 idiomas.

### Changed
- Las cinco subpáginas se reubican en `./pages/`; `index.html` permanece en la raíz. Rutas relativas adaptadas (`../css`, `../js`, `../index.html`) resueltas en tiempo de ejecución por `js/app.js` para funcionar también en sitios de proyecto de GitHub Pages.
- Migración del menú lateral artesanal al componente **Drawer** de Bootstrap 6 (`<dialog class="drawer drawer-start drawer-sheet">`), con backdrop, `Escape` y deslizamiento gestionados por el plugin.
- El menú lateral queda **anclado a la izquierda** (`drawer-start`), adherido al borde de la ventana.
- La barra superior pasa a `<nav class="navbar">` con **fondo transparente** y texto en el color estándar del esquema claro de Bootstrap (`--fg-2` / `--fg-body`), manteniendo el comportamiento superpuesto y `pointer-events` para no bloquear el Home.
- Selector de idioma convertido en **Menu desplegable de Bootstrap** (`data-bs-toggle="menu"`, `data-bs-placement="top-end"`): se abre hacia arriba y alineado a la derecha. Cada idioma se muestra en su propio idioma (`Español`, `English`, `Português`, `Italiano`, `Français`, `日本語`, `Русский`, `中文`) con atributo `lang`.
- Footer redistribuido con CSS Grid `1fr auto 1fr`: YouTube a la izquierda, copyright en el centro y selector de idioma a la derecha.
- Fondo del sitio cambiado a gris suave `#e9ecef`, con paleta de texto oscura y sombras del hero recalculadas.
- El botón hamburguesa pierde el borde y su animación solo cambia la forma de las barras, conservando el color.
- Eliminado el icono "X" de cierre; el menú se cierra con backdrop, `Escape`, deslizamiento o al pulsar un enlace.
- El enlace principal del navbar pasa de "UXM" a **"Inicio UXM"**.

### Fixed
- Estados `hover`, `focus-visible` y `active` con **contraste ilegible**: el texto oscuro sobre azul oscuro se sustituye por fondo `#26b` con texto `#fff` en los enlaces del drawer, las opciones del desplegable de idioma, el disparador y la marca del navbar. Anillo de foco `#ffbf47` para mantener la visibilidad.

### Removed
- Navbar de demostración de Bootstrap (enlaces `#`, buscador y drawer duplicado) presente en `index.html`.
- Estilos y marcado del backdrop y del botón de cierre manuales (`#navBackdrop`, `#navClose`, `.nav-close`).
- Dependencia previa de Vanilla Framework en el sitio.

## [261029] - 2026-10-29

### Added
- Archivo `AGENTS.md` en la raíz del proyecto con configuración para agentes de IA.
- Estructura de documentación `docs/` con subcarpetas architecture, core y tracking.
- Documentación del patrón de bloques-script en `docs/architecture/`.
- Reglas del proyecto en `docs/core/`.
- Columna "Servidor" (7ª) en `src/battle-survival-schedule.html`: muestra `time_init` convertido a la hora local del navegador.
- Idioma francés (`fr`) en el objeto I18N: 8 idiomas disponibles (es, en, pt, it, tr, fr, zh, ja).
- Destacado gris (paleta texto-tracking-1 `#727374`/`#ebebeb`) en celdas de Actividad 1 con keywords 'fruit'/'ticket' y de Actividad 2 con 'stamina'/'antitoxin', solo en filas futuras (posiciones 3-9).
- Destacado amarillo (paleta texto-special-1 `#ffee00`/`#b65200`) en celdas Contador/Detalle/Evento de filas futuras cuyo evento contiene 'soldiers' (Train Soldiers).

### Changed
- Refactorizado `src/battle-survival-schedule.html`: eliminado bloque `<style>`, CSS ahora se inyecta dinámicamente vía JS.
- Aplicada paleta de colores estandarizada: header de tabla cambia de `#666` a `#26b` (primary).
- Estructura final del bloque: solo `<div>` + `<script>` (sin `<style>`, sin `<html>` completo).
- Fila en curso (bs-current): estilo pleno (verde + bold) solo en columnas 1-3; columnas 4-7 con tono tenue `rgba(0,153,34,0.4)` y `font-weight: normal`.
- Texto de columnas 5-7 (Actividad 1, Actividad 2, Servidor) reducido a 11px.
- Contador de fila en curso ahora muestra tiempo transcurrido (cuenta ascendente); posiciones 3-9 muestran prefijo `T - ` con formato `00:00:00` y `font-weight: normal`.
- Fallback de idioma pasa de español a inglés (`default:ingles` según AGENTS.md).
- Color de texto de columnas 4-7 en fila en curso cambia a `#009922`.
- Prefijo `+ ` en el contador de la fila en curso (tiempo transcurrido).
- Datos embebidos sincronizados con `db/`: calendario 0-based (noday 0-6, dom-sáb), slots 00:00-20:00 cada 4h, STANDBY en ACTIVITIES; fórmula `sec` ajustada a `noday * 86400`.
- Borde de fin de día ahora data-driven: se aplica bajo el último slot de cada día (20:00) en lugar de chequeo fijo por hora.
- Estrella de fila en curso sin tono gris (hereda blanco); tz info sin `text-align: right` y padding superior 10px.
- Columnas 4-7 de la fila en curso usan paleta texto-success-2 (`#00ff39`/`#00821d`) en lugar de verde transparente.
- Eliminada columna "Día" (la tabla pasa de 7 a 6 columnas); estrella de fila en curso reubicada en la celda de Evento; el estilo success-2 de la fila en curso ahora cubre las columnas 3-6 (Evento, Actividad 1, Actividad 2, Servidor).
- Columna "Servidor" con formato "DD HH:MM" (día del mes + hora local del navegador) en lugar de "HH:MM".
- Columna "Servidor" con formato "DDD HH:MM" (abreviatura de día en inglés fijo: Sun/Mon/... + hora local) en lugar de "DD HH:MM".

### Fixed
- Filas con `time_init` 23:00:00/22:00:00 ahora tienen `border-bottom: 2px solid #888` como separador de fin de día.
- Corregido desplazamiento de filas entre domingo 00:00-03:00 (hora servidor UTC-2): DOM 03:00 ya no aparece "En curso" antes de iniciar; SAB 23:00 (semana previa) pasa a ser la fila en curso.

### Removed
- Entrada errónea `codet 7.00` (STANDBY) en `db/calendar-battle-survival.json`: coincidía en el tiempo con el BUILD de inicio de semana y nunca quedaría "En curso".
- Arrays `days` del objeto I18N en los 8 idiomas (código muerto tras eliminar la columna Día).
