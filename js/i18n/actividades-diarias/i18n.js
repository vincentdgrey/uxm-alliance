/* Traducciones propias de esta pagina. Amplian el nucleo común de window.I18N. */
(function () {
  "use strict";

  var texts = {
    es: {
        scheduleBattleSurvival:"Cronograma Batalla Supervivencia",
        survivalMessage:"Ciclo automático de actividades, calculado según el horario del navegador web, indicando el tiempo transcurrido del evento actual y cuanto falta para terminar.",
        allianceMessage:"Listado de actividades basadas en el Duelo de Alianzas, te permitirá realizar las actividades del dia actual y futuro, con contadores que indicaran cuando realizarlos si cuentan con horario definido o vinculándolos a la Batalla de Supervivencia.",
        bsHeaders:["Contador", "Estado", "Evento Supervivencia", "Actividades", "Servidor"],
        bsPast:"Finalizada",
        bsCurrent:"En curso",
        bsNext:"Próximo",
        bsEvents:{ BUILD:"Construir Territorio", HEROE:"Mejorar Héroes", RAVEN:"Mejorar Cuervo", SOLDIER:"Entrenar Soldados", TECH:"Investigación Tecnológica", STANDBY:"En Espera" },
        scheduleAllianceDuel:"Duelo de Alianzas",
        adHeaders:["Contador", "", "Tarea", "Recurso", "Evento"],
        pageDailyTitle:"Actividades Diarias",
        pageDailyLead:"Detalles de las actividades diarias que te ayudaran a mejorar diariamente.",
        adActivities:{
          ANTX:{ objective:"Consume Antitoxinas x660",resource:"Suministros Antídoto"},

          STMN: { objective:"Consume Energía/Stamina, comprar 24 botellas en Shop VIP",resource:"Botella de Energía/Stamina"},
          DYBOTT: {objective:"Guarda Botellas de Energía/Stamina para la Próxima Fase del Cuervo",resource:"Botella de Energía/Stamina"},
          DYBOTWAR: {objective:"Guarda Botellas de Energía/Stamina para la Fase de Guerra",resource:"Botella de Energía/Stamina"},

          FALCON: { objective:"Completa Misiones del Halcón, 10 ó 11 cada 6 Horas",resource:"Torre del Halcón"},
          DYFALCON: {objective:"Inicia Misiones Halcón, pero no las completes, mantiene en espera 35 ó 40 ",resource:"Torre del Halcón"},

          DYHERBS: {objective:"Comienza a Recolectar Hierbas",resource:"Jardín de Hierbas Nv.10, 8H, 1.1M"},
          HERBS: {objective:"Recolecta Hierbas x60, todo el día",resource:"Jardín de Hierbas Nv.10, 8H, 1.1M"},
          GRAIN: {objective:"Recolecta Trigo/Madera x100",resource:"Granja Nv.10, 6.5H, 2.2M"},

          EPIUR: {objective:"Obtén Fragmentos de Epígrafe UR, usar toda clase de cofre Epígrafe",resource:"Cofres de Epígrafes"},
          RAVESS:{objective:"Consume Esencia de Cuervo, Prioridad",resource:"Esencia de Cuervo"},
          RAVFRT:{objective:"Consume Fruta de Cuervo",resource:"Fruta de Cuervo"},
          RAVCH1:{objective:"Abre Cofre de Equipo de Cuervo",resource:"Cofre de Cuervo"},

          CON1SP:{objective:"Usa Aceleración de Construcción, Activa Ministerio Construcción",resource:"Acelerador Construcción"},
          CONMGH:{objective:"Aumenta el Poder de Un Edificio, Prefiere tiempos de construcción cortos",resource:"Mejora Edificio"},

          STDSCR:{objective:"Usa Pergamino de Estudio en la investigación",resource:"Recompensa del Duelo de Alianzas"},
          TCH1SP:{objective:"Usa Aceleración de Investigación, Activa Ministerio Investigación",resource:"Acelerador Desarrollo"},
          TCHMGH:{objective:"Aumenta el Poder de Tecnología, Buscar Investigaciones con Pergamino de Estudio",resource:"Pergamino de Estudio"},
          
          CRVNUR:{objective:"Envía Caravanas UR",resource:"4 Caravanas"},
          OPENUR:{objective:"Ejecuta Operaciones Encubiertas UR, mínimo 6, la última es más difícil",resource:"7 Operaciones Encubiertas"},
          
          TCKSUR:{objective:"Recluta un Superviviente una vez, usar TODOS los Tickets de Superviviente",resource:"Tickets de Superviviente"},
          SAVETS:{objective:"GUARDA TODOS los Tickets de Superviviente",resource:"Ticket de Superviviente"},
          FREETS:{objective:"Usa SOLO Tickets GRATIS de Superviviente",resource:"Ticket de Superviviente"},

          TCKHER:{objective:"Recluta Héroes usando Tickets de Héroe, +50 obtienes Héroe UR",resource:"TODOS los Tickets de Héroe"},
          SAVETH:{objective:"GUARDA TODOS los Tickets de Héroe",resource:"Ticket de Héroe"},
          FREETH:{objective:"Usa SOLO Tickets GRATIS de Héroe",resource:"Ticket de Héroe"},

          SHRDSR:{objective:"Consume Fragmento de Héroe SR",resource:"Tienda Santuario"},
          SHRDSS:{objective:"Consume Fragmento de Héroe SSR",resource:"Tienda Santuario"},
          SHRDUR:{objective:"Consume Fragmento de Héroe UR",resource:"Tienda Santuario"},
          SKILLB:{objective:"Usa Insignia de Habilidad, Prioridad Aumentar Habilidad Héroe UR",resource:"Insignia de Habilidad"},

          SOLD1TRN:{objective:"Usa Aceleración de Entrenamiento, Activa Ministerio de Guerra",resource:"Acelerador Entrenamiento"},
          SOLDT10:{objective:"Entrena Soldado, Prioridad Promover T7 a T8",resource:"Soldados T6 > T7 > T8"},
          SOLDDFT:{objective:"Derrota Soldados, Duelo de Alianzas",resource:"Atacando"},
          SOLDLST:{objective:"Pierde Soldados, Duelo de Alianzas",resource:"Defensa"},
          SOLDMTC:{objective:"Derrota Soldados (partida específica)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Entrena Soldados T6 o T7; Promover el Día de Preparación de Guerra",resource:"Soldado T7"},

          HEA1SP:{objective:"Usa Aceleración de Curación, Buff de Curación +150%",resource:"Acelerador Curación"},
          DYHOSPITAL:{objective:"NO Cures Soldados; Mantener en el Hospital, para usar aceleradores curación el día de Guerra",resource:"Hospital"},
          
          DYELITE:{objective:"Monstruos Elite Plaga, obtén Ticket de Héroe y Antitoxina",resource:"Monstruos"},
          
          EQGEAR:{objective:"Usa Piedra de Equipo, Prioridad en Equipo UR",resource:"Piedra de Equipo"},
          EQBPRN:{objective:"Usa Plano de Equipo, Promueve Estadísticas Adicionales UR",resource:"Plano el Equipo"},

          SHIELD:{objective:"Activa Escudos 24H, Compra Escudo Gratis 8H en Tienda de la Alianza",resource:"Escudo"},
          ELIXIR:{objective:"Generar Puntos por Capturar Edificios",resource:"Castillo del Elixir"},
          SCRAMBLE:{objective:"100K Puntos de Honor, Captura/Defiende una Granja en el lodo",resource:"Granjas de la Ciudad Real"},
          KWAR:{objective:"1.5M Puntos de Honor, Derrota/Pierde/Cura Soldados",resource:"Guerra de Reinos (KvK)"},
          CUMULUS:{objective:"Recolecta Cristal Purificado en Cúmulos, 30min duración",resource:"Cúmulos de Cristal"},
          CHEESE7:{objective:"335M de Daño al Ladrón del Queso Lv.7, 30min duración, 1.4B de daño para el MVP1",resource:"Trampa del Queso"}
        },
        adPhases:{
          P00:"Fase 0 : Recolección y Reserva",
          P01:"Fase 1 : Mejorar Cuervo",
          P02:"Fase 2 : Desarrollo del Territorio",
          P03:"Fase 3 : Investigación Tecnológica",
          P04:"Fase 4 : Crecimiento de Héroes",
          P05:"Fase 5 : Preparación para la Guerra",
          P06:"Fase 6 : Asalta al Enemigo"
        },
        adEvents:{
          DY:"Consejo Diario",
          AD:"Duelo de Alianza",
          KVK:"Guerra de Reinos",
          ROY:"Alboroto Ciudad Real",
          BS:"Batalla Supervivencia",
          EQ:"Mejora de Equipo",
          BEX:"Batalla del Elixir",
          CUM:"Valle Cúmulos de Cristal",
          CHE:"Trampa del Queso"
        }
    },
    en: {
        scheduleBattleSurvival:"Battle Survival Schedule",
        survivalMessage:"Automatic activity cycle calculated according to the web browser time zone, indicating the elapsed time of the current event and how much time remains until it ends.",
        allianceMessage:"List of activities based on Alliance Duel, allowing you to carry out the activities for the current and future days, with counters indicating when to perform them when they have a defined schedule or linking them to Battle Survival.",
        bsHeaders:["Counter", "Status", "Battle Survival Event", "Activities", "Server"],
bsPast:"Finished",
bsCurrent:"In progress",
bsNext:"Upcoming",
        bsEvents:{ BUILD:"Build Territory", HEROE:"Enhance Heroes", RAVEN:"Enhance Raven", SOLDIER:"Train Soldiers", TECH:"Technology Research", STANDBY:"Stand by" },
        scheduleAllianceDuel:"Alliance Duel",
        adHeaders:["Counter", "", "Task", "Resource", "Event"],
        pageDailyTitle:"Daily Activities",
pageDailyLead:"Details of the daily activities that will help you improve every day.",
        adActivities:{
          ANTX:{objective:"Consume 660 Antitoxins",resource:"Antidote Supplies"},

          STMN:{objective:"Consume Energy/Stamina, buy 24 bottles in the VIP Shop",resource:"Energy/Stamina Bottle"},
          DYBOTT:{objective:"Save Energy/Stamina Bottles for the Next Raven Phase",resource:"Energy/Stamina Bottle"},
          DYBOTWAR:{objective:"Save Energy/Stamina Bottles for the War Phase",resource:"Energy/Stamina Bottle"},

          FALCON:{objective:"Complete Falcon Missions, 10 or 11 every 6 Hours",resource:"Falcon Tower"},
          DYFALCON:{objective:"Start Falcon Missions, but do not complete them, keep 35 or 40 pending",resource:"Falcon Tower"},

          DYHERBS:{objective:"Start Gathering Herbs",resource:"Herb Garden Lv.10, 8H, 1.1M"},
          HERBS:{objective:"Gather x60 Herbs, all day",resource:"Herb Garden Lv.10, 8H, 1.1M"},
          GRAIN:{objective:"Gather x100 Grain/Timber",resource:"Farm Lv.10, 6.5H, 2.2M"},

          EPIUR:{objective:"Get UR Epigraph Shards, use every kind of Epigraph Chest",resource:"Epigraph Chests"},
          RAVESS:{objective:"Consume Raven Essence, Priority",resource:"Raven Essence"},
          RAVFRT:{objective:"Consume Raven Fruit",resource:"Raven Fruit"},
          RAVCH1:{objective:"Open Raven Gear Chest",resource:"Raven Chest"},

          CON1SP:{objective:"Use Construction Speedup, Activate Construction Ministry",resource:"Construction Speedup"},
          CONMGH:{objective:"Increase the Might of a Building, Prefer shorter construction times",resource:"Upgrade Building"},

          STDSCR:{objective:"Use Study Scroll in research",resource:"Alliance Duel Reward"},
          TCH1SP:{objective:"Use Research Speedup, Activate Research Ministry",resource:"Research Speedup"},
          TCHMGH:{objective:"Increase Tech Might, Find Research with Study Scrolls",resource:"Study Scroll"},

          CRVNUR:{objective:"Dispatch UR Caravans",resource:"4 Caravan"},
          OPENUR:{objective:"Execute UR Covert Operations, minimum 6, the last one is harder",resource:"7 Black Ops"},

          TCKSUR:{objective:"Recruit Survivor once, use ALL Survivor Tickets",resource:"Survivor Tickets"},
          SAVETS:{objective:"SAVE ALL Survivor Tickets",resource:"Survivor Ticket"},
          FREETS:{objective:"Use ONLY FREE Survivor Tickets",resource:"Survivor Ticket"},

          TCKHER:{objective:"Recruit Heroes using Hero Tickets, +50 you get a UR Hero",resource:"ALL Hero Tickets"},
          SAVETH:{objective:"SAVE ALL Hero Tickets",resource:"Hero Ticket"},
          FREETH:{objective:"Use ONLY FREE Hero Tickets",resource:"Hero Ticket"},

          SHRDSR:{objective:"Consume SR Hero Shard", resource:"Sanctuary Shop"},
          SHRDSS:{objective:"Consume SSR Hero Shard", resource:"Sanctuary Shop"},
          SHRDUR:{objective:"Consume UR Hero Shard", resource:"Sanctuary Shop"},
          SKILLB:{objective:"Use Skill Badge, Priority Increase UR Hero Skill",resource:"Skill Badge"},

          SOLD1TRN:{objective:"Use Training Boost, Activate Ministry of War",resource:"Training Boost"},
          SOLDT10:{objective:"Train Soldier, Priority Promote T7 to T8",resource:"Soldiers T6 > T7 > T8"},
          SOLDDFT:{objective:"Defeating Soldiers, Alliance Duel",resource:"Attacking"},
          SOLDLST:{objective:"Losing Soldiers, Alliance Duel",resource:"Defense"},
          SOLDMTC:{objective:"Defeating Soldiers (specific match)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Train T6 or T7 Soldiers; Promote on the War Preparation Day",resource:"Soldier T7"},

          HEA1SP:{objective:"Use Healing Speedup, Healing Buff +150%",resource:"Healing Speedup"},
          DYHOSPITAL:{objective:"Do NOT cure Soldiers; Keep them in the Hospital to use healing speedups on the War Day",resource:"Hospital"},

          DYELITE:{objective:"Monsters Elite Blight, get Hero Ticket & Antitoxin",resource:"Monsters"},

          EQGEAR:{objective:"Use Gearstone, Priority at UR Equipment",resource:"Gearstone"},
          EQBPRN:{objective:"Use Gear Blueprint, Promote Additional Stats UR",resource:"Gear Blueprint"},

          SHIELD:{objective:"Active Shields 24H, Buy Free Shield 8H in the Alliance Shop",resource:"Shield"},
          ELIXIR:{objective:"Generate Points by Capturing Buildings",resource:"Elixir Castle"},
          SCRAMBLE:{objective:"100K Honor Points, Capture/Defend a Farm in the mud",resource:"Royal City Farms"},
          KWAR:{objective:"1.5M Honor Points, Defeat/Lose/Heal Soldiers",resource:"Kingdom War (KvK)"},
          CUMULUS:{objective:"Gather Purified Crystal in Cumulus, 30min duration",resource:"Cumulus Crystal"},
          CHEESE7:{objective:"335M Damage to the Cheese Thief Lv.7, 30min duration, 1.4B damage for MVP1",resource:"Cheese Trap"}
        },
        adPhases:{ P00:"Phase 0 : Gathering and Stockpiling", P01:"Phase 1 : Enhance Raven", P02:"Phase 2 : Territory Development", P03:"Phase 3 : Tech Research", P04:"Phase 4 : Hero Growth", P05:"Phase 5 : War Preparation", P06:"Phase 6 : Raid the Enemy" },
        adEvents:{ DY:"Tips Daily", AD:"Alliance Duel", KVK:"Kingdoms War", ROY:"Scramble Royal City", BS:"Battle Survival", EQ:"Gear Upgrade", BEX:"Elixir Scramble", CUM:"Cristal Cruster Valley", CHE:"Cheese Trap" }
    },
    pt: {
        scheduleBattleSurvival:"Cronograma Battle Survival",
        survivalMessage:"Ciclo automático de atividades calculado de acordo com o fuso horário do navegador web, indicando o tempo decorrido do evento atual e quanto falta para terminar.",
        allianceMessage:"Lista de atividades baseadas no Duelo de Alianças, permitindo realizar as atividades do dia atual e futuro, com contadores que indicam quando executá-las caso tenham horário definido ou associando-as à Battle Survival.",
        bsHeaders:["Contador", "Estado", "Evento Battle Survival", "Atividades", "Servidor"],
bsPast:"Finalizada",
bsCurrent:"Em andamento",
bsNext:"Próximo",
        bsEvents:{ BUILD:"Construir Território", HEROE:"Melhorar Heróis", RAVEN:"Melhorar Corvo", SOLDIER:"Treinar Soldados", TECH:"Pesquisa Tecnológica", STANDBY:"Em Espera" },
        scheduleAllianceDuel:"Duelo de Alianças",
        adHeaders:["Contador", "", "Tarefa", "Recurso", "Evento"],
        pageDailyTitle:"Atividades Diárias",
pageDailyLead:"Detalhes das atividades diárias que o ajudarão a melhorar todos os dias.",
        adActivities:{
          ANTX:{objective:"Consuma 660 Antitoxinas",resource:"Suprimentos de Antídoto"},

          STMN:{objective:"Consuma Energia/Stamina, compre 24 garrafas na Shop VIP",resource:"Garrafa de Energia/Stamina"},
          DYBOTT:{objective:"Guarde Garrafas de Energia/Stamina para a Próxima Fase do Corvo",resource:"Garrafa de Energia/Stamina"},
          DYBOTWAR:{objective:"Guarde Garrafas de Energia/Stamina para a Fase de Guerra",resource:"Garrafa de Energia/Stamina"},

          FALCON:{objective:"Complete Missões do Falcão, 10 ou 11 a cada 6 Horas",resource:"Torre do Falcão"},
          DYFALCON:{objective:"Inicie Missões do Falcão, mas não as complete, mantenha 35 ou 40 em espera",resource:"Torre do Falcão"},

          DYHERBS:{objective:"Comece a Coletar Ervas",resource:"Jardim de Ervas Nv.10, 8H, 1.1M"},
          HERBS:{objective:"Colete x60 Ervas, o dia inteiro",resource:"Jardim de Ervas Nv.10, 8H, 1.1M"},
          GRAIN:{objective:"Colete x100 Trigo/Madeira",resource:"Fazenda Nv.10, 6.5H, 2.2M"},

          EPIUR:{objective:"Obtenha Fragmentos de Epígrafe UR, use todos os tipos de Cofre de Epígrafe",resource:"Cofres de Epígrafes"},
          RAVESS:{objective:"Consuma Essência de Corvo, Prioridade",resource:"Essência de Corvo"},
          RAVFRT:{objective:"Consuma Fruta de Corvo",resource:"Fruta de Corvo"},
          RAVCH1:{objective:"Abra Baú de Equipamento de Corvo",resource:"Baú de Corvo"},

          CON1SP:{objective:"Use Aceleração de Construção, Ative Ministério da Construção",resource:"Aceleração de Construção"},
          CONMGH:{objective:"Aumente o Poder de um Edifício, Prefira tempos de construção curtos",resource:"Melhore o Edifício"},

          STDSCR:{objective:"Use Pergaminho de Estudo na pesquisa",resource:"Recompensa do Duelo de Alianças"},
          TCH1SP:{objective:"Use Aceleração de Pesquisa, Ative Ministério da Pesquisa",resource:"Aceleração de Pesquisa"},
          TCHMGH:{objective:"Aumente o Poder de Tecnologia, Pesquise com Pergaminhos de Estudo",resource:"Pergaminho de Estudo"},

          CRVNUR:{objective:"Envie Caravanas UR",resource:"4 Caravanas"},
          OPENUR:{objective:"Execute Operações Secretas UR, mínimo 6, a última é mais difícil",resource:"7 Operações Secretas"},

          TCKSUR:{objective:"Recrute um Sobrevivente uma vez, use TODOS os Tickets de Sobrevivente",resource:"Tickets de Sobrevivente"},
          SAVETS:{objective:"GUARDE TODOS os Tickets de Sobrevivente",resource:"Ticket de Sobrevivente"},
          FREETS:{objective:"Use SOMENTE Tickets GRATUITOS de Sobrevivente",resource:"Ticket de Sobrevivente"},

          TCKHER:{objective:"Recrute Heróis usando Tickets de Herói, +50 você obtém um Herói UR",resource:"TODOS os Tickets de Herói"},
          SAVETH:{objective:"GUARDE TODOS os Tickets de Herói",resource:"Ticket de Herói"},
          FREETH:{objective:"Use SOMENTE Tickets GRATUITOS de Herói",resource:"Ticket de Herói"},

          SHRDSR:{objective:"Consuma Fragmentos de Herói SR", resource:"Loja do Santuário"},
          SHRDSS:{objective:"Consuma Fragmentos de Herói SSR", resource:"Loja do Santuário"},
          SHRDUR:{objective:"Consuma Fragmentos de Herói UR", resource:"Loja do Santuário"},
          SKILLB:{objective:"Use Emblema de Habilidade, Prioridade Aumentar a Habilidade do Herói UR",resource:"Emblema de Habilidade"},

          SOLD1TRN:{objective:"Use Aceleração de Treinamento, Ative Ministério da Guerra",resource:"Aceleração de Treinamento"},
          SOLDT10:{objective:"Treine Soldado, Prioridade Promover T7 a T8",resource:"Soldados T6 > T7 > T8"},
          SOLDDFT:{objective:"Derrote Soldados, Duelo de Alianças",resource:"Atacando"},
          SOLDLST:{objective:"Perca Soldados, Duelo de Alianças",resource:"Defesa"},
          SOLDMTC:{objective:"Derrote Soldados (partida específica)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Treine Soldados T6 ou T7; Promova no Dia de Preparação para a Guerra",resource:"Soldado T7"},

          HEA1SP:{objective:"Use Aceleração de Cura, Bônus de Cura +150%",resource:"Aceleração de Cura"},
          DYHOSPITAL:{objective:"NÃO cure Soldados; Mantenha-os no Hospital para usar aceleradores de cura no dia de Guerra",resource:"Hospital"},

          DYELITE:{objective:"Monstros Elite Praga, obtenha Ticket de Herói e Antitoxina",resource:"Monstros"},

          EQGEAR:{objective:"Use Pedra de Equipamento, Prioridade em Equipamento UR",resource:"Pedra de Equipamento"},
          EQBPRN:{objective:"Use Planta de Equipamento, Promova Estatísticas Adicionais UR",resource:"Planta de Equipamento"},

          SHIELD:{objective:"Ative Escudos 24H, Compre Escudo Grátis 8H na Loja da Aliança",resource:"Escudo"},
          ELIXIR:{objective:"Gere Pontos por Capturar Edifícios",resource:"Castelo do Elixir"},
          SCRAMBLE:{objective:"100K Pontos de Honra, Capture/Defenda uma Fazenda na Lama",resource:"Fazendas da Cidade Real"},
          KWAR:{objective:"1.5M Pontos de Honra, Derrote/Perca/Cure Soldados",resource:"Guerra de Reinos (KvK)"},
          CUMULUS:{objective:"Colete Cristal Purificado nos Cúmulos, 30min de duração",resource:"Cúmulos de Cristal"},
          CHEESE7:{objective:"335M de Dano ao Ladrão de Queijo Lv.7, 30min de duração, 1.4B de dano para o MVP1",resource:"Armadilha de Queijo"}
        },
        adPhases:{ P00:"Fase 0 : Coleta e Reserva", P01:"Fase 1 : Melhorar Corvo", P02:"Fase 2 : Desenvolvimento do Território", P03:"Fase 3 : Pesquisa Tecnológica", P04:"Fase 4 : Crescimento de Heróis", P05:"Fase 5 : Preparação para a Guerra", P06:"Fase 6 : Assaltar o Inimigo" },
        adEvents:{ DY:"Dica Diária", AD:"Duelo de Alianças", KVK:"Guerra de Reinos", ROY:"Tumulto na Cidade Real", BS:"Cronograma Battle Survival", EQ:"Melhoria de Equipamento", BEX:"Batalha do Elixir", CUM:"Vale dos Cumulos de Cristal", CHE:"Armadilha de Queijo" }
    },
    it: {
        scheduleBattleSurvival:"Calendario Battle Survival",
        survivalMessage:"Ciclo automatico delle attività calcolato in base al fuso orario del browser web, indicando il tempo trascorso dell'evento corrente e quanto manca per terminare.",
        allianceMessage:"Elenco delle attività basate sul Duello di Alleanze, che consente di svolgere le attività del giorno corrente e futuro, con contatori che indicano quando eseguirle se hanno un orario definito o collegandole alla Battle Survival.",
        bsHeaders:["Contatore", "Stato", "Evento Battle Survival", "Attività", "Server"],
bsPast:"Conclusa",
bsCurrent:"In corso",
bsNext:"Prossimo",
        bsEvents:{ BUILD:"Costruisci Territorio", HEROE:"Migliora Eroi", RAVEN:"Migliora Corvo", SOLDIER:"Addestra Soldati", TECH:"Ricerca Tecnologica", STANDBY:"In Attesa" },
        scheduleAllianceDuel:"Duello di Alleanze",
        adHeaders:["Contatore", "", "Attività", "Risorsa", "Evento"],
        pageDailyTitle:"Attività Giornaliere",
pageDailyLead:"Dettagli delle attività giornaliere che ti aiuteranno a migliorare ogni giorno.",
        adActivities:{
          ANTX:{objective:"Consuma 660 Antitossine",resource:"Rifornimenti Antidoto"},

          STMN:{objective:"Consuma Energia/Stamina, compra 24 bottiglie nel Shop VIP",resource:"Bottiglia di Energia/Stamina"},
          DYBOTT:{objective:"Salva Bottiglie di Energia/Stamina per la Prossima Fase del Corvo",resource:"Bottiglia di Energia/Stamina"},
          DYBOTWAR:{objective:"Salva Bottiglie di Energia/Stamina per la Fase di Guerra",resource:"Bottiglia di Energia/Stamina"},

          FALCON:{objective:"Completa Missioni del Falco, 10 o 11 ogni 6 Ore",resource:"Torre del Falco"},
          DYFALCON:{objective:"Avvia Missioni del Falco, ma non completarle, mantieni 35 o 40 in attesa",resource:"Torre del Falco"},

          DYHERBS:{objective:"Inizia a Raccogliere Erbe",resource:"Giardino delle Erbe Lv.10, 8H, 1.1M"},
          HERBS:{objective:"Raccogli x60 Erbe, tutto il giorno",resource:"Giardino delle Erbe Lv.10, 8H, 1.1M"},
          GRAIN:{objective:"Raccogli x100 Grano/Legno",resource:"Fattoria Lv.10, 6.5H, 2.2M"},

          EPIUR:{objective:"Ottieni Frammenti di Epigrafe UR, usa ogni tipo di Cofano Epigrafe",resource:"Cofani di Epigrafi"},
          RAVESS:{objective:"Consuma Essenza di Corvo, Priorità",resource:"Essenza di Corvo"},
          RAVFRT:{objective:"Consuma Frutto di Corvo",resource:"Frutto di Corvo"},
          RAVCH1:{objective:"Apri Cofano dell'Equipaggiamento del Corvo",resource:"Cofano del Corvo"},

          CON1SP:{objective:"Usa Accelerazione di Costruzione, Attiva il Ministero della Costruzione",resource:"Accelerazione di Costruzione"},
          CONMGH:{objective:"Aumenta la Potenza di un Edificio, Preferisci tempi di costruzione brevi",resource:"Migliora l'Edificio"},

          STDSCR:{objective:"Usa Pergamena di Studio nella ricerca",resource:"Ricompensa del Duelo delle Alleanze"},
          TCH1SP:{objective:"Usa Accelerazione della Ricerca, Attiva il Ministero della Ricerca",resource:"Accelerazione della Ricerca"},
          TCHMGH:{objective:"Aumenta la Potenza della Tecnologia, Cerca ricerche con Pergamene di Studio",resource:"Pergamena di Studio"},

          CRVNUR:{objective:"Invia Carovane UR",resource:"4 Carovane"},
          OPENUR:{objective:"Esegui Operazioni Segrete UR, minimo 6, l'ultima è più difficile",resource:"7 Operazioni Segrete"},

          TCKSUR:{objective:"Recluta un Sopravvissuto una volta, usa TUTTI i Ticket del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          SAVETS:{objective:"SALVA TUTTI i Ticket del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          FREETS:{objective:"Usa SOLO Ticket GRATIS del Sopravvissuto",resource:"Ticket del Sopravvissuto"},

          TCKHER:{objective:"Recluta Eroi usando i Ticket di Eroe, +50 ottieni un Eroe UR",resource:"TUTTI i Ticket dell'Eroe"},
          SAVETH:{objective:"SALVA TUTTI i Ticket dell'Eroe",resource:"Ticket dell'Eroe"},
          FREETH:{objective:"Usa SOLO Ticket GRATIS dell'Eroe",resource:"Ticket dell'Eroe"},

          SHRDSR:{objective:"Consuma Frammento di Eroe SR", resource:"Negozio del Santuario"},
          SHRDSS:{objective:"Consuma Frammento di Eroe SSR", resource:"Negozio del Santuario"},
          SHRDUR:{objective:"Consuma Frammento di Eroe UR", resource:"Negozio del Santuario"},
          SKILLB:{objective:"Usa Distintivo di Abilità, Priorità Aumenta l'Abilità dell'Eroe UR",resource:"Distintivo di Abilità"},

          SOLD1TRN:{objective:"Usa Accelerazione di Addestramento, Attiva il Ministero della Guerra",resource:"Accelerazione di Addestramento"},
          SOLDT10:{objective:"Addestra un Soldato, Priorità Promozione da T7 a T8", resource:"Soldati T6 > T7 > T8"},
          SOLDDFT:{objective:"Sconfiggi Soldati, Duelo delle Alleanze",resource:"Attacco"},
          SOLDLST:{objective:"Perdi Soldati, Duelo delle Alleanze",resource:"Difesa"},
          SOLDMTC:{objective:"Sconfiggi Soldati (partita specifica)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Addestra Soldati T6 o T7; Promuovi il Giorno di Preparazione alla Guerra",resource:"Soldato T7"},

          HEA1SP:{objective:"Usa Accelerazione di Cura, Bonus di Cura +150%",resource:"Accelerazione di Cura"},
          DYHOSPITAL:{objective:"Non curare i Soldati; Tienili in Ospedale per usare acceleratori di guarigione il giorno della Guerra",resource:"Ospedale"},

          DYELITE:{objective:"Mostri Elite Peste, ottieni Ticket dell'Eroe e Antitossina",resource:"Mostri"},

          EQGEAR:{objective:"Usa Pietra dell'Equipaggiamento, Priorità su Equipaggiamento UR",resource:"Pietra dell'Equipaggiamento"},
          EQBPRN:{objective:"Usa Piano dell'Equipaggiamento, Promuovi Statistiche Aggiuntive UR",resource:"Piano dell'Equipaggiamento"},

          SHIELD:{objective:"Attiva Scudi 24H, Compra Scudo Gratuito 8H nel Negozio dell'Alleanza",resource:"Scudo"},
          ELIXIR:{objective:"Genera Punti per Catturare Edifici",resource:"Castello dell'Elisir"},
          SCRAMBLE:{objective:"100K Punti di Onore, Cattura/Defendi una Fattoria nel Fango",resource:"Fattorie della Città Reale"},
          KWAR:{objective:"1.5M Punti di Onore, Sconfiggi/Perdi/Cura Soldati",resource:"Guerra dei Regni (KvK)"},
          CUMULUS:{objective:"Raccogli Cristallo Purificato nei Cumuli, 30min di durata",resource:"Cumuli di Cristallo"},
          CHEESE7:{objective:"335M di Danno al Ladro di Formaggio Lv.7, 30min di durata, 1.4B di danno per l'MVP1",resource:"Trappola del Formaggio"}
        },
        adPhases:{ P00:"Fase 0 : Raccolta e Riserva", P01:"Fase 1 : Migliora Corvo", P02:"Fase 2 : Sviluppo del Territorio", P03:"Fase 3 : Ricerca Tecnologica", P04:"Fase 4 : Crescita degli Eroi", P05:"Fase 5 : Preparazione alla Guerra", P06:"Fase 6 : Assalta il Nemico" },
        adEvents:{ DY:"Consiglio Giornaliero", AD:"Duello delle Alleanze", KVK:"Guerra tra Regni", ROY:"Tumulto della Città Reale", BS:"Calendario Battle Survival", EQ:"Miglioramento Equipaggiamento", BEX:"Battaglia dell'Elisir", CUM:"Valle dei Cumulo di Cristallo", CHE:"Trappola del Formaggio" }
    },
    fr: {
        scheduleBattleSurvival:"Calendrier Battle Survival",
        survivalMessage:"Cycle automatique des activités calculé selon le fuseau horaire du navigateur web, indiquant le temps écoulé de l'événement actuel et le temps restant avant sa fin.",
        allianceMessage:"Liste d'activités basées sur le Duel d'Alliance, permettant d'effectuer les activités du jour actuel et à venir, avec des compteurs indiquant quand les réaliser si elles ont un horaire défini ou en les associant à la Battle Survival.",
        bsHeaders:["Compteur", "État", "Événement Battle Survival", "Activités", "Serveur"],
bsPast:"Terminée",
bsCurrent:"En cours",
bsNext:"Prochaine",
        bsEvents:{ BUILD:"Construire le Territoire", HEROE:"Améliorer les Héros", RAVEN:"Améliorer Corbeau", SOLDIER:"Entraîner les Soldats", TECH:"Recherche Technologique", STANDBY:"En Attente" },
        scheduleAllianceDuel:"Duel d’Alliance",
        adHeaders:["Compteur", "", "Tâche", "Ressource", "Événement"],
        pageDailyTitle:"Activités Quotidiennes",
pageDailyLead:"Détails des activités quotidiennes qui vous aideront à vous améliorer chaque jour.",
        adActivities:{
          ANTX:{objective:"Consommez 660 Antitoxines",resource:"Fournitures d'Antidote"},

          STMN:{objective:"Consommez de l'Énergie/Endurance, achetez 24 bouteilles dans la Boutique VIP",resource:"Bouteille d'Énergie/Endurance"},
          DYBOTT:{objective:"Sauvegardez des Bouteilles d'Énergie/Endurance pour la Prochaine Phase du Corbeau",resource:"Bouteille d'Énergie/Endurance"},
          DYBOTWAR:{objective:"Sauvegardez des Bouteilles d'Énergie/Endurance pour la Phase de Guerre",resource:"Bouteille d'Énergie/Endurance"},

          FALCON:{objective:"Terminez les Missions du Faucon, 10 ou 11 toutes les 6 Heures",resource:"Tour du Faucon"},
          DYFALCON:{objective:"Lancez des Missions du Faucon, mais ne les terminez pas, gardez 35 ou 40 en attente",resource:"Tour du Faucon"},

          DYHERBS:{objective:"Commencez à Récolter des Herbes",resource:"Jardin d'Herbes Nv.10, 8H, 1.1M"},
          HERBS:{objective:"Récoltez x60 Herbes, toute la journée",resource:"Jardin d'Herbes Nv.10, 8H, 1.1M"},
          GRAIN:{objective:"Récoltez x100 Blé/Bois",resource:"Ferme Nv.10, 6.5H, 2.2M"},

          EPIUR:{objective:"Obtenez des Fragments d'Épigraphe UR, utilisez tous les types de Coffret d'Épigraphe",resource:"Coffrets d'Épigraphes"},
          RAVESS:{objective:"Consommez de l'Essence de Corbeau, Priorité",resource:"Essence de Corbeau"},
          RAVFRT:{objective:"Consommez un Fruit de Corbeau",resource:"Fruit de Corbeau"},
          RAVCH1:{objective:"Ouvrez le Coffret d'Équipement du Corbeau",resource:"Coffret du Corbeau"},

          CON1SP:{objective:"Utilisez une Accélération de Construction, Activez le Ministère de la Construction",resource:"Accélération de Construction"},
          CONMGH:{objective:"Augmentez la Puissance d'un Bâtiment, Préférez des temps de construction plus courts",resource:"Améliorez le Bâtiment"},

          STDSCR:{objective:"Utilisez un Parchemin d'Étude dans la recherche",resource:"Récompense du Duel d'Alliance"},
          TCH1SP:{objective:"Utilisez une Accélération de Recherche, Activez le Ministère de la Recherche",resource:"Accélération de Recherche"},
          TCHMGH:{objective:"Augmentez la Puissance de Technologie, Recherchez avec des Parchemins d'Étude",resource:"Parchemin d'Étude"},

          CRVNUR:{objective:"Envoyez des Caravanes UR",resource:"4 Caravanes"},
          OPENUR:{objective:"Effectuez des Opérations Secrètes UR, minimum 6, la dernière est plus difficile",resource:"7 Opérations Secrètes"},

          TCKSUR:{objective:"Recrutez un Survivant une fois, utilisez TOUS les Tickets de Survivant",resource:"Tickets de Survivant"},
          SAVETS:{objective:"SAUVEGARDEZ TOUS les Tickets de Survivant",resource:"Ticket de Survivant"},
          FREETS:{objective:"Utilisez UNIQUEMENT des Tickets GRATUITS de Survivant",resource:"Ticket de Survivant"},

          TCKHER:{objective:"Recrutez des Héros avec des Tickets de Héros, +50 vous obtenez un Héros UR",resource:"TOUS les Tickets de Héros"},
          SAVETH:{objective:"SAUVEGARDEZ TOUS les Tickets de Héros",resource:"Ticket de Héros"},
          FREETH:{objective:"Utilisez UNIQUEMENT des Tickets GRATUITS de Héros",resource:"Ticket de Héros"},

          SHRDSR:{objective:"Consommez un Fragment de Héros SR", resource:"Boutique du Sanctuaire"},
          SHRDSS:{objective:"Consommez un Fragment de Héros SSR", resource:"Boutique du Sanctuaire"},
          SHRDUR:{objective:"Consommez un Fragment de Héros UR", resource:"Boutique du Sanctuaire"},
          SKILLB:{objective:"Utilisez un Badge de Compétence, Priorité Augmentez la Compétence du Héros UR",resource:"Badge de Compétence"},

          SOLD1TRN:{objective:"Utilisez une Accélération d'Entraînement, Activez le Ministère de la Guerre",resource:"Accélération d'Entraînement"},
          SOLDT10:{objective:"Entraînez un Soldat, Priorité Promotion de T7 à T8", resource:"Soldats T6 > T7 > T8"},
          SOLDDFT:{objective:"Vaincre des Soldats, Duel d'Alliance",resource:"Attaque"},
          SOLDLST:{objective:"Perdre des Soldats, Duel d'Alliance",resource:"Défense"},
          SOLDMTC:{objective:"Vaincre des Soldats (match spécifique)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Entraînez des Soldats T6 ou T7 ; promouvez-les le Jour de Préparation à la Guerre",resource:"Soldat T7"},

          HEA1SP:{objective:"Utilisez une Accélération de Soin, Bonus de Soin +150%",resource:"Accélération de Soin"},
          DYHOSPITAL:{objective:"Ne soignez PAS les Soldats ; gardez-les à l'Hôpital pour utiliser des accélérateurs de soin le Jour de Guerre",resource:"Hôpital"},

          DYELITE:{objective:"Monstres Elite Peste, obtenez un Ticket de Héros et un Antitoxine",resource:"Monstres"},

          EQGEAR:{objective:"Utilisez une Pierre d'Équipement, Priorité sur l'Équipement UR",resource:"Pierre d'Équipement"},
          EQBPRN:{objective:"Utilisez un Plan d'Équipement, promouvez les Statistiques Additionnelles UR",resource:"Plan d'Équipement"},

          SHIELD:{objective:"Activez les Boucliers 24H, Achetez Bouclier Gratuit 8H dans la Boutique de l'Alliance",resource:"Bouclier"},
          ELIXIR:{objective:"Générez des Points en Capturant des Bâtiments",resource:"Château de l'Élixir"},
          SCRAMBLE:{objective:"100K Points d'Honneur, Capturez/Défendez une Ferme dans la Boue",resource:"Fermes de la Cité Royale"},
          KWAR:{objective:"1.5M Points d'Honneur, Vaincre/Perdre/Soigner des Soldats",resource:"Guerre des Royaumes (KvK)"},
          CUMULUS:{objective:"Récoltez du Cristal Purifié dans les Cumuls, 30min de durée",resource:"Cumuls de Cristal"},
          CHEESE7:{objective:"335M de Dégâts au Voleur de Fromage Nv.7, 30min de durée, 1.4B de dégâts pour le MVP1",resource:"Piège à Fromage"}
        },
        adPhases:{ P00:"Phase 0 : Collecte et Réserve", P01:"Phase 1 : Améliorer le Corbeau", P02:"Phase 2 : Développement du Territoire", P03:"Phase 3 : Recherche Technologique", P04:"Phase 4 : Croissance des Héros", P05:"Phase 5 : Préparation à la Guerre", P06:"Phase 6 : Attaquer l'Ennemi" },
        adEvents:{ DY:"Conseil Quotidien", AD:"Duelo d'Alliance", KVK:"Guerre des Royaumes", ROY:"Émeute de la Cité Royale", BS:"Calendrier Battle Survival", EQ:"Amélioration d'Équipement", BEX:"Bataille de l'Élixir", CUM:"Vallée des Amas de Cristal", CHE:"Piège à Fromage" }
    },
    ja: {
        scheduleBattleSurvival:"Battle Survival スケジュール",
        survivalMessage:"ウェブブラウザのタイムゾーンに基づいて計算された自動アクティビティサイクル。現在イベントの経過時間と残り時間を表示します。",
        allianceMessage:"アライアンスデュエルに基づくアクティビティ一覧です。現在と今後の日のアクティビティを実行でき、時間が指定されている場合はカウンターで実行時期を示し、バトルサバイバルに紐づくアクティビティも表示されます。",
        bsHeaders:["カウンター", "状態", "バトルサバイバルイベント", "アクティビティ", "サーバー"],
bsPast:"終了",
bsCurrent:"進行中",
bsNext:"次回",
        bsEvents:{ BUILD:"領土の建設", HEROE:"英雄の強化", RAVEN:"カラスを改善する", SOLDIER:"兵士の訓練", TECH:"技術の研究", STANDBY:"待機" },
        scheduleAllianceDuel:"アライアンスデュエル",
        adHeaders:["カウンター", "", "タスク", "リソース", "イベント"],
        pageDailyTitle:"デイリー活動",
pageDailyLead:"毎日改善するためのデイリー活動の詳細。",
        adActivities:{
          ANTX:{objective:"解毒剤を660個消費する",resource:"解毒剤の物資"},

          STMN:{objective:"エネルギー/スタミナを消費し、VIPショップで24個購入",resource:"エネルギー/スタミナ瓶"},
          DYBOTT:{objective:"次のレイベンフェーズ用にエネルギー/スタミナ瓶を保存",resource:"エネルギー/スタミナ瓶"},
          DYBOTWAR:{objective:"戦争フェーズ用にエネルギー/スタミナ瓶を保存",resource:"エネルギー/スタミナ瓶"},

          FALCON:{objective:"ファルコンミッションを完了する、6時間ごとに10または11",resource:"ファルコンの塔"},
          DYFALCON:{objective:"ファルコンミッションを開始するが完了しない、35または40を待機状態に保つ",resource:"ファルコンの塔"},

          DYHERBS:{objective:"ハーブ採取を開始する",resource:"ハーブ園 Lv.10, 8H, 1.1M"},
          HERBS:{objective:"ハーブを一日中x60採取する",resource:"ハーブ園 Lv.10, 8H, 1.1M"},
          GRAIN:{objective:"穀物/木材をx100採取する",resource:"農園 Lv.10, 6.5H, 2.2M"},

          EPIUR:{objective:"UR碑片を獲得する、すべての種類の碑の宝箱を使う",resource:"碑の宝箱"},
          RAVESS:{objective:"レイベンのエッセンスを消費する、優先",resource:"レイベンのエッセンス"},
          RAVFRT:{objective:"レイベンの果物を消費する",resource:"レイベンの果物"},
          RAVCH1:{objective:"レイベンの装備宝箱を開く",resource:"レイベンの宝箱"},

          CON1SP:{objective:"建設速度アップを使う、建設大臣の役職を発動",resource:"建設速度アップ"},
          CONMGH:{objective:"1つの建物の威力を上げる、より短い建設時間を優先",resource:"建物を強化"},

          STDSCR:{objective:"研究で学習巻軸を使う",resource:"同盟対決の報酬"},
          TCH1SP:{objective:"研究速度アップを使う、研究大臣の役職を発動",resource:"研究速度アップ"},
          TCHMGH:{objective:"技術の威力を上げる、学習巻軸で研究を行う",resource:"学習巻軸"},

          CRVNUR:{objective:"UR隊商を派遣する",resource:"隊商 4つ"},
          OPENUR:{objective:"UR秘密作戦を実行する、最低6回、最後が最も難しい",resource:"秘密作戦 7回"},

          TCKSUR:{objective:"生存者を1回リクルートする、すべての生存者のチケットを使う",resource:"生存者のチケット"},
          SAVETS:{objective:"生存者のチケットをすべて保存する",resource:"生存者のチケット"},
          FREETS:{objective:"無料の生存者のチケットだけを使う",resource:"生存者のチケット"},

          TCKHER:{objective:"英雄のチケットで英雄をリクルートする、+50でUR英雄を獲得",resource:"英雄のすべてのチケット"},
          SAVETH:{objective:"英雄のチケットをすべて保存する",resource:"英雄のチケット"},
          FREETH:{objective:"無料の英雄チケットだけを使う",resource:"英雄のチケット"},

          SHRDSR:{objective:"SR英雄の欠片を消費する", resource:"聖域のショップ"},
          SHRDSS:{objective:"SSR英雄の欠片を消費する", resource:"聖域のショップ"},
          SHRDUR:{objective:"UR英雄の欠片を消費する", resource:"聖域のショップ"},
          SKILLB:{objective:"スキルバッジを使う、優先してUR英雄のスキルを上げる",resource:"スキルバッジ"},

          SOLD1TRN:{objective:"訓練速度アップを使う、戦争大臣の役職を発動",resource:"訓練速度アップ"},
          SOLDT10:{objective:"兵士を訓練する、優先してT7からT8へ昇格", resource:"兵士 T6 > T7 > T8"},
          SOLDDFT:{objective:"兵士を撃破する、同盟対決",resource:"攻撃"},
          SOLDLST:{objective:"兵士を失う、同盟対決",resource:"防御"},
          SOLDMTC:{objective:"兵士を撃破する（特定の戦闘）",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"T6またはT7兵士を訓練し、戦争準備日に昇格させる",resource:"兵士 T7"},

          HEA1SP:{objective:"治療速度アップを使う、治療バフ +150%",resource:"治療速度アップ"},
          DYHOSPITAL:{objective:"兵士を治療しない。戦争当日に治療加速剤を使えるよう病院に保管する",resource:"病院"},

          DYELITE:{objective:"エリートモンスター、英雄チケットと解毒剤を獲得",resource:"モンスター"},

          EQGEAR:{objective:"装備石を使う、優先してUR装備へ",resource:"装備石"},
          EQBPRN:{objective:"装備設計図を使い、URの追加ステータスを昇格",resource:"装備設計図"},

          SHIELD:{objective:"24Hシールドと無料8Hシールドを有効化、.identifier同盟ショップで無料シールドを購入",resource:"シールド"},
          ELIXIR:{objective:"建物を占領してポイントを獲得する", resource:"エリキールの城"},
          SCRAMBLE:{objective:"100K Honorポイント、泥の農園を占領/防衛",resource:"王都農園"},
          KWAR:{objective:"1.5M Honorポイント、兵士を撃破/失う/回復",resource:"王国戦争 (KvK)"},
          CUMULUS:{objective:"30分間クリスタルの山で精製クリスタルを採取する",resource:"クリスタルの山"},
          CHEESE7:{objective:"チーズ泥棒 Lv.7 に335Mダメージ、30分間、1.4BダメージでMVP1",resource:"チーズの罠"}
        },
        adPhases:{ P00:"フェーズ0：収集と備蓄", P01:"フェーズ1：レイベンの強化", P02:"フェーズ2：領土の開発", P03:"フェーズ3：技術の研究", P04:"フェーズ4：英雄の成長", P05:"フェーズ5：戦争の準備", P06:"フェーズ6：敵の襲撃" },
        adEvents:{ DY:"デイリーアドバイス", AD:"アライアンスデュエル", KVK:"王国戦", ROY:"王都の騒動", BS:"Battle Survival スケジュール", EQ:"装備の強化", BEX:"エリキシルの戦い", CUM:"クリスタル堆積の谷", CHE:"チーズの罠" }
    },
    ru: {
        scheduleBattleSurvival:"Расписание Battle Survival",
        survivalMessage:"Автоматический цикл активностей рассчитывается по часовому поясу веб-браузера, показывает прошедшее время текущего события и время до его окончания.",
        allianceMessage:"Список активностей на основе Дуэли Альянсов, позволяющий выполнять задания текущего и будущих дней. Счётчики показывают время выполнения для задач с заданным расписанием или привязанных к Battle Survival.",
        bsHeaders:["Обратный отсчёт", "Статус", "Событие Battle Survival", "Действия", "Сервер"],
bsPast:"Завершено",
bsCurrent:"В процессе",
bsNext:"Следующее",
        bsEvents:{ BUILD:"Построить территорию", HEROE:"Улучшить героев", RAVEN:"Улучшить Ворону", SOLDIER:"Обучить солдат", TECH:"Технологические исследования", STANDBY:"Ожидание" },
        scheduleAllianceDuel:"Дуэль Альянсов",
        adHeaders:["Счётчик", "", "Задача", "Ресурс", "Событие"],
        pageDailyTitle:"Ежедневные активности",
pageDailyLead:"Подробности ежедневных активностей, которые помогут вам постоянно совершенствоваться.",
        adActivities:{
          ANTX:{objective:"Потребить 660 Антитоксинов",resource:"Припасы Антидота"},

          STMN:{objective:"Потребить Энергию/Стамину, купить 24 бутылки в VIP-магазине",resource:"Бутылка Энергии/Стамины"},
          DYBOTT:{objective:"Сохранить Бутылки Энергии/Стамины для Следующей Фазы Ворона",resource:"Бутылка Энергии/Стамины"},
          DYBOTWAR:{objective:"Сохранить Бутылки Энергии/Стамины для Фазы Войны",resource:"Бутылка Энергии/Стамины"},

          FALCON:{objective:"Завершить Миссии Сокола, 10 или 11 каждые 6 Часов",resource:"Башня Сокола"},
          DYFALCON:{objective:"Начать Миссии Сокола, но не завершать их, держите 35 или 40 в ожидании",resource:"Башня Сокола"},

          DYHERBS:{objective:"Начать собирать Травы",resource:"Травяной Сад Ур.10, 8H, 1.1M"},
          HERBS:{objective:"Собирать x60 Трав весь день",resource:"Травяной Сад Ур.10, 8H, 1.1M"},
          GRAIN:{objective:"Собрать x100 Зерна/Древесины",resource:"Ферма Ур.10, 6.5H, 2.2M"},

          EPIUR:{objective:"Получить Осколки Эпиграфа UR, используйте все виды Сундуков Эпиграфов",resource:"Сундуки Эпиграфов"},
          RAVESS:{objective:"Потребить Эссенцию Ворона, Приоритет",resource:"Эссенция Ворона"},
          RAVFRT:{objective:"Потребить Плод Ворона",resource:"Плод Ворона"},
          RAVCH1:{objective:"Открыть Сундук Снаряжения Ворона",resource:"Сундук Ворона"},

          CON1SP:{objective:"Использовать Ускорение Строительства, Активировать Министерство Строительства",resource:"Ускорение Строительства"},
          CONMGH:{objective:"Увеличить Мощь Одного Здания, Предпочтительны более короткие сроки строительства",resource:"Улучшить Здание"},

          STDSCR:{objective:"Использовать Свиток Изучения в исследовании",resource:"Награда за Дуэль Альянсов"},
          TCH1SP:{objective:"Использовать Ускорение Исследований, Активировать Министерство Исследований",resource:"Ускорение Исследований"},
          TCHMGH:{objective:"Увеличить Мощь Технологии, Искать исследования с помощью Свитков Изучения",resource:"Свиток Изучения"},

          CRVNUR:{objective:"Отправить 4 Каравана UR",resource:"4 Каравана"},
          OPENUR:{objective:"Выполнить 7 Скрытых Операций UR, минимум 6, последняя самая сложная",resource:"7 Скрытых Операций"},

          TCKSUR:{objective:"Нанять Выжившего один раз, используйте ВСЕ Билеты Выжившего",resource:"Билеты Выжившего"},
          SAVETS:{objective:"СОХРАНИТЬ ВСЕ Билеты Выжившего",resource:"Билет Выжившего"},
          FREETS:{objective:"Использовать ТОЛЬКО Бесплатные Билеты Выжившего",resource:"Билет Выжившего"},

          TCKHER:{objective:"Нанять Героев с помощью Билетов Героя, +50 получите Героя UR",resource:"ВСЕ Билеты Героя"},
          SAVETH:{objective:"СОХРАНИТЬ ВСЕ Билеты Героя",resource:"Билет Героя"},
          FREETH:{objective:"Использовать ТОЛЬКО Бесплатные Билеты Героя",resource:"Билет Героя"},

          SHRDSR:{objective:"Потребить Осколок Героя SR", resource:"Магазин Святилища"},
          SHRDSS:{objective:"Потребить Осколок Героя SSR", resource:"Магазин Святилища"},
          SHRDUR:{objective:"Потребить Осколок Героя UR", resource:"Магазин Святилища"},
          SKILLB:{objective:"Использовать Значок Навыка, Приоритет повысить Навык Героя UR",resource:"Значок Навыка"},

          SOLD1TRN:{objective:"Использовать Ускорение Обучения, Активировать Министерство Обучения",resource:"Ускорение Обучения"},
          SOLDT10:{objective:"Обучить Солдата, приоритет повышение с T7 до T8", resource:"Солдаты T6 > T7 > T8"},
          SOLDDFT:{objective:"Победить Солдат, Дуэль Альянсов",resource:"Атака"},
          SOLDLST:{objective:"Потерять Солдат, Дуэль Альянсов",resource:"Оборона"},
          SOLDMTC:{objective:"Победить Солдат (конкретный матч)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Обучить Солдат T6 или T7; повысить их в День Подготовки к Войне",resource:"Солдат T7"},

          HEA1SP:{objective:"Использовать Ускорение Лечения, Бонус Лечения +150%",resource:"Ускорение Лечения"},
          DYHOSPITAL:{objective:"Не лечить Солдат; держите их в Госпитале для ускорителей лечения в День Войны",resource:"Госпиталь"},

          DYELITE:{objective:"Элитные Монстры, Чума, получить Билет Героя и Антитоксин",resource:"Монстры"},

          EQGEAR:{objective:"Использовать Камень Снаряжения, Приоритет на Снаряжении UR",resource:"Камень Снаряжения"},
          EQBPRN:{objective:"Использовать Чертёж Снаряжения, повысить Доп. характеристики UR",resource:"Чертёж Снаряжения"},

          SHIELD:{objective:"Активировать Щиты 24H, Купить Бесплатный Щит 8H в Магазине Альянса",resource:"Щит"},
          ELIXIR:{objective:"Получать Очки за Захват Зданий", resource:"Замок Эликсира"},
          SCRAMBLE:{objective:"100K Очков Чести, Захватить/Защитить Ферму в Грязи",resource:"Фермы Королевского Города"},
          KWAR:{objective:"1.5M Очков Чести, Победить/Потерять/Вылечить Солдат",resource:"Война Королевств (KvK)"},
          CUMULUS:{objective:"Собирать Очищенный Кристалл в Кристальных Холмах, 30мин",resource:"Кристальные Холмы"},
          CHEESE7:{objective:"Нанести 335M урона Вору Сыра Ур.7, 30мин, 1.4B урона для MVP1",resource:"Сырная Ловушка"}
        },
        adPhases:{ P00:"Фаза 0 : Сбор и Резерв", P01:"Фаза 1 : Улучшение Ворона", P02:"Фаза 2 : Развитие Территории", P03:"Фаза 3 : Технологические Исследования", P04:"Фаза 4 : Рост Героев", P05:"Фаза 5 : Подготовка к Войне", P06:"Фаза 6 : Поход на Врага" },
        adEvents:{ DY:"Совет Дня", AD:"Дуэль Альянсов", KVK:"Война Королевств", ROY:"Мятеж в Королевском Городе", BS:"Расписание Battle Survival", EQ:"Улучшение Снаряжения", BEX:"Битва Эликсира", CUM:"Долина Кристаллических Наносов", CHE:"Сырная Ловушка" }
    },
    zh: {
        scheduleBattleSurvival:"Battle Survival 日程",
        survivalMessage:"根据网页浏览器时区计算的自动活动周期，显示当前事件的已用时间和剩余时间。",
        allianceMessage:"基于联盟对决的活动列表，可执行当天和未来几天的活动。计数器会显示有指定时间或与 Battle Survival 关联的活动中何时执行。",
        bsHeaders:["倒计时", "状态", "Battle Survival 活动", "任务", "服务器"],
bsPast:"已结束",
bsCurrent:"进行中",
bsNext:"即将开始",
        bsEvents:{ BUILD:"建造领地", HEROE:"强化英雄", RAVEN:"强化渡鸦", SOLDIER:"训练士兵", TECH:"科技研究", STANDBY:"待命" },
        scheduleAllianceDuel:"联盟对决",
        adHeaders:["计数器", "", "任务", "资源", "活动"],
        pageDailyTitle:"每日活动",
pageDailyLead:"每日活动的详细信息，帮助你每天不断进步。",
        adActivities:{
          ANTX:{objective:"消耗660解毒剂",resource:"解毒剂补给"},

          STMN:{objective:"消耗能量/体力，在VIP商店购买24瓶",resource:"能量/体力瓶"},
          DYBOTT:{objective:"为下一渡鸦阶段保存能量/体力瓶",resource:"能量/体力瓶"},
          DYBOTWAR:{objective:"为战争阶段保存能量/体力瓶",resource:"能量/体力瓶"},

          FALCON:{objective:"完成猎鹰任务，每6小时10或11次",resource:"猎鹰塔"},
          DYFALCON:{objective:"开始猎鹰任务，但不要完成，保持35或40个待处理",resource:"猎鹰塔"},

          DYHERBS:{objective:"开始采集草药",resource:"草药园 10 级, 8H, 1.1M"},
          HERBS:{objective:"全天采集x60草药",resource:"草药园 10 级, 8H, 1.1M"},
          GRAIN:{objective:"采集x100谷物/木材",resource:"农场 10 级, 6.5H, 2.2M"},

          EPIUR:{objective:"获取UR碑文碎片，使用所有种类的碑文宝箱",resource:"碑文宝箱"},
          RAVESS:{objective:"消耗渡鸦精华，优先",resource:"渡鸦精华"},
          RAVFRT:{objective:"消耗渡鸦果实",resource:"渡鸦果实"},
          RAVCH1:{objective:"打开渡鸦装备宝箱",resource:"渡鸦宝箱"},

          CON1SP:{objective:"使用建造加速，激活建设大臣",resource:"建造加速"},
          CONMGH:{objective:"提升一座建筑的威力，优先更短的建造时间",resource:"强化建筑"},

          STDSCR:{objective:"在研究中使用研究卷轴",resource:"联盟对决奖励"},
          TCH1SP:{objective:"使用研究加速，激活研究大臣",resource:"研究加速"},
          TCHMGH:{objective:"提升科技战力，使用研究卷轴寻找研究",resource:"研究卷轴"},

          CRVNUR:{objective:"派遣4支UR商队",resource:"4支商队"},
          OPENUR:{objective:"执行7次UR秘密行动，至少6次，最后一次最难",resource:"7次秘密行动"},

          TCKSUR:{objective:"招募一次幸存者，使用所有幸存者票券",resource:"幸存者票券"},
          SAVETS:{objective:"保存所有幸存者票券",resource:"幸存者票券"},
          FREETS:{objective:"仅使用免费幸存者票券",resource:"幸存者票券"},

          TCKHER:{objective:"使用英雄票券招募英雄，+50获得UR英雄",resource:"全部英雄票券"},
          SAVETH:{objective:"保存所有英雄票券",resource:"英雄票券"},
          FREETH:{objective:"仅使用免费英雄票券",resource:"英雄票券"},

          SHRDSR:{objective:"消耗SR英雄碎片", resource:"圣所商店"},
          SHRDSS:{objective:"消耗SSR英雄碎片", resource:"圣所商店"},
          SHRDUR:{objective:"消耗UR英雄碎片", resource:"圣所商店"},
          SKILLB:{objective:"使用技能徽章，优先提升UR英雄技能",resource:"技能徽章"},

          SOLD1TRN:{objective:"使用训练加速，激活战争大臣",resource:"训练加速"},
          SOLDT10:{objective:"训练士兵，优先将T7晋升为T8", resource:"士兵 T6 > T7 > T8"},
          SOLDDFT:{objective:"击败士兵，联盟对决",resource:"攻击"},
          SOLDLST:{objective:"损失士兵，联盟对决",resource:"防御"},
          SOLDMTC:{objective:"击败士兵（指定战斗）",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"训练T6或T7士兵，并在战争准备日晋升他们",resource:"士兵 T7"},

          HEA1SP:{objective:"使用治疗加速，治疗增益 +150%",resource:"治疗加速"},
          DYHOSPITAL:{objective:"不要治疗士兵；将他们保存在医院，以便在战争当天使用治疗加速器",resource:"医院"},

          DYELITE:{objective:"精英怪物、瘟疫，获取英雄票券和解毒剂",resource:"怪物"},

          EQGEAR:{objective:"在UR装备上使用装备石，优先",resource:"装备石"},
          EQBPRN:{objective:"使用装备图纸，晋升UR附加属性",resource:"装备图纸"},

          SHIELD:{objective:"启用 24H 护盾，在联盟商店购买免费 8H 护盾",resource:"护盾"},
          ELIXIR:{objective:"通过占领建筑获得点数", resource:"魔力城堡"},
          SCRAMBLE:{objective:"100K 荣誉点数，占领/防守泥泞中的农场",resource:"王都农场"},
          KWAR:{objective:"1.5M 荣誉点数，击败/失去/治疗士兵",resource:"王国战争 (KvK)"},
          CUMULUS:{objective:"从水晶堆中采集30分钟纯化水晶",resource:"水晶堆"},
          CHEESE7:{objective:"对奶酪小偷 7 级造成335M伤害，持续30分钟，1.4B伤害达成MVP1",resource:"奶酪陷阱"}
        },
        adPhases:{ P00:"阶段 0：收集与储备", P01:"阶段 1：强化渡鸦", P02:"阶段 2：领地发展", P03:"阶段 3：科技研究", P04:"阶段 4：英雄成长", P05:"阶段 5：战前准备", P06:"阶段 6：突袭敌人" },
        adEvents:{ DY:"每日提示", AD:"联盟对决", KVK:"王国战争", ROY:"王都骚乱", BS:"Battle Survival 日程", EQ:"装备升级", BEX:"灵药争夺战", CUM:"水晶堆谷", CHE:"奶酪陷阱" }
    },
    tr: {
        scheduleBattleSurvival:"Hayatta Kalma Savaşı Programı",
        survivalMessage:"Web tarayıcısının saat dilimine göre hesaplanan otomatik etkinlik döngüsü; mevcut etkinliğin geçen ve kalan süresini gösterir.",
        allianceMessage:"İttifak Düellosu'na dayalı etkinlik listesi; mevcut ve gelecek günlerin etkinliklerini gerçekleştirmenizi sağlar. Saatleri belirlenmiş veya Battle Survival'a bağlı etkinliklerde ne zaman yapılacağını sayaçlar gösterir.",
        bsHeaders:["Geri Sayım", "Durum", "Battle Survival Etkinliği", "Aktiviteler", "Sunucu"],
        bsPast:"Tamamlandı",
        bsCurrent:"Devam Ediyor",
        bsNext:"Yaklaşan",
        bsEvents:{
          BUILD:"Bölge İnşa Et",
          HEROE:"Kahramanları Güçlendir",
          RAVEN:"Kargayı İyileştirin",
          SOLDIER:"Askerleri Eğit",
          TECH:"Teknoloji Araştır",
          STANDBY:"Beklemede"
        },
        scheduleAllianceDuel:"İttifak Düellosu",
        adHeaders:["Geri Sayım", "", "Görev", "Kaynak", "Etkinlik"],
        pageDailyTitle:"Günlük Etkinlikler",
        pageDailyLead:"Her gün gelişmene yardımcı olacak günlük etkinliklerin ayrıntıları.",
        adPhases:{
          P00:"Faz 0 : Toplama ve Rezerv",
          P01:"Faz 1 : Kargayı İyileştirin",
          P02:"Faz 2 : Bölge Geliştirme",
          P03:"Faz 3 : Teknoloji Araştırma",
          P04:"Faz 4 : Kahraman Gelişimi",
          P05:"Faz 5 : Savaşa Hazırlık",
          P06:"Faz 6 : Düşmana Baskın"
        },
        adEvents:{ DY:"Günlük İpucu", AD:"İttifak Düellosu", KVK:"Krallıklar Savaşı", ROY:"Kral Şehri Karışıklığı", BS:"Hayatta Kalma Savaşı", EQ:"Ekipman Yükseltme", BEX:"Elixir Savaşı", CUM:"Kristal Yığınları Vadisi", CHE:"Peynir Tuzağı" },
        adActivities:{
          ANTX:{
            objective:"660 Antitoksin tüket",
            resource:"Antidot Malzemeleri"
          },

          STMN:{
            objective:"Enerji/Dayanıklılık tüket, VIP Shop'tan 24 şişe satın al",
            resource:"Enerji/Dayanıklılık Şişesi"
          },
          DYBOTT:{
            objective:"Sonraki Karga Aşaması için Enerji/Dayanıklılık Şişelerini Kaydet",
            resource:"Enerji/Dayanıklılık Şişesi"
          },
          DYBOTWAR:{
            objective:"Savaş Aşaması için Enerji/Dayanıklılık Şişelerini Kaydet",
            resource:"Enerji/Dayanıklılık Şişesi"
          },

          FALCON:{
            objective:"Şahin Görevlerini Tamamla, her 6 Saatte 10 veya 11",
            resource:"Şahin Kulesi"
          },
          DYFALCON:{
            objective:"Şahin Görevlerini başlat ancak tamamlama, 35 veya 40'ı bekletmede tut",
            resource:"Şahin Kulesi"
          },

          DYHERBS:{
            objective:"Ot Toplamaya Başla",
            resource:"Bitki Bahçesi Sv.10, 8S, 1.1M"
          },
          HERBS:{
            objective:"Bütün gün x60 ot topla",
            resource:"Bitki Bahçesi Sv.10, 8S, 1.1M"
          },
          GRAIN:{
            objective:"x100 Tahıl/Odun Topla",
            resource:"Çiftlik Sv.10, 6.5S, 2.2M"
          },

          EPIUR:{
            objective:"UR Epigraf Parçalarını Edin, her türden Epigraf Sandığı kullan",
            resource:"Epigraf Sandıkları"
          },
          RAVESS:{
            objective:"Karga Özünü Tüket, Öncelik",
            resource:"Karga Özü"
          },
          RAVFRT:{
            objective:"Karga Meyvesini Tüket",
            resource:"Karga Meyvesi"
          },
          RAVCH1:{
            objective:"Karga Ekipman Sandığını Aç",
            resource:"Karga Sandığı"
          },

          CON1SP:{
            objective:"İnşa Hızlandırması Kullan, İnşa Bakanlığını Etkinleştir",
            resource:"İnşa Hızlandırması"
          },
          CONMGH:{
            objective:"Bir Binanın Gücünü Artır, Kısa İnşa Sürelerini Tercih Et",
            resource:"Binayı Güçlendir"
          },

          STDSCR:{
            objective:"Araştırmada Öğrenme Kâğıdı Kullan",
            resource:"İttifak Düellosu Ödülü"
          },
          TCH1SP:{
            objective:"Araştırma Hızlandırması Kullan, Araştırma Bakanlığını Etkinleştir",
            resource:"Araştırma Hızlandırması"
          },
          TCHMGH:{
            objective:"Teknoloji Gücünü Artır, Öğrenme Kâğıtlarıyla Araştırma Bul",
            resource:"Öğrenme Kâğıdı"
          },

          CRVNUR:{
            objective:"4 UR Kervanı Gönder",
            resource:"4 Kervan"
          },
          OPENUR:{
            objective:"UR Gizli Operasyonları Yap, en az 6, sonuncusu daha zor",
            resource:"7 Gizli Operasyon"
          },

          TCKSUR:{
            objective:"Bir Hayatta Kalana Bir Kez İşe Al, Tüm Hayatta Kalana Biletlerini Kullan",
            resource:"Hayatta Kalana Biletleri"
          },
          SAVETS:{
            objective:"TÜM Hayatta Kalana Biletlerini Kaydet",
            resource:"Hayatta Kalana Bileti"
          },
          FREETS:{
            objective:"Yalnızca Ücretsiz Hayatta Kalana Biletlerini Kullan",
            resource:"Hayatta Kalana Bileti"
          },

          TCKHER:{
            objective:"Kahraman Biletleriyle Kahraman İşe Al, +50 ile UR Kahraman kazanırsın",
            resource:"TÜM Kahraman Biletleri"
          },
          SAVETH:{
            objective:"TÜM Kahraman Biletlerini Kaydet",
            resource:"Kahraman Bileti"
          },
          FREETH:{
            objective:"Yalnızca Ücretsiz Kahraman Biletlerini Kullan",
            resource:"Kahraman Bileti"
          },

          SHRDSR:{
            objective:"SR Kahraman Parçası Tüket",
            resource:"Kutsal Alan Mağazası"
          },
          SHRDSS:{
            objective:"SSR Kahraman Parçası Tüket",
            resource:"Kutsal Alan Mağazası"
          },
          SHRDUR:{
            objective:"UR Kahraman Parçası Tüket",
            resource:"Kutsal Alan Mağazası"
          },
          SKILLB:{
            objective:"Yetenek Rozeti Kullan, Öncelik UR Kahraman Yeteneğini Artır",
            resource:"Yetenek Rozeti"
          },

          SOLD1TRN:{
            objective:"Eğitim Hızlandırması Kullan, Savaş Bakanlığını Etkinleştir",
            resource:"Eğitim Hızlandırması"
          },
          SOLDT10:{
            objective:"Asker Eğit, Öncelik T7'den T8'e Yükselt",
            resource:"Askerler T6 > T7 > T8"
          },
          SOLDDFT:{
            objective:"Askerleri Yen, İttifak Düellosu",
            resource:"Saldırı"
          },
          SOLDLST:{
            objective:"Askerleri Kaybet, İttifak Düellosu",
            resource:"Savunma"
          },
          SOLDMTC:{
            objective:"Askerleri Yen (belirli maç)",
            resource:"T8 vs T8"
          },
          DYSOLDIER:{
            objective:"T6 veya T7 Askerleri Eğit, Savaş Hazırlık Gününde Yükselt",
            resource:"Asker T7"
          },

          HEA1SP:{
            objective:"İyileşme Hızlandırması Kullan, İyileşme Buff'ı +150%",
            resource:"İyileşme Hızlandırması"
          },
          DYHOSPITAL:{
            objective:"Askerleri İyileştirme, Savaş Günü hızlandırmaları için Hastane'de Tut",
            resource:"Hastane"
          },

          DYELITE:{
            objective:"Elit Canavar Vebası, Kahraman Bileti ve Antitoksin Al",
            resource:"Canavarlar"
          },

          EQGEAR:{
            objective:"Ekipman Taşı Kullan, Öncelik UR Ekipmanda",
            resource:"Ekipman Taşı"
          },
          EQBPRN:{
            objective:"Ekipman Planını Kullan, UR Ek İstatistiklerini Yükselt",
            resource:"Ekipman Planı"
          },

          SHIELD:{
            objective:"24H Kalkanları Aktif Et, İttifak Dükkanından Ücretsiz 8H Kalkan Satın Al",
            resource:"Kalkan"
          },
          ELIXIR:{
            objective:"Binaları Fethederek Puan Üret",
            resource:"Elixir Kalesi"
          },
          SCRAMBLE:{
            objective:"100K Onur Puanı, Çamurdaki Çiftliği Fethet/Koru",
            resource:"Kral Şehri Çiftlikleri"
          },
          KWAR:{
            objective:"1.5M Onur Puanı, Askerleri Yen/Kaybet/İyileştir",
            resource:"Krallıklar Savaşı (KvK)"
          },
          CUMULUS:{
            objective:"30 dakika boyunca Kristal Yığınlarından Saf Kristal Topla",
            resource:"Kristal Yığınları"
          },
          CHEESE7:{
            objective:"Peynir Hırsızı Sv.7'ye 335M Hasar, 30 dakika süre, MVP1 için 1.4B hasar",
            resource:"Peynir Tuzağı"
          }
        }
      }
  };

  Object.keys(texts).forEach(function (lang) {
    window.I18N[lang] = Object.assign(window.I18N[lang] || {}, texts[lang]);
  });
})();
