/* Actividades Diarias: cronogramas de Batalla de Supervivencia y Duelo de Alianzas.
   Script unico de la subpagina pages/actividades-diarias.html.

   Depende de js/i18n.js y js/i18n/actividades-diarias/i18n.js (window.I18N)
   y del idioma que fija js/app.js en <html data-lang>. No modifica el titulo
   ni el idioma de la pagina.
   Los estilos viven en css/activities-daily.css. */
(function () {
  "use strict";

  /* ---------- Datos fuente de verdad ----------
     Los horarios estan expresados en UTC-2. */

  var ACTIVITIES = [
    { "codebs": "BUILD", "event": "Build Territory", "activity_1": "1min Construction Speedup (50H) [+10]", "activity_2": "Increase 1 Building Might (30.000) [+1]", "goal": "30.000 pts" },
    { "codebs": "HEROE", "event": "Enhance Heroes", "activity_1": "20 Ticket Heroes (30T) [+400]", "activity_2": "1950 Antitoxin (23.4M) [+1]", "goal": "12.000 pts" },
    { "codebs": "RAVEN", "event": "Enhance Raven", "activity_1": "10 Raven Fruit", "activity_2": "1 Stamina (15 Rallys) [+100]", "goal": "30.000 pts" },
    { "codebs": "SOLDIER", "event": "Train Soldiers", "activity_1": "1min Training Boost (17H) [+10]", "activity_2": "Train 1 Lv.8 Soldier (2.800) [+25]", "goal": "60.000 pts" },
    { "codebs": "TECH", "event": "Technology Research", "activity_1": "1min Research Speedup (50H) [+10]", "activity_2": "Increase 1 Tech Might (30.000) [+1]", "goal": "30.000 pts" },

    { "codebs": "STANDBY", "event": "Stand by", "activity_1": "Stand by", "activity_2": "Stand by", "goal": "" }
  ];

  var CALENDAR = [
    { "codet": "0.00", "noday": 0, "time_init": "00:00:00", "day": "Sun", "codebs": "BUILD" },
    { "codet": "0.04", "noday": 0, "time_init": "04:00:00", "day": "Sun", "codebs": "SOLDIER" },
    { "codet": "0.08", "noday": 0, "time_init": "08:00:00", "day": "Sun", "codebs": "TECH" },
    { "codet": "0.12", "noday": 0, "time_init": "12:00:00", "day": "Sun", "codebs": "RAVEN" },
    { "codet": "0.16", "noday": 0, "time_init": "16:00:00", "day": "Sun", "codebs": "HEROE" },
    { "codet": "0.20", "noday": 0, "time_init": "20:00:00", "day": "Sun", "codebs": "BUILD" },

    { "codet": "1.00", "noday": 1, "time_init": "00:00:00", "day": "Mon", "codebs": "HEROE" },
    { "codet": "1.04", "noday": 1, "time_init": "04:00:00", "day": "Mon", "codebs": "BUILD" },
    { "codet": "1.08", "noday": 1, "time_init": "08:00:00", "day": "Mon", "codebs": "SOLDIER" },
    { "codet": "1.12", "noday": 1, "time_init": "12:00:00", "day": "Mon", "codebs": "TECH" },
    { "codet": "1.16", "noday": 1, "time_init": "16:00:00", "day": "Mon", "codebs": "RAVEN" },
    { "codet": "1.20", "noday": 1, "time_init": "20:00:00", "day": "Mon", "codebs": "HEROE" },

    { "codet": "2.00", "noday": 2, "time_init": "00:00:00", "day": "Tue", "codebs": "BUILD" },
    { "codet": "2.04", "noday": 2, "time_init": "04:00:00", "day": "Tue", "codebs": "SOLDIER" },
    { "codet": "2.08", "noday": 2, "time_init": "08:00:00", "day": "Tue", "codebs": "TECH" },
    { "codet": "2.12", "noday": 2, "time_init": "12:00:00", "day": "Tue", "codebs": "RAVEN" },
    { "codet": "2.16", "noday": 2, "time_init": "16:00:00", "day": "Tue", "codebs": "HEROE" },
    { "codet": "2.20", "noday": 2, "time_init": "20:00:00", "day": "Tue", "codebs": "BUILD" },

    { "codet": "3.00", "noday": 3, "time_init": "00:00:00", "day": "Wed", "codebs": "SOLDIER" },
    { "codet": "3.04", "noday": 3, "time_init": "04:00:00", "day": "Wed", "codebs": "TECH" },
    { "codet": "3.08", "noday": 3, "time_init": "08:00:00", "day": "Wed", "codebs": "RAVEN" },
    { "codet": "3.12", "noday": 3, "time_init": "12:00:00", "day": "Wed", "codebs": "HEROE" },
    { "codet": "3.16", "noday": 3, "time_init": "16:00:00", "day": "Wed", "codebs": "BUILD" },
    { "codet": "3.20", "noday": 3, "time_init": "20:00:00", "day": "Wed", "codebs": "SOLDIER" },

    { "codet": "4.00", "noday": 4, "time_init": "00:00:00", "day": "Thu", "codebs": "TECH" },
    { "codet": "4.04", "noday": 4, "time_init": "04:00:00", "day": "Thu", "codebs": "RAVEN" },
    { "codet": "4.08", "noday": 4, "time_init": "08:00:00", "day": "Thu", "codebs": "HEROE" },
    { "codet": "4.12", "noday": 4, "time_init": "12:00:00", "day": "Thu", "codebs": "BUILD" },
    { "codet": "4.16", "noday": 4, "time_init": "16:00:00", "day": "Thu", "codebs": "SOLDIER" },
    { "codet": "4.20", "noday": 4, "time_init": "20:00:00", "day": "Thu", "codebs": "TECH" },

    { "codet": "5.00", "noday": 5, "time_init": "00:00:00", "day": "Fri", "codebs": "RAVEN" },
    { "codet": "5.04", "noday": 5, "time_init": "04:00:00", "day": "Fri", "codebs": "HEROE" },
    { "codet": "5.08", "noday": 5, "time_init": "08:00:00", "day": "Fri", "codebs": "BUILD" },
    { "codet": "5.12", "noday": 5, "time_init": "12:00:00", "day": "Fri", "codebs": "SOLDIER" },
    { "codet": "5.16", "noday": 5, "time_init": "16:00:00", "day": "Fri", "codebs": "TECH" },
    { "codet": "5.20", "noday": 5, "time_init": "20:00:00", "day": "Fri", "codebs": "RAVEN" },

    { "codet": "6.00", "noday": 6, "time_init": "00:00:00", "day": "Sat", "codebs": "HEROE" },
    { "codet": "6.04", "noday": 6, "time_init": "04:00:00", "day": "Sat", "codebs": "BUILD" },
    { "codet": "6.08", "noday": 6, "time_init": "08:00:00", "day": "Sat", "codebs": "SOLDIER" },
    { "codet": "6.12", "noday": 6, "time_init": "12:00:00", "day": "Sat", "codebs": "TECH" },
    { "codet": "6.16", "noday": 6, "time_init": "16:00:00", "day": "Sat", "codebs": "RAVEN" },
    { "codet": "6.20", "noday": 6, "time_init": "20:00:00", "day": "Sat", "codebs": "HEROE" }
  ];

  var ACTIVITY_CODE = [
    { "code": "ANTX", "group": "FOCUS", "icon": "antitoxin", "point": 2.5, "codebs": "HEROE" },

    { "code": "FALCON", "group": "FOCUS", "icon": "falcon-mission", "point": 30000, "codebs": "" },
    { "code": "DYFALCON", "group": "FOCUS", "icon": "falcon-mission-lock", "point": "", "codebs": "" },
    { "code": "STMN", "group": "FOCUS", "icon": "stamina-bottle", "point": 375, "codebs": "RAVEN" },

    { "code": "EPIUR", "group": "RAVEN", "icon": "epigraf-chest", "point": 2812.5, "codebs": "" },
    { "code": "RAVESS", "group": "RAVEN", "icon": "raven-essence", "point": 6250, "codebs": "" },
    { "code": "RAVFRT", "group": "RAVEN", "icon": "raven-fruit", "point": 7.5, "codebs": "RAVEN" },
    { "code": "RAVCH1", "group": "RAVEN", "icon": "raven-chest", "point": 2750, "codebs": "" },

    { "code": "HERBS", "group": "FARM", "icon": "garden", "point": 12.5, "codebs": "" },
    { "code": "GRAIN", "group": "FARM", "icon": "farm", "point": 12.5, "codebs": "" },

    { "code": "CON1SP", "group": "BUILD", "icon": "speedup-build", "point": 150, "codebs": "BUILD" },
    { "code": "CONMGH", "group": "BUILD", "icon": "might-building", "point": 29, "codebs": "BUILD" },

    { "code": "CRVNUR", "group": "OPER", "icon": "caravan", "point": 300000, "codebs": "" },
    { "code": "OPENUR", "group": "OPER", "icon": "black-ops-swag", "point": 225000, "codebs": "" },

    { "code": "TCKSUR", "group": "TAVERN", "icon": "ticket-survivor", "point": 4500, "codebs": "" },
    { "code": "SAVETS", "group": "TAVERN", "icon": "lock", "point": "", "codebs": "" },
    { "code": "FREETS", "group": "TAVERN", "icon": "free", "point": "", "codebs": "" },

    { "code": "STDSCR", "group": "TECH", "icon": "study-scroll", "point": 750, "codebs": "" },
    { "code": "TCH1SP", "group": "TECH", "icon": "speedup-tech", "point": 150, "codebs": "TECH" },
    { "code": "TCHMGH", "group": "TECH", "icon": "might-research", "point": 30, "codebs": "TECH" },

    { "code": "SHRDSR", "group": "HERO", "icon": "shard-sr", "point": 2500, "codebs": "" },
    { "code": "SHRDSS", "group": "HERO", "icon": "shard-ssr", "point": 8750, "codebs": "" },
    { "code": "SHRDUR", "group": "HERO", "icon": "shard-ur", "point": 25000, "codebs": "" },
    { "code": "SKILLB", "group": "HERO", "icon": "skill-badge", "point": 25, "codebs": "" },

    { "code": "TCKHER", "group": "TAVERN", "icon": "ticket-hero", "point": 4500, "codebs": "HEROE" },
    { "code": "SAVETH", "group": "TAVERN", "icon": "lock", "point": "", "codebs": "" },
    { "code": "FREETH", "group": "TAVERN", "icon": "free", "point": "", "codebs": "" },

    { "code": "SOLD1TRN", "group": "SOLDIER", "icon": "boost-training", "point": 150, "codebs": "SOLDIER" },
    { "code": "SOLDT10", "group": "SOLDIER", "icon": "soldier-t8", "point": 240, "codebs": "SOLDIER" },

    { "code": "HEA1SP", "group": "HEAL", "icon": "speedup-healing", "point": 150, "codebs": "" },
    { "code": "SOLDDFT", "group": "SOLDIER", "icon": "soldier-defeat", "point": 23.6, "codebs": "" },
    { "code": "SOLDLST", "group": "SOLDIER", "icon": "soldier-lost", "point": 20, "codebs": "" },
    { "code": "SOLDMTC", "group": "SOLDIER", "icon": "soldier-attack", "point": 118, "codebs": "" },

    { "code": "DYELITE", "group": "MONSTER", "icon": "elite-blight", "point": "", "codebs": "RAVEN" },
    { "code": "DYBOTT", "group": "FOCUS", "icon": "stamina-bottle", "point": "", "codebs": "" },
    { "code": "DYBOTWAR", "group": "FOCUS", "icon": "stamina-bottle", "point": "", "codebs": "" },
    { "code": "DYHERBS", "group": "FOCUS", "icon": "garden", "point": "", "codebs": "" },
    { "code": "DYSOLDIER", "group": "FOCUS", "icon": "soldier-t7", "point": "", "codebs": "SOLDIER" },
    { "code": "DYHOSPITAL", "group": "FOCUS", "icon": "speedup-healing", "point": "", "codebs": "" },
    { "code": "SHIELD", "group": "FOCUS", "icon": "shield", "point": "", "codebs": "" },
    { "code": "DYWALL", "group": "FOCUS", "icon": "", "point": "", "codebs": "" },

    { "code": "EQGEAR", "group": "GEAR", "icon": "gearstone", "point": "", "codebs": "" },
    { "code": "EQBPRN", "group": "GEAR", "icon": "gear-blueprint-ur", "point": "", "codebs": "" },

    { "code": "ELIXIR", "group": "FOCUS", "icon": "", "point": "", "codebs": "" },
    { "code": "SCRAMBLE", "group": "FOCUS", "icon": "medall-fame", "point": "", "codebs": "" },
    { "code": "KWAR", "group": "FOCUS", "icon": "medall-fame", "point": "", "codebs": "" },
    { "code": "CUMULUS", "group": "FOCUS", "icon": "purified-crystal", "point": "", "codebs": "" },

    { "code": "BSBUILD", "group": "BS", "icon": "skill-badge", "point": "", "codebs": "BUILD" },
    { "code": "BSHERO", "group": "BS", "icon": "skill-badge", "point": "", "codebs": "HEROE" },
    { "code": "BSRAVEN", "group": "BS", "icon": "skill-badge", "point": "", "codebs": "RAVEN" },
    { "code": "BSSOLDIER", "group": "BS", "icon": "skill-badge", "point": "", "codebs": "SOLDIER" },
    { "code": "BSTECH", "group": "BS", "icon": "skill-badge", "point": "", "codebs": "TECH" },

    { "code": "OFFBUILD", "group": "BS", "icon": "lock", "point": "", "codebs": "BUILD" },
    { "code": "OFFHERO", "group": "BS", "icon": "lock", "point": "", "codebs": "HEROE" },
    { "code": "OFFRAVEN", "group": "BS", "icon": "lock", "point": "", "codebs": "RAVEN" },
    { "code": "OFFSOLDIER", "group": "BS", "icon": "lock", "point": "", "codebs": "SOLDIER" },
    { "code": "OFFTECH", "group": "BS", "icon": "lock", "point": "", "codebs": "TECH" },

    { "code": "DEMONW", "group": "BS", "icon": "blight-king-demon", "point": "", "codebs": "" },
    { "code": "DEMONR", "group": "BS", "icon": "blight-king-demon", "point": "", "codebs": "" },
    { "code": "DEMONZ", "group": "BS", "icon": "blight-king-demon", "point": "", "codebs": "" },
  ];

  var EVENT_CODE = [
    { "event": "DY",  "es": "Consejo Diario",        "en": "Tips Daily",          "view":1 },

    { "event": "ROY", "es": "Alboroto Ciudad Real",  "en": "Scramble Royal City", "view":2 },
    { "event": "KVK", "es": "Guerra de Reinos",      "en": "Kingdoms War",        "view":3 },

    { "event": "AD",  "es": "Duelo de Alianza",      "en": "Alliance Duel",       "view":4 },

    { "event": "EQ",  "es": "Mejora de Equipo",      "en": "Gear Upgrade",        "view":5 },
    { "event": "BEX", "es": "Batalla del Elixir",    "en": "Elixir Scramble",     "view":6 },
    { "event": "CUM", "es": "Valle Cúmulos de Cristal", "en": "Cristal Cruster Valley" , "view":7 },

    { "event": "BS",  "es": "Batalla Supervivencia", "en": "Battle Survival",     "view":8 },
  ];

  var PHASES = [
    { "phase": "P00", "desc": "Phase 0 : Preparation" },
    { "phase": "P01", "desc": "Phase 1 : Enhance Raven" },
    { "phase": "P02", "desc": "Phase 2 : Territory Development" },
    { "phase": "P03", "desc": "Phase 3 : Tech Research" },
    { "phase": "P04", "desc": "Phase 4 : Hero Growth" },
    { "phase": "P05", "desc": "Phase 5 : War Preparation" },
    { "phase": "P06", "desc": "Phase 6 : Raid the Enemy" }
  ];

  var DAILY = [
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "ANTX", "server_time": "" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "FALCON", "server_time": "", "flag": "S" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "RAVESS", "server_time": "" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "RAVFRT", "server_time": "" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "STMN", "server_time": "", "ani": "S" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "EPIUR", "server_time": "" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "HERBS", "server_time": "" },

    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "FREETH", "server_time": "" },
    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "SAVETS", "server_time": "" },
    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "DYSOLDIER", "server_time": "" },
    
    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "DEMONZ", "server_time": "" },

    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "TCKSUR", "server_time": "" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "CON1SP", "server_time": "", "ani": "S" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "CONMGH", "server_time": "", "ani": "S" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "CRVNUR", "server_time": "", "flag": "W" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "OPENUR", "server_time": "", "flag": "W" },

    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DYFALCON", "server_time": "", "flag": "A" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DYELITE", "server_time": "" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "FREETH", "server_time": "" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DYSOLDIER", "server_time": "" },

    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DEMONR", "server_time": "" },

    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "RAVCH1", "server_time": "" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "STDSCR", "server_time": "" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "TCH1SP", "server_time": "", "ani": "S" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "TCHMGH", "server_time": "", "ani": "S" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "FALCON", "server_time": "", "flag": "S" },

    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "SAVETH", "server_time": "" },
    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "FREETS", "server_time": "" },
    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "DYSOLDIER", "server_time": "" },

    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "DEMONW", "server_time": "" },

    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "TCKHER", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "ANTX", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SHRDSR", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SHRDSS", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SHRDUR", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SKILLB", "server_time": "" },

    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYFALCON", "server_time": "", "flag": "A" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYELITE", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "FREETS", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYBOTWAR", "server_time": "" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYSOLDIER", "server_time": "" },
    
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DEMONZ", "server_time": "" },

    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "SOLDT10", "server_time": "", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "SOLD1TRN", "server_time": "", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "FALCON", "server_time": "", "flag": "S" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "CON1SP", "server_time": "", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "CONMGH", "server_time": "", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "TCH1SP", "server_time": "", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "TCHMGH", "server_time": "", "ani": "S" },

    { "noday": 5, "day": "Fri", "event": "ROY", "phase": "PH05", "code_task": "SCRAMBLE", "server_time": "12:00:00", "server_duration": "02:00:00", "flag": "A", "ani": "A" },
    { "noday": 5, "day": "Fri", "event": "BEX", "phase": "PH05", "code_task": "ELIXIR", "server_time": "09:00:00", "server_duration": "00:30:00", "flag": "I", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "BEX", "phase": "PH05", "code_task": "ELIXIR", "server_time": "18:00:00", "server_duration": "00:30:00", "flag": "I", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "BEX", "phase": "PH05", "code_task": "ELIXIR", "server_time": "22:00:00", "server_duration": "00:30:00", "flag": "I", "ani": "S" },
    { "noday": 5, "day": "Fri", "event": "DY", "phase": "PH05", "code_task": "FREETH", "server_time": "" },
    { "noday": 5, "day": "Fri", "event": "DY", "phase": "PH05", "code_task": "FREETS", "server_time": "" },
    { "noday": 5, "day": "Fri", "event": "DY", "phase": "PH05", "code_task": "DYBOTWAR", "server_time": "" },
    { "noday": 5, "day": "Fri", "event": "DY", "phase": "PH05", "code_task": "DYHOSPITAL", "server_time": "", "flag": "W" },
    
    { "noday": 5, "day": "Fri", "event": "DY", "phase": "PH05", "code_task": "DEMONR", "server_time": "" },

    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "CON1SP", "server_time": "", "ani": "S" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "TCH1SP", "server_time": "", "ani": "S" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLD1TRN", "server_time": "", "ani": "S" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "HEA1SP", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLDDFT", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLDLST", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLDMTC", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "CRVNUR", "server_time": "", "flag": "W" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "OPENUR", "server_time": "", "flag": "W" },

    { "noday": 6, "day": "Sat", "event": "EQ", "phase": "PH06", "code_task": "EQGEAR", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "EQ", "phase": "PH06", "code_task": "EQBPRN", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "FREETH", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "FREETS", "server_time": "" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "SHIELD", "server_time": "00:00:00", "server_duration": "23:00:00", "flag": "W", "ani": "S" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "DYWALL", "server_time": "00:00:00", "server_duration": "23:00:00", "flag": "W", "ani": "S" },

    { "noday": 6, "day": "Sat", "event": "KVK", "phase": "PH06", "code_task": "KWAR", "server_time": "12:00:00", "server_duration": "02:00:00", "flag": "A", "ani": "A" },

    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "DEMONW", "server_time": "" },

    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYFALCON", "server_time": "", "flag": "A" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYELITE", "server_time": "" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYBOTT", "server_time": "" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYHERBS", "server_time": "16:30:00", "server_duration": "08:00:00" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "FREETH", "server_time": "" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "SAVETS", "server_time": "" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYSOLDIER", "server_time": "" },

    { "noday": 0, "day": "Sun", "event": "EQ", "phase": "PH00", "code_task": "EQGEAR", "server_time": "" },
    { "noday": 0, "day": "Sun", "event": "EQ", "phase": "PH00", "code_task": "EQBPRN", "server_time": "" },

    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time": "02:00:00", "server_duration": "00:30:00", "ani": "S" },
    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time": "09:00:00", "server_duration": "00:30:00", "ani": "S" },
    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time": "18:00:00", "server_duration": "00:30:00", "ani": "S" },
    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time": "23:00:00", "server_duration": "00:30:00", "ani": "S" },
  ];

  /* ---------- Utilidades compartidas ---------- */

  var SRC_TO_UTC_MS = 2 * 3600 * 1000;
  var FALLBACK_LANG = "en";
  var WEEK_SECONDS = 604800;
  var DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  /* Ventana de aviso del cierre del proximo dia: 1 hora. */
  var ALERT_WINDOW_SEC = 3600;

  /* El idioma lo resuelve js/app.js y lo publica en <html data-lang>. */
  function resolveLang() {
    var attr = document.documentElement.getAttribute("data-lang");
    if (attr && window.I18N[attr]) return attr;
    var m = /[?&]lang=([a-zA-Z]{2})/.exec(window.location.search);
    if (m && window.I18N[m[1].toLowerCase()]) return m[1].toLowerCase();
    return FALLBACK_LANG;
  }

  var LANG = resolveLang();
  var T = window.I18N[LANG] || window.I18N[FALLBACK_LANG];
  var T_EN = window.I18N[FALLBACK_LANG] || T;
  var T_ES = window.I18N.es || T;

  function byId(id) { return document.getElementById(id); }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Puntos referenciales ----------
     El valor vive en ACTIVITY_CODE.point y se almacena sin separadores.
     Se muestra con el signo "+", un decimal y el separador de miles "'"
     agregado solo al renderizar. Cuando la actividad no declara un
     valor numerico no se muestra nada. */
  function formatPoint(value) {
    if (value === undefined || value === null) return "";
    var raw = String(value).trim();
    if (!raw) return "";
    if (!/^[+-]?\d+(\.\d+)?$/.test(raw)) return "";
    var num = Number(raw);
    if (!Number.isFinite(num)) return "";
    var sign = num < 0 ? "-" : "+";
    var parts = Math.abs(num).toFixed(1).split(".");
    /* El separador de miles se aplica a la parte entera. */
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    return sign + parts.join(".");
  }

  function appendCell(tr, text, cls) {
    var td = document.createElement("td");
    if (cls) td.className = cls;
    td.textContent = text;
    tr.appendChild(td);
    return td;
  }

  function fmtCounter(sec) {
    return pad(Math.floor(sec / 3600)) + ":" + pad(Math.floor((sec % 3600) / 60)) + ":" + pad(sec % 60);
  }

  function nowSecondsSrc() {
    var d = new Date(Date.now() - SRC_TO_UTC_MS);
    return d.getUTCDay() * 86400 + d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
  }

  function tzLabel() {
    var off = -new Date(Date.now()).getTimezoneOffset() / 60;
    var h = Math.floor(Math.abs(off));
    var m = Math.round((Math.abs(off) - h) * 60);
    return "GMT" + (off < 0 ? "-" : "+") + h + (m ? ":" + pad(m) : "");
  }

  function tzName() {
    try {
      return (typeof Intl !== "undefined" && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || "";
    } catch (e) {
      return "";
    }
  }

  var TZ_NAME = tzName();

  /* Muestra la hora local y la zona horaria del visitante. */
  function renderTzInfo(el) {
    var d = new Date(Date.now());
    var txt = "Local Time " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + " [" + tzLabel();
    if (TZ_NAME) txt += " · " + TZ_NAME;
    el.textContent = txt + "]";
  }

  /* ---------- Calendario de Batalla de Supervivencia ---------- */

  function initBattleSurvival() {
    var tbody = byId("bs-body");
    var tzInfoEl = byId("bs-tzinfo");
    if (!tbody || !tzInfoEl) return null;

    var HEADERS = ["bs-th-counter", "bs-th-status", "bs-th-event", "bs-th-activities", "bs-th-server"];

    var actMap = {};
    ACTIVITIES.forEach(function (a) { actMap[a.codebs] = a; });

    var slots = CALENDAR.map(function (c) {
      var p = c.time_init.split(":");
      /* El nombre del evento se localiza con bsEvents; el valor ingles
         de ACTIVITIES.event queda como respaldo. */
      var events = T.bsEvents || {};
      return {
        noday: c.noday,
        sec: c.noday * 86400 + (+p[0]) * 3600 + (+p[1]) * 60 + (+p[2]),
        event: events[c.codebs] || actMap[c.codebs].event,
        act1: actMap[c.codebs].activity_2,
        act2: actMap[c.codebs].activity_1,
        /* Los resaltados dependen del codigo, no del texto traducido. */
        hlSpecial: c.codebs === "SOLDIER",
        hlTrack: c.codebs === "RAVEN" || c.codebs === "HEROE" || c.codebs === "SOLDIER"
      };
    });
    slots.sort(function (a, b) { return a.sec - b.sec; });

    var lastSecByDay = {};
    slots.forEach(function (s) {
      if (lastSecByDay[s.noday] === undefined || s.sec > lastSecByDay[s.noday]) lastSecByDay[s.noday] = s.sec;
    });
    slots.forEach(function (s) { s.dayEnd = s.sec === lastSecByDay[s.noday]; });

    function weekStartMs() {
      var s = new Date(Date.now() - SRC_TO_UTC_MS);
      return Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate() - s.getUTCDay()) + SRC_TO_UTC_MS;
    }

    function currentIndex(sec) {
      if (sec < slots[0].sec) return -1;
      var idx = 0;
      for (var i = 0; i < slots.length; i++) {
        if (slots[i].sec <= sec) idx = i; else break;
      }
      return idx;
    }

    var counters = [];
    var lastIdx = -2;

    HEADERS.forEach(function (id, i) {
      var cell = byId(id);
      if (cell) cell.textContent = T.bsHeaders[i];
    });

    function appendActivitiesCell(tr, act1, act2, hlTrack) {
      var td = document.createElement("td");
      td.className = "bs-activities";
      var d1 = document.createElement("span");
      d1.className = "bs-act-line bs-act1" + (hlTrack ? " bs-hl-track" : "");
      d1.textContent = act1;
      var d2 = document.createElement("span");
      d2.className = "bs-act-line bs-act2";
      d2.textContent = act2;
      td.appendChild(d1);
      td.appendChild(d2);
      tr.appendChild(td);
      return td;
    }

    function buildRows(idx) {
      counters = [];
      tbody.innerHTML = "";
      var n = slots.length;
      var weekStart = weekStartMs();

      for (var rel = -1; rel <= 7; rel++) {
        var u = idx + rel;
        var slot = slots[((u % n) + n) % n];
        var uSec = slot.sec + Math.floor(u / n) * WEEK_SECONDS;
        var loc = new Date(weekStart + uSec * 1000);
        var tr = document.createElement("tr");
        tr.className = (rel === -1 ? "bs-past" : rel === 0 ? "bs-current" : "bs-next") + (slot.dayEnd ? " bs-dayend" : "") + (rel === 1 ? " bs-row-third" : "");
        /* La proxima actividad (tercera de la tabla) siempre se resalta en su
           contador, con independencia del evento que tenga asignado. */
        var counterSpecial = rel === 1 || (rel > 0 && slot.hlSpecial);
        var td = appendCell(tr, rel === -1 ? "--:--:--" : "", "bs-counter" + (counterSpecial ? " bs-hl-special" : ""));
        if (rel === 0) counters.push({ tr: tr, td: td, startSec: uSec, elapsed: true, prefix: "+ " });
        else if (rel > 0) {
          counters.push({ tr: tr, td: td, targetSec: uSec, prefix: "T- ", alert: rel === 1 });
        }
        appendCell(tr, rel === -1 ? T.bsPast : rel === 0 ? T.bsCurrent : rel === 1 ? T.bsNext : "", "bs-status" + (rel > 0 && slot.hlSpecial ? " bs-hl-special" : ""));
        appendCell(tr, slot.event, "bs-event" + (rel > 0 && slot.hlSpecial ? " bs-hl-special" : ""));
        appendActivitiesCell(tr, slot.act1, slot.act2, rel > 0 && slot.hlTrack);
        appendCell(tr, DAY_ABBR[loc.getDay()] + " " + pad(loc.getHours()) + ":" + pad(loc.getMinutes()), "bs-server");
        tbody.appendChild(tr);
      }
    }

    function tick() {
      var sec = nowSecondsSrc();
      var idx = currentIndex(sec);
      if (idx !== lastIdx) {
        lastIdx = idx;
        buildRows(idx);
      }
      for (var i = 0; i < counters.length; i++) {
        var c = counters[i];
        if (c.elapsed) {
          c.td.textContent = c.prefix + fmtCounter(sec - c.startSec);
          continue;
        }
        var remaining = c.targetSec - sec;
        c.td.textContent = c.prefix + fmtCounter(remaining);
        /* Aviso visual: la proxima actividad esta por comenzar. La clase se
           aplica a la fila para marcar Contador, Estado y Evento a la vez. */
        c.tr.classList.toggle("bs-imminent", !!c.alert && remaining > 0 && remaining <= ALERT_WINDOW_SEC);
      }
      renderTzInfo(tzInfoEl);
    }

    tick();
    return tick;
  }

  /* ---------- Calendario de Duelo de Alianzas ---------- */

  function initAllianceDuel() {
    var listsEl = byId("ad-lists");
    if (!listsEl) return null;

    var NO_PHASE_TITLE = "Daily & Equipment";

    var actMap = {};
    ACTIVITY_CODE.forEach(function (a) { actMap[a.code] = a; });

    /* Agrupa los horarios de Battle Survival por codigo para enlazar tareas. */
    var slotsByCodebs = {};
    var slotsByDay = [];
    CALENDAR.forEach(function (c) {
      var p = c.time_init.split(":");
      var sec = (+p[0]) * 3600 + (+p[1]) * 60 + (+p[2]);
      if (!slotsByCodebs[c.codebs]) slotsByCodebs[c.codebs] = [];
      slotsByCodebs[c.codebs].push({ noday: c.noday, sec: sec });
      if (!slotsByDay[c.noday]) slotsByDay[c.noday] = [];
      slotsByDay[c.noday].push({ codebs: c.codebs, sec: sec });
    });
    Object.keys(slotsByCodebs).forEach(function (codebs) {
      slotsByCodebs[codebs].sort(function (a, b) { return a.sec - b.sec; });
    });
    slotsByDay.forEach(function (daySlots) {
      daySlots.sort(function (a, b) { return a.sec - b.sec; });
    });

    var evMap = {};
    EVENT_CODE.forEach(function (e) { evMap[e.event] = e; });

    var phaseMap = {};
    PHASES.forEach(function (p) { phaseMap[p.phase] = p.desc; });

    /* ---------- Traducciones de actividades, fases y eventos ---------- */
    /* Los mapas viven en js/i18n/actividades-diarias/i18n.js. El español es
       la fuente de verdad y el ingles actua como respaldo cuando una
       traduccion no esta disponible. */

    function activityText(code, field) {
      var localized = T.adActivities && T.adActivities[code];
      if (localized && typeof localized[field] === "string") return localized[field];
      var fallback = T_EN.adActivities && T_EN.adActivities[code];
      if (fallback && typeof fallback[field] === "string") return fallback[field];
      var canonical = T_ES.adActivities && T_ES.adActivities[code];
      return canonical && typeof canonical[field] === "string" ? canonical[field] : "";
    }

    function phaseText(phase) {
      var localized = T.adPhases && T.adPhases[phase];
      if (localized) return localized;
      var fallback = T_EN.adPhases && T_EN.adPhases[phase];
      if (fallback) return fallback;
      return phaseMap[phase] || phase;
    }

    function normPhase(p) { return p ? p.replace(/^PH/, "P") : ""; }

    var byDay = {};
    var dayPhase = {};
    DAILY.forEach(function (r) {
      if (!byDay[r.noday]) byDay[r.noday] = [];
      byDay[r.noday].push(r);
      if (dayPhase[r.noday] === undefined) {
        var ph = normPhase(r.phase);
        if (ph) dayPhase[r.noday] = ph;
      }
    });

    var lastDay = -1;
    var counters = [];
    var currentPhaseEl = null;
    /* Segundo cuerpo de tabla del dia actual: aloja el grupo Battle
       Survival, separado de las tareas normales. */
    var battleBodyEl = null;

    function phaseTitle(noday) {
      var ph = dayPhase[noday];
      return ph ? phaseText(ph) : NO_PHASE_TITLE;
    }

    /* Cada fase termina a las 00:00:00 UTC-2 del dia siguiente. */
    function phaseCountdown(nowSec) {
      var remaining = 86400 - nowSec;
      if (remaining <= 0) remaining = 0;
      return "T-" + fmtCounter(remaining);
    }

    function resetTitle(resetMs) {
      var reset = new Date(resetMs);
      return pad(reset.getUTCFullYear()) + "." + pad(reset.getMonth() + 1) + "." + pad(reset.getDate()) + " " +
        pad(reset.getHours()) + ":" + pad(reset.getMinutes());
    }

    function eventLabel(r) {
      var localized = T.adEvents && T.adEvents[r.event];
      if (localized) return localized;
      var fallback = T_EN.adEvents && T_EN.adEvents[r.event];
      if (fallback) return fallback;
      var ev = evMap[r.event];
      return ev ? (ev[LANG] || ev.en || r.event) : r.event;
    }

    /* Orden de visualizacion de los grupos de eventos. La fuente de
       verdad es el valor view de EVENT_CODE: cada grupo ocupa un cuerpo de
       tabla propio y se muestra en orden ascendente de view. */
    var orderedEvents = EVENT_CODE.slice().sort(function (a, b) {
      return a.view - b.view;
    });

    /* Agrupa las actividades de un dia por evento, conservando el orden
       original de las actividades dentro de cada grupo. */
    function groupRowsByEvent(rows) {
      var groups = {};
      rows.forEach(function (r) {
        if (!groups[r.event]) groups[r.event] = [];
        groups[r.event].push(r);
      });
      return groups;
    }

    function parseClock(value) {
      if (!value) return null;
      var p = String(value).split(":");
      if (p.length !== 3) return null;
      var h = +p[0];
      var m = +p[1];
      var s = +p[2];
      if (isNaN(h) || isNaN(m) || isNaN(s)) return null;
      if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) return null;
      return h * 3600 + m * 60 + s;
    }

    /* ---------- Estados del contador ----------
       Cada tarea define su contador con una hora propia del servidor
       (server_time) o con un vinculo a un horario de Battle Survival
       (codebs). El estado resultante es uno de estos:

         off       la tarea no define ni vincula contador; la celda queda vacia.
         countdown la tarea tiene hora asignada y cuenta el tiempo restante.
         progress  la tarea tiene hora asignada y cuenta el tiempo transcurrido.
         finished  la tarea cumplio su duracion; la celda muestra --:--:--.

       Las tablas de dias futuros no calculan contadores: muestran la fecha
       MM/DD de la tarea y quedan en estado normal. */

    var STATE_OFF = "off";
    var STATE_COUNTDOWN = "countdown";
    var STATE_PROGRESS = "progress";
    var STATE_FINISHED = "finished";
    var STATE_NORMAL = "normal";

    var FINISHED_LABEL = "--:--:--";
    /* Duracion predeterminada de una tarea vinculada a Battle Survival. */
    var LINKED_DEFAULT_DURATION = 4 * 3600;

    /* Estado del contador para una tarea con hora propia del servidor. */
    function serverCounterState(serverTime, serverDuration, nowSec) {
      var startSec = parseClock(serverTime);
      if (startSec === null) return { state: STATE_OFF, text: "" };
      var durationSec = parseClock(serverDuration);
      if (durationSec === null) durationSec = 0;
      var endSec = startSec + durationSec;
      if (nowSec < startSec) {
        return { state: STATE_COUNTDOWN, text: "T-" + fmtCounter(startSec - nowSec) };
      }
      if (nowSec < endSec) {
        return { state: STATE_PROGRESS, text: "+ " + fmtCounter(nowSec - startSec) };
      }
      return { state: STATE_FINISHED, text: FINISHED_LABEL };
    }

    /* Estado del contador para una tarea vinculada a un horario de Battle
       Survival. Cada horario dura hasta el siguiente horario del dia. */
    function linkedCounterState(codebs, noday, nowSec) {
      var allDaySlots = slotsByDay[noday] || [];
      var codebsSlots = slotsByCodebs[codebs] || [];
      var currentSlot = null;
      var nextSlot = null;

      for (var s = 0; s < allDaySlots.length; s++) {
        /* Cada horario permanece activo hasta el siguiente horario del dia,
           aunque el siguiente evento tenga otro codigo. */
        var endSec = s + 1 < allDaySlots.length ? allDaySlots[s + 1].sec : 86400;
        if (allDaySlots[s].codebs === codebs && nowSec >= allDaySlots[s].sec && nowSec < endSec) {
          currentSlot = allDaySlots[s];
          break;
        }
      }

      for (var c = 0; c < codebsSlots.length; c++) {
        if (codebsSlots[c].noday === noday && codebsSlots[c].sec > nowSec) {
          nextSlot = codebsSlots[c];
          break;
        }
      }

      if (currentSlot) {
        var elapsed = nowSec - currentSlot.sec;
        /* La duracion predeterminada de una tarea vinculada es de 4 horas. */
        if (elapsed >= LINKED_DEFAULT_DURATION) {
          return { state: STATE_FINISHED, text: FINISHED_LABEL, remainingSec: 0 };
        }
        return {
          state: STATE_PROGRESS,
          text: "+" + fmtCounter(elapsed),
          remainingSec: LINKED_DEFAULT_DURATION - elapsed
        };
      }
      if (nextSlot) {
        return { state: STATE_COUNTDOWN, text: "T-" + fmtCounter(nextSlot.sec - nowSec) };
      }
      return { state: STATE_FINISHED, text: FINISHED_LABEL };
    }

    /* Aplica las clases de estado del contador a la fila. */
    function applyCounterState(tr, state) {
      tr.classList.toggle("ad-state-countdown", state === STATE_COUNTDOWN);
      tr.classList.toggle("ad-state-progress", state === STATE_PROGRESS);
      tr.classList.toggle("ad-state-normal", state !== STATE_COUNTDOWN && state !== STATE_PROGRESS);
    }

    /* Fecha MM/DD de la tabla para las tareas de dias futuros. */
    function dayDateLabel(startDayMs, offset) {
      var loc = new Date(startDayMs + offset * 86400000);
      return pad(loc.getUTCMonth() + 1) + "/" + pad(loc.getUTCDate());
    }

    /* ---------- Actividades de Batalla de Supervivencia (codigos BS...) ----------
       Las actividades cuyo codigo comienza con "BS" describen la franja de
       Battle Survival en curso. Se muestran unicamente en la tabla del dia
       actual y su contador es el del horario vinculado, en estado
       [PROGRESS].

       Las actividades cuyo codigo comienza con "OFF" representan la
       oportunidad siguiente de cada tipo de Battle Survival. Se muestran
       las dos siguientes a la actividad en curso, en orden cronologico,
       con un contador unicamente en estado [COUNTDOWN]. La fila completa
       recibe la clase ad-off-task, que marca las celdas Tarea, Recurso y
       Evento con el aspecto de actividad proxima.

       El grupo Battle Survival muestra siempre cuatro filas: la actividad
       BS en curso y las tres OFF siguientes. No hay filas ocultas: cuando
       cambia la franja en curso, JavaScript sobrescribe el contenido de
       esas cuatro filas. */

    var BS_CODE_PREFIX = "BS";
    var OFF_CODE_PREFIX = "OFF";
    /* Simbolo de estrella de habilidad, pintado en rojo en estas tareas. */
    var BS_STAR = "★";
    /* Clase de fila que marca la actividad como proxima, todavia no activa. */
    var OFF_TASK_CLASS = "ad-off-task";
    /* Cantidad de actividades OFF que se muestran bajo la actividad en
       curso. Con la actividad BS en curso, el grupo muestra cuatro filas. */
    var OFF_VISIBLE_COUNT = 4;

    var bsActivities = ACTIVITY_CODE.filter(function (a) {
      return a.code.indexOf(BS_CODE_PREFIX) === 0;
    });

    var offActivities = ACTIVITY_CODE.filter(function (a) {
      return a.code.indexOf(OFF_CODE_PREFIX) === 0;
    });

    /* Actividad BS asociada a cada codigo de horario de Battle Survival. */
    var bsByCodebs = {};
    bsActivities.forEach(function (a) {
      if (a.codebs) bsByCodebs[a.codebs] = a;
    });

    /* Actividad OFF asociada a cada codigo de horario de Battle Survival. */
    var offByCodebs = {};
    offActivities.forEach(function (a) {
      if (a.codebs) offByCodebs[a.codebs] = a;
    });

    /* Horarios de Battle Survival ordenados dentro de la semana, con el
       instante semanal de inicio de cada franja. */
    var bsSchedule = CALENDAR.map(function (c) {
      var p = c.time_init.split(":");
      var sec = (+p[0]) * 3600 + (+p[1]) * 60 + (+p[2]);
      return {
        noday: c.noday,
        codebs: c.codebs,
        sec: sec,
        weekSec: c.noday * 86400 + sec
      };
    }).sort(function (a, b) { return a.weekSec - b.weekSec; });

    /* Indice de la franja de Battle Survival en curso para el instante dado,
       expresado en segundos dentro de la semana (UTC-2). */
    function currentScheduleIndex(weekSec) {
      var idx = 0;
      for (var i = 0; i < bsSchedule.length; i++) {
        if (bsSchedule[i].weekSec <= weekSec) idx = i; else break;
      }
      return idx;
    }

    /* Devuelve las siguientes franjas de Battle Survival despues de la que
       esta en curso, con el instante de inicio relativo al dia actual. */
    function nextScheduleSlots(noday, nowSec, count) {
      var weekSec = noday * 86400 + nowSec;
      var idx = currentScheduleIndex(weekSec);
      var result = [];
      for (var i = 1; i <= count; i++) {
        var pos = idx + i;
        var slot = bsSchedule[pos % bsSchedule.length];
        var cycles = Math.floor(pos / bsSchedule.length);
        /* El instante se expresa en segundos desde las 00:00:00 del dia
           actual, de modo que el contador desciende correctamente al cruzar
           la medianoche o el cambio de semana. */
        result.push({
          codebs: slot.codebs,
          startSec: slot.weekSec + cycles * WEEK_SECONDS - noday * 86400
        });
      }
      return result;
    }

    /* Fila de actividad BS para el dia actual. */
    function bsRow(a, noday) {
      return {
        noday: noday,
        day: DAY_ABBR[noday],
        event: "BS",
        phase: "",
        code_task: a.code,
        server_time: "",
        isBs: true
      };
    }

    /* Estado de la franja de Battle Survival en curso. Se usa para saber
       cuando las actividades OFF deben avanzar a las siguientes franjas. */
    var currentSlotIndex = -1;
    var currentSlotNoday = -1;

    /* Devuelve el indice de la franja en curso para el dia y la hora dados. */
    function slotIndexAt(noday, nowSec) {
      return currentScheduleIndex(noday * 86400 + nowSec);
    }

    /* Fila de actividad OFF: la oportunidad siguiente de un horario de
       Battle Survival, con su instante de inicio. El aspecto de actividad
       proxima se aplica a la fila completa mediante la clase de fila. */
    function offRow(a, noday, startSec) {
      return {
        noday: noday,
        day: DAY_ABBR[noday],
        event: "BS",
        phase: "",
        code_task: a.code,
        server_time: "",
        isOff: true,
        startSec: startSec
      };
    }

    /* Reconstruye el texto de la tarea separando cada estrella para poder
       colorearla. Solo se usa en las actividades de Battle Survival. */
    function appendStars(cell, text) {
      if (!text || text.indexOf(BS_STAR) < 0) return;
      cell.textContent = "";
      var parts = String(text).split(BS_STAR);
      for (var i = 0; i < parts.length; i++) {
        if (parts[i]) {
          var textEl = document.createElement("span");
          textEl.className = "ad-task-text";
          textEl.textContent = parts[i];
          cell.appendChild(textEl);
        }
        if (i < parts.length - 1) {
          var star = document.createElement("span");
          star.className = "ad-bs-star";
          star.textContent = BS_STAR;
          cell.appendChild(star);
        }
      }
    }

    function buildRow(r, offset, startDayMs, nowSec) {
      var tr = document.createElement("tr");
      var timeTxt = "";
      var state = STATE_OFF;
      var a = actMap[r.code_task];
      var codebs = a && a.codebs;
      var timeCell = null;
      var flag = r.flag ? String(r.flag).toLowerCase() : "";
      var ani = r.ani ? String(r.ani).toLowerCase() : "";
      var hasSchedule = !!r.server_time || !!codebs;

      if (offset === 0 && r.isOff) {
        /* Las actividades OFF muestran solo la cuenta regresiva hasta el
           inicio de su franja, sin tiempo transcurrido ni restante. */
        var remaining = r.startSec - nowSec;
        if (remaining < 0) remaining = 0;
        state = STATE_COUNTDOWN;
        timeTxt = "T-" + fmtCounter(remaining);
        timeCell = appendCell(tr, timeTxt, "ad-time");
        counters.push({ td: timeCell, tr: tr, offStartSec: r.startSec });
      } else if (offset === 0 && r.server_time) {
        /* El dia actual usa la hora propia del servidor y su duracion. */
        var own = serverCounterState(r.server_time, r.server_duration, nowSec);
        state = own.state;
        timeTxt = own.text;
        timeCell = appendCell(tr, timeTxt, "ad-time");
        counters.push({
          td: timeCell, tr: tr, serverTime: r.server_time, serverDuration: r.server_duration
        });
      } else if (offset === 0 && codebs) {
        /* El dia actual muestra el contador del horario vinculado. */
        var linked = linkedCounterState(codebs, r.noday, nowSec);
        state = linked.state;
        timeTxt = linked.text;
        if (r.isBs) {
          /* Las actividades BS muestran el contador y, debajo, el tiempo
             restante de la duracion de cuatro horas. */
          timeCell = appendCell(tr, "", "ad-time");
          var elapsedEl = document.createElement("span");
          elapsedEl.className = "ad-bs-elapsed";
          elapsedEl.textContent = timeTxt;
          timeCell.appendChild(elapsedEl);
          var remainingEl = document.createElement("span");
          remainingEl.className = "ad-bs-remaining";
          remainingEl.textContent = linked.state === STATE_PROGRESS ? fmtCounter(linked.remainingSec) : "";
          timeCell.appendChild(remainingEl);
          counters.push({
            td: timeCell, tr: tr, codebs: codebs, noday: r.noday, isBs: true,
            elapsedEl: elapsedEl, remainingEl: remainingEl
          });
        } else {
          timeCell = appendCell(tr, timeTxt, "ad-time");
          counters.push({ td: timeCell, tr: tr, codebs: codebs, noday: r.noday });
        }
      } else if (offset > 0 && hasSchedule) {
        /* Los dias futuros muestran la fecha de la tarea, sin contadores. */
        state = STATE_NORMAL;
        timeTxt = dayDateLabel(startDayMs, offset);
      }

      /* 1. Contador */
      if (!timeCell) timeCell = appendCell(tr, timeTxt, "ad-time");
      applyCounterState(tr, state);

      /* 2. Imagen de referencia de la tarea. */
      appendIconCell(tr, "ad-task-icon", r.code_task);

      /* 3. Tarea: el indicador flag solo afecta a esta columna. */
      var objectiveText = a ? (activityText(r.code_task, "objective") || r.code_task) : r.code_task;
      var taskCell = appendCell(tr, objectiveText, "ad-objective");
      if (flag) taskCell.classList.add("ad-task-flag-" + flag);
      /* Las actividades OFF marcan la fila completa como proxima. */
      if (r.isOff) tr.classList.add(OFF_TASK_CLASS);
      /* En las actividades BS la estrella de habilidad se pinta en rojo. */
      if (r.isBs) appendStars(taskCell, objectiveText);

      /* 4. Puntos: valor referencial de la actividad, al final del texto
         de la columna Tarea y en la posicion inferior izquierda. */
      var pointText = a ? formatPoint(a.point) : "";
      if (pointText) {
        var pointEl = document.createElement("span");
        pointEl.className = "ad-task-point";
        pointEl.textContent = pointText;
        taskCell.appendChild(pointEl);
        taskCell.classList.add("ad-has-point");
      }

      /* 5. Recurso */
      appendCell(tr, a ? activityText(r.code_task, "resource") : "", "ad-resource");

      /* 6. Evento */
      appendCell(tr, eventLabel(r), "ad-event");

      /* La animacion del contador solo se aplica en la tabla del dia actual. */
      if (ani && offset === 0) timeCell.classList.add("ad-counter-ani-" + ani);

      return tr;
    }

    /* Celda reservada para la imagen de la tarea. */
    function appendIconCell(tr, cls, code) {
      var td = document.createElement("td");
      td.className = "ad-icon " + cls;
      td.setAttribute("data-code", code || "");

      var activity = actMap[code];
      if (cls === "ad-task-icon" && activity && activity.icon) {
        var img = document.createElement("img");
        img.src = "../media/glyph/" + encodeURIComponent(activity.icon) + ".png";
        img.alt = "";
        img.addEventListener("error", function () {
          img.style.display = "none";
        });
        td.appendChild(img);
      }

      tr.appendChild(td);
      return td;
    }

    /* Anchos compartidos: todas las tablas mantienen las mismas columnas. */
    var AD_COLUMNS = [
      "ad-col-time",
      "ad-col-icon",
      "ad-col-task",
      "ad-col-resource",
      "ad-col-event"
    ];

    function buildColGroup() {
      var colgroup = document.createElement("colgroup");
      for (var c = 0; c < AD_COLUMNS.length; c++) {
        var col = document.createElement("col");
        col.className = AD_COLUMNS[c];
        colgroup.appendChild(col);
      }
      return colgroup;
    }

    function build() {
      var origin = new Date(Date.now() - SRC_TO_UTC_MS);
      var today = origin.getUTCDay();
      lastDay = today;
      var startDayMs = Date.UTC(origin.getUTCFullYear(), origin.getUTCMonth(), origin.getUTCDate());
      var nowSec = origin.getUTCHours() * 3600 + origin.getUTCMinutes() * 60 + origin.getUTCSeconds();

      counters = [];
      currentPhaseEl = null;
      battleBodyEl = null;
      listsEl.innerHTML = "";

      for (var k = 0; k < 7; k++) {
        var noday = (today + k) % 7;

        var item = document.createElement("div");
        var baseCls = "ad-item" + (k === 0 ? " ad-today" : "");
        item.className = baseCls + (k <= 1 ? " ad-open" : "");

        var title = document.createElement("div");
        title.className = "ad-item-title";

        var phase = document.createElement("span");
        phase.className = "ad-title-phase";
        phase.textContent = phaseTitle(noday) + (k === 0 ? " .. " : "");
        if (k === 0) {
          /* El contador vive en su propio nodo para poder colorearlo
             por separado del resto del titulo y actualizarlo sin
             reconstruir el texto completo. */
          var phaseCounter = document.createElement("span");
          phaseCounter.className = "ad-countdown";
          phaseCounter.textContent = phaseCountdown(nowSec);
          phase.appendChild(phaseCounter);
          currentPhaseEl = phaseCounter;
        }
        title.appendChild(phase);

        /* Cada dia inicia a las 00:00:00 en UTC-2; se muestra ese reset
           convertido a la zona horaria del navegador. */
        var resetMs = startDayMs + k * 86400000 + SRC_TO_UTC_MS;
        var reset = document.createElement("span");
        reset.className = "ad-title-reset";
        reset.textContent = resetTitle(resetMs);
        title.appendChild(reset);

        var arrow = document.createElement("span");
        arrow.className = "ad-arrow";
        title.appendChild(arrow);

        item.appendChild(title);

        var body = document.createElement("div");
        body.className = "ad-item-body";
        var wrap = document.createElement("div");
        wrap.className = "ad-wrap";
        var table = document.createElement("table");
        table.className = "ad-schedule";
        table.appendChild(buildColGroup());

        var thead = document.createElement("thead");
        var trh = document.createElement("tr");
        for (var c = 0; c < T.adHeaders.length; c++) {
          var th = document.createElement("th");
          th.textContent = T.adHeaders[c];
          trh.appendChild(th);
        }
        thead.appendChild(trh);
        table.appendChild(thead);

        /* Cada grupo de eventos ocupa un cuerpo de tabla propio. El
           orden de los cuerpos lo define el valor view de EVENT_CODE. */
        var groups = groupRowsByEvent(byDay[noday] || []);
        var bodies = [];

        orderedEvents.forEach(function (ev) {
          var eventRows = groups[ev.event] || [];

          /* Battle Survival solo tiene cuerpo en la tabla del dia actual
             y sus actividades se escriben despues, en buildBattleTaskRows(). */
          if (!eventRows.length && !(k === 0 && ev.event === "BS")) return;

          var body = document.createElement("tbody");
          body.className = "ad-event-body";
          body.setAttribute("data-event", ev.event);
          if (ev.event === "BS") {
            body.className += " ad-battle-body";
            battleBodyEl = body;
          }

          eventRows.forEach(function (r) {
            body.appendChild(buildRow(r, k, startDayMs, nowSec));
          });

          bodies.push(body);
        });

        /* El separador de eventos cierra cada grupo que tiene otro grupo
           detras. Se asigna al final, cuando ya se conocen todos los
           cuerpos de la tabla. */
        bodies.forEach(function (body, index) {
          if (index >= bodies.length - 1) return;
          if (!body.children.length) return;
          var lastRow = body.children[body.children.length - 1];
          lastRow.className += " ad-event-separator";
        });

        bodies.forEach(function (body) {
          table.appendChild(body);
        });

        wrap.appendChild(table);
        body.appendChild(wrap);
        item.appendChild(body);

        listsEl.appendChild(item);

        (function (itemEl, titleEl, base) {
          titleEl.addEventListener("click", function () {
            var isOpen = itemEl.className.indexOf("ad-open") >= 0;
            itemEl.className = base + (isOpen ? "" : " ad-open");
          });
        })(item, title, baseCls);
      }

      /* La franja en curso determina la actividad BS visible y las tres
         oportunidades OFF que se muestran bajo ella. */
      currentSlotNoday = today;
      currentSlotIndex = slotIndexAt(today, nowSec);
      buildBattleTaskRows(today, nowSec, startDayMs);
    }

    /* Escribe las cuatro filas del grupo Battle Survival en su contenedor
       propio: la actividad BS de la franja en curso, con su contador en
       estado [PROGRESS], y las tres actividades OFF consecutivas
       siguientes, con su contador en estado [COUNTDOWN] y el estilo de
       fila proxima.

       El contenedor se renueva por completo en cada cambio de franja, de
       modo que nunca quedan filas ni contadores obsoletos. */
    function buildBattleTaskRows(noday, nowSec, startDayMs) {
      var body = battleBodyEl;
      if (!body) return;

      /* Se calculan primero las actividades, para no dejar el grupo a medio
         escribir si alguna de ellas no estuviera definida. */
      var currentSlot = bsSchedule[slotIndexAt(noday, nowSec)];
      var currentAct = currentSlot ? bsByCodebs[currentSlot.codebs] : null;
      if (!currentAct) return;

      var nextSlots = nextScheduleSlots(noday, nowSec, OFF_VISIBLE_COUNT);
      var offActs = [];
      for (var s = 0; s < nextSlots.length; s++) {
        var offAct = offByCodebs[nextSlots[s].codebs];
        if (offAct) offActs.push({ activity: offAct, startSec: nextSlots[s].startSec });
      }

      /* Se retiran las filas anteriores del grupo y sus contadores. */
      while (body.children.length) {
        body.removeChild(body.children[0]);
      }
      counters = counters.filter(function (counter) {
        return !counter.isBs && counter.offStartSec === undefined;
      });

      /* La primera fila es la actividad BS de la franja en curso. */
      var bsRowEl = buildRow(bsRow(currentAct, noday), 0, startDayMs, nowSec);
      bsRowEl.classList.add("ad-bs-task");
      body.appendChild(bsRowEl);

      /* Las filas siguientes son las oportunidades OFF consecutivas. */
      for (var o = 0; o < offActs.length; o++) {
        var offRowEl = buildRow(
          offRow(offActs[o].activity, noday, offActs[o].startSec), 0, startDayMs, nowSec
        );
        offRowEl.classList.add("ad-bs-task");
        body.appendChild(offRowEl);
      }
    }

    function tick() {
      var origin = new Date(Date.now() - SRC_TO_UTC_MS);
      if (origin.getUTCDay() !== lastDay) {
        build();
        return;
      }

      var nowSec = origin.getUTCHours() * 3600 + origin.getUTCMinutes() * 60 + origin.getUTCSeconds();
      if (currentPhaseEl) {
        currentPhaseEl.textContent = phaseCountdown(nowSec);
      }

      /* Al cambiar de franja de Battle Survival el grupo se reescribe: la
         actividad BS en curso pasa a ser la anterior y las oportunidades
         OFF avanzan a las tres siguientes. */
      if (slotIndexAt(currentSlotNoday, nowSec) !== currentSlotIndex) {
        currentSlotIndex = slotIndexAt(currentSlotNoday, nowSec);
        buildBattleTaskRows(currentSlotNoday, nowSec, Date.UTC(
          origin.getUTCFullYear(), origin.getUTCMonth(), origin.getUTCDate()
        ));
      }

      for (var i = 0; i < counters.length; i++) {
        var counter = counters[i];
        var result;
        if (counter.offStartSec !== undefined) {
          /* Las actividades OFF muestran solo la cuenta regresiva. */
          var left = counter.offStartSec - nowSec;
          if (left < 0) left = 0;
          result = { state: STATE_COUNTDOWN, text: "T-" + fmtCounter(left) };
        } else if (counter.serverTime) {
          result = serverCounterState(counter.serverTime, counter.serverDuration, nowSec);
        } else {
          result = linkedCounterState(counter.codebs, counter.noday, nowSec);
        }
        if (counter.isBs) {
          /* El contador BS se compone de dos nodos: el tiempo transcurrido
             y el tiempo restante de la duracion de cuatro horas. */
          counter.elapsedEl.textContent = result.text;
          counter.remainingEl.textContent = result.state === STATE_PROGRESS ? "" + fmtCounter(result.remainingSec) : "";
        } else {
          counter.td.textContent = result.text;
        }
        applyCounterState(counter.tr, result.state);
      }
    }

    build();
    return tick;
  }

  /* ---------- Init ---------- */
  var ticks = [];
  var battleTick = initBattleSurvival();
  var duelTick = initAllianceDuel();
  if (battleTick) ticks.push(battleTick);
  if (duelTick) ticks.push(duelTick);

  if (ticks.length) {
    setInterval(function () {
      for (var i = 0; i < ticks.length; i++) ticks[i]();
    }, 1000);
  }
})();
