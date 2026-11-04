# AGENTS.md - UXM Alliance

Configuración para agentes de IA. Este archivo garantiza continuidad del proyecto entre sesiones.

---

## Descripción del Proyecto

1. Pagina web pura, alojamiento final cloud en Github Pages, carpeta root del website `./`.
2. archivos en `src/` obsoletos.
3. sin dependencias de red (sin fetch/CORS), en lo posible.
4. Determinando el lenguaje del navegador (navigator.language + ?lang=es) cambiar el texto según el idioma disponible: español, ingles, portugués, italiano, francés, ruso, chino, japones,turco. default:ingles.
5. Include Bootstrap’s CSS and JavaScript files via CDN. CDNs (Content Delivery Networks) are services that provides copies of libraries for your website.
6. usar como base de conocimiento para implementar elementos html https://getbootstrap.com/docs/6.0/components/accordion/

---

## Estructura de Carpetas

```
uxm-alliance/
├── css            # archivos de estilos del sitio web
|   └── style.css
├── js             # archivos javascript del sitio web
|   ├── i18n.js    # Textos por idioma
|   └── app.js     # Lógica sitio web
├── media          # archivos multimedia
|   └── video-particles-cyan.mp4  # video cover pagina de inicio
├── pages/         # Subpáginas del sitio web
|   ├── actividades-diarias.html  # Actividades Diarias
|   ├── normas-uxm.html           # Normas UXM
|   ├── video-tutoriales.html     # Video Tutoriales
|   ├── estrategia.html           # Estrategia
|   └── contacto.html             # Contacto
├── index.html     # Archivo principal sitio web (única página en la raíz)
|
├── src/               # carpeta Bloques-script (un archivo = un bloque)
├── AGENTS.md          # Este archivo - configuración para agentes
├── README.md          # Descripción breve del proyecto
├── db/                # Datos fuente en JSON (referencia base absoluta)
├── prompt/            # Instrucciones de sesión
└── docs/              # Documentación del proyecto
    ├── architecture/  # Decisiones de diseño y patrones
    ├── core/          # Reglas del proyecto y alcance
    └── tracking/      # Changelog y milestones
```

---

## Sitio Web (root)

> Detalle completo en `docs/core/project-rules.md`.

### Fuente de verdad y cambios manuales

- Para el sitio web, el código manual vigente en `index.html`, `pages/*.html`, `css/style.css`, `js/app.js` y `js/i18n.js` es la fuente de verdad.
- Cuando el usuario informe que realizó cambios manuales en HTML, CSS, JavaScript o traducciones, revisar el diff, respetarlos sin revertirlos ni sobrescribirlos y actualizar `docs/core/project-rules.md` con el comportamiento resultante.
- Si una regla anterior contradice al código manual, prevalece el código manual y la regla obsoleta debe corregirse.
- `db/*.json` permanece como fuente de verdad exclusiva para los datos del juego.

---

## Zona Horaria Base

**UTC-2** es la zona horaria origen donde se registran todos los datos de actividades.

- Los horarios en `db/*.json` están en UTC-2.
- Cada script del sitio web convierte los horarios a la zona local del visitante automáticamente.
- Fórmula: `UTC = hora_origen + 2h` → luego se convierte a la zona del navegador.

---

## Paleta de Colores Estándar

Todos los bloques-script deben usar esta paleta para acciones o elementos de importancia:

| Token     | Hex       | Uso                                    |
|-----------|-----------|----------------------------------------|
| `success` | #009922 | Acciones completadas, estado en curso  |
| `primary` | #2266bb | Elementos principales, headers, títulos|
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

usuario creara manualmente cada commit

---

## Bloques-Script Google Site Existentes

desabilitados

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
