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
    { "codebs": "BUILD",   "event": "Build Territory",     "activity_1": "1min Construction Speedup (50H) [+10]", "activity_2": "Increase 1 Building Might (30.000) [+1]", "goal": "30.000 pts" },
    { "codebs": "HEROE",   "event": "Enhance Heroes",      "activity_1": "20 Ticket Heroes (30T) [+400]",         "activity_2": "1950 Antitoxin (23.4M) [+1]",             "goal": "12.000 pts" },
    { "codebs": "RAVEN",   "event": "Enhance Raven",       "activity_1": "10 Raven Fruit",                        "activity_2": "1 Stamina (15 Rallys) [+100]",            "goal": "30.000 pts" },
    { "codebs": "SOLDIER", "event": "Train Soldiers",      "activity_1": "1min Training Boost (17H) [+10]",       "activity_2": "Train 1 Lv.8 Soldier (2.800) [+25]",      "goal": "60.000 pts" },
    { "codebs": "TECH",    "event": "Technology Research", "activity_1": "1min Research Speedup (50H) [+10]",     "activity_2": "Increase 1 Tech Might (30.000) [+1]",     "goal": "30.000 pts" },
    
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
    { "code": "ANTX",    "group":"FOCUS", "objetive": "Consume Antitoxins",       "resource":"Purchase Antidote Supplies",  "icon":"antitoxin",      "point": "+2.4",  "codebs": "HEROE" },
    { "code": "FAQS",    "group":"FOCUS", "objetive": "Complete Falcon Missions", "resource":"Falcon Tower",                "icon":"falcon-mission", "point": "+29'000.0",      "codebs": "" },

    { "code": "EPIUR",   "group":"RAVEN", "objetive": "Get UR Epigraph Shards",   "resource":"Open Epigraph Chests",        "icon":"epigraf-chest",  "point": "+2'700.0", "codebs": "" },
    { "code": "HERBS",   "group":"FARM",  "objetive": "Gather Herbs, all day",    "resource":"Herb Garden Lv.10, 8H, 1.1M", "icon":"garden",         "point": "+12.0",        "codebs": "" },
    { "code": "GRAIN",   "group":"FARM",  "objetive": "Gather 100 Grain/100 Timber","resource":"Farm Lv.10, 6.5H, 2.2M",    "icon":"farm",           "point": "+12.0",          "codebs": "" },
    { "code": "RAVESS",  "group":"RAVEN", "objetive": "Consume Raven Essence",    "resource":"",                            "icon":"raven-essence",  "point": "+6'000.0",                    "codebs": "" },
    { "code": "RAVFRT",  "group":"RAVEN", "objetive": "Consume Raven Fruit",      "resource":"",                            "icon":"raven-fruit",    "point": "+7.2",                          "codebs": "RAVEN" },
    { "code": "STMN",    "group":"FOCUS", "objetive": "Consume Stamina",          "resource":"Use Stamina Bottles",         "icon":"stamina-bottle", "point": "+360.0",  "codebs": "RAVEN" },
    
    { "code": "CON1SP",  "group":"BUILD", "objetive": "Use Construction Speedup", "resource":"", "icon":"speedup-build","point": "+147.5",      "codebs": "BUILD" },
    { "code": "CONMGH",  "group":"BUILD", "objetive": "Increase Building Might",  "resource":"Prefer a shorter construction time", "icon":"might-building","point": "+27.5",       "codebs": "BUILD" },
    { "code": "CRVNUR",  "group":"OPER",  "objetive": "Dispatch UR Caravans",      "resource":"4 Caravan", "icon":"caravan","point": "+290'000.0",         "codebs": "" },
    { "code": "OPENUR",  "group":"OPER",  "objetive": "Execute UR Covert Operations","resource":"7 Black Ops", "icon":"black-ops-swag","point": "+217'500.0", "codebs": "" },

    { "code": "TCKSUR",  "group":"TAVERN","objetive": "Recruit Survivor once",      "resource":"ALL Ticket Survivor", "icon":"ticket-survivor","point": "+4'350.0", "codebs": "" },
    { "code": "SAVETS",  "group":"TAVERN","objetive": "SAVE ALL Ticket Survivor",   "resource":"Ticket Survivor", "icon":"ticket-survivor","point": "", "codebs": "" },
    { "code": "FREETS",  "group":"TAVERN","objetive": "Use ONLY FREE Ticket Survivor", "resource":"Ticket Survivor", "icon":"ticket-survivor","point": "", "codebs": "" },

    { "code": "RAVCH1",  "group":"RAVEN","objetive": "Open Raven Gear Chest",     "resource":"", "icon":"raven-chest","point": "+2'585.0",        "codebs": "" },
    { "code": "STDSCR",  "group":"TECH", "objetive": "Use Study Scroll in research", "resource":"Alliance Duel Reward", "icon":"study-scroll","point": "+705.0", "codebs": "" },
    { "code": "TCH1SP",  "group":"TECH", "objetive": "Use Research Speedup",      "resource":"", "icon":"speedup-tech","point": "+145.0",         "codebs": "TECH" },
    { "code": "TCHMGH",  "group":"TECH", "objetive": "Increase Tech Might",       "resource":"", "icon":"might-research","point": "+27.0",        "codebs": "TECH" },

    { "code": "SHRDSR",  "group":"HERO", "objetive": "Consume SR Hero Shard",  "resource":"", "icon":"shard-sr","point": "+2'350.0",   "codebs": "" },
    { "code": "SHRDSS",  "group":"HERO", "objetive": "Consume SSR Hero Shard", "resource":"", "icon":"shard-ssr","point": "+8'225.0",  "codebs": "" },
    { "code": "SHRDUR",  "group":"HERO", "objetive": "Consume UR Hero Shard",  "resource":"", "icon":"shard-ur","point": "+23'500.0",  "codebs": "" },
    { "code": "SKILLB",  "group":"HERO", "objetive": "Use Skill Badge",        "resource":"", "icon":"skill-badge","point": "+23.5",       "codebs": "" },

    { "code": "TCKHER",  "group":"TAVERN","objetive": "Recruit Heroes using Tickets", "resource":"ALL Ticket Heroe", "icon":"ticket-hero","point": "+4'275.0", "codebs": "HEROE" },
    { "code": "SAVETH",  "group":"TAVERN","objetive": "SAVE ALL Ticket Heroe",     "resource":"Ticket Heroe", "icon":"ticket-hero","point": "", "codebs": "" },
    { "code": "FREETH",  "group":"TAVERN","objetive": "Use ONLY FREE Ticket Heroe", "resource":"Ticket Heroe", "icon":"ticket-hero","point": "", "codebs": "" },

    { "code": "SOLD1TRN","group":"SOLDIER", "objetive": "Use Training Boost",  "resource":"", "icon":"boost-training","point": "+145.0",              "codebs": "SOLDIER" },
    { "code": "SOLDT10", "group":"SOLDIER", "objetive": "Train Soldier, prefer to promote", "resource":"Promote Soldiers", "icon":"soldier-t8","point": "+297.0",  "codebs": "SOLDIER" },
    { "code": "HEA1SP",  "group":"HEAL",    "objetive": "Use Healing Speedup", "resource":"Healing Buff +150%", "icon":"speedup-healing","point": "+145.0", "codebs": "" },
    { "code": "SOLDDFT", "group":"SOLDIER", "objetive": "Defeating Soldiers, Alliance Duel","resource":"Attacking", "icon":"soldier-defeat","point": "+24.3",               "codebs": "" },
    { "code": "SOLDLST", "group":"SOLDIER", "objetive": "Losing Soldiers, Alliance Duel",    "resource":"Defense", "icon":"soldier-lost","point": "+21.6",                 "codebs": "" },
    { "code": "SOLDMTC", "group":"SOLDIER", "objetive": "Defeating Soldiers (specific match)", "resource":"T8 vs T8", "icon":"soldier-attack","point": "+117.0",       "codebs": "" },

    { "code": "DYFALCON", "group":"FOCUS", "objetive": "Run Falcon Missions, but do not complete them", "resource":"Save 35 Falcon Missions", "icon":"falcon-mission-lock","point": "", "codebs": "" },
    { "code": "DYELITE", "group":"MONSTER","objetive": "Monsters Elite Blight, get Hero Ticket & Antitoxin", "resource":"", "icon":"elite-blight","point": "", "codebs": "" },
    { "code": "DYBOTT",  "group":"FOCUS",  "objetive": "Save Stamina Next Phase of Raven", "resource":"Bottle Stamina", "icon":"stamina","point": "", "codebs": "" },
    { "code": "DYBOTWAR", "group":"FOCUS",  "objetive": "Save Stamina for Phase War", "resource":"Bottle Stamina", "icon":"stamina","point": "", "codebs": "" },
    { "code": "DYHERBS", "group":"FOCUS",  "objetive": "Start Gathering Herbs", "resource":"Herb Garden Lv.10, 8H, 1.1M", "icon":"garden","point": "", "codebs": "" },
    { "code": "DYSOLDIER", "group":"FOCUS",  "objetive": "Train T6 or T7 soldiers; promote them on War Preparation Day.", "resource":"Soldier T7", "icon":"soldier-t7","point": "", "codebs": "" },

    { "code": "EQGEAR",  "group":"GEAR", "objetive": "Use Gearstone, at UR Equipment", "resource":"Upgrade Equipment", "icon":"gearstone","point": "", "codebs": "" },
    { "code": "EQBPRN",  "group":"GEAR", "objetive": "Use Gear Blueprint, Promote Additional Stats UR", "resource":"Promote Equipment", "icon":"gear-blueprint-ur","point": "", "codebs": "" },

    { "code": "ELIXIR",  "group":"FOCUS", "objetive": "Capture Buildings, Gain Points", "resource":"", "icon":"","point": "", "codebs": "" },
    { "code": "SCRAMBLE","group":"FOCUS", "objetive": "Capture/Defense Farm, 100K Point Honor", "resource":"Farm Royal City in Mud", "icon":"","point": "", "codebs": "" },

    { "code": "KWAR",    "group":"FOCUS", "objetive": "Kill/Defeat Soldiers, 1.5M Point Honor", "resource":"Kingdom War", "icon":"","point": "", "codebs": "" },
    { "code": "SHIELD",  "group":"FOCUS", "objetive": "Active Shields 24H, Free Shield 8H", "resource":"Alliance Shop", "icon":"","point": "", "codebs": "" },

    { "code": "CUMULUS", "group":"FOCUS", "objetive": "30min Gather Cristal, from Cumulus", "resource":"Event Culumus Valley", "icon":"cumulus-cristal","point": "", "codebs": "" }
  ];

  var EVENT_CODE = [
    { "event": "DY",  "es": "Consejo Diario",           "en": "Tips Daily" },

    { "event": "AD",  "es": "Duelo de Alianza",         "en": "Alliance Duel" },
    { "event": "KVK", "es": "Guerra de Reinos",         "en": "Kingdoms War" },
    { "event": "ROY", "es": "Alboroto Ciudad Real",     "en": "Scramble Royal City" },
    { "event": "BS",  "es": "Batalla Supervivencia",    "en": "Battle Survival" },

    { "event": "EQ",  "es": "Mejora de Equipo",         "en": "Gear Upgrade" },
    { "event": "BEX", "es": "Batalla del Elixir",       "en": "Elixir Scramble" },
    { "event": "CUM", "es": "Valle Cúmulos de Cristal", "en": "Cristal Cruster Valley" }
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
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "ANTX",   "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "FAQS",   "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "RAVESS", "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "RAVFRT", "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "STMN",   "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "EPIUR",  "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "code_task": "HERBS",  "server_time":"" },

    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "FREETH", "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "SAVETS", "server_time":"" },
    { "noday": 1, "day": "Mon", "event": "DY", "phase": "PH01", "code_task": "DYSOLDIER", "server_time":"" },
    
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "TCKSUR", "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "CON1SP", "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "CONMGH", "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "CRVNUR", "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "code_task": "OPENUR", "server_time":"" },

    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DYFALCON", "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DYELITE",  "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "FREETH",   "server_time":"" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "PH02", "code_task": "DYSOLDIER", "server_time":"" },
    
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "RAVCH1", "server_time":"" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "STDSCR", "server_time":"" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "TCH1SP", "server_time":"" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "TCHMGH", "server_time":"" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "code_task": "FAQS",   "server_time":"" },

    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "SAVETH", "server_time":"" },
    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "FREETS", "server_time":"" },
    { "noday": 3, "day": "Wed", "event": "DY", "phase": "PH03", "code_task": "DYSOLDIER", "server_time":"" },
    
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "TCKHER", "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "ANTX",   "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SHRDSR", "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SHRDSS", "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SHRDUR", "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "code_task": "SKILLB", "server_time":"" },

    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYFALCON", "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYELITE",  "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "FREETS",   "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYBOTWAR",   "server_time":"" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "PH04", "code_task": "DYSOLDIER", "server_time":"" },
    
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "SOLDT10",  "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "SOLD1TRN", "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "FAQS",     "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "CON1SP",   "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "CONMGH",   "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "TCH1SP",   "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "code_task": "TCHMGH",   "server_time":"" },

    { "noday": 5, "day": "Fri", "event": "ROY", "phase": "PH05", "code_task": "SCRAMBLE", "server_time":"11:00:00", "server_duration":"01:00:00" },
    { "noday": 5, "day": "Fri", "event": "BEX", "phase": "PH05", "code_task": "ELIXIR",   "server_time":"22:00:00", "server_duration":"00:30:00" },
    { "noday": 5, "day": "Fri", "event": "DY",  "phase": "PH05", "code_task": "FREETH",    "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "DY",  "phase": "PH05", "code_task": "FREETS",    "server_time":"" },
    { "noday": 5, "day": "Fri", "event": "DY",  "phase": "PH05", "code_task": "DYBOTWAR",   "server_time":"" },
    
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "CON1SP",   "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "TCH1SP",   "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLD1TRN", "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "HEA1SP",   "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLDDFT",  "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLDLST",  "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "SOLDMTC",  "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "CRVNUR",   "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "code_task": "OPENUR",   "server_time":"" },

    { "noday": 6, "day": "Sat", "event": "EQ", "phase": "PH06", "code_task": "EQGEAR", "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "EQ", "phase": "PH06", "code_task": "EQBPRN", "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "FREETH", "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "FREETS", "server_time":"" },
    { "noday": 6, "day": "Sat", "event": "DY", "phase": "PH06", "code_task": "SHIELD", "server_time":"00:00:00", "server_duration":"23:00:00" },
    { "noday": 6, "day": "Sat", "event": "KVK","phase": "PH06", "code_task": "KWAR",  "server_time":"12:00:00", "server_duration":"01:00:00" },
    
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYFALCON", "server_time":"" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYELITE",  "server_time":"" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYBOTT",   "server_time":"" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYHERBS",  "server_time":"16:30:00", "server_duration":"08:00:00" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "FREETH",   "server_time":"" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "SAVETS",   "server_time":"" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "code_task": "DYSOLDIER", "server_time":"" },

    { "noday": 0, "day": "Sun", "event": "EQ", "phase": "PH00", "code_task": "EQGEAR", "server_time":"" },
    { "noday": 0, "day": "Sun", "event": "EQ", "phase": "PH00", "code_task": "EQBPRN", "server_time":"" },

    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time":"02:00:00", "server_duration":"00:30:00" },
    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time":"09:00:00", "server_duration":"00:30:00" },
    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time":"18:00:00", "server_duration":"00:30:00" },
    { "noday": 0, "day": "Sun", "event": "CUM", "phase": "PH00", "code_task": "CUMULUS", "server_time":"23:00:00", "server_duration":"00:30:00" },
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

  function byId(id) { return document.getElementById(id); }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

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
        var td = appendCell(tr, rel === -1 ? "—" : "", "bs-counter" + (counterSpecial ? " bs-hl-special" : ""));
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
    /* Los mapas viven en js/i18n/actividades-diarias/i18n.js. El inglés y
       el dato original actuan como respaldo cuando una traduccion no esta
       disponible. */

    function activityText(code, field) {
      var localized = T.adActivities && T.adActivities[code];
      if (localized && typeof localized[field] === "string") return localized[field];
      var fallback = T_EN.adActivities && T_EN.adActivities[code];
      if (fallback && typeof fallback[field] === "string") return fallback[field];
      var activity = actMap[code];
      return activity && typeof activity[field] === "string" ? activity[field] : "";
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

    function sortRowsByEvent(rows) {
      return rows.map(function (r, index) {
        return { row: r, index: index };
      }).sort(function (a, b) {
        var cmp = eventLabel(a.row).localeCompare(eventLabel(b.row), LANG);
        return cmp !== 0 ? cmp : a.index - b.index;
      }).map(function (item) {
        return item.row;
      });
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

    /* Estado del contador para una tarea con hora propia del servidor. */
    function serverCounterState(serverTime, serverDuration, nowSec) {
      var startSec = parseClock(serverTime);
      if (startSec === null) return null;
      var durationSec = parseClock(serverDuration);
      if (durationSec === null) durationSec = 0;
      var endSec = startSec + durationSec;
      if (nowSec < startSec) return "T-" + fmtCounter(startSec - nowSec);
      if (nowSec < endSec) return "+ " + fmtCounter(nowSec - startSec);
      return "End";
    }

    function counterState(codebs, noday, nowSec) {
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

      if (currentSlot) return "+ " + fmtCounter(nowSec - currentSlot.sec);
      if (nextSlot) return "T-" + fmtCounter(nextSlot.sec - nowSec);
      return "End";
    }

    function linkedDateLabel(startDayMs, offset, noday, codebs) {
      var hasDaySlot = (slotsByCodebs[codebs] || []).some(function (slot) {
        return slot.noday === noday;
      });
      if (!hasDaySlot) return "—";
      var loc = new Date(startDayMs + offset * 86400000);
      return pad(loc.getUTCMonth() + 1) + "/" + pad(loc.getUTCDate());
    }

    function buildRow(r, offset, startDayMs, nowSec) {
      var tr = document.createElement("tr");
      var timeTxt = "—";
      var a = actMap[r.code_task];
      var codebs = a && a.codebs;
      var timeCell = null;

      if (offset === 0 && r.server_time) {
        /* El dia actual usa la hora propia del servidor y su duracion. */
        timeTxt = serverCounterState(r.server_time, r.server_duration, nowSec) || "—";
        timeCell = appendCell(tr, timeTxt, "ad-time");
        counters.push({ td: timeCell, serverTime: r.server_time, serverDuration: r.server_duration });
      } else if (codebs) {
        if (offset === 0) {
          /* El dia actual muestra el contador del horario vinculado. */
          timeTxt = counterState(codebs, r.noday, nowSec);
          timeCell = appendCell(tr, timeTxt, "ad-time");
          counters.push({ td: timeCell, codebs: codebs, noday: r.noday });
        } else {
          /* Los dias futuros muestran la fecha de la tarea vinculada. */
          timeTxt = linkedDateLabel(startDayMs, offset, r.noday, codebs);
        }
      }

      /* 1. Contador */
      if (!timeCell) appendCell(tr, timeTxt, "ad-time");

      /* 2. Imagen de referencia de la tarea. */
      appendIconCell(tr, "ad-task-icon", r.code_task);

      /* 3. Tarea */
      appendCell(tr, a ? activityText(r.code_task, "objetive") : r.code_task, "ad-obj");

      /* 4. Recurso */
      appendCell(tr, a ? activityText(r.code_task, "resource") : "", "ad-resource");

      /* 5. Evento */
      appendCell(tr, eventLabel(r), "ad-event");

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
      listsEl.innerHTML = "";

      for (var k = 0; k < 7; k++) {
        var noday = (today + k) % 7;
        var rows = sortRowsByEvent(byDay[noday] || []);

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

        var tbody = document.createElement("tbody");
        for (var i = 0; i < rows.length; i++) {
          var row = buildRow(rows[i], k, startDayMs, nowSec);
          var nextRow = rows[i + 1];
          if (nextRow && rows[i].event !== nextRow.event) {
            row.className += " ad-event-separator";
          }
          tbody.appendChild(row);
        }
        table.appendChild(tbody);

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
      for (var i = 0; i < counters.length; i++) {
        var counter = counters[i];
        if (counter.serverTime) {
          counter.td.textContent = serverCounterState(counter.serverTime, counter.serverDuration, nowSec) || "—";
        } else {
          counter.td.textContent = counterState(counter.codebs, counter.noday, nowSec);
        }
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
