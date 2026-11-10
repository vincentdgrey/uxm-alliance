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
|   ├── style.css
|   └── activities-daily.css  # Estilos de la subpágina Actividades Diarias
├── js             # archivos javascript del sitio web
|   ├── i18n.js    # Textos por idioma
|   ├── app.js     # Lógica sitio web
|   ├── alliance-bonuses.js  # Datos de los bonos de la Alianza
|   └── activities-daily.js  # Cronogramas y datos de Actividades Diarias
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
├── db/                # Datos históricos en JSON (OBSOLETOS, no los carga el sitio)
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
- `db/*.json` está obsoleto: se conserva como histórico y no lo carga el sitio.
- La fuente de verdad de los datos de actividades son las variables de `js/activities-daily.js`.
- La fuente de verdad de los datos de los bonos de la Alianza es `window.ALLIANCE_BONUSES` en `js/alliance-bonuses.js`; sus textos traducibles siguen en `js/i18n.js`.

---

## Zona Horaria Base

**UTC-2** es la zona horaria origen donde se registran todos los datos de actividades.

- Los horarios de las variables de `js/activities-daily.js` están en UTC-2.
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

## Datos Fuente (js/activities-daily.js)

La fuente de verdad de los datos de actividades son las variables declaradas en `js/activities-daily.js`:

| Variable | Descripción |
|---|---|
| `ACTIVITIES` | Actividades y objetivos de Battle Survival (6 registros) |
| `CALENDAR` | Calendario semanal de Battle Survival (42 slots, 6 por día) |
| `ACTIVITY_CODE` | Actividades codificadas del Duelo de Alianzas (objetive, resource, point, codebs) |
| `EVENT_CODE` | Definición de eventos (es/en) |
| `PHASES` | Fases del Duelo de Alianzas (P00-P06) |
| `DAILY` | Actividades diarias del Duelo de Alianzas por día (noday, server_time, server_duration) |

> Los horarios `server_time` y las duraciones `server_duration` se expresan en UTC-2 y en formato `hh:mm:ss`.

### Archivos obsoletos en db/

Los archivos `db/*.json` se conservan como histórico y **no los carga el sitio**. No deben usarse como referencia ni editarse:

| Archivo | Estado |
|---|---|
| `db/calendar-battle-survival.json` | Obsoleto: equivalente a `CALENDAR` |
| `db/activity-battle-survival.json` | Obsoleto: equivalente a `ACTIVITIES` |
| `db/activity-daily-alliance.json` | Obsoleto: equivalente a `DAILY` |
| `db/activity-code.json` | Obsoleto: equivalente a `ACTIVITY_CODE` |
| `db/event-code.json` | Obsoleto: equivalente a `EVENT_CODE` |
| `db/alliance-duel-phase.json` | Obsoleto: equivalente a `PHASES` |

> Al modificar los datos, editar las variables de `js/activities-daily.js`. El sitio es estático y no usa `fetch`, por lo que los datos no se cargan desde JSON en tiempo de ejecución.
