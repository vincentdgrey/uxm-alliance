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
          ANTX: { objective:"Consume Antitoxinas x660",resource:"Compra Suministros Antidoto"},
          FALCON: { objective:"Completa Misiones del Halcón, 10 ó 11 cada 6 Horas",resource:"Torre del Halcón"},
          EPIUR: {objective:"Obtén Fragmentos de Epígrafe UR",resource:"Abre Cofres de Epígrafes"},
          HERBS: {objective:"Recolecta Hierbas x60, todo el día",resource:"Jardín de Hierbas Nv.10, 8H, 1.1M"},
          GRAIN: {objective:"Recolecta Trigo/Madera x100",resource:"Granja Nv.10, 6.5H, 2.2M"},
          RAVESS:{objective:"Consume Esencia de Cuervo",resource:""},
          RAVFRT:{objective:"Consume Fruta de Cuervo",resource:""},
          STMN: { objective:"Consume Stamina",resource:"Usa Botellas de Stamina"},
          CON1SP:{objective:"Usa Aceleración de Construcción",resource:"Activa Ministerio Construcción"},
          CONMGH:{objective:"Aumenta el Poder de Un Edificio",resource:"Prefiere un tiempo de construcción más corto"},
          CRVNUR:{objective:"Envía Caravanas UR",resource:"4 Caravanas"},
          OPENUR:{objective:"Ejecuta Operaciones Encubiertas UR",resource:"7 Operaciones Encubiertas"},
          TCKSUR:{objective:"Recluta un Superviviente una vez",resource:"TODOS los Tickets de Superviviente"},
          SAVETS:{objective:"GUARDA TODOS los Tickets de Superviviente",resource:"Ticket de Superviviente"},
          FREETS:{objective:"Usa SOLO Tickets GRATIS de Superviviente",resource:"Ticket de Superviviente"},
          RAVCH1:{objective:"Abre Cofre de Equipo de Cuervo",resource:""},
          STDSCR:{objective:"Usa Pergamino de Estudio en la investigación",resource:"Recompensa del Duelo de Alianzas"},
          TCH1SP:{objective:"Usa Aceleración de Investigación",resource:"Activa Ministerio Investigación"},
          TCHMGH:{objective:"Aumenta el Poder de Tecnología",resource:"Buscar Investigaciones con Pergamino de Estudio"},
          SHRDSR:{objective:"Consume Fragmento de Héroe SR",resource:"Tienda Santuario"},
          SHRDSS:{objective:"Consume Fragmento de Héroe SSR",resource:"Tienda Santuario"},
          SHRDUR:{objective:"Consume Fragmento de Héroe UR",resource:"Tienda Santuario"},
          SKILLB:{objective:"Usa Insignia de Habilidad",resource:"Aumenta Habilidad Heroe UR"},
          TCKHER:{objective:"Recluta Héroes usando Tickets",resource:"TODOS los Tickets de Héroe"},
          SAVETH:{objective:"GUARDA TODOS los Tickets de Héroe",resource:"Ticket de Héroe"},
          FREETH:{objective:"Usa SOLO Tickets GRATIS de Héroe",resource:"Ticket de Héroe"},
          SOLD1TRN:{objective:"Usa Aceleración de Entrenamiento",resource:"Activa Ministro de Guerra"},
          SOLDT10:{objective:"Entrena Soldado, Prioridad Promoverlos",resource:"Soldados T6 > T7 > T8"},
          HEA1SP:{objective:"Usa Aceleración de Curación",resource:"Buff de Curación +150%"},
          SOLDDFT:{objective:"Derrota Soldados, Duelo de Alianzas",resource:"Atacando"},
          SOLDLST:{objective:"Pierde Soldados, Duelo de Alianzas",resource:"Defensa"},
          SOLDMTC:{objective:"Derrota Soldados (partida específica)",resource:"T8 vs T8"},
          DYFALCON:{objective:"Inicia Misiones Halcón, pero no las completes, mantiene en espera 35 ó 40 ",resource:"Torre del Halcón"},
          DYELITE:{objective:"Monstruos Elite Plaga, obtén Ticket de Héroe y Antitoxina",resource:""},

          DYBOTT:{objective:"Guarda Botellas de Energía/Stamina para la Próxima Fase del Cuervo",resource:"Botella de Energía/Stamina"},
          DYBOTWAR:{objective:"Guarda Botellas de Stamina para la Fase de Guerra",resource:"Botella de Stamina"},
          DYHERBS:{objective:"Comienza a Recolectar Hierbas",resource:"Jardín de Hierbas Nv.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"Entrena Soldados T6 o T7; promover el Día de Preparación para la Guerra",resource:"Soldado T7"},
          DYHOSPITAL:{objective:"NO Cures Soldados; Guarda en el Hospital para usar aceleradores curación en Guerra",resource:"Hospital"},
          EQGEAR:{objective:"Usa Piedra de Equipo, en Equipo UR",resource:"Mejora el Equipo"},
          EQBPRN:{objective:"Usa Plano de Equipo, promueve Estadísticas Adicionales UR",resource:"Promociona el Equipo"},
          ELIXIR:{objective:"Puntos por Captura de Edificios",resource:"Castillo del Elixir"},
          SCRAMBLE:{objective:"100K Puntos de Honor, Captura/Defiende una Granja en el lodo",resource:"Granjas de la Ciudad Real"},
          KWAR:{objective:"1.5M Puntos de Honor, Derrota/Pierde/Cura Soldados",resource:"Guerra de Reinos (KvK)"},
          SHIELD:{objective:"Activa Escudos 24H, Escudo Gratis 8H",resource:"Tienda de la Alianza"},
          CUMULUS:{objective:"Recolecta Cristal Purificado en Cúmulos, 30min",resource:"Evento Valle Cúmulos de Cristal"}
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
          CUM:"Valle Cúmulos de Cristal"
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
          ANTX:{objective:"Consume 660 Antitoxins",resource:"Purchase Antidote Supplies"},
          FALCON:{objective:"Complete Falcon Missions, 10 or 11 every 6 Hours",resource:"Falcon Tower"},
          EPIUR:{objective:"Get UR Epigraph Shards",resource:"Open Epigraph Chests"},
          HERBS:{objective:"Gather x60 Herbs, all day",resource:"Herb Garden Lv.10, 8H, 1.1M"},
          GRAIN:{objective:"Gather x100 Grain/Timber",resource:"Farm Lv.10, 6.5H, 2.2M"},
          RAVESS:{objective:"Consume Raven Essence",resource:""},
          RAVFRT:{objective:"Consume Raven Fruit",resource:""},
          STMN:{objective:"Consume Stamina",resource:"Use Stamina Bottles"},
          CON1SP:{objective:"Use Construction Speedup", resource:"Activate Construction Ministry"},
          CONMGH:{objective:"Increase the Might of a Building",resource:"Prefer a shorter construction time"},
          CRVNUR:{objective:"Dispatch UR Caravans",resource:"4 Caravan"},
          OPENUR:{objective:"Execute UR Covert Operations",resource:"7 Black Ops"},
          TCKSUR:{objective:"Recruit Survivor once",resource:"ALL Ticket Survivor"},
          SAVETS:{objective:"SAVE ALL Ticket Survivor",resource:"Ticket Survivor"},
          FREETS:{objective:"Use ONLY FREE Ticket Survivor",resource:"Ticket Survivor"},
          RAVCH1:{objective:"Open Raven Gear Chest",resource:""},
          STDSCR:{objective:"Use Study Scroll in research",resource:"Alliance Duel Reward"},
          TCH1SP:{objective:"Use Research Speedup", resource:"Activate Research Ministry"},
          TCHMGH:{objective:"Increase Tech Might", resource:"Find Research with Study Scrolls"},
          SHRDSR:{objective:"Consume SR Hero Shard", resource:"Sanctuary Shop"},
          SHRDSS:{objective:"Consume SSR Hero Shard", resource:"Sanctuary Shop"},
          SHRDUR:{objective:"Consume UR Hero Shard", resource:"Sanctuary Shop"},
          SKILLB:{objective:"Use Skill Badge", resource:"Increase UR Hero Skill"},
          TCKHER:{objective:"Recruit Heroes using Tickets",resource:"ALL Ticket Heroe"},
          SAVETH:{objective:"SAVE ALL Ticket Heroe",resource:"Ticket Heroe"},
          FREETH:{objective:"Use ONLY FREE Ticket Heroe",resource:"Ticket Heroe"},
          SOLD1TRN:{objective:"Use Training Boost", resource:"Activate War Minister"},
          SOLDT10:{objective:"Train Soldier, Priority Promote",resource:"Soldiers T6 > T7 > T8"},
          HEA1SP:{objective:"Use Healing Speedup",resource:"Healing Buff +150%"},
          SOLDDFT:{objective:"Defeating Soldiers, Alliance Duel",resource:"Attacking"},
          SOLDLST:{objective:"Losing Soldiers, Alliance Duel",resource:"Defense"},
          SOLDMTC:{objective:"Defeating Soldiers (specific match)",resource:"T8 vs T8"},
          DYFALCON:{objective:"Start Falcon Missions, but do not complete them, keep 35 or 40 pending",resource:"Falcon Tower"},
          DYELITE:{objective:"Monsters Elite Blight, get Hero Ticket & Antitoxin",resource:""},
          DYBOTT:{objective:"Save Energy/Stamina Bottles for the Next Raven Phase",resource:"Energy/Stamina Bottle"},
          DYBOTWAR:{objective:"Save Stamina Bottles for the War Phase",resource:"Bottle Stamina"},
          DYHERBS:{objective:"Start Gathering Herbs",resource:"Herb Garden Lv.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"Train T6 or T7 Soldiers; promote them on the War Preparation Day",resource:"Soldier T7"},
          DYHOSPITAL:{objective:"Do not cure soldiers; save them in the Hospital to use healing speedups during the War",resource:"Hospital"},
          EQGEAR:{objective:"Use Gearstone, at UR Equipment",resource:"Upgrade Equipment"},
          EQBPRN:{objective:"Use Gear Blueprint, Promote Additional Stats UR",resource:"Promote Equipment"},
          ELIXIR:{objective:"Points for Capturing Buildings", resource:"Elixir Castle"},
          SCRAMBLE:{objective:"100K Honor Points, Capture/Defend a Farm in the mud",resource:"Royal City Farms"},
          KWAR:{objective:"1.5M Honor Points, Defeat/Lose/Heal Soldiers",resource:"Kingdom War (KvK)"},
          SHIELD:{objective:"Active Shields 24H, Free Shield 8H",resource:"Alliance Shop"},
          CUMULUS:{objective:"Gather Purified Crystal in Cumulus, 30min",resource:"Cumulus Crystal Valley Event"}
        },
        adPhases:{ P00:"Phase 0 : Gathering and Stockpiling", P01:"Phase 1 : Enhance Raven", P02:"Phase 2 : Territory Development", P03:"Phase 3 : Tech Research", P04:"Phase 4 : Hero Growth", P05:"Phase 5 : War Preparation", P06:"Phase 6 : Raid the Enemy" },
        adEvents:{ DY:"Tips Daily", AD:"Alliance Duel", KVK:"Kingdoms War", ROY:"Scramble Royal City", BS:"Battle Survival", EQ:"Gear Upgrade", BEX:"Elixir Scramble", CUM:"Cristal Cruster Valley" }
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
          ANTX:{objective:"Consuma 660 Antitoxinas",resource:"Compre Suprimentos de Antídoto"},
          FALCON:{objective:"Complete Missões do Falcão, 10 ou 11 a cada 6 Horas",resource:"Torre do Falcão"},
          EPIUR:{objective:"Obtenha Fragmentos de Epígrafe UR",resource:"Abra Cofres de Epígrafes"},
          HERBS:{objective:"Colete x60 Ervas, o dia inteiro",resource:"Jardim de Ervas Nv.10, 8H, 1.1M"},
          GRAIN:{objective:"Colete x100 Trigo/Madeira",resource:"Fazenda Nv.10, 6.5H, 2.2M"},
          RAVESS:{objective:"Consuma Essência de Corvo",resource:""},
          RAVFRT:{objective:"Consuma Fruta de Corvo",resource:""},
          STMN:{objective:"Consuma Stamina",resource:"Use Garrafas de Stamina"},
          CON1SP:{objective:"Use Aceleração de Construção", resource:"Ative Ministério da Construção"},
          CONMGH:{objective:"Aumente o Poder de um Edifício",resource:"Prefere um tempo de construção mais curto"},
          CRVNUR:{objective:"Envie Caravanas UR",resource:"4 Caravanas"},
          OPENUR:{objective:"Execute Operações Secretas UR",resource:"7 Operações Secretas"},
          TCKSUR:{objective:"Recrute um Sobrevivente uma vez",resource:"TODOS os Tickets de Sobrevivente"},
          SAVETS:{objective:"GUARDE TODOS os Tickets de Sobrevivente",resource:"Ticket de Sobrevivente"},
          FREETS:{objective:"Use SOMENTE Tickets GRATUITOS de Sobrevivente",resource:"Ticket de Sobrevivente"},
          RAVCH1:{objective:"Abra Baú de Equipamento de Corvo",resource:""},
          STDSCR:{objective:"Use Pergaminho de Estudo na pesquisa",resource:"Recompensa do Duelo de Alianças"},
          TCH1SP:{objective:"Use Aceleração de Pesquisa", resource:"Ative Ministério da Pesquisa"},
          TCHMGH:{objective:"Aumente o Poder de Tecnologia", resource:"Pesquise com Pergaminhos de Estudo"},
          SHRDSR:{objective:"Consuma Fragmento de Herói SR", resource:"Loja do Santuário"},
          SHRDSS:{objective:"Consuma Fragmento de Herói SSR", resource:"Loja do Santuário"},
          SHRDUR:{objective:"Consuma Fragmento de Herói UR", resource:"Loja do Santuário"},
          SKILLB:{objective:"Use Emblema de Habilidade", resource:"Aumente a Habilidade do Herói UR"},
          TCKHER:{objective:"Recrute Heróis usando Tickets",resource:"TODOS os Tickets de Herói"},
          SAVETH:{objective:"GUARDE TODOS os Tickets de Herói",resource:"Ticket de Herói"},
          FREETH:{objective:"Use SOMENTE Tickets GRATUITOS de Herói",resource:"Ticket de Herói"},
          SOLD1TRN:{objective:"Use Aceleração de Treinamento", resource:"Ative o Ministro da Guerra"},
          SOLDT10:{objective:"Treine Soldado, Prioridade Promovê-los", resource:"Soldados T6 > T7 > T8"},
          HEA1SP:{objective:"Use Aceleração de Cura",resource:"Bônus de Cura +150%"},
          SOLDDFT:{objective:"Derrote Soldados, Duelo de Alianças",resource:"Atacando"},
          SOLDLST:{objective:"Perca Soldados, Duelo de Alianças",resource:"Defesa"},
          SOLDMTC:{objective:"Derrote Soldados (partida específica)",resource:"T8 vs T8"},
          DYFALCON:{objective:"Inicie Missões do Falcão, mas não as complete, mantenha 35 ou 40 em espera",resource:"Torre do Falcão"},
          DYELITE:{objective:"Monstros Elite Praga, obtenha Ticket de Herói e Antitoxina",resource:""},
          DYBOTT:{objective:"Guarde Garrafas de Energia/Stamina para a Próxima Fase do Corvo",resource:"Garrafa de Energia/Stamina"},
          DYBOTWAR:{objective:"Guarde Garrafas de Stamina para a Fase de Guerra",resource:"Garrafa de Stamina"},
          DYHERBS:{objective:"Comece a Coletar Ervas",resource:"Jardim de Ervas Nv.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"Treine Soldados T6 ou T7; promova-os no Dia de Preparação para a Guerra",resource:"Soldado T7"},
          DYHOSPITAL:{objective:"Não cure soldados; guarde-os no Hospital para usar aceleradores de cura durante a Guerra",resource:"Hospital"},
          EQGEAR:{objective:"Use Pedra de Equipamento, em Equipamento UR",resource:"Melhore o Equipamento"},
          EQBPRN:{objective:"Use Planta de Equipamento, promova Estatísticas Adicionais UR",resource:"Promova o Equipamento"},
          ELIXIR:{objective:"Pontos por Capturar Edifícios", resource:"Castelo do Elixir"},
          SCRAMBLE:{objective:"100K Pontos de Honra, Capture/Defenda uma Fazenda na Lama",resource:"Fazendas da Cidade Real"},
          KWAR:{objective:"1.5M Pontos de Honra, Derrote/Perca/Cure Soldados",resource:"Guerra de Reinos (KvK)"},
          SHIELD:{objective:"Ative Escudos 24H, Escudo Grátis 8H",resource:"Loja da Aliança"},
          CUMULUS:{objective:"Colete Cristal Purificado nos Cúmulos, 30min",resource:"Evento Vale dos Cúmulos de Cristal"}
        },
        adPhases:{ P00:"Fase 0 : Coleta e Reserva", P01:"Fase 1 : Melhorar Corvo", P02:"Fase 2 : Desenvolvimento do Território", P03:"Fase 3 : Pesquisa Tecnológica", P04:"Fase 4 : Crescimento de Heróis", P05:"Fase 5 : Preparação para a Guerra", P06:"Fase 6 : Assaltar o Inimigo" },
        adEvents:{ DY:"Dica Diária", AD:"Duelo de Alianças", KVK:"Guerra de Reinos", ROY:"Tumulto na Cidade Real", BS:"Cronograma Battle Survival", EQ:"Melhoria de Equipamento", BEX:"Batalha do Elixir", CUM:"Vale dos Cumulos de Cristal" }
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
          ANTX:{objective:"Consuma 660 Antitossine",resource:"Acquista Rifornimenti Antidoto"},
          FALCON:{objective:"Completa Missioni del Falco, 10 o 11 ogni 6 Ore",resource:"Torre del Falco"},
          EPIUR:{objective:"Ottieni Frammenti di Epigrafe UR",resource:"Apri Cofani di Epigrafi"},
          HERBS:{objective:"Raccogli x60 Erbe, tutto il giorno",resource:"Giardino delle Erbe Lv.10, 8H, 1.1M"},
          GRAIN:{objective:"Raccogli x100 Grano/Legno",resource:"Fattoria Lv.10, 6.5H, 2.2M"},
          RAVESS:{objective:"Consuma Essenza di Corvo",resource:""},
          RAVFRT:{objective:"Consuma Frutto di Corvo",resource:""},
          STMN:{objective:"Consuma Stamina",resource:"Usa Bottiglie di Stamina"},
          CON1SP:{objective:"Usa Accelerazione di Costruzione", resource:"Attiva il Ministero della Costruzione"},
          CONMGH:{objective:"Aumenta la Potenza di un Edificio",resource:"Preferisci un tempo di costruzione più breve"},
          CRVNUR:{objective:"Invia Carovane UR",resource:"4 Carovane"},
          OPENUR:{objective:"Esegui Operazioni Segrete UR",resource:"7 Operazioni Segrete"},
          TCKSUR:{objective:"Recluta un Sopravvissuto una volta",resource:"TUTTI i Ticket del Sopravvissuto"},
          SAVETS:{objective:"SALVA TUTTI i Ticket del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          FREETS:{objective:"Usa SOLO Ticket GRATIS del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          RAVCH1:{objective:"Apri Cofano dell'Equipaggiamento del Corvo",resource:""},
          STDSCR:{objective:"Usa Pergamena di Studio nella ricerca",resource:"Ricompensa del Duelo delle Alleanze"},
          TCH1SP:{objective:"Usa Accelerazione della Ricerca", resource:"Attiva il Ministero della Ricerca"},
          TCHMGH:{objective:"Aumenta la Potenza della Tecnologia", resource:"Cerca ricerche con Pergamene di Studio"},
          SHRDSR:{objective:"Consuma Frammento di Eroe SR", resource:"Negozio del Santuario"},
          SHRDSS:{objective:"Consuma Frammento di Eroe SSR", resource:"Negozio del Santuario"},
          SHRDUR:{objective:"Consuma Frammento di Eroe UR", resource:"Negozio del Santuario"},
          SKILLB:{objective:"Usa Distintivo di Abilità", resource:"Aumenta l'Abilità dell'Eroe UR"},
          TCKHER:{objective:"Recluta Eroi usando i Ticket",resource:"TUTTI i Ticket dell'Eroe"},
          SAVETH:{objective:"SALVA TUTTI i Ticket dell'Eroe",resource:"Ticket dell'Eroe"},
          FREETH:{objective:"Usa SOLO Ticket GRATIS dell'Eroe",resource:"Ticket dell'Eroe"},
          SOLD1TRN:{objective:"Usa Accelerazione di Addestramento", resource:"Attiva il Ministro della Guerra"},
          SOLDT10:{objective:"Addestra un Soldato, Priorità Promozione", resource:"Soldati T6 > T7 > T8"},
          HEA1SP:{objective:"Usa Accelerazione di Cura",resource:"Bonus di Cura +150%"},
          SOLDDFT:{objective:"Sconfiggi Soldati, Duelo delle Alleanze",resource:"Attacco"},
          SOLDLST:{objective:"Perdi Soldati, Duelo delle Alleanze",resource:"Difesa"},
          SOLDMTC:{objective:"Sconfiggi Soldati (partita specifica)",resource:"T8 vs T8"},
          DYFALCON:{objective:"Avvia Missioni del Falco, ma non completarle, mantieni 35 o 40 in attesa",resource:"Torre del Falco"},
          DYELITE:{objective:"Mostri Elite Peste, ottieni Ticket dell'Eroe e Antitossina",resource:""},
          DYBOTT:{objective:"Salva Bottiglie di Energia/Stamina per la Prossima Fase del Corvo",resource:"Bottiglia di Energia/Stamina"},
          DYBOTWAR:{objective:"Salva Bottiglie di Stamina per la Fase di Guerra",resource:"Bottiglia di Stamina"},
          DYHERBS:{objective:"Inizia a Raccogliere Erbe",resource:"Giardino delle Erbe Lv.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"Addestra Soldati T6 o T7; promuovili il Giorno di Preparazione alla Guerra",resource:"Soldato T7"},
          DYHOSPITAL:{objective:"Non curare i soldati; salvateli nell'Ospedale per usare acceleratori di guarigione durante la Guerra",resource:"Ospedale"},
          EQGEAR:{objective:"Usa Pietra dell'Equipaggiamento, su Equipaggiamento UR",resource:"Migliora l'Equipaggiamento"},
          EQBPRN:{objective:"Usa Piano dell'Equipaggiamento, promuovi Statistiche Aggiuntive UR",resource:"Promuovi l'Equipaggiamento"},
          ELIXIR:{objective:"Punti per Catturare Edifici", resource:"Castello dell'Elisir"},
          SCRAMBLE:{objective:"100K Punti di Onore, Cattura/Defendi una Fattoria nel Fango",resource:"Fattorie della Città Reale"},
          KWAR:{objective:"1.5M Punti di Onore, Sconfiggi/Perdi/Cura Soldati",resource:"Guerra dei Regni (KvK)"},
          SHIELD:{objective:"Attiva Scudi 24H, Scudo Gratuito 8H",resource:"Negozio dell'Alleanza"},
          CUMULUS:{objective:"Raccogli Cristallo Purificato nei Cumuli, 30min",resource:"Evento Valle dei Cumuli di Cristallo"}
        },
        adPhases:{ P00:"Fase 0 : Raccolta e Riserva", P01:"Fase 1 : Migliora Corvo", P02:"Fase 2 : Sviluppo del Territorio", P03:"Fase 3 : Ricerca Tecnologica", P04:"Fase 4 : Crescita degli Eroi", P05:"Fase 5 : Preparazione alla Guerra", P06:"Fase 6 : Assalta il Nemico" },
        adEvents:{ DY:"Consiglio Giornaliero", AD:"Duello delle Alleanze", KVK:"Guerra tra Regni", ROY:"Tumulto della Città Reale", BS:"Calendario Battle Survival", EQ:"Miglioramento Equipaggiamento", BEX:"Battaglia dell'Elisir", CUM:"Valle dei Cumulo di Cristallo" }
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
          ANTX:{objective:"Consommez 660 Antitoxines",resource:"Achetez des Fournitures d'Antidote"},
          FALCON:{objective:"Terminez les Missions du Faucon, 10 ou 11 toutes les 6 Heures",resource:"Tour du Faucon"},
          EPIUR:{objective:"Obtenez des Fragments d'Épigraphe UR",resource:"Ouvrez les Coffrets d'Épigraphes"},
          HERBS:{objective:"Récoltez x60 Herbes, toute la journée",resource:"Jardin d'Herbes Nv.10, 8H, 1.1M"},
          GRAIN:{objective:"Récoltez x100 Blé/Bois",resource:"Ferme Nv.10, 6.5H, 2.2M"},
          RAVESS:{objective:"Consommez de l'Essence de Corbeau",resource:""},
          RAVFRT:{objective:"Consommez un Fruit de Corbeau",resource:""},
          STMN:{objective:"Consommez de l'Endurance",resource:"Utilisez des Bouteilles d'Endurance"},
          CON1SP:{objective:"Utilisez une Accélération de Construction", resource:"Activez le Ministère de la Construction"},
          CONMGH:{objective:"Augmentez la Puissance d'un Bâtiment",resource:"Préférez un temps de construction plus court"},
          CRVNUR:{objective:"Envoyez des Caravanes UR",resource:"4 Caravanes"},
          OPENUR:{objective:"Effectuez des Opérations Secrètes UR",resource:"7 Opérations Secrètes"},
          TCKSUR:{objective:"Recrutez un Survivant une fois",resource:"TOUS les Tickets de Survivant"},
          SAVETS:{objective:"SAUVEGARDEZ TOUS les Tickets de Survivant",resource:"Ticket de Survivant"},
          FREETS:{objective:"Utilisez UNIQUEMENT des Tickets GRATUITS de Survivant",resource:"Ticket de Survivant"},
          RAVCH1:{objective:"Ouvrez le Coffret d'Équipement du Corbeau",resource:""},
          STDSCR:{objective:"Utilisez un Parchemin d'Étude dans la recherche",resource:"Récompense du Duel d'Alliance"},
          TCH1SP:{objective:"Utilisez une Accélération de Recherche", resource:"Activez le Ministère de la Recherche"},
          TCHMGH:{objective:"Augmentez la Puissance de Technologie", resource:"Recherchez avec des Parchemins d'Étude"},
          SHRDSR:{objective:"Consommez un Fragment de Héros SR", resource:"Boutique du Sanctuaire"},
          SHRDSS:{objective:"Consommez un Fragment de Héros SSR", resource:"Boutique du Sanctuaire"},
          SHRDUR:{objective:"Consommez un Fragment de Héros UR", resource:"Boutique du Sanctuaire"},
          SKILLB:{objective:"Utilisez un Badge de Compétence", resource:"Augmentez la Compétence du Héros UR"},
          TCKHER:{objective:"Recrutez des Héros avec des Tickets",resource:"TOUS les Tickets de Héros"},
          SAVETH:{objective:"SAUVEGARDEZ TOUS les Tickets de Héros",resource:"Ticket de Héros"},
          FREETH:{objective:"Utilisez UNIQUEMENT des Tickets GRATUITS de Héros",resource:"Ticket de Héros"},
          SOLD1TRN:{objective:"Utilisez une Accélération d'Entraînement", resource:"Activez le Ministre de la Guerre"},
          SOLDT10:{objective:"Entraînez un Soldat, Priorité Promotion", resource:"Soldats T6 > T7 > T8"},
          HEA1SP:{objective:"Utilisez une Accélération de Soin",resource:"Bonus de Soin +150%"},
          SOLDDFT:{objective:"Vaincre des Soldats, Duel d'Alliance",resource:"Attaque"},
          SOLDLST:{objective:"Perdre des Soldats, Duel d'Alliance",resource:"Défense"},
          SOLDMTC:{objective:"Vaincre des Soldats (match spécifique)",resource:"T8 vs T8"},
          DYFALCON:{objective:"Lancez des Missions du Faucon, mais ne les terminez pas, gardez 35 ou 40 en attente",resource:"Tour du Faucon"},
          DYELITE:{objective:"Monstres Elite Peste, obtenez un Ticket de Héros et un Antitoxine",resource:""},
          DYBOTT:{objective:"Sauvegardez des Bouteilles d'Énergie/Endurance pour la Prochaine Phase du Corbeau",resource:"Bouteille d'Énergie/Endurance"},
          DYBOTWAR:{objective:"Sauvegardez des Bouteilles d'Endurance pour la Phase de Guerre",resource:"Bouteille d'Endurance"},
          DYHERBS:{objective:"Commencez à Récolter des Herbes",resource:"Jardin d'Herbes Nv.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"Entraînez des Soldats T6 ou T7 ; promouvez-les le Jour de Préparation à la Guerre",resource:"Soldat T7"},
          DYHOSPITAL:{objective:"Ne soignez pas les soldats ; conservez-les à l'Hôpital pour utiliser des accélérateurs de soin pendant la Guerre",resource:"Hôpital"},
          EQGEAR:{objective:"Utilisez une Pierre d'Équipement, sur l'Équipement UR",resource:"Améliorez l'Équipement"},
          EQBPRN:{objective:"Utilisez un Plan d'Équipement, promouvez les Statistiques Additionnelles UR",resource:"Promouvez l'Équipement"},
          ELIXIR:{objective:"Points pour Capturer des Bâtiments", resource:"Château de l'Élixir"},
          SCRAMBLE:{objective:"100K Points d'Honneur, Capturez/Défendez une Ferme dans la Boue",resource:"Fermes de la Cité Royale"},
          KWAR:{objective:"1.5M Points d'Honneur, Vaincre/Perdre/Soigner des Soldats",resource:"Guerre des Royaumes (KvK)"},
          SHIELD:{objective:"Activez les Boucliers 24H, Bouclier Gratuit 8H",resource:"Boutique de l'Alliance"},
          CUMULUS:{objective:"Récoltez du Cristal Purifié dans les Cumuls, 30min",resource:"Événement Vallée des Cumuls de Cristal"}
        },
        adPhases:{ P00:"Phase 0 : Collecte et Réserve", P01:"Phase 1 : Améliorer le Corbeau", P02:"Phase 2 : Développement du Territoire", P03:"Phase 3 : Recherche Technologique", P04:"Phase 4 : Croissance des Héros", P05:"Phase 5 : Préparation à la Guerre", P06:"Phase 6 : Attaquer l'Ennemi" },
        adEvents:{ DY:"Conseil Quotidien", AD:"Duelo d'Alliance", KVK:"Guerre des Royaumes", ROY:"Émeute de la Cité Royale", BS:"Calendrier Battle Survival", EQ:"Amélioration d'Équipement", BEX:"Bataille de l'Élixir", CUM:"Vallée des Amas de Cristal" }
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
          ANTX:{objective:"解毒剤を660個消費する",resource:"解毒剤の物資を購入"},
          FALCON:{objective:"ファルコンミッションを完了する、6時間ごとに10または11",resource:"ファルコンの塔"},
          EPIUR:{objective:"UR碑片を獲得する",resource:"碑の宝箱を開く"},
          HERBS:{objective:"ハーブを一日中x60採取する",resource:"ハーブ園 Lv.10, 8H, 1.1M"},
          GRAIN:{objective:"穀物/木材をx100採取する",resource:"農園 Lv.10, 6.5H, 2.2M"},
          RAVESS:{objective:"レイベンのエッセンスを消費する",resource:""},
          RAVFRT:{objective:"レイベンの果物を消費する",resource:""},
          STMN:{objective:"スタミナを消費する",resource:"スタミナ瓶を使う"},
          CON1SP:{objective:"建設速度アップを使う", resource:"建設大臣の役職を発動"},
          CONMGH:{objective:"1つの建物の威力を上げる",resource:"短い建設時間を優先する"},
          CRVNUR:{objective:"UR隊商を4つ派遣する",resource:"隊商 4つ"},
          OPENUR:{objective:"UR秘密作戦を7回実行する",resource:"秘密作戦 7回"},
          TCKSUR:{objective:"生存者を1回リクルートする",resource:"生存者のすべてのチケット"},
          SAVETS:{objective:"生存者のチケットをすべて保存する",resource:"生存者のチケット"},
          FREETS:{objective:"無料の生存者のチケットだけを使う",resource:"生存者のチケット"},
          RAVCH1:{objective:"レイベンの装備宝箱を開く",resource:""},
          STDSCR:{objective:"研究で学習巻軸を使う",resource:"同盟対決の報酬"},
          TCH1SP:{objective:"研究速度アップを使う", resource:"研究大臣の役職を発動"},
          TCHMGH:{objective:"技術の威力を上げる", resource:"学習巻軸で研究を行う"},
          SHRDSR:{objective:"SR英雄の欠片を消費する", resource:"聖域のショップ"},
          SHRDSS:{objective:"SSR英雄の欠片を消費する", resource:"聖域のショップ"},
          SHRDUR:{objective:"UR英雄の欠片を消費する", resource:"聖域のショップ"},
          SKILLB:{objective:"スキルバッジを使う", resource:"UR英雄のスキルを上げる"},
          TCKHER:{objective:"チケットで英雄をリクルートする",resource:"英雄のすべてのチケット"},
          SAVETH:{objective:"英雄のチケットをすべて保存する",resource:"英雄のチケット"},
          FREETH:{objective:"無料の英雄チケットだけを使う",resource:"英雄のチケット"},
          SOLD1TRN:{objective:"訓練速度アップを使う", resource:"戦争大臣の役職を発動"},
          SOLDT10:{objective:"兵士を訓練する。昇格を優先", resource:"兵士 T6 > T7 > T8"},
          HEA1SP:{objective:"治療速度アップを使う",resource:"治療バフ +150%"},
          SOLDDFT:{objective:"兵士を撃破する、同盟対決",resource:"攻撃"},
          SOLDLST:{objective:"兵士を失う、同盟対決",resource:"防御"},
          SOLDMTC:{objective:"兵士を撃破する（特定の戦闘）",resource:"T8 vs T8"},
          DYFALCON:{objective:"ファルコンミッションを開始するが完了しない、35または40を待機状態に保つ",resource:"ファルコンの塔"},
          DYELITE:{objective:"エリートモンスター、英雄チケットと解毒剤を獲得",resource:""},
          DYBOTT:{objective:"次のレイベンフェーズ用にエネルギー/スタミナ瓶を保存",resource:"エネルギー/スタミナ瓶"},
          DYBOTWAR:{objective:"戦争フェーズ用にスタミナボトルを保存",resource:"スタミナ瓶"},
          DYHERBS:{objective:"ハーブ採取を開始する",resource:"ハーブ園 Lv.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"T6またはT7兵士を訓練し、戦争準備日に昇格させる",resource:"兵士 T7"},
          DYHOSPITAL:{objective:"兵士を治療しない。戦争中に治療加速剤を使えるよう病院に保管する",resource:"病院"},
          EQGEAR:{objective:"UR装備で装備石を使う",resource:"装備を強化"},
          EQBPRN:{objective:"装備設計図を使い、URの追加ステータスを昇格",resource:"装備を昇格"},
          ELIXIR:{objective:"建物を占領してポイントを獲得", resource:"エリキールの城"},
          SCRAMBLE:{objective:"100K Honorポイント、泥の農園を占領/防衛",resource:"王都農園"},
          KWAR:{objective:"1.5M Honorポイント、兵士を撃破/失う/回復",resource:"王国戦争 (KvK)"},
          SHIELD:{objective:"24Hシールドと無料8Hシールドを有効化",resource:"同盟ショップ"},
          CUMULUS:{objective:"30分間クリスタルの山で精製クリスタルを採取する",resource:"イベント クリスタル堆積の谷"}
        },
        adPhases:{ P00:"フェーズ0：収集と備蓄", P01:"フェーズ1：レイベンの強化", P02:"フェーズ2：領土の開発", P03:"フェーズ3：技術の研究", P04:"フェーズ4：英雄の成長", P05:"フェーズ5：戦争の準備", P06:"フェーズ6：敵の襲撃" },
        adEvents:{ DY:"デイリーアドバイス", AD:"アライアンスデュエル", KVK:"王国戦", ROY:"王都の騒動", BS:"Battle Survival スケジュール", EQ:"装備の強化", BEX:"エリキシルの戦い", CUM:"クリスタル堆積の谷" }
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
          ANTX:{objective:"Потребить 660 Антитоксинов",resource:"Купить Припасы Антидота"},
          FALCON:{objective:"Завершить Миссии Сокола, 10 или 11 каждые 6 Часов",resource:"Башня Сокола"},
          EPIUR:{objective:"Получить Осколки Эпиграфа UR",resource:"Открыть Сундуки Эпиграфов"},
          HERBS:{objective:"Собирать x60 Трав весь день",resource:"Травяной Сад Ур.10, 8H, 1.1M"},
          GRAIN:{objective:"Собрать x100 Зерна/Древесины",resource:"Ферма Ур.10, 6.5H, 2.2M"},
          RAVESS:{objective:"Потребить Эссенцию Ворона",resource:""},
          RAVFRT:{objective:"Потребить Плод Ворона",resource:""},
          STMN:{objective:"Потребить Стамину",resource:"Использовать Бутылки Стамины"},
          CON1SP:{objective:"Использовать Ускорение Строительства", resource:"Активировать Министерство Строительства"},
          CONMGH:{objective:"Увеличить Мощь Одного Здания",resource:"Предпочтительное время строительства короче"},
          CRVNUR:{objective:"Отправить 4 Каравана UR",resource:"4 Каравана"},
          OPENUR:{objective:"Выполнить 7 Скрытых Операций UR",resource:"7 Скрытых Операций"},
          TCKSUR:{objective:"Нанять Выжившего один раз",resource:"ВСЕ Билеты Выжившего"},
          SAVETS:{objective:"СОХРАНИТЬ ВСЕ Билеты Выжившего",resource:"Билет Выжившего"},
          FREETS:{objective:"Использовать ТОЛЬКО Бесплатные Билеты Выжившего",resource:"Билет Выжившего"},
          RAVCH1:{objective:"Открыть Сундук Снаряжения Ворона",resource:""},
          STDSCR:{objective:"Использовать Свиток Изучения в исследовании",resource:"Награда за Дуэль Альянсов"},
          TCH1SP:{objective:"Использовать Ускорение Исследований", resource:"Активировать Министерство Исследований"},
          TCHMGH:{objective:"Увеличить Мощь Технологии на 1", resource:"Искать исследования с помощью Свитков Изучения"},
          SHRDSR:{objective:"Потребить Осколок Героя SR", resource:"Магазин Святилища"},
          SHRDSS:{objective:"Потребить Осколок Героя SSR", resource:"Магазин Святилища"},
          SHRDUR:{objective:"Потребить Осколок Героя UR", resource:"Магазин Святилища"},
          SKILLB:{objective:"Использовать Значок Навыка", resource:"Повысить Навык Героя UR"},
          TCKHER:{objective:"Нанять Героев с помощью Билетов",resource:"ВСЕ Билеты Героя"},
          SAVETH:{objective:"СОХРАНИТЬ ВСЕ Билеты Героя",resource:"Билет Героя"},
          FREETH:{objective:"Использовать ТОЛЬКО Бесплатные Билеты Героя",resource:"Билет Героя"},
          SOLD1TRN:{objective:"Использовать Ускорение Обучения", resource:"Активировать Министра Войны"},
          SOLDT10:{objective:"Обучить Солдата, приоритет повышение", resource:"Солдаты T6 > T7 > T8"},
          HEA1SP:{objective:"Использовать Ускорение Лечения",resource:"Бонус Лечения +150%"},
          SOLDDFT:{objective:"Победить Солдат, Дуэль Альянсов",resource:"Атака"},
          SOLDLST:{objective:"Потерять Солдат, Дуэль Альянсов",resource:"Оборона"},
          SOLDMTC:{objective:"Победить Солдат (конкретный матч)",resource:"T8 vs T8"},
          DYFALCON:{objective:"Начать Миссии Сокола, но не завершать их, держите 35 или 40 в ожидании",resource:"Башня Сокола"},
          DYELITE:{objective:"Элитные Монстры, Чума, получить Билет Героя и Антитоксин",resource:""},
          DYBOTT:{objective:"Сохранить Бутылки Энергии/Стамины для Следующей Фазы Ворона",resource:"Бутылка Энергии/Стамины"},
          DYBOTWAR:{objective:"Сохранить Бутылки Стамины для Фазы Войны",resource:"Бутылка Стамины"},
          DYHERBS:{objective:"Начать собирать Травы",resource:"Травяной Сад Ур.10, 8H, 1.1M"},
          DYSOLDIER:{objective:"Обучить Солдат T6 или T7; повысить их в День Подготовки к Войне",resource:"Солдат T7"},
          DYHOSPITAL:{objective:"Не лечить солдат; сохранять их в Госпитале для использования ускорителей лечения во время Войны",resource:"Госпиталь"},
          EQGEAR:{objective:"Использовать Камень Снаряжения на Снаряжении UR",resource:"Улучшить Снаряжение"},
          EQBPRN:{objective:"Использовать Чертёж Снаряжения, повысить Доп. характеристики UR",resource:"Повысить Снаряжение"},
          ELIXIR:{objective:"Захватить Здания, получить Очки", resource:"Замок Эликсира"},
          SCRAMBLE:{objective:"100K Очков Чести, Захватить/Защитить Ферму в Грязи",resource:"Фермы Королевского Города"},
          KWAR:{objective:"1.5M Очков Чести, Победить/Потерять/Вылечить Солдат",resource:"Война Королевств (KvK)"},
          SHIELD:{objective:"Активировать Щиты 24H, Бесплатный Щит 8H",resource:"Магазин Альянса"},
          CUMULUS:{objective:"Собирать Очищенный Кристалл в Кристальных Холмах, 30мин",resource:"Событие Долина Кристальных Холмов"}
        },
        adPhases:{ P00:"Фаза 0 : Сбор и Резерв", P01:"Фаза 1 : Улучшение Ворона", P02:"Фаза 2 : Развитие Территории", P03:"Фаза 3 : Технологические Исследования", P04:"Фаза 4 : Рост Героев", P05:"Фаза 5 : Подготовка к Войне", P06:"Фаза 6 : Поход на Врага" },
        adEvents:{ DY:"Совет Дня", AD:"Дуэль Альянсов", KVK:"Война Королевств", ROY:"Мятеж в Королевском Городе", BS:"Расписание Battle Survival", EQ:"Улучшение Снаряжения", BEX:"Битва Эликсира", CUM:"Долина Кристаллических Наносов" }
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
          ANTX:{objective:"消耗660解毒剂",resource:"购买解毒剂补给"},
          FALCON:{objective:"完成猎鹰任务，每6小时10或11次",resource:"猎鹰塔"},
          EPIUR:{objective:"获取UR碑文碎片",resource:"打开碑文宝箱"},
          HERBS:{objective:"全天采集x60草药",resource:"草药园 10 级, 8H, 1.1M"},
          GRAIN:{objective:"采集x100谷物/木材",resource:"农场 10 级, 6.5H, 2.2M"},
          RAVESS:{objective:"消耗渡鸦精华",resource:""},
          RAVFRT:{objective:"消耗渡鸦果实",resource:""},
          STMN:{objective:"消耗体力",resource:"使用体力瓶"},
          CON1SP:{objective:"使用建造加速", resource:"激活建设大臣"},
          CONMGH:{objective:"提升一座建筑的威力",resource:"优先更短的建造时间"},
          CRVNUR:{objective:"派遣4支UR商队",resource:"4支商队"},
          OPENUR:{objective:"执行7次UR秘密行动",resource:"7次秘密行动"},
          TCKSUR:{objective:"招募一次幸存者",resource:"全部幸存者票券"},
          SAVETS:{objective:"保存所有幸存者票券",resource:"幸存者票券"},
          FREETS:{objective:"仅使用免费幸存者票券",resource:"幸存者票券"},
          RAVCH1:{objective:"打开渡鸦装备宝箱",resource:""},
          STDSCR:{objective:"在研究中使用研究卷轴",resource:"联盟对决奖励"},
          TCH1SP:{objective:"使用研究加速", resource:"激活研究大臣"},
          TCHMGH:{objective:"提升科技战力", resource:"使用研究卷轴寻找研究"},
          SHRDSR:{objective:"消耗SR英雄碎片", resource:"圣所商店"},
          SHRDSS:{objective:"消耗SSR英雄碎片", resource:"圣所商店"},
          SHRDUR:{objective:"消耗UR英雄碎片", resource:"圣所商店"},
          SKILLB:{objective:"使用技能徽章", resource:"提升UR英雄技能"},
          TCKHER:{objective:"使用票券招募英雄",resource:"全部英雄票券"},
          SAVETH:{objective:"保存所有英雄票券",resource:"英雄票券"},
          FREETH:{objective:"仅使用免费英雄票券",resource:"英雄票券"},
          SOLD1TRN:{objective:"使用训练加速", resource:"激活战争大臣"},
          SOLDT10:{objective:"训练士兵，优先晋升", resource:"士兵 T6 > T7 > T8"},
          HEA1SP:{objective:"使用治疗加速",resource:"治疗增益 +150%"},
          SOLDDFT:{objective:"击败士兵，联盟对决",resource:"攻击"},
          SOLDLST:{objective:"损失士兵，联盟对决",resource:"防御"},
          SOLDMTC:{objective:"击败士兵（指定战斗）",resource:"T8 vs T8"},
          DYFALCON:{objective:"开始猎鹰任务，但不要完成，保持35或40个待处理",resource:"猎鹰塔"},
          DYELITE:{objective:"精英怪物、瘟疫，获取英雄票券和解毒剂",resource:""},
          DYBOTT:{objective:"为下一渡鸦阶段保存能量/体力瓶",resource:"能量/体力瓶"},
          DYBOTWAR:{objective:"为战争阶段保存体力瓶",resource:"体力瓶"},
          DYHERBS:{objective:"开始采集草药",resource:"草药园 10 级, 8H, 1.1M"},
          DYSOLDIER:{objective:"训练T6或T7士兵，并在战争准备日晋升他们",resource:"士兵 T7"},
          DYHOSPITAL:{objective:"不要治疗士兵；将他们保存在医院，以便在战争期间使用治疗加速器",resource:"医院"},
          EQGEAR:{objective:"在UR装备上使用装备石",resource:"升级装备"},
          EQBPRN:{objective:"使用装备图纸，晋升UR附加属性",resource:"晋升装备"},
          ELIXIR:{objective:"占领建筑，获得点数", resource:"魔力城堡"},
          SCRAMBLE:{objective:"100K 荣誉点数，占领/防守泥泞中的农场",resource:"王都农场"},
          KWAR:{objective:"1.5M 荣誉点数，击败/失去/治疗士兵",resource:"王国战争 (KvK)"},
          SHIELD:{objective:"启用 24H 护盾与免费 8H 护盾",resource:"联盟商店"},
          CUMULUS:{objective:"从水晶堆中采集30分钟纯化水晶",resource:"活动 水晶堆谷"}
        },
        adPhases:{ P00:"阶段 0：收集与储备", P01:"阶段 1：强化渡鸦", P02:"阶段 2：领地发展", P03:"阶段 3：科技研究", P04:"阶段 4：英雄成长", P05:"阶段 5：战前准备", P06:"阶段 6：突袭敌人" },
        adEvents:{ DY:"每日提示", AD:"联盟对决", KVK:"王国战争", ROY:"王都骚乱", BS:"Battle Survival 日程", EQ:"装备升级", BEX:"灵药争夺战", CUM:"水晶堆谷" }
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
        adEvents:{
          DY:"Günlük İpucu",
          AD:"İttifak Düellosu",
          KVK:"Krallıklar Savaşı",
          ROY:"Kral Şehri Karışıklığı",
          BS:"Hayatta Kalma Savaşı",
          EQ:"Ekipman Yükseltme",
          BEX:"Elixir Savaşı",
          CUM:"Kristal Yığınları Vadisi"
        },
        adActivities:{
          ANTX:{
            objective:"660 Antitoksin tüket",
            resource:"Antidot Malzemeleri Satın Al"
          },
          FALCON:{
            objective:"Şahin Görevlerini Tamamla, her 6 Saatte 10 veya 11",
            resource:"Şahin Kulesi"
          },
          EPIUR:{
            objective:"UR Epigraf Parçalarını Edin",
            resource:"Epigraf Sandıklarını Aç"
          },
          HERBS:{
            objective:"Bütün gün x60 ot topla",
            resource:"Bitki Bahçesi Sv.10, 8S, 1.1M"
          },
          GRAIN:{
            objective:"x100 Tahıl/Odun Topla",
            resource:"Çiftlik Sv.10, 6.5S, 2.2M"
          },
          RAVESS:{
            objective:"Karga Özünü Tüket",
            resource:""
          },
          RAVFRT:{
            objective:"Karga Meyvesini Tüket",
            resource:""
          },
          STMN:{
            objective:"Dayanıklılık Tüket",
            resource:"Dayanıklılık Şişeleri Kullan"
          },
          CON1SP:{
            objective:"İnşa Hızlandırması Kullan", resource:"İnşa Bakanlığını Etkinleştir"
          },
          CONMGH:{
            objective:"Bir Binanın Gücünü Artır",
            resource:"Daha kısa inşa süresini tercih et"
          },
          CRVNUR:{
            objective:"4 UR Karavanı Gönder",
            resource:"4 Karavan"
          },
          OPENUR:{
            objective:"7 UR Gizli Operasyonu Gerçekleştir",
            resource:"7 Gizli Operasyon"
          },
          TCKSUR:{
            objective:"Hayatta Kalanı Bir kez Işe Al",
            resource:"TÜM Hayatta Kalan Biletleri"
          },
          SAVETS:{
            objective:"TÜM Hayatta Kalan Biletlerini KAYDET",
            resource:"Hayatta Kalan Bileti"
          },
          FREETS:{
            objective:"YALNIZCA ÜCRETSİZ Hayatta Kalan Biletlerini Kullan",
            resource:"Hayatta Kalan Bileti"
          },
          RAVCH1:{
            objective:"Karga Ekipman Sandığını Aç",
            resource:""
          },
          STDSCR:{
            objective:"Araştırmada Çalışma Parmak Derisi Kullan",
            resource:"İttifak Düellosu Ödülü"
          },
          TCH1SP:{
            objective:"Araştırma Hızlandırması Kullan", resource:"Araştırma Bakanlığını Etkinleştir"
          },
          TCHMGH:{
            objective:"Teknoloji Gücünü Artır", resource:"Çalışma Parmak Derisiyle Araştırma Yap"
          },
          SHRDSR:{
            objective:"SR Kahraman Parçası Tüket", resource:"Kutsal Alan Mağazası"
          },
          SHRDSS:{
            objective:"SSR Kahraman Parçası Tüket", resource:"Kutsal Alan Mağazası"
          },
          SHRDUR:{
            objective:"UR Kahraman Parçası Tüket", resource:"Kutsal Alan Mağazası"
          },
          SKILLB:{
            objective:"Yetenek Rozeti Kullan", resource:"UR Kahramanın Yeteneğini Artır"
          },
          TCKHER:{
            objective:"Biletleri Kullanarak Kahramanları Işe Al",
            resource:"TÜM Kahraman Biletleri"
          },
          SAVETH:{
            objective:"TÜM Kahraman Biletlerini KAYDET",
            resource:"Kahraman Bileti"
          },
          FREETH:{
            objective:"YALNIZCA ÜCRETSİZ Kahraman Biletlerini Kullan",
            resource:"Kahraman Bileti"
          },
          SOLD1TRN:{
            objective:"Eğitim Hızlandırması Kullan", resource:"Savaş Bakanını Etkinleştir"
          },
          SOLDT10:{
            objective:"Asker eğit, terfi önceliği", resource:"Askerler T6 > T7 > T8"
          },
          HEA1SP:{
            objective:"İyileşme Hızlandırması Kullan",
            resource:"İyileşme Buff'ı +150%"
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
          DYFALCON:{
            objective:"Şahin Görevlerini başlat ancak tamamlama, 35 veya 40'ı bekletmede tut",
            resource:"Şahin Kulesi"
          },
          DYELITE:{
            objective:"Elit Canavar Vebası, Kahraman Bileti ve Antitoksin Al",
            resource:""
          },
          DYBOTT:{
            objective:"Sonraki Karga Aşaması için Enerji/Dayanıklılık Şişelerini Kaydet",
            resource:"Enerji/Dayanıklılık Şişesi"
          },
          DYBOTWAR:{
            objective:"Savaş Aşaması için Dayanıklılık Şişelerini Kaydet",
            resource:"Dayanıklılık Şişesi"
          },
          DYHERBS:{
            objective:"Ot Toplamaya Başla",
            resource:"Bitki Bahçesi Sv.10, 8S, 1.1M"
          },
          DYSOLDIER:{
            objective:"T6 veya T7 Askerlerini eğit; Savaş Hazırlık Günü'nde terfi ettir",
            resource:"Asker T7"
          },
          DYHOSPITAL:{
            objective:"Askerleri tedavi etme; Savaş sırasında tedavi hızlandırıcıları kullanmak için Hastane'de sakla",
            resource:"Hastane"
          },
          EQGEAR:{
            objective:"UR Ekipmanda Ekipman Taşı Kullan",
            resource:"Ekipmanı Yükselt"
          },
          EQBPRN:{
            objective:"Ekipman Planını Kullan, UR Ek İstatistikleri Terfi Et",
            resource:"Ekipmanı Terfi Et"
          },
          ELIXIR:{
            objective:"Binaları Yakala, Puan Kazan", resource:"Elixir Kalesi"
          },
          SCRAMBLE:{
            objective:"100K Onur Puanı, Çamurdaki Çiftliği Yakala/Koru",
            resource:"Kral Şehri Çiftlikleri"
          },
          KWAR:{
            objective:"1.5M Onur Puanı, Askerleri Yen/Kaybet/İyileştir",
            resource:"Krallar Savaşı (KvK)"
          },
          SHIELD:{
            objective:"24H Kalkanları Etkinleştir, Ücretsiz 8H Kalkan",
            resource:"İttifak Mağazası"
          },
          CUMULUS:{
            objective:"30dk Kristal Yığınlarından Arıtılmış Kristal Topla",
            resource:"Etkinlik Kristal Yığınları Vadisi"
          }
        }
      }
  };

  Object.keys(texts).forEach(function (lang) {
    window.I18N[lang] = Object.assign(window.I18N[lang] || {}, texts[lang]);
  });
})();
