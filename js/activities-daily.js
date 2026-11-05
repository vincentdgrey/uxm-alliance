/* Actividades Diarias: cronogramas de Batalla de Supervivencia y Duelo de Alianzas.
   Script unico de la subpagina pages/actividades-diarias.html.

   Depende de js/i18n.js (window.I18N) y del idioma que fija js/app.js
   en <html data-lang>. No modifica el titulo ni el idioma de la pagina.
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
    { "code": "ANTX",    "objetive": "Use 660 Antitoxin",                    "resource":"","point": "+2.4",         "phase": "P01" },
    { "code": "FAQS",    "objetive": "Complete Falcon Quest Once",           "resource":"","point": "+29'000.0",    "phase": "P01" },

    { "code": "EPIUR",   "objetive": "1 Epigrafe Shard UR",                  "resource":"","point": "+2'700.0",     "phase": "P01" },
    { "code": "HERBS",   "objetive": "60 Herbs [Lv.10 8H]",                  "resource":"","point": "+12.0",        "phase": "P01" },
    { "code": "GRAIN",   "objetive": "Gather 100 Grain/100 Timber",          "resource":"","point": "+12.0",        "phase": "P01" },
    { "code": "RAVESS",  "objetive": "Consume 1 Raven Essence",              "resource":"","point": "+6'000.0",     "phase": "P01" },
    { "code": "RAVFRT",  "objetive": "Consume 1 Raven Fruit",                "resource":"","point": "+7.2",         "phase": "P01" },
    { "code": "STMN",    "objetive": "Consume 1 Stamina",                    "resource":"","point": "+360.0",       "phase": "P01" },
    
    { "code": "CON1SP",  "objetive": "1min Construction Speedup",            "resource":"","point": "+147.5",       "phase": "P02" },
    { "code": "CONMGH",  "objetive": "Increase 1 Building Might",            "resource":"","point": "+27.5",        "phase": "P02" },
    { "code": "CRVNUR",  "objetive": "1 UR Caravan, Dispatch",               "resource":"","point": "+290'000.0",   "phase": "P02" },
    { "code": "OPENUR",  "objetive": "1 UR Covert Operation",                "resource":"","point": "+217'500.0",   "phase": "P02" },
    { "code": "TCKSUR",  "objetive": "Ticket Recruit Survivor",              "resource":"","point": "+4'350.0",     "phase": "P02" },
    { "code": "RAVCH1",  "objetive": "Lv.1 Raven Gear Chest opened",         "resource":"","point": "+2'585.0",     "phase": "P03" },
    { "code": "RAVCH2",  "objetive": "Lv.2 Raven Gear Chest opened",         "resource":"","point": "+7'755.0",     "phase": "P03" },
    { "code": "RAVCH3",  "objetive": "Lv.3 Raven Gear Chest opened",         "resource":"","point": "+23'500.0",    "phase": "P03" },
    { "code": "RAVCH4",  "objetive": "Lv.4 Raven Gear Chest opened",         "resource":"","point": "+70'500.0",    "phase": "P03" },
    { "code": "RAVCH5",  "objetive": "Lv.5 Raven Gear Chest opened",         "resource":"","point": "+211'500.0",   "phase": "P03" },
    { "code": "RAVCH6",  "objetive": "Lv.6 Raven Gear Chest opened",         "resource":"","point": "+634'500.0",   "phase": "P03" },
    { "code": "RAVCH7",  "objetive": "Lv.7 Raven Gear Chest opened",         "resource":"","point": "+1'903'500.0", "phase": "P03" },
    { "code": "STDSCR",  "objetive": "Consume 1 Study Scroll",               "resource":"","point": "+705.0",       "phase": "P03" },
    { "code": "TCH1SP",  "objetive": "1min Research Speedup",                "resource":"","point": "+145.0",       "phase": "P03" },
    { "code": "TCHMGH",  "objetive": "Increase 1 Tech Might",                "resource":"","point": "+27.0",        "phase": "P03" },
    { "code": "SHRDSR",  "objetive": "1 SR Hero Shard",                      "resource":"","point": "+2'350.0",     "phase": "P04" },
    { "code": "SHRDSS",  "objetive": "1 SSR Hero Shard",                     "resource":"","point": "+8'225.0",     "phase": "P04" },
    { "code": "SHRDUR",  "objetive": "1 UR Hero Shard",                      "resource":"","point": "+23'500.0",    "phase": "P04" },
    { "code": "SKILLB",  "objetive": "1 Skill Badge",                        "resource":"","point": "+23.5",        "phase": "P04" },
    { "code": "TCKHER",  "objetive": "Ticket Recruit Heroes",                "resource":"","point": "+4'275.0",     "phase": "P04" },
    { "code": "SOLD1TRN","objetive": "1min Training Boost",                  "resource":"","point": "+145.0",       "phase": "P05" },
    { "code": "SOLDT05", "objetive": "Train 1 Lv.5 Soldier",                 "resource":"","point": "+162.0",       "phase": "P05" },
    { "code": "SOLDT06", "objetive": "Train 1 Lv.6 Soldier",                 "resource":"","point": "+189.0",       "phase": "P05" },
    { "code": "SOLDT07", "objetive": "Train 1 Lv.7 Soldier",                 "resource":"","point": "+216.0",       "phase": "P05" },
    { "code": "SOLDT08", "objetive": "Train 1 Lv.8 Soldier",                 "resource":"","point": "+243.0",       "phase": "P05" },
    { "code": "SOLDT09", "objetive": "Train 1 Lv.9 Soldier",                 "resource":"","point": "+270.0",       "phase": "P05" },
    { "code": "SOLDT10", "objetive": "Train 1 Lv.10 Soldier",                "resource":"","point": "+297.0",       "phase": "P05" },
    { "code": "HEA1SP",  "objetive": "1min Healing Speedup",                 "resource":"","point": "+145.0",       "phase": "P06" },
    { "code": "SOLDDFT", "objetive": "For each Lv.8 Soldier defeated",       "resource":"","point": "+24.3",        "phase": "P06" },
    { "code": "SOLDLST", "objetive": "For each Lv.8 Soldier lost",           "resource":"","point": "+21.6",        "phase": "P06" },
    { "code": "SOLDMTC", "objetive": "Lv.8 Soldier defeated match",          "point": "+117.0",       "phase": "P06" },
    { "code": "DYFALCON", "objetive": "Save Falcon Missions",                "resource":"","point": "", "phase": "" },
    { "code": "DYELITE", "objetive": "Monsters Elite Blight",                "resource":"","point": "", "phase": "" },
    { "code": "DYBOTT", "objetive": "Save Bottle Stamina",                   "resource":"","point": "", "phase": "" },
    { "code": "EQGEAR", "objetive": "1 Gearstone",                           "resource":"","point": "", "phase": "" },
    { "code": "EQBPRN", "objetive": "1 Gear Blueprint",                      "resource":"","point": "", "phase": "" }
  ];

  var EVENT_CODE = [
    { "event": "AD",  "es": "Duelo de Alianza",      "en": "Alliance Duel" },
    { "event": "DY",  "es": "Diario",                "en": "Daily" },
    { "event": "KVK", "es": "Guerra Reinos",         "en": "Kingdoms War" },
    { "event": "BS",  "es": "Batalla Supervivencia", "en": "Battle Survival" },
    { "event": "EQ",  "es": "Mejora de Equipo",      "en": "Equipment Upgrade" },
    { "event": "BEX", "es": "Batalla del Elixir",    "en": "Battle Elixir" },
    { "event": "CUM", "es": "Valle Cúmulos de Cristal",    "en": "Cumulus Cristal Valley" }
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
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "00:00:00", "code_task": "ANTX" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "", "code_task": "FAQS" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "", "code_task": "RAVESS" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "16:00:00", "code_task": "RAVFRT" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "16:00:00", "code_task": "STMN" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "", "code_task": "EPIUR" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "", "code_task": "HERBS" },
    { "noday": 1, "day": "Mon", "event": "AD", "phase": "PH01", "time_init": "", "code_task": "FAQS" },
    
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "time_init": "", "code_task": "TCKSUR" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "time_init": "00:00:00", "code_task": "CON1SP" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "time_init": "00:00:00", "code_task": "CONMGH" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "time_init": "", "code_task": "CRVNUR" },
    { "noday": 2, "day": "Tue", "event": "AD", "phase": "PH02", "time_init": "", "code_task": "OPENUR" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "", "time_init": "", "code_task": "DYFALCON" },
    { "noday": 2, "day": "Tue", "event": "DY", "phase": "", "time_init": "", "code_task": "DYELITE" },
    
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH1" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH2" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH3" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH4" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH5" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH6" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "RAVCH7" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "04:00:00", "code_task": "STDSCR" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "04:00:00", "code_task": "TCH1SP" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "04:00:00", "code_task": "TCHMGH" },
    { "noday": 3, "day": "Wed", "event": "AD", "phase": "PH03", "time_init": "", "code_task": "FAQS" },
    
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "time_init": "08:00:00", "code_task": "TCKHER" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "time_init": "08:00:00", "code_task": "ANTX" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "time_init": "", "code_task": "SHRDSR" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "time_init": "", "code_task": "SHRDSS" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "time_init": "", "code_task": "SHRDUR" },
    { "noday": 4, "day": "Thu", "event": "AD", "phase": "PH04", "time_init": "", "code_task": "SKILLB" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "", "time_init": "", "code_task": "DYFALCON" },
    { "noday": 4, "day": "Thu", "event": "DY", "phase": "", "time_init": "", "code_task": "DYELITE" },
    
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "12:00:00", "code_task": "SOLDT07" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "12:00:00", "code_task": "SOLDT08" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "12:00:00", "code_task": "SOLDT09" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "12:00:00", "code_task": "SOLDT10" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "12:00:00", "code_task": "SOLD1TRN" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "", "code_task": "FAQS" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "08:00:00", "code_task": "CON1SP" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "08:00:00", "code_task": "CONMGH" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "16:00:00", "code_task": "TCH1SP" },
    { "noday": 5, "day": "Fri", "event": "AD", "phase": "PH05", "time_init": "16:00:00", "code_task": "TCHMGH" },
    
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "04:00:00", "code_task": "CON1SP" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "12:00:00", "code_task": "TCH1SP" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "08:00:00", "code_task": "SOLD1TRN" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "", "code_task": "HEA1SP" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "", "code_task": "SOLDDFT" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "", "code_task": "SOLDLST" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "", "code_task": "SOLDMTC" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "", "code_task": "CRVNUR" },
    { "noday": 6, "day": "Sat", "event": "AD", "phase": "PH06", "time_init": "", "code_task": "OPENUR" },
    { "noday": 6, "day": "Sat", "event": "EQ", "phase": "", "time_init": "", "code_task": "EQGEAR" },
    { "noday": 6, "day": "Sat", "event": "EQ", "phase": "", "time_init": "", "code_task": "EQBPRN" },
    
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "time_init": "", "code_task": "DYFALCON" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "time_init": "", "code_task": "DYELITE" },
    { "noday": 0, "day": "Sun", "event": "EQ", "phase": "PH00", "time_init": "", "code_task": "EQGEAR" },
    { "noday": 0, "day": "Sun", "event": "EQ", "phase": "PH00", "time_init": "", "code_task": "EQBPRN" },
    { "noday": 0, "day": "Sun", "event": "DY", "phase": "PH00", "time_init": "", "code_task": "DYBOTT" }
  ];

  /* ---------- Utilidades compartidas ---------- */

  var SRC_TO_UTC_MS = 2 * 3600 * 1000;
  var FALLBACK_LANG = "en";
  var WEEK_SECONDS = 604800;
  var DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  function byId(id) { return document.getElementById(id); }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function appendCell(tr, text, cls) {
    var td = document.createElement("td");
    if (cls) td.className = cls;
    td.textContent = text;
    tr.appendChild(td);
    return td;
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
    var txt = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + " [" + tzLabel();
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
      return {
        noday: c.noday,
        sec: c.noday * 86400 + (+p[0]) * 3600 + (+p[1]) * 60 + (+p[2]),
        event: actMap[c.codebs].event,
        act1: actMap[c.codebs].activity_1,
        act2: actMap[c.codebs].activity_2,
        hlSpecial: actMap[c.codebs].event.toLowerCase().indexOf("soldiers") >= 0,
        hlTrack: actMap[c.codebs].event.toLowerCase().indexOf("raven") >= 0 || actMap[c.codebs].event.toLowerCase().indexOf("heroes") >= 0
      };
    });
    slots.sort(function (a, b) { return a.sec - b.sec; });

    var lastSecByDay = {};
    slots.forEach(function (s) {
      if (lastSecByDay[s.noday] === undefined || s.sec > lastSecByDay[s.noday]) lastSecByDay[s.noday] = s.sec;
    });
    slots.forEach(function (s) { s.dayEnd = s.sec === lastSecByDay[s.noday]; });

    function nowSecondsSrc() {
      var d = new Date(Date.now() - SRC_TO_UTC_MS);
      return d.getUTCDay() * 86400 + d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
    }

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

    function fmtCounter(sec) {
      return pad(Math.floor(sec / 3600)) + ":" + pad(Math.floor((sec % 3600) / 60)) + ":" + pad(sec % 60);
    }

    var counters = [];
    var lastIdx = -2;

    HEADERS.forEach(function (id, i) {
      var cell = byId(id);
      if (cell) cell.textContent = T.bsHeaders[i];
    });

    function appendActivitiesCell(tr, act1, act2, hlTrack) {
      var td = document.createElement("td");
      td.className = "bs-activities" + (hlTrack ? " bs-hl-track" : "");
      var d1 = document.createElement("span");
      d1.className = "bs-act-line bs-act1";
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
        var td = appendCell(tr, rel === -1 ? "—" : "", "bs-counter" + (rel > 0 && slot.hlSpecial ? " bs-hl-special" : ""));
        if (rel === 0) counters.push({ td: td, startSec: uSec, elapsed: true, prefix: "+ " });
        else if (rel > 0) counters.push({ td: td, targetSec: uSec, prefix: "T- " });
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
        c.td.textContent = c.prefix + (c.elapsed ? fmtCounter(sec - c.startSec) : fmtCounter(c.targetSec - sec));
      }
      renderTzInfo(tzInfoEl);
    }

    tick();
    return tick;
  }

  /* ---------- Calendario de Duelo de Alianzas ---------- */

  function initAllianceDuel() {
    var listsEl = byId("ad-lists");
    var tzInfoEl = byId("ad-tzinfo");
    if (!listsEl || !tzInfoEl) return null;

    var NO_PHASE_TITLE = "Daily & Equipment";

    var actMap = {};
    ACTIVITY_CODE.forEach(function (a) { actMap[a.code] = a; });

    var evMap = {};
    EVENT_CODE.forEach(function (e) { evMap[e.event] = e; });

    var phaseMap = {};
    PHASES.forEach(function (p) { phaseMap[p.phase] = p.desc; });

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

    function dayTitle(noday) {
      var ph = dayPhase[noday];
      return (ph ? (phaseMap[ph] || ph) : NO_PHASE_TITLE) + " · " + DAY_ABBR[noday];
    }

    function buildRow(r, offset, startDayMs, nowSec) {
      var tr = document.createElement("tr");
      var timeTxt = "—";
      if (r.time_init) {
        var p = r.time_init.split(":");
        var sec = (+p[0]) * 3600 + (+p[1]) * 60 + (+p[2]);
        var loc = new Date(startDayMs + offset * 86400000 + sec * 1000 + SRC_TO_UTC_MS);
        timeTxt = pad(loc.getHours()) + ":" + pad(loc.getMinutes());
        if (offset === 0 && nowSec > sec) tr.className = "ad-past";
      }
      var a = actMap[r.code_task];
      var ev = evMap[r.event];
      appendCell(tr, timeTxt, "ad-time");
      appendCell(tr, a ? a.objetive : r.code_task, "ad-obj");
      appendCell(tr, ev ? (ev[LANG] || ev.en || r.event) : r.event, "ad-event");
      appendCell(tr, a && a.phase ? a.phase : "—", "ad-phase");
      return tr;
    }

    function build() {
      var origin = new Date(Date.now() - SRC_TO_UTC_MS);
      var today = origin.getUTCDay();
      lastDay = today;
      var startDayMs = Date.UTC(origin.getUTCFullYear(), origin.getUTCMonth(), origin.getUTCDate());
      var nowSec = origin.getUTCHours() * 3600 + origin.getUTCMinutes() * 60 + origin.getUTCSeconds();

      listsEl.innerHTML = "";

      for (var k = 0; k < 7; k++) {
        var noday = (today + k) % 7;
        var rows = byDay[noday] || [];

        var item = document.createElement("div");
        var baseCls = "ad-item" + (k === 0 ? " ad-today" : "");
        item.className = baseCls + (k <= 1 ? " ad-open" : "");

        var title = document.createElement("div");
        title.className = "ad-item-title";
        var arrow = document.createElement("span");
        arrow.className = "ad-arrow";
        title.appendChild(arrow);
        title.appendChild(document.createTextNode(dayTitle(noday)));
        item.appendChild(title);

        var body = document.createElement("div");
        body.className = "ad-item-body";
        var wrap = document.createElement("div");
        wrap.className = "ad-wrap";
        var table = document.createElement("table");
        table.className = "ad-schedule";

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
          tbody.appendChild(buildRow(rows[i], k, startDayMs, nowSec));
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
      renderTzInfo(tzInfoEl);
      var origin = new Date(Date.now() - SRC_TO_UTC_MS);
      if (origin.getUTCDay() !== lastDay) build();
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
