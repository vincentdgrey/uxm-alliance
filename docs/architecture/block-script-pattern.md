# Patrón de Bloques-Script

OBSOLETO - DESCONTINUADO!!

## Descripción

Cada bloque-script es un fragmento HTML autónomo diseñado para insertarse en Google Sites mediante el bloque "Insertar > Embed code".

## Estructura

Un bloque-script consta únicamente de:

```html
<div id="prefijo-container">
  <!-- Estructura HTML mínima -->
</div>
<script>
(function () {
  "use strict";
  // 1. Inyección de CSS dinámico
  // 2. Datos embebidos
  // 3. Lógica de renderizado
})();
</script>
```

## Reglas

1. **Solo `<div>` + `<script>`**: Sin `<html>`, `<head>`, `<body>`, ni `<style>`.
2. **CSS inyectado vía JS**: Se crea un elemento `<style>` dinámicamente y se inserta en `<head>`.
3. **Sin librerías externas**: Vanilla JS, compatible con ES5.
4. **Datos embebidos**: Toda la data va dentro del script (sin fetch, sin CORS).
5. **IIFE**: Todo el código se envuelve en `(function () { "use strict"; ... })();`.
6. **Prefijo único**: Cada bloque usa un prefijo de clases único para evitar colisiones.

## Zona Horaria

- **Origen**: UTC-2 (donde se registran los datos).
- **Conversión**: El script convierte automáticamente a la zona local del visitante.
- **Fórmula**: `UTC = hora_origen + 2h` → luego se convierte a la zona del navegador.

## Paleta de Colores

| Token     | Hex       | Uso                                    |
|-----------|-----------|----------------------------------------|
| `success` | `#009922` | Acciones completadas, estado en curso  |
| `primary` | `#26b`    | Elementos principales, headers, títulos|
| `warning` | `#e95612` | Alertas preventivas, próximos eventos  |
| `alert`   | `#df1b1b` | Errores, eventos críticos              |
