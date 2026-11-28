# Changelog

## [261128a] - 2026-11-28

### Changed
- **El tiempo de entrenamiento óptimo pasa de la columna Recurso de la actividad `OFFSOLDIER` a una fila propia de Batalla Supervivencia**. Se retira el indicador `[Train HH H MM M]` de `js/activities-daily.js` y del CSS, junto con `TRAIN_LABEL` y `fmtTrainTime()`.
- **La nueva fila de consejo se ubica inmediatamente debajo de la actividad `BS...` en curso** del día actual y solo en esa tabla. Se declara la actividad `BSTRAIN` en `ACTIVITY_CODE` (`group: "BS"`, `icon: "boost-training"`, sin `codebs`) y sus traducciones en los 11 idiomas dentro de `adActivities`.
  - La fila lleva las clases `ad-bs-task ad-training-advice`, no lleva `ad-off-task` ni `ad-state-progress`, y **no muestra nada en la columna Contador**.
  - La columna Tarea muestra `Consejo: Tiempo de Entrenamiento Optimo HH:MM:SS, hasta la proxima Batalla de Supervivencia Tema Soldados`; la columna Recurso muestra `Soldados` y la columna Evento `Batalla Supervivencia`.
  - El texto se compone con el marcador `{time}` en la plantilla y un nodo propio `<span class="ad-training-advice-time">`, de modo que solo el valor se actualiza en cada tick sin reconstruir la frase.
- **El cálculo del entrenamiento óptimo cambia a tres horas**: `fin de la próxima SOLDIER = inicio + 3 horas`, y el tiempo restante es `fin - instante actual`. La duración se declara en `TRAIN_OPTIMAL_DURATION`, independiente de `LINKED_DEFAULT_DURATION`, que sigue siendo de cuatro horas para los contadores de las actividades `BS`.
- **La búsqueda de la próxima `SOLDIER` pasa a ser circular dentro del calendario semanal**, de modo que el cruce de semana (por ejemplo, el sábado por la noche) no deja al consejo sin próxima actividad. En ese caso el consejo muestra `11:00:00`.
- El grupo del día siguiente no cambia: mantiene sus seis actividades `OFF...` en estado `[COUNTDOWN]` y no muestra el consejo, que es información del día en curso.

### Changed (tests)
- `tests/activity-points.test.cjs` comprueba la posición del consejo bajo la actividad en curso, la columna Contador vacía, los textos de Tarea, Recurso y Evento, la actualización por segundo, el cálculo de tres horas, la exclusión de la `SOLDIER` en curso, el cruce de semana y la ausencia del formato antiguo `[Train ...]`.
- `tests/ui-contract.test.cjs` verifica el contrato de `BSTRAIN`, la duración de tres horas, el marcador `{time}` en los 11 idiomas y la redacción canónica en español.
- `tests/i18n-structure.test.cjs` actualiza el número de actividades canónicas a 63 y refleja la redacción manual vigente de las actividades `BS`, con el símbolo `★` al inicio del texto.

### Changed (docs)
- `docs/core/project-rules.md` documenta la fila de consejo, el cálculo de tres horas y la búsqueda circular de la próxima `SOLDIER`.

## [261127a] - 2026-11-27

### Changed
- **El grupo Battle Survival del día actual ya no tiene un número fijo de actividades**: se elimina `OFF_VISIBLE_COUNT` y la función `nextScheduleSlots()`. En su lugar, `remainingDaySlots()` devuelve las franjas de `CALENDAR` posteriores a la franja en curso y del mismo día. El listado queda así: a las 00:00 cinco actividades `OFF...`, a las 04:00 cuatro, a las 08:00 tres, a las 12:00 dos, a las 16:00 una y a las 20:00 ninguna, de modo que **se reduce en una actividad cada cuatro horas**. La actividad `BS...` en curso se mantiene sin cambios, con su contador en estado `[PROGRESS]`.
- **El grupo Battle Survival aparece también en la tabla del día siguiente** (segundo panel, `ad-item ad-open`), dentro de su propio cuerpo `<tbody class="ad-event-body ad-battle-body" data-event="BS">`. Muestra las seis franjas del día siguiente, generadas con `daySlots()`, todas con las clases `ad-state-countdown ad-off-task ad-bs-task`.
- **Los contadores de las actividades `OFF...` del día siguiente se calculan desde el instante actual**, con el formato `T-HH:MM:SS`, y pueden **superar las 24 horas** (por ejemplo, `T-44:00:00` a las 00:00). Antes, al caer en un día futuro, esas filas mostraban la fecha `MM/DD` de la tarea.
- `buildBattleTaskRows()` escribe los dos grupos (día actual y día siguiente) y renueva por completo ambos contenedores en cada cambio de franja, retirando sus filas anteriores y descartando sus contadores.

### Added
- **Tiempo de entrenamiento óptimo en la columna Recurso de la próxima actividad `SOLDIER`**: el intervalo que falta para que termine la próxima actividad, es decir `inicio de la próxima SOLDIER + 4 horas - instante actual`. Se obtiene con `nextTrainSlot()`, que busca la primera franja `SOLDIER` **posterior** a la franja en curso, de modo que cuando la actividad en curso es `SOLDIER` el indicador apunta a la siguiente. El valor se formatea con `fmtTrainTime()` como `[Train HH H MM M]`, por ejemplo `[Train 26H16M]`, y solo muestra horas y minutos.
- El indicador se agrega en la celda `.ad-resource`, debajo del texto del recurso, como un `<div class="ad-training-time">`, y se recalcula en cada tick. El texto `Train` es literal y no requiere traducción.

### Added (tests)
- `tests/activity-points.test.cjs` comprueba la reducción progresiva del listado del día, las seis actividades del día siguiente, los contadores `OFF` que superan las 24 horas, la exclusividad del indicador de entrenamiento y su exclusión de la `SOLDIER` en curso.
- `tests/ui-contract.test.cjs` verifica el contrato del grupo Battle Survival por día y el del indicador de tiempo de entrenamiento.

### Changed (docs)
- `docs/core/project-rules.md` documenta el listado dinámico del día, el grupo completo del día siguiente y el tiempo de entrenamiento óptimo.

## [261126b] - 2026-11-26

### Added (docs)
- `docs/github-ruleset-main.md`: pasos técnicos para crear **Settings → Rules → Branch rules → New branch ruleset** sobre `main` (`protect-main-auto-merge`) y que el workflow de merge automático funcione: prerequisito *Allow auto-merge*, target exacto `main`, Require PR con 1 aprobación, status checks obligatorios (check del workflow), regla **Auto-merge**, **Bypass list con `github-actions[bot]`** (corrección raíz de "Cannot update this protected ref"), eliminación de la branch protection rule clásica para evitar doble bloqueo, verificación por API (`gh api repos/.../rulesets`, `mergeStateStatus`) y reintento del PR #5.

### Changed (docs)
- `docs/github-branch-protection.md`: nueva sección "Regla equivalente con Rulesets (recomendado)" que enlaza `docs/github-ruleset-main.md` y advierte que rulesets y protection rules se evalúan simultáneamente; referencia ampliada a *Creating rulesets for a repository*.

## [261126a] - 2026-11-26

### Changed (CI/CD)
- `.github/workflows/pr-develop-merge-main.yml` se refuerza para resolver el bloqueo **"Merging is blocked — Cannot update this protected ref"** observado en el PR #5 (`develop → main`) pese a tener aprobación y checks en verde. Causa raíz: la branch protection de `main` no autoriza a escribir a la identidad que ejecuta el merge (`github-actions[bot]`, dueño del `GITHUB_TOKEN`).
  - Se documenta la causa y el checklist de corrección en la cabecera del workflow y en `docs/github-branch-protection.md`.
  - Nuevo job `merge-on-approval` (plan B): disparado por `pull_request_review` y `check_suite`, verifica aprobación de un revisor autorizado, checks completados sin fallos y estado de mergeabilidad; fusiona con `gh pr merge --merge` cuando es `CLEAN`, sincroniza `develop` desde `main` cuando es `BEHIND` y falla con log explicativo cuando sigue `BLOCKED`.
  - El mensaje de error al activar auto-merge ahora incluye el paso 3 (autorizar a `github-actions[bot]` en *Restrict who can push to matching branches*).

### Added (docs)
- `docs/github-branch-protection.md`: diagnóstico del bloqueo del PR #5, checklist de configuración de branch protection/auto-merge en GitHub (Allow auto-merge, Allow auto-merges, restricción de push con bot autorizado, permisos de Actions) y descripción del flujo de respaldo del workflow.

## [261126c] - 2026-11-26

### Changed
- **Cada grupo de eventos ocupa un cuerpo de tabla propio** (`<tbody class="ad-event-body" data-event="<código>">`). Las tablas del Duelo de Alianzas se construyen recorriendo los grupos en orden y creando un cuerpo por cada uno, en lugar de una única lista de filas.
- **El orden de los grupos lo define exclusivamente el valor `view` de `EVENT_CODE`**: `DY` (1) → `ROY` (2) → `KVK` (3) → `AD` (4) → `EQ` (5) → `BEX` (6) → `CUM` (7) → `BS` (8). El recorrido se resuelve con `orderedEvents`, que ordena `EVENT_CODE` por `view`, y las actividades se agrupan con `groupRowsByEvent()`, que conserva el orden original dentro de cada grupo.
- El grupo `BS` participa del mismo recorrido y solo crea cuerpo en la tabla del día actual; su cuerpo declara `data-event="BS"` y la clase `ad-battle-body`, y su posición depende del valor `view` del evento.
- El separador de eventos se asigna de forma genérica a la última fila de cada cuerpo que tiene otro grupo detrás.
- La regla de borde de la última fila pasa a `.ad-schedule > tbody > tr:last-child:not(.ad-event-separator) td`, para que la última fila de un grupo con separador conserve su borde de `2px`. El aspecto visual se mantiene.

### Removed
- Se retiran `EVENT_ORDER` y `sortRowsByEvent()` de `js/activities-daily.js`, junto con la comparación entre actividades consecutivas que delimitaba los grupos. No queda ninguna otra lógica de orden de grupos.

### Added (tests)
- `tests/activity-points.test.cjs` comprueba que cada grupo de eventos ocupa un cuerpo propio, que el orden de los cuerpos coincide con el valor `view` de `EVENT_CODE`, que los valores `view` son numéricos, positivos y únicos, y que el separador cierra cada grupo salvo el último.
- `tests/ui-contract.test.cjs` verifica el agrupamiento por `EVENT_CODE.view` y comprueba que no quedan referencias a `EVENT_ORDER` ni a `sortRowsByEvent`.

### Changed (docs)
- `docs/core/project-rules.md` documenta el modelo de un cuerpo por grupo de eventos, el orden por `view` de `EVENT_CODE` y el ajuste de la regla de borde de la última fila.
## [261126b] - 2026-11-26

### Changed
- **El grupo Battle Survival muestra cuatro actividades en lugar de tres**: `OFF_VISIBLE_COUNT` pasa de `2` a `3`, de modo que la actividad `BS...` en curso va seguida de tres actividades `OFF...` consecutivas, todas con contador en estado `[COUNTDOWN]` y la clase de fila `ad-off-task`.
- **El grupo se aloja en un segundo cuerpo de tabla propio**, `<tbody class="ad-battle-body">`, creado únicamente en la tabla del día actual. El cuerpo principal conserva solo las tareas normales, y la renovación del grupo ya no requiere recorrer ni filtrar las filas de las tareas diarias.
- `buildBattleTaskRows()` calcula primero la actividad en curso y las tres siguientes, y solo después **renueva por completo su contenedor**, retirando las filas anteriores y descartando sus contadores antes de escribir las nuevas. Se elimina el recorrido sobre la colección viva `tbody.children`, que podía dejar filas o contadores obsoletos al cambiar de franja.
- Se retira la función `todayTbody()`, ya innecesaria tras la separación de los cuerpos de tabla.
- **La tabla del día actual se distingue visualmente del resto**: su encabezado y su separador de eventos usan el verde `#1d6e12`, mediante `.ad-item.ad-today .ad-schedule thead th` y `.ad-item.ad-today .ad-schedule tr.ad-event-separator > td`. Las reglas generales conservan `#4d7799`, de modo que **las tablas de los demás días no cambian**.

### Fixed
- El grupo ya no se reduce al terminar un contador `[COUNTDOWN]`: mantiene sus cuatro actividades en todo el ciclo de cuatro horas, incluidos los cruces de medianoche y de semana.

### Added (tests)
- `tests/activity-points.test.cjs` comprueba que el grupo muestra exactamente cuatro filas, que vive en un segundo cuerpo de tabla, que el cuerpo principal no aloja filas `BS` y que el ciclo completo de cuatro horas mantiene una actividad en `[PROGRESS]` y tres en `[COUNTDOWN]` sin perder ni duplicar filas.
- `tests/ui-contract.test.cjs` verifica el render de cuatro filas, el segundo cuerpo de tabla y los estilos verdes del día actual, y comprueba que las reglas generales de encabezado y separador conservan `#4d7799`.

### Changed (docs)
- `docs/core/project-rules.md` documenta las cuatro actividades del grupo, el segundo cuerpo de tabla `ad-battle-body`, la renovación completa del contenedor y los estilos verdes de la tabla del día actual.
## [261126a] - 2026-11-26

### Changed
- **El grupo Battle Survival pasa de siete filas con visibilidad condicionada a tres filas siempre escritas**. `js/activities-daily.js` sustituye `buildOffRows()` por `buildBattleTaskRows()`, que escribe en la tabla del día actual la actividad `BS...` de la franja en curso (contador en estado `[PROGRESS]`) seguida de las dos actividades `OFF...` consecutivas (contador en estado `[COUNTDOWN]` y clase de fila `ad-off-task`). Al cambiar de franja, las tres filas se sobrescriben con los datos vigentes.
- La lógica deja de crear actividades `BS...` ocultas: el nuevo mapeo `bsByCodebs` relaciona cada código de horario de `CALENDAR` con su actividad `BS...`, y `offByCodebs` con su actividad `OFF...`.
- El aspecto visible no cambia: la primera fila conserva el contador con el tiempo restante de la duración de cuatro horas, las dos filas `OFF` conservan la cuenta regresiva y el estilo `ad-off-task` en Tarea, Recurso y Evento, y el grupo sigue separado del resto de eventos.

### Removed
- Se retiran `applyBsVisibility()` y `applyOffVisibility()` de `js/activities-daily.js`, junto con la clase CSS `.ad-bs-hidden` de `css/activities-daily.css`. El grupo Battle Survival ya no oculta filas: todas las que se escriben son visibles.

### Added (tests)
- `tests/activity-points.test.cjs` comprueba que el grupo Battle Survival muestra exactamente tres filas, que la primera corresponde a la franja en curso con estado `[PROGRESS]` y las dos siguientes con estado `[COUNTDOWN]`, que no queda ninguna fila con la clase `ad-bs-hidden` y que el grupo avanza con la franja en curso (`BSHERO → OFFBUILD → OFFSOLDIER` y, tras el cambio de franja, `BSBUILD → OFFSOLDIER → OFFTECH`).
- `tests/ui-contract.test.cjs` sustituye la comprobación de la lógica de visibilidad por la del render de las tres filas, y verifica que no quedan referencias a `ad-bs-hidden`, `applyBsVisibility` ni `applyOffVisibility`.

### Fixed (tests)
- `tests/activity-points.test.cjs` y `tests/ui-contract.test.cjs` actualizan las expectativas del contador `BS` al formato vigente sin espacio tras el signo (`+02:47:39`) y del color de fondo `ad-off-task` al valor manual vigente (`#aaa`).

### Changed (docs)
- `docs/core/project-rules.md` describe el render de las tres filas del grupo Battle Survival, el mapeo `bsByCodebs`, la sobrescritura al cambiar de franja y la retirada de la lógica de ocultación.

## [261125a] - 2026-11-25

### Changed
- Se propaga a los diez idiomas no españoles de `js/i18n/actividades-diarias/i18n.js` la redacción manual de las actividades de oportunidad siguiente en `texts.es.adActivities`, que pasa de «Oportunidad Próxima» a «Próxima Batalla Supervivencia»: `OFFBUILD`, `OFFHERO`, `OFFRAVEN`, `OFFSOLDIER` y `OFFTECH`. Cada traducción añade el matiz de la actividad al final del objetivo (`Construcción`, `Pesquisa`, `Ricerca`, `Construction`, `Recherche`, `研究`, `Araştırma`, `badań`), conservando las cifras `30.000`, `23.4M`, `30`, `15`, `2.800`, `17H` y `50H`. El texto español no se modifica.
- `BSSOLDIER` mantiene en los once idiomas la redacción que coloca `[17H]` antes del sustantivo de entrenamiento.
- Las actividades `OFF...` se distinguen ahora por la clase de fila **`ad-off-task`** en lugar del indicador `ad-task-flag-x` de la columna Tarea. El estilo se aplica a las celdas **Tarea, Recurso y Evento** (`tr.ad-off-task > td.ad-objective`, `> td.ad-resource`, `> td.ad-event`) con fondo `#727374` y texto `#fff`. La columna Contador y la columna de imagen conservan su apariencia habitual.

### Removed
- Se retira el indicador `ad-task-flag-x` de `css/activities-daily.css` y su uso en `js/activities-daily.js` (`OFF_TASK_FLAG`). El indicador ya solo se usaba en las actividades `OFF...`.

### Added (tests)
- `tests/activity-points.test.cjs` sustituye la comprobación del indicador `ad-task-flag-x` por dos casos: uno verifica la clase `ad-off-task` en la fila y la ausencia de indicadores de flag en la columna Tarea; otro valida que el selector CSS alcanza Tarea, Recurso y Evento, con fondo `#727374` y texto `#fff`, y que no alcanza `ad-time` ni `ad-icon`.
- `tests/i18n-structure.test.cjs` actualiza las expectativas del español manual de `OFFBUILD`, `OFFHERO`, `OFFRAVEN`, `OFFSOLDIER` y `OFFTECH`.

### Changed (docs)
- `docs/core/project-rules.md` documenta la redacción vigente de las actividades `OFF...`, el uso de la clase de fila `ad-off-task` y el alcance de su estilo, y retira el indicador `X` de la lista de indicadores de `DAILY.flag`.

## [261124d] - 2026-11-24

### Changed
- **Las ramificaciones son relámpagos independientes con cono de propagación propio**, separados del relámpago principal:
  - `js/app.js` calcula la dirección de cada rama como `apertura del cono principal + apertura de la rama + margen angular` (`LIGHTNING_BRANCH_ANGLE_MARGIN`, `4°`), de modo que ambos conos solo comparten el vértice y sus recorridos no se superponen.
  - La apertura de la rama nunca supera la del principal: se mueve en el rango `4°`–`12°` y se estrecha hasta `2°` cuando el espacio angular es escaso.
  - Las ramas pueden inclinarse más que el trazo principal (`LIGHTNING_BRANCH_MAX_TILT`, `82°`), aunque sin dejar de descender (`LIGHTNING_BRANCH_MAX_VERTICAL_TILT`, `62°`).
  - Cada rama busca un **sector angular libre** frente a las ramas ya creadas, de modo que no se reiteran direcciones.
  - Los **extremos de las ramas se mantienen separados**: la longitud se elige probando varios recorridos hasta que su extremo dista al menos `70px` (`LIGHTNING_BRANCH_END_GAP`) de los anteriores; si no es posible, se conserva el más alejado.
  - El rango de ramificaciones por descarga pasa a **entre una y tres** (`LIGHTNING_MIN_BRANCHES`).
  - Si el rayo principal termina antes de alcanzar un quiebre previsto, la ramificación se genera igualmente: la descarga conserva el número de ramas planificado.

- **El relámpago principal permanece visible hasta que sus ramificaciones terminan**: al completarse el principal se marca `group.mainComplete` y las ramas aceleran (`LIGHTNING_BRANCH_FINISH_BOOST`). El grupo solo se desvanece cuando todas han completado su recorrido, de modo que ninguna rama queda a medio crecer ni sobrevive a la desaparición del principal.

- La generación del punto se corrige: cuando el candidato cae fuera del cover o retrocede, se reduce el desplazamiento lateral **dentro del cono** hasta encontrar una posición válida, en lugar de recortar la coordenada y sacar el punto del triángulo.

### Added (tests)
- `tests/cover-lightning.test.cjs` sube a 35 casos. Los nuevos comprueban que cada rama tiene un cono propio y separado del principal, que los extremos de las ramas mantienen la distancia mínima, y que el grupo no puede apagarse antes de que el rayo principal termine.
- Se corrige la instrumentación de las descargas: el conteo de ramas se registra en la asignación del grupo y la verificación ignora la última descarga, que puede seguir en curso.

### Changed (docs)
- `docs/core/project-rules.md` describen la separación angular de los conos, la apertura propia de las ramas, la separación de extremos, el rango de una a tres ramificaciones y el nuevo ciclo de vida del grupo.

## [261124c] - 2026-11-24

### Changed
- **Cada relámpago crece dentro de su propio triángulo isósceles de propagación**, en lugar de un zigzag de amplitud fija:
  - `js/app.js` sustituye el modelo de envolvente rectangular por un triángulo definido en coordenadas locales: **vértice** (punto de nacimiento), **altura** (longitud aleatoria), **apertura** (`6°`–`26°`) e **inclinación** aleatoria del eje (`±28°`). El triángulo se inclina alrededor de su vértice, por lo que el rayo puede caer en diagonal.
  - El semiancho disponible en cada profundidad es `profundidad × tan(apertura)`: el rayo arranca contenido y **se abre horizontalmente mientras cae**.
  - **Desaparece la alternancia obligatoria de lado**: el desplazamiento lateral mantiene la dirección durante corridas de uno a cuatro segmentos. Con ello se elimina el patrón regular que recordaba un latido cardiaco.
  - Los **saltos laterales largos** son ocasionales (`22 %`) y pueden recorrer hasta el `50 %` del ancho del cover, siempre dentro de la sección válida del triángulo.
  - Si el punto calculado se sale del cover o retrocede, se descarta y se busca otro dentro de la sección: **el recorrido nunca retrocede verticalmente**.
  - Cada rayo y cada ramificación tienen su **propio ritmo de crecimiento** y su propia escala de velocidad, de modo que las líneas nunca avanzan al unísono.

- **Las ramificaciones son relámpagos completos e independientes**: cada una tiene su propio triángulo de propagación, inclinación, apertura, ritmo, energía y afinado de punta. Nacen en un quiebre del rayo principal, su longitud se calcula sobre el recorrido restante y **pueden terminar más abajo que el rayo principal**. Siguen creciendo aunque el trazo principal haya terminado. Las ramificaciones ya no generan ramificaciones.

- **El planificador permite hasta tres relámpagos visibles a la vez**, iniciados siempre de forma escalonada: la separación mínima entre inicios es aleatoria (`300`–`700` ms) y **nunca coinciden**. El ritmo alterna grupos de relámpagos cercanos con pausas más largas, para que las apariciones parezcan naturales.

### Added (tests)
- `tests/cover-lightning.test.cjs` crece hasta 29 casos. Los nuevos comprueban, transformando cada punto a las coordenadas locales del triángulo, que **todos los puntos quedan dentro de su triángulo**, que el recorrido nunca retrocede, que cada rayo tiene inclinación y apertura distintas, que el trazado no mantiene una alternancia lateral regular, que las ramificaciones tienen triángulo y ritmo propios y que dos descargas nunca se inician en el mismo instante.

### Changed (docs)
- `docs/core/project-rules.md` describe el triángulo de propagación, la eliminación de la alternancia regular, las ramificaciones como relámpagos independientes y el planificador de apariciones escalonadas.

## [261124b] - 2026-11-24

### Changed
- **El rayo del cover abre su recorrido horizontal mientras cae** y aumenta su frecuencia de aparición:
  - `js/app.js` reescribe el crecimiento del rayo: el trazado oscila alrededor de una **línea central que deriva con suavidad**, y la amplitud de la oscilación **crece con la profundidad** (`LIGHTNING_SPREAD_MIN_FACTOR` `0.6` → `LIGHTNING_SPREAD_MAX_FACTOR` `1.8`). La envolvente lateral llega a cerca de `1.85` veces su valor inicial en la parte baja del recorrido.
  - La apertura lateral se calcula con el **ancho del cover** (`LIGHTNING_SPREAD_WIDTH_RATIO`, mínimo `14`, máximo `34`) y **ya no usa valores reducidos en las subpáginas**: los covers bajos dejaron de cerrarse al caer.
  - El número de segmentos se deriva del alto recorrido (`LIGHTNING_SEGMENT_LENGTH` `16`), de modo que los covers bajos generan más segmentos y más pequeños. El recorrido **no se corta al alcanzar la altura objetivo**: la punta la fija el límite de segmentos y siempre se dibuja un zigzag completo.
  - Las descargas aparecen ahora entre `1400` y `3800` ms, con la primera a los `300` ms.
  - **Cada descarga genera entre una y tres ramificaciones**, elegidas al azar. Los puntos de bifurcación se reparten entre el `20 %` y el `80 %` del recorrido, nunca coinciden y cada rama nace al alcanzar su quiebre.
  - Un rayo terminado **se retira del registro**: antes podía bloquear las siguientes descargas y el efecto solo se veía una vez.

### Added (tests)
- `tests/cover-lightning.test.cjs` crece hasta 22 casos: verifica la apertura de la envolvente lateral con la profundidad, que la apertura no dependa del alto del cover, que el recorrido no se corte antes de completar el zigzag, que cada descarga genere entre una y tres ramificaciones y que los rayos terminados no bloqueen las siguientes descargas.
- Las pruebas usan una secuencia pseudoaleatoria fija, de modo que el resultado no depende del azar real.

### Changed (docs)
- `docs/core/project-rules.md` describe la apertura horizontal progresiva, el criterio de apertura por ancho, el reparto de las ramificaciones, la nueva frecuencia de descargas y la retirada de los rayos terminados.

## [261124a] - 2026-11-24

### Changed
- **El rayo del cover adopta un diseño más realista**, combinando los dos ejemplos de `docs/examples/`:
  - `js/app.js` reescribe `initCoverLightning()`: el rayo **nace siempre en el borde superior** y crece por segmentos de longitud variable. Su longitud es aleatoria (entre el `50 %` y el `115 %` del alto en la portada y un `62 %` en las subpáginas), por lo que puede terminar a media altura o sobrepasar el borde inferior.
  - El avance vertical es **siempre positivo**: ningún segmento retrocede y el trazado no se cruza consigo mismo. Cada pocos segmentos se aplica un quiebre lateral más marcado.
  - El rayo se dibuja **segmento a segmento** para poder **afilar la punta**: el grosor del halo cian y del núcleo blanco disminuye de forma progresiva hasta un mínimo en el extremo final. Las ramificaciones son más cortas, más delgadas y también se afilan.
  - Los quiebres con más energía se destacan redibujando sus propios segmentos con mayor opacidad y `shadowBlur`. **No se emplean figuras geométricas**: el brillo sigue la forma irregular del trazado.
  - Al iniciarse cada descarga se emite el **destello azul** `rgba(80, 180, 255, ...)` del ejemplo `ray.html`, con opacidad aleatoria entre `0.22` y `0.50` y decaimiento exponencial (`× 0.85`). Es una única emisión por descarga, sin efecto estroboscópico.
  - Las estelas se desvanecen con `destination-out` y el canvas **no se limpia en cada frame**, por lo que el rastro persiste hasta desaparecer.
  - Las descargas aparecen en intervalos aleatorios entre `2600` y `6400` ms, con energía variable.
  - El **sonido queda descartado**: no hay `AudioContext`, ni archivos de audio, ni controles de reproducción.
  - El canvas sigue siendo absoluto, por lo que **no altera el alto ni el contenido del cover**.

### Added (tests)
- Nueva prueba `tests/cover-lightning.test.cjs` (17 casos) que ejecuta `js/app.js` sobre un DOM simulado y verifica, en portada, subpágina y subpágina móvil: el nacimiento en el borde superior, la ausencia de retrocesos verticales, el respeto de los límites del cover, el adelgazamiento hasta la punta, el destello azul inicial con decaimiento, la persistencia de las estelas y la ausencia de figuras geométricas y de sonido.

### Changed (docs)
- `docs/core/project-rules.md` describe el nuevo diseño del rayo del cover: recorrido, afinado de la punta, brillo sin figuras, destello inicial, estelas y ausencia de sonido.

## [261123e] - 2026-11-23

### Added
- **Animación de rayo eléctrico sobre los covers**, adaptación de `docs/examples/ray.html`:
  - `js/app.js` incorpora `initCoverLightning()`, que localiza el cover con `#content.home-content, #content.subpage-content` y crea un `<canvas class="cover-lightning" aria-hidden="true">` como primer hijo de la sección, sin necesidad de modificar el HTML de las páginas.
  - El rayo dibuja un trazo principal irregular con halo cian (`#4fc3f7`) y núcleo blanco, entre dos y cuatro ramificaciones, desvanecido a lo largo de 20 frames, con un destello de fondo atenuado (`rgba(80, 180, 255, ...)` entre `0.12` y `0.22`).
  - `css/style.css` añade las reglas `.cover-lightning` y el contexto `isolation: isolate` en los covers: el canvas se recorta a la sección, usa `pointer-events: none` y nunca tapa la barra superior, el menú lateral ni el backdrop.
  - El canvas se dimensiona según el cover con densidad de píxeles limitada a `2` y se reajusta con `ResizeObserver`. El dibujo se detiene cuando el cover sale de la pantalla o la pestaña queda oculta.
  - Con `prefers-reduced-motion: reduce` no se crea el canvas y la hoja de estilos lo mantiene oculto.

### Removed
- **La animación `uxm-nav-border-dot` y todos sus estilos asociados**: el punto rojo que recorría el contorno del botón hamburguesa se elimina de `css/style.css`, junto con el pseudoelemento `.nav-toggle::after`, su regla en `nav-open` y su variante de movimiento reducido. La variable `--nav-uxm-shadow` se conserva porque la siguen usando el texto `UXM` y las tres barras del menú.

### Changed (tests)
- `tests/ui-contract.test.cjs` sustituye las tres pruebas que exigían el punto por comprobaciones de su ausencia, ajusta la prueba de la sombra compartida al texto `UXM` y las barras, y añade dos casos nuevos sobre el rayo del cover: la creación del canvas por JavaScript, sus capas y el movimiento reducido, y el control del consumo con `IntersectionObserver` y `visibilitychange`.

### Changed (docs)
- `docs/core/project-rules.md` describe el rayo del cover (ubicación, capas, consumo y comportamiento con movimiento reducido) y corrige las reglas del navbar que describían el punto eliminado.

## [261123d] - 2026-11-23

### Added
- **Se integra el idioma polaco (`pl`) en el sitio completo**, con detección automática por navegador y traducción íntegra:
  - `js/i18n.js` incorpora el bloque `pl` del núcleo común, con `name: "Polski"`.
  - Los siete archivos de página (`index`, `actividades-diarias`, `normas-uxm`, `video-tutoriales`, `estrategia`, `contacto`, `reino`) declaran su bloque `pl` con las mismas claves que el español. En Actividades Diarias se traducen las 53 actividades, los 9 eventos, las 7 fases y los 6 nombres de Battle Survival, con el mismo orden canónico.
  - Los 25 archivos de `db/library/` (4 grupos y 21 temas) incluyen el bloque `pl` en cada mapa de idioma: títulos, resúmenes, palabras clave, títulos de sección, párrafos y listas. El polaco se declara siempre después de `tr` para no alterar el orden de los bloques existentes.
  - `tests/i18n-polish.test.cjs` (nuevo, 12 casos) verifica el bloque del núcleo, la cobertura de las siete páginas, el orden canónico, las actividades `BS`, la detección por navegador, el parámetro `?lang=`, el selector automático, la cobertura de la Biblioteca, la normalización de `ł` y la ausencia de CJK y cirílico.
- La detección por navegador admite el polaco **sin modificar `resolveLang()`**: el idioma se reduce a su código de dos letras (`pl-PL` → `pl`) y se valida contra `window.I18N`. El selector enumera `Object.keys(window.I18N)`, por lo que «Polski» aparece automáticamente.

### Changed
- `js/strategy-library.js` normaliza la letra polaca `ł` a `l` antes de la descomposición Unicode NFD, que no la separa. Así, una búsqueda por `lodz` encuentra `Łódź`.
- Las listas `languages` de las pruebas (`i18n-structure`, `i18n-unicode`, `strategy-library`, `visit-counter`, `ui-contract`) pasan de diez a once idiomas, con sus conteos de traducciones por idioma actualizados.
- `AGENTS.md` enumera el polaco entre los idiomas disponibles del sitio.
- `docs/core/project-rules.md` documenta el núcleo de once idiomas, el comportamiento de la detección con el polaco, la normalización de `ł`, el orden de los bloques de idioma en la Biblioteca y la lista de nombres propios del selector.

## [261123c] - 2026-11-23

### Changed
- `formatPoint()` ya no limpia apóstrofos: **el dato fuente `ACTIVITY_CODE.point` se almacena sin separador de miles y sin signo**, y el render agrega el separador `'` únicamente para mostrarlo. El valor se valida directamente y la parte entera se agrupa tras fijar el decimal: `2.5` → `+2.5`, `145` → `+145.0`, `30000` → `+30'000.0`, `2812.5` → `+2'812.5`, `290000` → `+290'000.0`.
- `ACTIVITY_CODE.point` admite números y cadenas: el render normaliza con `String(value).trim()` antes de validar.
- Se adoptan los ajustes manuales del CSS vigente: `.ad-task-point` usa `right: 5px; bottom: 1px; color: #999;`, `.ad-bs-remaining` usa `font-size: 10px; color: #666; text-align: right;` y `.ad-bs-star` suma `font-size: 16px;`.
- `docs/core/project-rules.md` documenta el almacenamiento sin separador en el dato fuente, la agrupación visual del separador `'` y los estilos manuales vigentes del punto, del tiempo restante y de la estrella.

### Changed (tests)
- `tests/activity-points.test.cjs` actualiza los valores esperados al dato fuente vigente y añade un caso que comprueba la agrupación de miles en la parte entera (`+30'000.0`, `+2'812.5`, `+6'250.0`, `+23'500.0`, `+290'000.0`, `+4'350.0`) y la ausencia de separador con tres dígitos (`+705.0`).
- `tests/ui-contract.test.cjs` valida la nueva agrupación del separador de miles y la ausencia de la limpieza de apóstrofos, y ajusta las comprobaciones de estilo a los valores manuales vigentes.

## [261123b] - 2026-11-23

### Changed
- **El dato de Puntos deja de ocupar columna propia y se integra al final del texto de la columna `Tarea`**, en la esquina inferior izquierda de la celda. El valor se mantiene con `formatPoint()` y el patrón `"+"#0.0` (`2.4` → `+2.4`, `145` → `+145.0`, `29'000.0` → `+29000.0`). Se elimina la columna `Puntos` de `AD_COLUMNS` y de `adHeaders` en los diez idiomas: las tablas vuelven a cinco columnas (contador, imagen, tarea, recurso, evento). El nuevo elemento usa la clase `.ad-task-point` con `position: absolute; left: 10px; bottom: 2px;` y conserva el estilo manual vigente (`#777`, peso `100`, `0.6rem`); la celda de Tarea recibe `ad-has-point` (`padding-bottom: 16px`) y `.ad-objective` pasa a `position: relative`.
- El **grupo `Battle Survival` se separa de los demás eventos**: la última fila del grupo anterior al de las actividades `BS...` recibe la clase `ad-event-separator`. Las filas `BS` no llevan separador entre sí, porque todas pertenecen al mismo evento.
- **Bajo el contador de la actividad `BS` en estado `[PROGRESS]` se muestra el tiempo restante de la duración de cuatro horas**: si el contador indica `+ 02:47:39`, debajo aparece `01:12:21`. `linkedCounterState()` expone ahora `remainingSec` (`LINKED_DEFAULT_DURATION - elapsed`) y la celda de contador de estas filas se compone de dos nodos, `.ad-bs-elapsed` y `.ad-bs-remaining`, actualizados en cada tick. El estilo del restante es `display: block; font-size: 8px; color: #bbb; white-space: nowrap;`.
- **El símbolo `★` de la estrella de habilidad se pinta en rojo** (`#df1b1b`, rojo `alert` de la paleta estándar) en las actividades de Battle Survival. `appendStars()` reconstruye el texto de la celda separando cada `★` en un `<span class="ad-bs-star">`, sin modificar las traducciones. Solo las actividades `BS` reciben ese tratamiento.
- La nota `adPointsNote` adopta la redacción manual del usuario («Los Puntos mostrados son referencia a un jugador con VIP 9 e Investigación del Duelo de Alianza en , estos aumentaran, según tu nivel de investigación en el Duelo de Alianza.») y se propaga a los otros nueve idiomas.
- `js/i18n/actividades-diarias/i18n.js`: `adHeaders` vuelve a cinco columnas en los 10 idiomas, sin la entrada `Puntos`.

### Added
- `tests/activity-points.test.cjs` amplía su cobertura con la ausencia de la columna `Puntos`, el punto como último elemento de la celda de Tarea, el separador del grupo `BS`, el tiempo restante bajo el contador (`+ 02:47:39` → `01:12:21`, con recálculo en cada tick), la presencia del tiempo restante solo en progreso y el marcado de las estrellas.
- `tests/ui-contract.test.cjs` incorpora los contratos del punto integrado en Tarea, del separador del grupo `BS`, del tiempo restante y del color rojo de la estrella.
- `docs/core/project-rules.md` documenta la ubicación del punto en la celda de Tarea, la separación del grupo `BS`, el tiempo restante bajo el contador y el estilo de la estrella.

### Fixed
- `tests/activity-flags.test.cjs` hace que el doble `textContent` del mock se comporte como en el DOM real: concatena el texto de los nodos hijos y, al asignarlo, elimina los hijos existentes. Sin este ajuste, las filas `BS` con contador en cuenta atrás aparecían como celdas vacías en las comprobaciones.

## [261123a] - 2026-11-23

### Added
- La tabla del Duelo de Alianzas incorpora una columna **Puntos** entre `Tarea` y `Recurso`. El valor procede del dato estructural `ACTIVITY_CODE.point` y se formatea en `js/activities-daily.js` con la función `formatPoint()`, que aplica el patrón de Excel `"+"#0.0` (`2.4` → `+2.4`, `145` → `+145.0`, `29'000.0` → `+29000.0`, sin separador de miles). Cuando la actividad no declara `point`, o el valor está vacío o no es numérico, la celda queda en blanco. La celda usa la clase `.ad-point` con el estilo `color: #bbb; font-weight: 100; font-size: 8px`.
- Bajo las tablas del Duelo de Alianzas se muestra una nota única (`.ad-points-note`, `data-i18n-text="adPointsNote"`) con el texto «Los Puntos mostrados son solo referenciales, estos aumentaran, según tu nivel de investigación en el Duelo de Alianza.», traducida en los 10 idiomas y con estilo minimalista de `8px`.
- Las actividades de Batalla de Supervivencia, cuyos códigos de `ACTIVITY_CODE` comienzan por `BS` (`BSBUILD`, `BSHERO`, `BSRAVEN`, `BSSOLDIER`, `BSTECH`), se agregan **únicamente a la tabla del día actual** (panel `ad-item ad-today ad-open`). Su contador es el del horario vinculado de Battle Survival y la fila **solo es visible en estado `[PROGRESS]`**; en cualquier otro estado queda oculta mediante la clase `.ad-bs-hidden` (`display: none`). La visibilidad se recalcula en cada tick de un segundo sin reconstruir la tabla. Las filas `BS` se añaden al final del grupo de tareas del día actual, respetando el orden de `ACTIVITY_CODE` y sin alterar el orden de los demás grupos de eventos.
- Nueva prueba `tests/activity-points.test.cjs` con ocho casos: posición de la columna Puntos entre Tarea y Recurso, formato numérico con un decimal, celdas vacías sin valor numérico, encabezado `Puntos`, existencia y orden de las filas `BS`, y visibilidad de una actividad `BS` solo mientras su contador está en progreso.

### Changed
- `js/activities-daily.js` añade `formatPoint()`, la clase de celda `.ad-point`, la entrada `ad-col-point` en `AD_COLUMNS` y el bloque de actividades `BS` (`BS_CODE_PREFIX`, `bsRow()`, `applyBsVisibility()`).
- `css/activities-daily.css` añade `.ad-point`, `.ad-col-point` (48 px), la regla `.ad-schedule tbody tr.ad-bs-hidden` y `.ad-points-note`.
- `js/i18n/actividades-diarias/i18n.js`: `adHeaders` pasa de cinco a seis columnas en los 10 idiomas, con `Puntos` entre `Tarea` y `Recurso`; se añade la clave `adPointsNote` en los 10 idiomas; y se traducen a los otros nueve idiomas las cinco entradas `BS*` añadidas manualmente por el usuario en `texts.es.adActivities`, cuyo texto español se conserva sin cambios.
- `tests/ui-contract.test.cjs` actualiza el contrato de columnas (seis columnas, `ad-col-point` incluido) y los conteos (52 registros en `ACTIVITY_CODE`, 53 claves canónicas), y añade comprobaciones del formato de puntos, del estilo `.ad-point`, de la nota referencial y de la visibilidad de las actividades `BS`.
- `tests/i18n-structure.test.cjs` actualiza los conteos (52 y 53) e incorpora `BSBUILD`, `BSHERO`, `BSRAVEN`, `BSSOLDIER` y `BSTECH` a la lista de redacciones españolas protegidas.
- `docs/core/project-rules.md` documenta la columna Puntos, su formato y estilo, la nota referencial, el comportamiento de las actividades `BS` y los conteos vigentes.

## [261121a] - 2026-11-21

### Added
- `adActivities.DYWALL` («Retira tus soldados del Muro; Día de Guerra» / recurso «Muro Santuario») se traduce en los nueve idiomas, tras `DYSOLDIER`. La actividad ya está registrada en `ACTIVITY_CODE` y en `DAILY` (día 6, fase `P06`); el bloque español pasa de 47 a 48 claves y `ACTIVITY_CODE` de 46 a 47 registros.

### Changed
- Se propaga a los otros ocho idiomas de `js/i18n/actividades-diarias/i18n.js` la edición manual de `texts.es.adActivities` para `TCKSUR`, `FREETS`, `TCKHER` y `FREETH`: el objetivo pasa a indicar uso exhaustivo de tickets al reclutar (`TODOS`) y el uso de un único ticket gratuito (`1`), y el recurso queda en singular (`Ticket de Superviviente`, `Ticket de Héroe`). El texto español se conserva sin cambios.
- `tests/i18n-structure.test.cjs` actualiza los conteos (47 registros en `ACTIVITY_CODE`, 48 claves canónicas) y las redacciones españolas protegidas de `TCKSUR`, `FREETS`, `TCKHER` y `FREETH`, e incorpora `DYWALL` a la lista protegida.
- `tests/ui-contract.test.cjs` actualiza los conteos de `ACTIVITY_CODE` (47) y de las claves canónicas (48).
- `docs/core/project-rules.md` documenta los conteos vigentes, la redacción canónica de los tickets y la nueva actividad `DYWALL`.

## [261120e] - 2026-11-20

### Changed
- Se propaga a los otros ocho idiomas de `js/i18n/actividades-diarias/i18n.js` la edición manual de `texts.es.adActivities`, que reordena las 47 claves del bloque español y actualiza 26 actividades existentes: `ANTX`, `STMN`, `DYBOTWAR`, `EPIUR`, `RAVESS`, `RAVFRT`, `RAVCH1`, `CON1SP`, `CONMGH`, `TCH1SP`, `TCHMGH`, `OPENUR`, `TCKSUR`, `TCKHER`, `SKILLB`, `SOLD1TRN`, `SOLDT10`, `DYSOLDIER`, `HEA1SP`, `DYHOSPITAL`, `DYELITE`, `EQGEAR`, `EQBPRN`, `SHIELD`, `ELIXIR` y `CUMULUS`. El texto español se conserva sin cambios. Varias actividades fusionan en el objetivo lo que antes era el recurso y el recurso pasa a nombrar el objeto concreto.
- El orden de las claves de `adActivities` y `adEvents` queda fijado por el bloque español: los nueve idiomas declaran las mismas claves en el mismo orden.
- `adEvents` incorpora la clave `CHE` («Trampa del Queso») en los nueve idiomas.

### Added
- `adActivities.CHEESE7` («335M de Daño al Ladrón del Queso Lv.7, 30min duración, 1.4B de daño para el MVP1») se traduce en los nueve idiomas. La clave queda **pendiente de integración**: todavía no existe en `ACTIVITY_CODE`, `EVENT_CODE` ni `DAILY`, por lo que no aparece en los cronogramas.
- `tests/i18n-structure.test.cjs` valida el orden canónico del español, las 47 traducciones por idioma y la lista de redacciones españolas protegidas; admite explícitamente `CHEESE7` como la única clave pendiente de integrar.
- `tests/ui-contract.test.cjs` compara las claves y el orden de `adActivities` contra el canon español y reconoce las nueve claves de `adEvents`.
- `tests/i18n-unicode.test.cjs` amplía los tokens protegidos del juego (`T7`, `40`, `10`, `11`, `24`, `6`, `+50`, `335M`, `1.4B`, `MVP1`) y excluye `30min`, que cada idioma expresa con su convencion local conservando la cifra `30`.
- `docs/core/project-rules.md` documenta el reordenamiento del bloque español, la propagación de los 26 textos nuevos y el estado pendiente de `CHEESE7` y `CHE`.

## [261120d] - 2026-11-20

### Changed
- Se propaga a los otros ocho idiomas de `js/i18n/actividades-diarias/i18n.js` la redacción manual de `texts.es.adActivities.FALCON` («Completa Misiones del Halcón, 10 ó 11 cada 6 Horas»): `en` → «Complete Falcon Missions, 10 or 11 every 6 Hours», `pt` → «Complete Missões do Falcão, 10 ou 11 a cada 6 Horas», `it` → «Completa Missioni del Falco, 10 o 11 ogni 6 Ore», `fr` → «Terminez les Missions du Faucon, 10 ou 11 toutes les 6 Heures», `ja` → 「ファルコンミッションを完了する、6時間ごとに10または11」, `ru` → «Завершить Миссии Сокола, 10 или 11 каждые 6 Часов», `zh` → 「完成猎鹰任务，每6小时10或11次」 y `tr` → «Şahin Görevlerini Tamamla, her 6 Saatte 10 veya 11». El recurso «Torre del Halcón» se mantiene sin cambios.
- Se propaga a los otros ocho idiomas la redacción manual de `texts.es.adActivities.DYFALCON` («Inicia Misiones Halcón, pero no las completes, mantiene en espera 35 ó 40» con recurso «Torre del Halcón»): `en` → «Start Falcon Missions, but do not complete them, keep 35 or 40 pending» / «Falcon Tower», `pt` → «Inicie Missões do Falcão, mas não as complete, mantenha 35 ou 40 em espera» / «Torre do Falcão», `it` → «Avvia Missioni del Falco, ma non completarle, mantieni 35 o 40 in attesa» / «Torre del Falco», `fr` → «Lancez des Missions du Faucon, mais ne les terminez pas, gardez 35 ou 40 en attente» / «Tour du Faucon», `ja` → 「ファルコンミッションを開始するが完了しない、35または40を待機状態に保つ」/「ファルコンの塔」, `ru` → «Начать Миссии Сокола, но не завершать их, держите 35 или 40 в ожидании» / «Башня Сокола», `zh` → 「开始猎鹰任务，但不要完成，保持35或40个待处理」/「猎鹰塔」 y `tr` → «Şahin Görevlerini başlat ancak tamamlama, 35 veya 40'ı bekletmede tut» / «Şahin Kulesi». El texto español se conserva sin cambios.

### Added
- `docs/core/project-rules.md` documenta `FALCON` y `DYFALCON` en una sección propia de redacciones manuales de `adActivities`, junto con el renombrado de la clave `FAQS` a `FALCON`.

## [261120c] - 2026-11-20

### Changed
- Se propaga la redacción manual de `texts.es.adActivities.DYBOTWAR` («Guarda Botellas de Stamina para la Fase de Guerra») a los otros ocho idiomas de `js/i18n/actividades-diarias/i18n.js`: `en` → «Save Stamina Bottles for the War Phase», `pt` → «Guarde Garrafas de Stamina para a Fase de Guerra», `it` → «Salva Bottiglie di Stamina per la Fase di Guerra», `fr` → «Sauvegardez des Bouteilles d'Endurance pour la Phase de Guerre», `ja` → «戦争フェーズ用にスタミナボトルを保存», `ru` → «Сохранить Бутылки Стамины для Фазы Войны», `zh` → «为战争阶段保存体力瓶» y `tr` → «Savaş Aşaması için Dayanıklılık Şişelerini Kaydet». El texto español y los valores `resource` se conservan sin cambios.

### Added
- `docs/core/project-rules.md` documenta `DYBOTWAR` junto a `DYBOTT` y `DYSOLDIER` en la sección de redacciones manuales de `adActivities`.

## [261120b] - 2026-11-20

### Changed
- Los indicadores de atención de `DAILY` se separan en dos atributos independientes: `flag` afecta **solo a la columna Tarea** y `ani` afecta **solo a la columna Contador** de los cronogramas de Actividades Diarias. El indicador `flag` se renderiza como la clase `ad-task-flag-<indicador>` en la celda `.ad-objective`; el indicador `ani` se renderiza como la clase `ad-counter-ani-<indicador>` en la celda `.ad-time` y únicamente en la tabla del día actual. Una tarea sin `flag` ni `ani` no recibe clases de indicador, pero sí su clase de estado.
- El estado del contador (`ad-state-countdown`, `ad-state-progress` o `ad-state-normal`) se aplica ahora a **todas** las filas, con independencia de si declaran `flag` o `ani`, de modo que el indicador `ani` pueda reaccionar con el estado sin necesidad del `flag`.
- La columna Contador distingue cuatro estados en la tabla del día actual: **OFF** (celda vacía cuando la tarea no define `server_time` ni vincula un `codebs`), **COUNTDOWN** (`T-HH:MM:SS`), **PROGRESS** (`+ HH:MM:SS`) y **FINISHED** (`--:--:--`, antes `End`). Las tareas vinculadas a Battle Survival usan una duración predeterminada de **4 horas** (`LINKED_DEFAULT_DURATION`).
- Las tablas de días futuros muestran la fecha `MM/DD` para toda tarea con horario, ya sea `server_time` o vínculo `codebs`; antes solo la mostraban las tareas vinculadas a `codebs`. Las tareas OFF quedan en blanco.
- Se reescriben los estilos de los indicadores en `css/activities-daily.css` con la nomenclatura vigente: `flag` `A` (`#8a000050` / `#ffee00`), `W` (`#ffee0050` / `#115a96`), `I` (`#80808050` / `#115a96`) y `S` (`#006d0050` / `#fff`) en la columna Tarea; `ani` `A` (cuenta atrás `#ffee00` → `#ffee002f` y progreso `#8a0000` → `#ff0000` con texto `#fffb00`), `I` (base `#00578a` y progreso `#00578a` → `#00aeff`) y `S` (negrita con texto verde `#009400` ↔ `#333` intermitente) en la columna Contador. Todas las animaciones usan `1.8s ease-in-out infinite` y se desactivan con `prefers-reduced-motion: reduce`.
- `js/activities-daily.js` renombra `counterState()` a `linkedCounterState()` y devuelve un objeto `{ state, text }` con el estado explícito, sustituyendo la clasificación del texto por prefijo. `linkedDateLabel()` se sustituye por `dayDateLabel()`, que muestra la fecha de la tabla para toda tarea con horario.

### Removed
- Se elimina todo el código CSS obsoleto de la nomenclatura numérica anterior: los selectores `ad-flag-1` a `ad-flag-5` y sus animaciones `uxm-ad-flag-1-countdown`, `uxm-ad-flag-1-progress`, `uxm-ad-flag-2-progress` y `uxm-ad-flag-3-progress`.

### Fixed
- `tests/activity-flags.test.cjs` se reescribe para validar el contrato vigente: separación entre `flag` y `ani`, los cuatro estilos de `flag`, los comportamientos de `ani` `S`, `A` e `I`, los cuatro estados del contador, la duración de cuatro horas del vínculo `codebs`, las fechas `MM/DD` de las tablas futuras sin contadores y la ausencia del código antiguo `ad-flag-`.
- `tests/ui-contract.test.cjs` actualiza las comprobaciones del contador del Duelo de Alianzas al nuevo contrato de estados.

## [261120a] - 2026-11-20

### Changed
- Todos los identificadores técnicos del sitio se estandarizan en **inglés**: la propiedad `objetive` pasa a `objective` en los nueve idiomas de `adActivities`, y las claves e IDs `arengaTitle` / `arengaMessage` pasan a `warCryTitle` / `warCryMessage`.
- Los identificadores semánticos de `js/reino-castle.js` se traducen: las torres usan `west`, `north`, `east` y `south`, y los santuarios `sanctuary-blue` y `sanctuary-white`.
- Las clases CSS se normalizan a `kebab-case` en inglés, corrigiendo además las erratas heredadas: `block-content-destacated` → `block-content-featured`, `dinamic-welcome` → `dynamic-welcome`, `message-arenga` → `message-war-cry`, `block-booksmarks` → `block-bookmarks`, `text-video-learnig` → `text-video-learning`, `banner-divisor` → `banner-divider`, `line-divisor-*` → `line-divider-*`, `ad-obj` → `ad-objective` y todo el prefijo de clases `searchEngine-*` → `search-engine-*`. Los `id` DOM y las claves i18n (`searchEngineInput`, `searchEngineTitle`) conservan su `camelCase`.
- Se **retira** la regla anterior que obligaba a conservar la errata `block-booksmarks`: el nombre sigue ahora la convención vigente.

### Added
- Nueva regla permanente de nomenclatura en `AGENTS.md` y `docs/core/project-rules.md`: identificadores técnicos en inglés, `camelCase` para variables, funciones, `id` y claves i18n, `UPPER_SNAKE_CASE` para constantes, `PascalCase` para constructores y `kebab-case` para clases CSS y custom properties. Se documentan las excepciones permitidas (textos visibles, rutas, códigos del juego y `db/*.json` obsoletos).
- Nueva prueba `tests/naming-convention.test.cjs` con cinco casos que comprueban la ausencia de identificadores heredados, el formato `kebab-case` de las clases CSS, la ausencia de palabras en español en identificadores JavaScript y el uso del prefijo `search-engine` en las clases del buscador.

### Fixed
- `tests/activity-flags.test.cjs` deja de depender de una fecha absoluta («viernes 13 de noviembre de 2026»), que caducaba con el calendario. Los instantes de prueba se calculan ahora a partir del viernes de la semana en curso, de modo que la comprobación de los estados `T-`, `+` y `End` sigue siendo válida indefinidamente.
- Las comprobaciones de los indicadores de atención validan la estructura y los colores sin fijar la nomenclatura concreta del indicador, que la fuente de verdad y el CSS todavía no unifican: los datos de `DAILY` usan `A`, `I` y `W`, mientras `css/activities-daily.css` mantiene `ad-flag-1` a `ad-flag-5`. Se actualizan además los colores de la columna Tarea a los valores vigentes (`#ffee0050` y `#80808050`).

## [261119d] - 2026-11-19

### Changed
- Las cuatro torretas exteriores de la Ciudad Real son ahora **cilíndricas**: base ancha, fuste estrecho, corona más ancha y cuatro almenas, construidas con `CylinderGeometry` de 12 segmentos. Mantienen su posición, con la Torre Norte en la esquina noreste.
- Se **eliminan todos los muros** del castillo. Solo permanece la plataforma cuadrada gris (`COLORS.base`), con superficie rellena y contorno wireframe, y se mantiene la separación visible entre las cuatro torretas de las esquinas y la Ciudad Real central.
- La Ciudad Real gana **detalle** siguiendo `media/draft/royal-city.png`: cuerpo principal con almenas, segundo cuerpo escalonado, torreón central con tejado cónico, cuatro torrecillas interiores con techo cónico, dos cuerpos laterales, portal de entrada y escalones. Se conserva el estilo wireframe low-poly sin texturas.
- El terreno se divide en **lodo** (marrón `COLORS.mud`) en el cuadrado central y **césped** (verde `COLORS.grass`) en el territorio exterior, con `GRASS_CELLS = 20` celdas adicionales por cada lado del lodo (`GRASS_HALF = MUD_HALF + GRASS_CELLS * CELL_SIZE`, celda de `1.5`). La cuadrícula cubre todo el territorio.
- **Ambas vistas conservan el norte hacia arriba.** Cada vista fija su vector `camera.up`: la vista superior usa `(0, 0, -1)` con cámara en `(0, 74, 0.001)`, y la vista inicial y restablecida usa `(0, 1, 0)` con cámara en `(0, 26, 34)`, al sur mirando hacia el norte.
- Se añaden cuatro pruebas de contrato: torretas cilíndricas sin muros, terreno de lodo y césped con veinte celdas por lado, orientación norte en ambas vistas y detalle de la Ciudad Real.

## [261119c] - 2026-11-19

### Added
- La subpágina `pages/reino.html` incorpora un plano 3D interactivo de la Ciudad Real en la sección «Planes de Batalla`, montado en `<div class="kingdom-render" id="kingdomRender">`. El visor lo construye el nuevo módulo `js/reino-castle.js` con Three.js, `OrbitControls` y `CSS2DRenderer`, cargados por CDN mediante un `<script type="importmap">` con la versión fijada.
- La Ciudad Real es un modelo wireframe minimalista: plataforma, cuerpo principal, torreón central, puerta, almenas y cuatro torretas con forma de pieza de ajedrez (base ancha, fuste estrecho, corona más ancha y cuatro almenas), siempre menores que el castillo. Las murallas son líneas secundarias.
- Las cuatro torres se declaran en la constante `TOWERS` de `js/reino-castle.js`: Oeste `(-6, -6)`, Norte `(6, -6)`, Este `(6, 6)` y Sur `(-6, 6)`, de modo que la Torre Norte ocupa la esquina noreste del cuadrado (norte hacia `-Z`, este hacia `+X`).
- Los santuarios (ciudades adicionales) se declaran en la constante `SANCTUARIES` con `id`, `nameKey`, `variant` (`blue` o `white`), `level`, `x` y `z`. Las variantes se modelan como formas angulares escalonadas, inspiradas en `media/draft/sanc-blue.png` y `media/draft/sanc-white.png`, que son solo referencia visual. Se incluyen dos ejemplos provisionales con niveles 25 y 30.
- Etiquetas `CSS2DObject` para la Ciudad Real, las cuatro torres, cada santuario y los ejes cardinales N, S, E y O. Interacción con arrastrar, rueda o pinza, más los botones «Vista superior» y «Restablecer vista». El renderizado es bajo demanda y el mensaje `#kingdomRenderFallback` se mantiene visible si no hay WebGL.
- Once claves propias del visor en `js/i18n/reino/i18n.js`, presentes en los nueve idiomas: `kingdomCastleName`, `kingdomTowerWest`, `kingdomTowerNorth`, `kingdomTowerEast`, `kingdomTowerSouth`, `kingdomSanctuaryBlue`, `kingdomSanctuaryWhite`, `kingdomRenderDescription`, `kingdomRenderTop`, `kingdomRenderReset` y `kingdomRenderFallback`.
- `css/reino.css` incorpora los estilos del visor, de las etiquetas y de los controles, con `min-height` de `420px` en escritorio y `320px` en móvil.
- Se añaden cinco pruebas de contrato: contenedor y controles del visor, carga de Three.js por import map, distribución de las cuatro torres con la Torre Norte al noreste, configuración de los santuarios y textos del plano en los nueve idiomas.

### Changed
- `docs/core/project-rules.md` documenta el plano 3D de la Ciudad Real: estructura, dependencias, modelo wireframe, convención de ejes, datos configurables, interacción y comportamiento sin WebGL.

## [261119b] - 2026-11-19

### Added
- La sección «Biblioteca Estratégica» de la portada (`index.html`) rellena `<div class="block-booksmarks" id="strategyBookmarks">` con dos partes: un botón general con el estilo y la animación de `#infoButtons` que enlaza a `pages/estrategia.html?lang=`, y una lista minimalista con un enlace por grupo de la biblioteca.
- La lista de grupos de la portada es automática: `js/app.js` carga `db/library/index.json` y solo los manifiestos de grupo, los ordena por `order` y muestra su `title` en el idioma activo. No hay grupos ni títulos escritos en el código.
- `pages/estrategia.html` acepta el parámetro `?group=<id>`: al llegar desde la portada, `expandGroupFromUrl()` despliega únicamente ese grupo en el árbol, sin seleccionar un tema ni ejecutar una búsqueda.
- Se añaden cinco pruebas de contrato: bloque de marcadores en la portada, botón general y grupos automáticos, carga desde el índice de la biblioteca, estilos de los marcadores y apertura del grupo por URL.

### Changed
- `index.html` carga `css/estrategia.css` para reutilizar las reglas de `.searchEngine-topics-list` y `.searchEngine-topic` en la lista de grupos. `css/style.css` añade solo la disposición de `.block-booksmarks`: columna, centrado y separación.

## [261119a] - 2026-11-19

### Added
- Nueva subpágina `pages/reino.html` («Reino») con cinco secciones informativas: información general del Reino 277, territorios definidos, ubicación de la Alianza UXM, consejos y planes de batalla. Incluye `css/reino.css`, `js/reino.js` y `js/i18n/reino/i18n.js` en los nueve idiomas.
- La página Reino se registra en el menú como `navKingdom`, detrás de Actividades Diarias, y usa el fondo temático `media/subpages/reino.svg` declarado como `.subpage-kingdom` en `css/style.css`.
- Los datos de la página Reino viven en el objeto `KINGDOM` de `js/reino.js`: `territories`, `allianceLocation`, `tips` y `plans`. Las listas vacías muestran el estado «Información pendiente» sin inventar información.
- Se añaden seis pruebas de contrato para la subpágina Reino: orden de carga de scripts y estilos, secciones declaradas, textos propios en los nueve idiomas, entradas de menú y fondo temático.

### Changed
- El menú lateral muestra «Biblioteca Estratégica» en lugar de «Estrategia». La clave `navStrategy` de `js/i18n.js` se actualiza en los nueve idiomas; `estrategia.html` y el resto de claves no cambian.
- Se propagan a los nueve idiomas las redacciones manuales de `DYBOTT` («Guarda Botellas de Energía/Stamina para la Próxima Fase del Cuervo») y `DYSOLDIER` («Entrena Soldados T6 o T7; promover el Día de Preparación para la Guerra») en `js/i18n/actividades-diarias/i18n.js`, con el español como fuente.
- El tema «Recolección y Reserva» (`db/library/alliance-duel/reserve.json`) propaga su título español a los nueve idiomas y actualiza la fecha a `2026-11-19`.
- El tema «Equipamiento» (`db/library/hero/equipment.json`) incorpora la viñeta sobre el Taller de Equipamiento Lv.20 y el Santuario Lv.20 en los nueve idiomas, y actualiza la fecha a `2026-11-19`.
- La lista de temas esperada en `tests/strategy-library.test.cjs` se ajusta a la biblioteca vigente: el tema «Equipamiento» ya no está duplicado en Novatos y «Recolección y Reserva» sustituye a «Reserva».

## [261115a] - 2026-11-15

### Changed
- `ACTIVITY_CODE` conserva únicamente los datos estructurales de las actividades (`group`, `icon`, `point` y `codebs`). Los campos `objetive` y `resource` se eliminan de esta fuente de datos.
- `texts.es.adActivities` de `js/i18n/actividades-diarias/i18n.js` pasa a ser la fuente de verdad de los textos en español. La resolución en la interfaz mantiene el orden idioma activo → inglés → español canónico.

## [261113a] - 2026-11-13

### Added
- La clave `allianceMessage` de la subpágina de Actividades Diarias se incorpora en los 9 idiomas. El texto español manual de `pages/actividades-diarias.html` es la fuente y no modifica el mensaje homónimo de la portada.
- Se añaden a `adActivities` las actividades `DYBOTWAR` y `DYSOLDIER`, presentes en `ACTIVITY_CODE` y en el calendario `DAILY`.

### Changed
- `ACTIVITY_CODE` pasa de 43 a 45 registros y `DAILY` de 71 a 78 filas. Se sincronizan las traducciones de `SOLDT10` y `DYBOTT` con la redacción manual vigente.
- El texto `survivalMessage` se amplía en los 9 idiomas para indicar el tiempo transcurrido del evento actual y el tiempo restante.
- Las filas del Duelo de Alianzas se ordenan por un orden fijo e independiente del idioma: Guerras, Desafíos, Daily y Alianza. Dentro de cada evento se conserva el orden original de las actividades.
- Se propagan a los nueve idiomas las redacciones manuales de `SCRAMBLE` y `KWAR`, con el español como fuente.

## [261112a] - 2026-11-12

### Changed
- Las definiciones de `ACTIVITY_CODE` para las operaciones UR pasan a plural y con recurso: `CRVNUR` → `Dispatch UR Caravans` con `4 Caravan` y `OPENUR` → `Execute UR Covert Operations` con `7 Black Ops`. Las traducciones de `adActivities` en los 9 idiomas se ajustan a esas definiciones, con el español como fuente.
- La tabla del Duelo de Alianzas pasa de seis a cinco columnas: se retira la columna reservada para los iconos de recurso, que solo generaba una celda vacía. El orden final es contador, imagen de la tarea, tarea, recurso y evento.
- `adHeaders` queda con cinco entradas en los 9 idiomas, ya sin el hueco de la columna de icono de recurso.

### Fixed
- Se actualizan las pruebas del contrato de interfaz para las cinco columnas, la ausencia de `ad-resource-icon` y el ancho manual de `.ad-col-icon` (35 px). Los anchos de `.ad-schedule` (`width: 100%`, `min-width: 760px`, `table-layout: fixed`) se conservan.

## [261111a] - 2026-11-11

### Added
- La fuente Inter se sirve de forma local para los cronogramas: `media/fonts/inter-100.woff2` (Inter Thin, peso 100) se declara con `@font-face` en `css/activities-daily.css`, sin dependencia de red. La licencia SIL Open Font License 1.1 se conserva en `docs/core/inter-font-license.txt`.
- La cuenta atrás de fase de los títulos del Duelo de Alianzas se monta en un nodo propio, `<span class="ad-countdown">`, con el verde claro `#89ff90`. El resto del título mantiene el gris claro `#eee` mediante `.ad-title-phase`.

### Changed
- Las tablas `.bs-schedule` y `.ad-schedule` usan Inter con peso base `100` en lugar de Roboto. Se conservan las negritas existentes de encabezados, eventos y filas destacadas.
- El contador de fase ya no reconstruye el texto completo del título en cada segundo: se actualiza únicamente su nodo, con lo que el nombre de la fase y el separador `·` permanecen estables.
- El formato del contador de fase pasa a `T- HH:MM:SS`, con espacio tras el guion.

### Fixed
- Se actualizan las pruebas del contador de fase para el formato con espacio y el nodo propio, y se añaden validaciones de contrato para la fuente Inter y los colores del título de fase.

## [261110c] - 2026-11-10

### Added
- El título de la fase actual del Duelo de Alianzas incluye una cuenta atrás `T-HH:MM:SS` hasta el final de la fase. Cada fase va de las `00:00:00` a las `00:00:00` UTC-2 del día siguiente; el contador se actualiza con el temporizador compartido y solo se muestra en el panel del día actual.
- SeDividen las traducciones i18n en un núcleo común (`js/i18n.js`) y un archivo por página (`js/i18n/<página>/i18n.js`). Cada página carga únicamente su propio archivo i18n y se incorpora el latín turco.
- El bloque informativo de la portada incorpora un tercer botón, «Actividades Diarias», que enlaza a `pages/actividades-diarias.html` conservando el idioma activo mediante `?lang=`. La etiqueta reutiliza la clave i18n `navDaily`.

### Changed
- Las ediciones manuales de `texts.es.adActivities` se conservan como fuente de verdad para las traducciones de actividades. Los registros actualizados en español se propagan a los otros ocho idiomas sin sobrescribir el texto español.
- Se amplían las validaciones de internacionalización: UTF-8 válido, ausencia de mojibake y caracteres invisibles, CJK solo en japonés y chino, cirílico en ruso y conservación de los valores protegidos del juego.

### Fixed
- Se corrigen las mezclas de alfabeto en japonés: `ファalcon` pasa a `ファルコン` y `クリスタル堆积谷` a `クリスタル堆積の谷`.
- Se actualizan las pruebas para la estructura i18n por página, el contador de fase y la fuente manual de traducciones en español.

## [261110b] - 2026-11-10

### Changed
- La alerta de proximidad se extiende a las tres primeras celdas de la próxima actividad: `Contador`, `Estado` y `Evento`. Las celdas `Actividades` y `Servidor` conservan su apariencia habitual.
- La clase `bs-imminent` pasa a aplicarse sobre la fila (`tr`) en lugar de sobre la celda del contador, de modo que las tres celdas compartan una sola regla y la animación vaya sincronizada. El umbral (`T- 01:00:00` o menos) y el aspecto (texto amarillo `#ffee00` sobre fondo escarlata animado) no cambian.

### Fixed
- Se actualizan las pruebas del aviso para validar la clase sobre la fila, la cobertura de `bs-counter`, `bs-status` y `bs-event` en el CSS, y que `bs-activities` y `bs-server` quedan fuera del aviso.
- Se actualiza la documentación de `docs/core/project-rules.md` con el alcance ampliado de la alerta.

## [261110a] - 2026-11-10

### Changed
- El aviso de proximidad se aplica al contador de la tercera actividad, la inmediatamente siguiente a la actual, con independencia del evento asignado y sin exigir `bs-dayend`.
- El contador de esa próxima actividad recibe siempre `bs-hl-special`, de modo que el selector del aviso sea aplicable en cualquier caso; las demás filas futuras conservan su resaltado anterior.
- El aspecto del aviso cambia: el texto pasa a amarillo `#ffee00` y el fondo varía suavemente entre escarlata `var(--scarlet)` (`#ff2400`) y escarlata oscuro `#8f1200`, con la animación `uxm-bs-counter-alert` de `1.8s`. El contador no recibe texto adicional.

### Fixed
- Se actualiza la documentación de `docs/core/project-rules.md` con el nuevo alcance del aviso y con la regla de `bs-hl-special` en la tabla de Batalla de Supervivencia.
- Se añaden pruebas de comportamiento dinámico que ejecutan `js/activities-daily.js` sobre un DOM simulado y comprueban que el aviso se activa en `T- 01:00:00`, `T- 00:59:59` y `T- 00:13:20`, que no se activa antes de ese umbral y que solo afecta al contador de la próxima actividad.
- Se actualiza la expectativa obsoleta de `.ad-title-reset`, que usa `font-size: 0.75rem`.

## [261109a] - 2026-11-09

### Added
- Traducción de las secciones de tutoriales y estrategia de la portada: claves `tutorialsMessage`, `strategyTitle` y `strategyMessage` en los 8 idiomas, conectadas con `data-i18n-text` y `data-i18n`.
- Mapas i18n `adActivities` (43 registros), `adPhases` (7 fases) y `adEvents` (8 eventos) en `js/i18n.js`, con la resolución idioma activo → inglés → dato original.
- Aviso visual de cierre inminente en la tabla de Batalla de Supervivencia: la celda `td.bs-counter` de la fila `tr.bs-next.bs-dayend.bs-row-third` pasa a fondo rojo cuando faltan `01:00:00` o menos.

### Changed
- Las tablas del Duelo de Alianzas muestran el objetivo, el recurso, la fase y el evento traducidos en los 8 idiomas.
- El aviso periódico del botón de navegación ya no desplaza las barras 1 y 2: un punto rojo recorre el contorno del botón y se apaga, en portada y subpáginas.
- El punto que recorre el borde, el texto `UXM` y las tres barras del menú comparten color y sombra mediante la variable `--nav-uxm-shadow`, contextual: `.65` en subpáginas y `.9` en portada.
- El título de cada panel del Duelo de Alianzas muestra la fase y el reset local `MM/DD HH:mm`; el reset de cada día parte de las `00:00:00` en UTC-2 y se convierte a la zona del navegador.
- El párrafo `survivalMessage` de la página de Actividades Diarias se traduce mediante la clave i18n `survivalMessage`.

### Fixed
- Se corrigen las erratas del bloque japonés de `js/i18n.js`: fragmentos ajenos al japonés en `videoTutorialTip1`, `videoTutorialEvent3` y `videoTutorialEvent4`, caracteres chinos en `bsEvents` (`領土の建設`, `兵士の訓練`), y textos mal construidos en `rulesPositionR2`, `rulesPositionR4`, `rulesPositionR5`, `rulesRoleDiplomatText` y `rulesRoleGoddessText`. Se conservan los valores del juego.
- Se corrige la mezcla `精 essence` de la actividad `RAVESS` en el bloque japonés.
- El contrato de pruebas se actualiza a los datos vigentes (`ACTIVITY_CODE` 43, `EVENT_CODE` 8, `DAILY` 71, 9 filas con horario propio) y refleja la etiqueta `Tips` vigente.
- Se añaden pruebas de regresión para la sombra compartida del menú y para las traducciones japonesas, incluida la comprobación de que solo `ja` y `zh` contienen caracteres CJK.
- La documentación de `docs/core/project-rules.md` se sincroniza con el código actual, incluidos el nivel de los bonos en columna propia, los mapas de traducción y la alerta de cierre.

## [261108a] - 2026-11-08

### Added
- Fuente de verdad `window.ALLIANCE_BONUSES` en `js/alliance-bonuses.js` con los datos de las filas de bonos (porcentaje, nivel y estado).
- Columna `server_duration` en `DAILY` (formato `hh:mm:ss`, UTC-2) para las tareas con hora propia del servidor: `SCRAMBLE` 01:00:00, `ELIXIR` 00:30:00, `SHIELD` 23:00:00, `KWAR` 01:00:00 y `CUMULUS` 00:30:00.

### Changed
- La tabla de bonos se genera desde `js/alliance-bonuses.js`; `index.html` conserva solo `<tbody id="allianceBonusBody"></tbody>`.
- El nivel numérico de cada bono ocupa su propia columna con el prefijo `Lv.`, por lo que las etiquetas i18n no incluyen el número.
- La primera columna de las tablas del Duelo de Alianzas pasa de `Hora Inicio` a `Contador` en los 8 idiomas.
- Solo la tabla del día actual (`ad-today`) usa `server_time` y `server_duration`: `T-HH:MM:SS` antes del inicio, `+ HH:MM:SS` durante el evento y `End` al finalizar. Las filas sin `server_time` conservan el cálculo por `codebs` y los días futuros no cambian.

### Fixed
- Se conservan los ajustes manuales de estilo: `.ad-item-title` con `font-size: 1.2rem`, `padding: 2px 10px 2px 10px` y `box-shadow: 0 3px 5px`, y enlaces del menú lateral con `border-radius: 1px`.
- El contrato de pruebas se actualiza a los datos vigentes (`ACTIVITY_CODE` 43, `EVENT_CODE` 8, `DAILY` 71) y valida el formato `hh:mm:ss` de `server_time` y `server_duration`.

## [261105a] - 2026-11-05

### Added
- Traducción de los nombres de evento de Battle Survival mediante la clave `bsEvents`, indexada por `codebs` (`BUILD`, `HEROE`, `RAVEN`, `SOLDIER`, `TECH`, `STANDBY`) y presente en los 8 idiomas.
- Columna `Recurso` en las tablas del Duelo de Alianzas, con el valor `resource` de `ACTIVITY_CODE`.
- Iconos de tarea en la segunda columna de las tablas del Duelo de Alianzas, cargados desde `media/glyph/<icon>.png`.
- Columna reservada para futuros iconos de recurso, con el atributo `data-code`.
- `<colgroup>` compartido (`AD_COLUMNS`) para que todas las tablas de los días mantengan el mismo ancho y la misma alineación de columnas.
- Contadores en vivo para las tareas vinculadas del Duelo de Alianzas: `+ HH:MM:SS` en curso, `T-HH:MM:SS` para el próximo horario y `End` al finalizar.
- Fechas `MM/DD` para las tareas vinculadas en las tablas de los días futuros.

### Changed
- La tabla de cada día del Duelo de Alianzas pasa de cuatro a seis columnas: Hora Inicio, imagen, Tarea, imagen, Recurso y Evento. La columna `Tarea` sustituye a «Objetivo».
- Las filas del Duelo de Alianzas se ordenan alfabéticamente por el nombre visible del Evento y los grupos se separan con `border-bottom: 2px solid #4d7799`.
- `.ad-schedule` usa `table-layout: fixed`, `width: 100%` y `min-width: 760px`; los textos largos pueden envolver su contenido.
- `.ad-item-title` conserva sin cambios los estilos definidos manualmente por el usuario (color `#4d7799`, borde, radio, fondo y tamaño de letra).
- `ACTIVITY_CODE` usa `codebs` para vincular cada tarea con Battle Survival; la columna `Hora Inicio` solo calcula tiempos para tareas vinculadas.
- Las tareas sin vínculo muestran `—` en `Hora Inicio`; `DAILY.time_init` deja de utilizarse para este renderizado.

### Removed
- La columna `Fase` de las tablas del Duelo de Alianzas: la fase solo se muestra en el título del día.
- El reloj de zona horaria `#ad-tzinfo` del Duelo de Alianzas y la clase visual `ad-past`.

### Fixed
- Los resaltados de Battle Survival (`bs-hl-special` y `bs-hl-track`) dependen ahora del código de actividad y no del texto del evento, por lo que se mantienen al cambiar de idioma.
- Los iconos de tarea cuya imagen aún no está disponible en `media/glyph/` se ocultan en lugar de mostrar una imagen rota.
- Los contadores del Duelo de Alianzas usan segundos dentro del día y consideran que cada horario de Battle Survival termina cuando empieza el siguiente, aunque tenga otro código; así pasan correctamente al segundo horario y muestran `End` al finalizar el último.

## [261104c] - 2026-11-04

### Added
- Hoja de estilos propia `css/activities-daily.css` para la subpágina de Actividades Diarias, cargada después de `css/style.css`.
- Script único `js/activities-daily.js` que unifica los dos cronogramas: datos, utilidades compartidas, `initBattleSurvival()` e `initAllianceDuel()`.
- Un único `setInterval` de `1 s` coordina la actualización de los dos cronogramas.
- Variables de datos como fuente de verdad: `ACTIVITIES` (6), `CALENDAR` (42), `ACTIVITY_CODE` (44), `EVENT_CODE` (5), `PHASES` (6) y `DAILY` (60), con los horarios en UTC-2.

### Changed
- `pages/actividades-diarias.html` carga un solo script propio (`js/activities-daily.js`) en lugar de los dos anteriores.
- Los datos de actividades se administran en las variables de `js/activities-daily.js`. Los archivos `db/*.json` quedan obsoletos: se conservan como histórico y el sitio ya no los carga.
- `AGENTS.md` y `docs/core/project-rules.md` actualizados con la nueva fuente de verdad, la estructura de archivos y la tabla de datos obsoletos.

### Removed
- `js/battle-survival-schedule.js` y `js/alliance-duel-schedule.js`, sustituidos por `js/activities-daily.js`.
- La inyección de estilos en tiempo de ejecución: las variables `CSS` de ambos scripts se trasladaron a `css/activities-daily.css`.

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
