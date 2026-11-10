/* Bonos de Tecnologia de la Alianza: datos fuente de verdad.
   Los textos traducibles viven en js/i18n.js; aqui solo se declara el
   dato de juego de cada fila (porcentaje, nivel y estado). */
window.ALLIANCE_BONUSES = [
  { "key": "bonusFastBuild",        "value": "+20%", "level": 8,    "priority":"high", "inProgress": false },
  { "key": "bonusResearchSpeedup",  "value": "+15%", "level": 6,    "priority":"high", "inProgress": false },
  { "key": "bonusCraftingSpeedup",  "value": "+8%",  "level": 4,    "priority":"high", "inProgress": true  },
  { "key": "bonusFastTraining",     "value": "+1%",  "level": 2,    "priority":"", "inProgress": false },
  { "key": "bonusRallyStats",       "value": "+2%",  "level": 2,    "priority":"", "inProgress": false },
  { "key": "bonusShardExchange",    "value": "",     "level": null, "priority":"", "inProgress": false }
];

// 1. 🥇 Nivel Primordial / Esencial: La base absoluta de la pirámide de progreso.
// 2. 🥈 Nivel De Desarrollo / Avance: Lo que añade valor y acelera el camino.
// 3. 🥉 Nivel Complementario: Tareas accesorias que pulen los detalles.
