/* Traducciones propias de esta pagina. Amplian el nucleo común de window.I18N. */
(function () {
  "use strict";

  var texts = {
    es: {
        scheduleBattleSurvival:"Cronograma Batalla Supervivencia",
        survivalMessage:"Ciclo automatico de actividades calculado según el horario del navegador web.",
        bsHeaders:["Contador", "Estado", "Evento", "Actividades", "Servidor"],
        bsPast:"Finalizada",
        bsCurrent:"En curso",
        bsNext:"Próximo",
        bsEvents:{ BUILD:"Construir Territorio", HEROE:"Mejorar Héroes", RAVEN:"Mejorar Raven", SOLDIER:"Entrenar Soldados", TECH:"Investigación Tecnológica", STANDBY:"En Espera" },
        scheduleAllianceDuel:"Duelo de Alianzas",
        adHeaders:["Contador", "", "Tarea", "", "Recurso", "Evento"],
        pageDailyTitle:"Actividades Diarias",
        pageDailyLead:"Detalles de las actividades diarias que te ayudaran a mejorar diariamente.",
        adActivities:{
          ANTX:{objetive:"Consume Antitoxins",resource:"Compra Suministros Antidoto"},
          FAQS:{objetive:"Completa Misiones Halcón",resource:"Torre del Halcón"},
          EPIUR:{objetive:"Obtén Fragmentos de Epígrafe UR",resource:"Abre Cofres de Epígrafes"},
          HERBS:{objetive:"Recolecta Hierbas, todo el día",resource:"Jardín de Hierbas Nv.10, 8H, 1.1M"},
          GRAIN:{objetive:"Recolecta 100 Trigo/100 Madera",resource:"Granja Nv.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"Consume Esencia de Cuervo",resource:""},
          RAVFRT:{objetive:"Consume Fruta de Cuervo",resource:""},
          STMN:{objetive:"Consume Stamina",resource:"Usa Botellas de Stamina"},
          CON1SP:{objetive:"Usa Aceleración de Construcción",resource:"Activa Ministerio Construcción"},
          CONMGH:{objetive:"Aumenta el Poder de Edificio",resource:"Prefiere un tiempo de construcción más corto"},
          CRVNUR:{objetive:"Envía una Caravana UR",resource:""},
          OPENUR:{objetive:"Ejecuta una Operación Encubierta UR",resource:""},
          TCKSUR:{objetive:"Recluta un Superviviente una vez",resource:"TODOS los Tickets de Superviviente"},
          SAVETS:{objetive:"GUARDA TODOS los Tickets de Superviviente",resource:"Ticket de Superviviente"},
          FREETS:{objetive:"Usa SOLO Tickets GRATIS de Superviviente",resource:"Ticket de Superviviente"},
          RAVCH1:{objetive:"Abre Cofre de Equipo de Cuervo",resource:""},
          STDSCR:{objetive:"Usa Pergamino de Estudio en la investigación",resource:"Recompensa del Duelo de Alianzas"},
          TCH1SP:{objetive:"Usa Aceleración de Investigación",resource:"Activa Ministerio Investigación"},
          TCHMGH:{objetive:"Aumenta el Poder de Tecnología",resource:"Buscar Investigaciones con Pergamino de Estudio"},
          SHRDSR:{objetive:"Consume Fragmento de Héroe SR",resource:"Tienda Santuario"},
          SHRDSS:{objetive:"Consume Fragmento de Héroe SSR",resource:"Tienda Santuario"},
          SHRDUR:{objetive:"Consume Fragmento de Héroe UR",resource:"Tienda Santuario"},
          SKILLB:{objetive:"Usa Insignia de Habilidad",resource:"Aumenta Habilidad Heroe UR"},
          TCKHER:{objetive:"Recluta Héroes usando Tickets",resource:"TODOS los Tickets de Héroe"},
          SAVETH:{objetive:"GUARDA TODOS los Tickets de Héroe",resource:"Ticket de Héroe"},
          FREETH:{objetive:"Usa SOLO Tickets GRATIS de Héroe",resource:"Ticket de Héroe"},
          SOLD1TRN:{objetive:"Usa Aceleración de Entrenamiento",resource:"Activa Ministro de Guerra"},
          SOLDT10:{objetive:"Entrena Soldado, prefieres promoverlos",resource:"Promociona Soldados"},
          HEA1SP:{objetive:"Usa Aceleración de Curación",resource:"Buff de Curación +150%"},
          SOLDDFT:{objetive:"Derrota Soldados, Duelo de Alianzas",resource:"Atacando"},
          SOLDLST:{objetive:"Pierde Soldados, Duelo de Alianzas",resource:"Defensa"},
          SOLDMTC:{objetive:"Derrota Soldados (partida específica)",resource:"T8 vs T8"},
          DYFALCON:{objetive:"Inicia Misiones Halcón, pero no las completes",resource:"Guarda 35 Misiones Halcón"},
          DYELITE:{objetive:"Monstruos Elite Plaga, obtén Ticket de Héroe y Antitoxina",resource:""},
          DYBOTT:{objetive:"Guarda Stamina",resource:"Botella de Stamina"},
          DYHERBS:{objetive:"Comienza a Recolectar Hierbas",resource:"Jardín de Hierbas Nv.10, 8H, 1.1M"},
          EQGEAR:{objetive:"Usa Piedra de Equipo, en Equipo UR",resource:"Mejora el Equipo"},
          EQBPRN:{objetive:"Usa Plano de Equipo, promueve Estadísticas Adicionales UR",resource:"Promociona el Equipo"},
          ELIXIR:{objetive:"Puntos por Captura de Edificios",resource:"Castillo del Elixir"},
          SCRAMBLE:{objetive:"Captura/Defiende la Granja, 100K Puntos de Honor",resource:"Granja de la Ciudad Real en el Lodo"},
          KWAR:{objetive:"Mata/derrota Soldados, 1.5M Puntos de Honor",resource:"Guerra de Reinos"},
          SHIELD:{objetive:"Activa Escudos 24H, Escudo Gratis 8H",resource:"Tienda de la Alianza"},
          CUMULUS:{objetive:"Recolecta Cristal 30min, desde Cúmulos",resource:"Evento Valle Cúmulos de Cristal"}
        },
        adPhases:{ P00:"Fase 0 : Preparación", P01:"Fase 1 : Mejorar Cuervo", P02:"Fase 2 : Desarrollo del Territorio", P03:"Fase 3 : Investigación Tecnológica", P04:"Fase 4 : Crecimiento de Héroes", P05:"Fase 5 : Preparación para la Guerra", P06:"Fase 6 : Asalta al Enemigo" },
        adEvents:{ DY:"Consejo Diario", AD:"Duelo de Alianza", KVK:"Guerra de Reinos", ROY:"Alboroto Ciudad Real", BS:"Batalla Supervivencia", EQ:"Mejora de Equipo", BEX:"Batalla del Elixir", CUM:"Valle Cúmulos de Cristal" }
    },
    en: {
        scheduleBattleSurvival:"Battle Survival Schedule",
        survivalMessage:"Automatic activity cycle calculated according to the web browser time zone.",
        bsHeaders:["Counter", "Status", "Event", "Activities", "Server"],
bsPast:"Finished",
bsCurrent:"In progress",
bsNext:"Upcoming",
        bsEvents:{ BUILD:"Build Territory", HEROE:"Enhance Heroes", RAVEN:"Enhance Raven", SOLDIER:"Train Soldiers", TECH:"Technology Research", STANDBY:"Stand by" },
        scheduleAllianceDuel:"Alliance Duel",
        adHeaders:["Counter", "", "Task", "", "Resource", "Event"],
        pageDailyTitle:"Daily Activities",
pageDailyLead:"Details of the daily activities that will help you improve every day.",
        adActivities:{
          ANTX:{objetive:"Consume Antitoxins",resource:"Purchase Antidote Supplies"},
          FAQS:{objetive:"Complete Falcon Missions",resource:"Falcon Tower"},
          EPIUR:{objetive:"Get UR Epigraph Shards",resource:"Open Epigraph Chests"},
          HERBS:{objetive:"Gather Herbs, all day",resource:"Herb Garden Lv.10, 8H, 1.1M"},
          GRAIN:{objetive:"Gather 100 Grain/100 Timber",resource:"Farm Lv.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"Consume Raven Essence",resource:""},
          RAVFRT:{objetive:"Consume Raven Fruit",resource:""},
          STMN:{objetive:"Consume Stamina",resource:"Use Stamina Bottles"},
          CON1SP:{objetive:"Use Construction Speedup", resource:"Activate Construction Ministry"},
          CONMGH:{objetive:"Increase Building Might",resource:"Prefer a shorter construction time"},
          CRVNUR:{objetive:"Dispatch UR Caravan",resource:""},
          OPENUR:{objetive:"Execute UR Covert Operation",resource:""},
          TCKSUR:{objetive:"Recruit Survivor once",resource:"ALL Ticket Survivor"},
          SAVETS:{objetive:"SAVE ALL Ticket Survivor",resource:"Ticket Survivor"},
          FREETS:{objetive:"Use ONLY FREE Ticket Survivor",resource:"Ticket Survivor"},
          RAVCH1:{objetive:"Open Raven Gear Chest",resource:""},
          STDSCR:{objetive:"Use Study Scroll in research",resource:"Alliance Duel Reward"},
          TCH1SP:{objetive:"Use Research Speedup", resource:"Activate Research Ministry"},
          TCHMGH:{objetive:"Increase Tech Might", resource:"Find Research with Study Scrolls"},
          SHRDSR:{objetive:"Consume SR Hero Shard", resource:"Sanctuary Shop"},
          SHRDSS:{objetive:"Consume SSR Hero Shard", resource:"Sanctuary Shop"},
          SHRDUR:{objetive:"Consume UR Hero Shard", resource:"Sanctuary Shop"},
          SKILLB:{objetive:"Use Skill Badge", resource:"Increase UR Hero Skill"},
          TCKHER:{objetive:"Recruit Heroes using Tickets",resource:"ALL Ticket Heroe"},
          SAVETH:{objetive:"SAVE ALL Ticket Heroe",resource:"Ticket Heroe"},
          FREETH:{objetive:"Use ONLY FREE Ticket Heroe",resource:"Ticket Heroe"},
          SOLD1TRN:{objetive:"Use Training Boost", resource:"Activate War Minister"},
          SOLDT10:{objetive:"Train Soldier, prefer to promote them", resource:"Promote Soldiers"},
          HEA1SP:{objetive:"Use Healing Speedup",resource:"Healing Buff +150%"},
          SOLDDFT:{objetive:"Defeating Soldiers, Alliance Duel",resource:"Attacking"},
          SOLDLST:{objetive:"Losing Soldiers, Alliance Duel",resource:"Defense"},
          SOLDMTC:{objetive:"Defeating Soldiers (specific match)",resource:"T8 vs T8"},
          DYFALCON:{objetive:"Run Falcon Missions, but do not complete them",resource:"Save 35 Falcon Missions"},
          DYELITE:{objetive:"Monsters Elite Blight, get Hero Ticket & Antitoxin",resource:""},
          DYBOTT:{objetive:"Save Stamina",resource:"Bottle Stamina"},
          DYHERBS:{objetive:"Start Gathering Herbs",resource:"Herb Garden Lv.10, 8H, 1.1M"},
          EQGEAR:{objetive:"Use Gearstone, at UR Equipment",resource:"Upgrade Equipment"},
          EQBPRN:{objetive:"Use Gear Blueprint, Promote Additional Stats UR",resource:"Promote Equipment"},
          ELIXIR:{objetive:"Points for Capturing Buildings", resource:"Elixir Castle"},
          SCRAMBLE:{objetive:"Capture/Defense Farm, 100K Point Honor",resource:"Farm Royal City in Mud"},
          KWAR:{objetive:"Kill/Defeat Soldiers, 1.5M Point Honor",resource:"Kingdom War"},
          SHIELD:{objetive:"Active Shields 24H, Free Shield 8H",resource:"Alliance Shop"},
          CUMULUS:{objetive:"30min Gather Cristal, from Cumulus",resource:"Event Culumus Valley"}
        },
        adPhases:{ P00:"Phase 0 : Preparation", P01:"Phase 1 : Enhance Raven", P02:"Phase 2 : Territory Development", P03:"Phase 3 : Tech Research", P04:"Phase 4 : Hero Growth", P05:"Phase 5 : War Preparation", P06:"Phase 6 : Raid the Enemy" },
        adEvents:{ DY:"Tips Daily", AD:"Alliance Duel", KVK:"Kingdoms War", ROY:"Scramble Royal City", BS:"Battle Survival", EQ:"Gear Upgrade", BEX:"Elixir Scramble", CUM:"Cristal Cruster Valley" }
    },
    pt: {
        scheduleBattleSurvival:"Cronograma Battle Survival",
        survivalMessage:"Ciclo automático de atividades calculado de acordo com o fuso horário do navegador web.",
        bsHeaders:["Contador", "Estado", "Evento", "Atividades", "Servidor"],
bsPast:"Finalizada",
bsCurrent:"Em andamento",
bsNext:"Próximo",
        bsEvents:{ BUILD:"Construir Território", HEROE:"Melhorar Heróis", RAVEN:"Melhorar Raven", SOLDIER:"Treinar Soldados", TECH:"Pesquisa Tecnológica", STANDBY:"Em Espera" },
        scheduleAllianceDuel:"Duelo de Alianças",
        adHeaders:["Contador", "", "Tarefa", "", "Recurso", "Evento"],
        pageDailyTitle:"Atividades Diárias",
pageDailyLead:"Detalhes das atividades diárias que o ajudarão a melhorar todos os dias.",
        adActivities:{
          ANTX:{objetive:"Consuma Antitoxinas",resource:"Compre Suprimentos de Antídoto"},
          FAQS:{objetive:"Complete Missões do Falcão",resource:"Torre do Falcão"},
          EPIUR:{objetive:"Obtenha Fragmentos de Epígrafe UR",resource:"Abra Cofres de Epígrafes"},
          HERBS:{objetive:"Colete Ervas, o dia inteiro",resource:"Jardim de Ervas Nv.10, 8H, 1.1M"},
          GRAIN:{objetive:"Colete 100 Trigo/100 Madeira",resource:"Fazenda Nv.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"Consuma Essência de Corvo",resource:""},
          RAVFRT:{objetive:"Consuma Fruta de Corvo",resource:""},
          STMN:{objetive:"Consuma Stamina",resource:"Use Garrafas de Stamina"},
          CON1SP:{objetive:"Use Aceleração de Construção", resource:"Ative Ministério da Construção"},
          CONMGH:{objetive:"Aumente o Poder de Edifício",resource:"Prefere um tempo de construção mais curto"},
          CRVNUR:{objetive:"Envie uma Caravana UR",resource:""},
          OPENUR:{objetive:"Execute uma Operação Secreta UR",resource:""},
          TCKSUR:{objetive:"Recrute um Sobrevivente uma vez",resource:"TODOS os Tickets de Sobrevivente"},
          SAVETS:{objetive:"GUARDE TODOS os Tickets de Sobrevivente",resource:"Ticket de Sobrevivente"},
          FREETS:{objetive:"Use SOMENTE Tickets GRATUITOS de Sobrevivente",resource:"Ticket de Sobrevivente"},
          RAVCH1:{objetive:"Abra Baú de Equipamento de Corvo",resource:""},
          STDSCR:{objetive:"Use Pergaminho de Estudo na pesquisa",resource:"Recompensa do Duelo de Alianças"},
          TCH1SP:{objetive:"Use Aceleração de Pesquisa", resource:"Ative Ministério da Pesquisa"},
          TCHMGH:{objetive:"Aumente o Poder de Tecnologia", resource:"Pesquise com Pergaminhos de Estudo"},
          SHRDSR:{objetive:"Consuma Fragmento de Herói SR", resource:"Loja do Santuário"},
          SHRDSS:{objetive:"Consuma Fragmento de Herói SSR", resource:"Loja do Santuário"},
          SHRDUR:{objetive:"Consuma Fragmento de Herói UR", resource:"Loja do Santuário"},
          SKILLB:{objetive:"Use Emblema de Habilidade", resource:"Aumente a Habilidade do Herói UR"},
          TCKHER:{objetive:"Recrute Heróis usando Tickets",resource:"TODOS os Tickets de Herói"},
          SAVETH:{objetive:"GUARDE TODOS os Tickets de Herói",resource:"Ticket de Herói"},
          FREETH:{objetive:"Use SOMENTE Tickets GRATUITOS de Herói",resource:"Ticket de Herói"},
          SOLD1TRN:{objetive:"Use Aceleração de Treinamento", resource:"Ative o Ministro da Guerra"},
          SOLDT10:{objetive:"Treine Soldado, prefira promovê-los", resource:"Promova Soldados"},
          HEA1SP:{objetive:"Use Aceleração de Cura",resource:"Bônus de Cura +150%"},
          SOLDDFT:{objetive:"Derrote Soldados, Duelo de Alianças",resource:"Atacando"},
          SOLDLST:{objetive:"Perca Soldados, Duelo de Alianças",resource:"Defesa"},
          SOLDMTC:{objetive:"Derrote Soldados (partida específica)",resource:"T8 vs T8"},
          DYFALCON:{objetive:"Inicie Missões do Falcão, mas não as complete",resource:"Guarde 35 Missões do Falcão"},
          DYELITE:{objetive:"Monstros Elite Praga, obtenha Ticket de Herói e Antitoxina",resource:""},
          DYBOTT:{objetive:"Guarde Stamina",resource:"Garrafa de Stamina"},
          DYHERBS:{objetive:"Comece a Coletar Ervas",resource:"Jardim de Ervas Nv.10, 8H, 1.1M"},
          EQGEAR:{objetive:"Use Pedra de Equipamento, em Equipamento UR",resource:"Melhore o Equipamento"},
          EQBPRN:{objetive:"Use Planta de Equipamento, promova Estatísticas Adicionais UR",resource:"Promova o Equipamento"},
          ELIXIR:{objetive:"Pontos por Capturar Edifícios", resource:"Castelo do Elixir"},
          SCRAMBLE:{objetive:"Capture/Defenda a Fazenda, 100K Pontos de Honra",resource:"Fazenda da Cidade Real na Lama"},
          KWAR:{objetive:"Mate/derrote Soldados, 1.5M Pontos de Honra",resource:"Guerra de Reinos"},
          SHIELD:{objetive:"Ative Escudos 24H, Escudo Grátis 8H",resource:"Loja da Aliança"},
          CUMULUS:{objetive:"Colete Cristal 30min, dos Cumulos",resource:"Evento Vale dos Cumulos de Cristal"}
        },
        adPhases:{ P00:"Fase 0 : Preparação", P01:"Fase 1 : Melhorar Corvo", P02:"Fase 2 : Desenvolvimento do Território", P03:"Fase 3 : Pesquisa Tecnológica", P04:"Fase 4 : Crescimento de Heróis", P05:"Fase 5 : Preparação para a Guerra", P06:"Fase 6 : Assaltar o Inimigo" },
        adEvents:{ DY:"Dica Diária", AD:"Duelo de Alianças", KVK:"Guerra de Reinos", ROY:"Tumulto na Cidade Real", BS:"Cronograma Battle Survival", EQ:"Melhoria de Equipamento", BEX:"Batalha do Elixir", CUM:"Vale dos Cumulos de Cristal" }
    },
    it: {
        scheduleBattleSurvival:"Calendario Battle Survival",
        survivalMessage:"Ciclo automatico delle attività calcolato in base al fuso orario del browser web.",
        bsHeaders:["Contatore", "Stato", "Evento", "Attività", "Server"],
bsPast:"Conclusa",
bsCurrent:"In corso",
bsNext:"Prossimo",
        bsEvents:{ BUILD:"Costruisci Territorio", HEROE:"Migliora Eroi", RAVEN:"Migliora Raven", SOLDIER:"Addestra Soldati", TECH:"Ricerca Tecnologica", STANDBY:"In Attesa" },
        scheduleAllianceDuel:"Duello di Alleanze",
        adHeaders:["Contatore", "", "Attività", "", "Risorsa", "Evento"],
        pageDailyTitle:"Attività Giornaliere",
pageDailyLead:"Dettagli delle attività giornaliere che ti aiuteranno a migliorare ogni giorno.",
        adActivities:{
          ANTX:{objetive:"Consuma Antitossine",resource:"Acquista Rifornimenti Antidoto"},
          FAQS:{objetive:"Completa Missioni del Falco",resource:"Torre del Falco"},
          EPIUR:{objetive:"Ottieni Frammenti di Epigrafe UR",resource:"Apri Cofani di Epigrafi"},
          HERBS:{objetive:"Raccogli Erbe, tutto il giorno",resource:"Giardino delle Erbe Lv.10, 8H, 1.1M"},
          GRAIN:{objetive:"Raccogli 100 Grano/100 Legno",resource:"Fattoria Lv.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"Consuma Essenza di Corvo",resource:""},
          RAVFRT:{objetive:"Consuma Frutto di Corvo",resource:""},
          STMN:{objetive:"Consuma Stamina",resource:"Usa Bottiglie di Stamina"},
          CON1SP:{objetive:"Usa Accelerazione di Costruzione", resource:"Attiva il Ministero della Costruzione"},
          CONMGH:{objetive:"Aumenta la Potenza di Edificio",resource:"Preferisci un tempo di costruzione più breve"},
          CRVNUR:{objetive:"Invia una Carovana UR",resource:""},
          OPENUR:{objetive:"Esegui un'Operazione Segreta UR",resource:""},
          TCKSUR:{objetive:"Recluta un Sopravvissuto una volta",resource:"TUTTI i Ticket del Sopravvissuto"},
          SAVETS:{objetive:"SALVA TUTTI i Ticket del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          FREETS:{objetive:"Usa SOLO Ticket GRATIS del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          RAVCH1:{objetive:"Apri Cofano dell'Equipaggiamento del Corvo",resource:""},
          STDSCR:{objetive:"Usa Pergamena di Studio nella ricerca",resource:"Ricompensa del Duelo delle Alleanze"},
          TCH1SP:{objetive:"Usa Accelerazione della Ricerca", resource:"Attiva il Ministero della Ricerca"},
          TCHMGH:{objetive:"Aumenta la Potenza della Tecnologia", resource:"Cerca ricerche con Pergamene di Studio"},
          SHRDSR:{objetive:"Consuma Frammento di Eroe SR", resource:"Negozio del Santuario"},
          SHRDSS:{objetive:"Consuma Frammento di Eroe SSR", resource:"Negozio del Santuario"},
          SHRDUR:{objetive:"Consuma Frammento di Eroe UR", resource:"Negozio del Santuario"},
          SKILLB:{objetive:"Usa Distintivo di Abilità", resource:"Aumenta l'Abilità dell'Eroe UR"},
          TCKHER:{objetive:"Recluta Eroi usando i Ticket",resource:"TUTTI i Ticket dell'Eroe"},
          SAVETH:{objetive:"SALVA TUTTI i Ticket dell'Eroe",resource:"Ticket dell'Eroe"},
          FREETH:{objetive:"Usa SOLO Ticket GRATIS dell'Eroe",resource:"Ticket dell'Eroe"},
          SOLD1TRN:{objetive:"Usa Accelerazione di Addestramento", resource:"Attiva il Ministro della Guerra"},
          SOLDT10:{objetive:"Addestra un Soldato, preferisci promuoverli", resource:"Promuovi Soldati"},
          HEA1SP:{objetive:"Usa Accelerazione di Cura",resource:"Bonus di Cura +150%"},
          SOLDDFT:{objetive:"Sconfiggi Soldati, Duelo delle Alleanze",resource:"Attacco"},
          SOLDLST:{objetive:"Perdi Soldati, Duelo delle Alleanze",resource:"Difesa"},
          SOLDMTC:{objetive:"Sconfiggi Soldati (partita specifica)",resource:"T8 vs T8"},
          DYFALCON:{objetive:"Avvia Missioni del Falco, ma non completarle",resource:"Salva 35 Missioni del Falco"},
          DYELITE:{objetive:"Mostri Elite Peste, ottieni Ticket dell'Eroe e Antitossina",resource:""},
          DYBOTT:{objetive:"Salva Stamina",resource:"Bottiglia di Stamina"},
          DYHERBS:{objetive:"Inizia a Raccogliere Erbe",resource:"Giardino delle Erbe Lv.10, 8H, 1.1M"},
          EQGEAR:{objetive:"Usa Pietra dell'Equipaggiamento, su Equipaggiamento UR",resource:"Migliora l'Equipaggiamento"},
          EQBPRN:{objetive:"Usa Piano dell'Equipaggiamento, promuovi Statistiche Aggiuntive UR",resource:"Promuovi l'Equipaggiamento"},
          ELIXIR:{objetive:"Punti per Catturare Edifici", resource:"Castello dell'Elisir"},
          SCRAMBLE:{objetive:"Cattura/Defendi la Fattoria, 100K Punti di Onore",resource:"Fattoria della Città Reale nel Fango"},
          KWAR:{objetive:"Uccidi/sconfiggi Soldati, 1.5M Punti di Onore",resource:"Guerra dei Regni"},
          SHIELD:{objetive:"Attiva Scudi 24H, Scudo Gratuito 8H",resource:"Negozio dell'Alleanza"},
          CUMULUS:{objetive:"Raccogli Cristallo 30min, dai Cumuli",resource:"Evento Valle dei Cumuli di Cristallo"}
        },
        adPhases:{ P00:"Fase 0 : Preparazione", P01:"Fase 1 : Migliora Corvo", P02:"Fase 2 : Sviluppo del Territorio", P03:"Fase 3 : Ricerca Tecnologica", P04:"Fase 4 : Crescita degli Eroi", P05:"Fase 5 : Preparazione alla Guerra", P06:"Fase 6 : Assalta il Nemico" },
        adEvents:{ DY:"Consiglio Giornaliero", AD:"Duello delle Alleanze", KVK:"Guerra tra Regni", ROY:"Tumulto della Città Reale", BS:"Calendario Battle Survival", EQ:"Miglioramento Equipaggiamento", BEX:"Battaglia dell'Elisir", CUM:"Valle dei Cumulo di Cristallo" }
    },
    fr: {
        scheduleBattleSurvival:"Calendrier Battle Survival",
        survivalMessage:"Cycle automatique des activités calculé selon le fuseau horaire du navigateur web.",
        bsHeaders:["Compteur", "État", "Événement", "Activités", "Serveur"],
bsPast:"Terminée",
bsCurrent:"En cours",
bsNext:"Prochaine",
        bsEvents:{ BUILD:"Construire le Territoire", HEROE:"Améliorer les Héros", RAVEN:"Améliorer Raven", SOLDIER:"Entraîner les Soldats", TECH:"Recherche Technologique", STANDBY:"En Attente" },
        scheduleAllianceDuel:"Duel d’Alliance",
        adHeaders:["Compteur", "", "Tâche", "", "Ressource", "Événement"],
        pageDailyTitle:"Activités Quotidiennes",
pageDailyLead:"Détails des activités quotidiennes qui vous aideront à vous améliorer chaque jour.",
        adActivities:{
          ANTX:{objetive:"Consommez des Antitoxines",resource:"Achetez des Fournitures d'Antidote"},
          FAQS:{objetive:"Terminez les Missions du Faucon",resource:"Tour du Faucon"},
          EPIUR:{objetive:"Obtenez des Fragments d'Épigraphe UR",resource:"Ouvrez les Coffrets d'Épigraphes"},
          HERBS:{objetive:"Récoltez des Herbes, toute la journée",resource:"Jardin d'Herbes Nv.10, 8H, 1.1M"},
          GRAIN:{objetive:"Récoltez 100 Blé/100 Bois",resource:"Ferme Nv.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"Consommez de l'Essence de Corbeau",resource:""},
          RAVFRT:{objetive:"Consommez un Fruit de Corbeau",resource:""},
          STMN:{objetive:"Consommez de l'Endurance",resource:"Utilisez des Bouteilles d'Endurance"},
          CON1SP:{objetive:"Utilisez une Accélération de Construction", resource:"Activez le Ministère de la Construction"},
          CONMGH:{objetive:"Augmentez la Puissance de Bâtiment",resource:"Préférez un temps de construction plus court"},
          CRVNUR:{objetive:"Envoyez une Caravane UR",resource:""},
          OPENUR:{objetive:"Effectuez une Opération Secrète UR",resource:""},
          TCKSUR:{objetive:"Recrutez un Survivant une fois",resource:"TOUS les Tickets de Survivant"},
          SAVETS:{objetive:"SAUVEGARDEZ TOUS les Tickets de Survivant",resource:"Ticket de Survivant"},
          FREETS:{objetive:"Utilisez UNIQUEMENT des Tickets GRATUITS de Survivant",resource:"Ticket de Survivant"},
          RAVCH1:{objetive:"Ouvrez le Coffret d'Équipement du Corbeau",resource:""},
          STDSCR:{objetive:"Utilisez un Parchemin d'Étude dans la recherche",resource:"Récompense du Duel d'Alliance"},
          TCH1SP:{objetive:"Utilisez une Accélération de Recherche", resource:"Activez le Ministère de la Recherche"},
          TCHMGH:{objetive:"Augmentez la Puissance de Technologie", resource:"Recherchez avec des Parchemins d'Étude"},
          SHRDSR:{objetive:"Consommez un Fragment de Héros SR", resource:"Boutique du Sanctuaire"},
          SHRDSS:{objetive:"Consommez un Fragment de Héros SSR", resource:"Boutique du Sanctuaire"},
          SHRDUR:{objetive:"Consommez un Fragment de Héros UR", resource:"Boutique du Sanctuaire"},
          SKILLB:{objetive:"Utilisez un Badge de Compétence", resource:"Augmentez la Compétence du Héros UR"},
          TCKHER:{objetive:"Recrutez des Héros avec des Tickets",resource:"TOUS les Tickets de Héros"},
          SAVETH:{objetive:"SAUVEGARDEZ TOUS les Tickets de Héros",resource:"Ticket de Héros"},
          FREETH:{objetive:"Utilisez UNIQUEMENT des Tickets GRATUITS de Héros",resource:"Ticket de Héros"},
          SOLD1TRN:{objetive:"Utilisez une Accélération d'Entraînement", resource:"Activez le Ministre de la Guerre"},
          SOLDT10:{objetive:"Entraînez un Soldat, préférez les promouvoir", resource:"Promouvez Soldats"},
          HEA1SP:{objetive:"Utilisez une Accélération de Soin",resource:"Bonus de Soin +150%"},
          SOLDDFT:{objetive:"Vaincre des Soldats, Duel d'Alliance",resource:"Attaque"},
          SOLDLST:{objetive:"Perdre des Soldats, Duel d'Alliance",resource:"Défense"},
          SOLDMTC:{objetive:"Vaincre des Soldats (match spécifique)",resource:"T8 vs T8"},
          DYFALCON:{objetive:"Lancez des Missions du Faucon, mais ne les terminez pas",resource:"Sauvegardez 35 Missions du Faucon"},
          DYELITE:{objetive:"Monstres Elite Peste, obtenez un Ticket de Héros et un Antitoxine",resource:""},
          DYBOTT:{objetive:"Sauvegardez de l'Endurance",resource:"Bouteille d'Endurance"},
          DYHERBS:{objetive:"Commencez à Récolter des Herbes",resource:"Jardin d'Herbes Nv.10, 8H, 1.1M"},
          EQGEAR:{objetive:"Utilisez une Pierre d'Équipement, sur l'Équipement UR",resource:"Améliorez l'Équipement"},
          EQBPRN:{objetive:"Utilisez un Plan d'Équipement, promouvez les Statistiques Additionnelles UR",resource:"Promouvez l'Équipement"},
          ELIXIR:{objetive:"Points pour Capturer des Bâtiments", resource:"Château de l'Élixir"},
          SCRAMBLE:{objetive:"Capturez/Défendez la Ferme, 100K Points d'Honneur",resource:"Ferme de la Cité Royale dans la Boue"},
          KWAR:{objetive:"Tuez/Vaincre des Soldats, 1.5M Points d'Honneur",resource:"Guerre des Royaumes"},
          SHIELD:{objetive:"Activez les Boucliers 24H, Bouclier Gratuit 8H",resource:"Boutique de l'Alliance"},
          CUMULUS:{objetive:"Récoltez du Cristal 30min, depuis les Cumuls",resource:"Événement Vallée des Cumuls de Cristal"}
        },
        adPhases:{ P00:"Phase 0 : Préparation", P01:"Phase 1 : Améliorer le Corbeau", P02:"Phase 2 : Développement du Territoire", P03:"Phase 3 : Recherche Technologique", P04:"Phase 4 : Croissance des Héros", P05:"Phase 5 : Préparation à la Guerre", P06:"Phase 6 : Attaquer l'Ennemi" },
        adEvents:{ DY:"Conseil Quotidien", AD:"Duelo d'Alliance", KVK:"Guerre des Royaumes", ROY:"Émeute de la Cité Royale", BS:"Calendrier Battle Survival", EQ:"Amélioration d'Équipement", BEX:"Bataille de l'Élixir", CUM:"Vallée des Amas de Cristal" }
    },
    ja: {
        scheduleBattleSurvival:"Battle Survival スケジュール",
        survivalMessage:"ウェブブラウザのタイムゾーンに基づいて計算された自動アクティビティサイクル。",
        bsHeaders:["カウンター", "状態", "イベント", "アクティビティ", "サーバー"],
bsPast:"終了",
bsCurrent:"進行中",
bsNext:"次回",
        bsEvents:{ BUILD:"領土の建設", HEROE:"英雄の強化", RAVEN:"レイベンの強化", SOLDIER:"兵士の訓練", TECH:"技術の研究", STANDBY:"待機" },
        scheduleAllianceDuel:"アライアンスデュエル",
        adHeaders:["カウンター", "", "タスク", "", "リソース", "イベント"],
        pageDailyTitle:"デイリー活動",
pageDailyLead:"毎日改善するためのデイリー活動の詳細。",
        adActivities:{
          ANTX:{objetive:"解毒剤を消費する",resource:"解毒剤の物資を購入"},
          FAQS:{objetive:"ファルコンミッションを完了する",resource:"ファルコンの塔"},
          EPIUR:{objetive:"UR碑片を獲得する",resource:"碑の宝箱を開く"},
          HERBS:{objetive:"ハーブを一日中採取する",resource:"ハーブ園 Lv.10, 8H, 1.1M"},
          GRAIN:{objetive:"穀物100/木材100を採取する",resource:"農園 Lv.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"レイベンのエッセンスを消費する",resource:""},
          RAVFRT:{objetive:"レイベンの果物を消費する",resource:""},
          STMN:{objetive:"スタミナを消費する",resource:"スタミナ瓶を使う"},
          CON1SP:{objetive:"建設速度アップを使う", resource:"建設大臣の役職を発動"},
          CONMGH:{objetive:"建物の威力を上げる",resource:"短い建設時間を優先する"},
          CRVNUR:{objetive:"UR隊商を派遣する",resource:""},
          OPENUR:{objetive:"UR秘密作戦を実行する",resource:""},
          TCKSUR:{objetive:"生存者を1回リクルートする",resource:"生存者のすべてのチケット"},
          SAVETS:{objetive:"生存者のチケットをすべて保存する",resource:"生存者のチケット"},
          FREETS:{objetive:"無料の生存者のチケットだけを使う",resource:"生存者のチケット"},
          RAVCH1:{objetive:"レイベンの装備宝箱を開く",resource:""},
          STDSCR:{objetive:"研究で学習巻軸を使う",resource:"同盟対決の報酬"},
          TCH1SP:{objetive:"研究速度アップを使う", resource:"研究大臣の役職を発動"},
          TCHMGH:{objetive:"技術の威力を上げる", resource:"学習巻軸で研究を行う"},
          SHRDSR:{objetive:"SR英雄の欠片を消費する", resource:"聖域のショップ"},
          SHRDSS:{objetive:"SSR英雄の欠片を消費する", resource:"聖域のショップ"},
          SHRDUR:{objetive:"UR英雄の欠片を消費する", resource:"聖域のショップ"},
          SKILLB:{objetive:"スキルバッジを使う", resource:"UR英雄のスキルを上げる"},
          TCKHER:{objetive:"チケットで英雄をリクルートする",resource:"英雄のすべてのチケット"},
          SAVETH:{objetive:"英雄のチケットをすべて保存する",resource:"英雄のチケット"},
          FREETH:{objetive:"無料の英雄チケットだけを使う",resource:"英雄のチケット"},
          SOLD1TRN:{objetive:"訓練速度アップを使う", resource:"戦争大臣の役職を発動"},
          SOLDT10:{objetive:"兵士を訓練する。昇格を優先する", resource:"兵士を昇格させる"},
          HEA1SP:{objetive:"治療速度アップを使う",resource:"治療バフ +150%"},
          SOLDDFT:{objetive:"兵士を撃破する、同盟対決",resource:"攻撃"},
          SOLDLST:{objetive:"兵士を失う、同盟対決",resource:"防御"},
          SOLDMTC:{objetive:"兵士を撃破する（特定の戦闘）",resource:"T8 vs T8"},
          DYFALCON:{objetive:"ファルコンミッションを開始するが完了しない",resource:"ファルコンミッションを35件保存"},
          DYELITE:{objetive:"エリートモンスター、英雄チケットと解毒剤を獲得",resource:""},
          DYBOTT:{objetive:"スタミナを保存",resource:"スタミナ瓶"},
          DYHERBS:{objetive:"ハーブ採取を開始する",resource:"ハーブ園 Lv.10, 8H, 1.1M"},
          EQGEAR:{objetive:"UR装備で装備石を使う",resource:"装備を強化"},
          EQBPRN:{objetive:"装備設計図を使い、URの追加ステータスを昇格",resource:"装備を昇格"},
          ELIXIR:{objetive:"建物を占領してポイントを獲得", resource:"エリキールの城"},
          SCRAMBLE:{objetive:"農園を占領/防衛、100K Honorポイント",resource:"泥の王都農園"},
          KWAR:{objetive:"兵士を殺害/撃破、1.5M Honorポイント",resource:"王国戦争"},
          SHIELD:{objetive:"24Hシールドと無料8Hシールドを有効化",resource:"同盟ショップ"},
          CUMULUS:{objetive:"30分間クリスタルを採取、クリスタルの山から",resource:"イベント クリスタル堆積の谷"}
        },
        adPhases:{ P00:"フェーズ0：準備", P01:"フェーズ1：レイベンの強化", P02:"フェーズ2：領土の開発", P03:"フェーズ3：技術の研究", P04:"フェーズ4：英雄の成長", P05:"フェーズ5：戦争の準備", P06:"フェーズ6：敵の襲撃" },
        adEvents:{ DY:"デイリーアドバイス", AD:"アライアンスデュエル", KVK:"王国戦", ROY:"王都の騒動", BS:"Battle Survival スケジュール", EQ:"装備の強化", BEX:"エリキシルの戦い", CUM:"クリスタル堆積の谷" }
    },
    ru: {
        scheduleBattleSurvival:"Расписание Battle Survival",
        survivalMessage:"Автоматический цикл активностей рассчитывается по часовому поясу веб-браузера.",
        bsHeaders:["Обратный отсчёт", "Статус", "Событие", "Действия", "Сервер"],
bsPast:"Завершено",
bsCurrent:"В процессе",
bsNext:"Следующее",
        bsEvents:{ BUILD:"Построить территорию", HEROE:"Улучшить героев", RAVEN:"Улучшить Ворона", SOLDIER:"Обучить солдат", TECH:"Технологические исследования", STANDBY:"Ожидание" },
        scheduleAllianceDuel:"Дуэль Альянсов",
        adHeaders:["Счётчик", "", "Задача", "", "Ресурс", "Событие"],
        pageDailyTitle:"Ежедневные активности",
pageDailyLead:"Подробности ежедневных активностей, которые помогут вам постоянно совершенствоваться.",
        adActivities:{
          ANTX:{objetive:"Потребить Антитоксины",resource:"Купить Припасы Антидота"},
          FAQS:{objetive:"Завершить Миссии Сокола",resource:"Башня Сокола"},
          EPIUR:{objetive:"Получить Осколки Эпиграфа UR",resource:"Открыть Сундуки Эпиграфов"},
          HERBS:{objetive:"Собирать Травы весь день",resource:"Травяной Сад Ур.10, 8H, 1.1M"},
          GRAIN:{objetive:"Собрать 100 Зерна/100 Древесины",resource:"Ферма Ур.10, 6.5H, 2.2M"},
          RAVESS:{objetive:"Потребить Эссенцию Ворона",resource:""},
          RAVFRT:{objetive:"Потребить Плод Ворона",resource:""},
          STMN:{objetive:"Потребить Стамину",resource:"Использовать Бутылки Стамины"},
          CON1SP:{objetive:"Использовать Ускорение Строительства", resource:"Активировать Министерство Строительства"},
          CONMGH:{objetive:"Увеличить Мощь Здания на 1",resource:"Предпочтительное время строительства короче"},
          CRVNUR:{objetive:"Отправить Караван UR",resource:""},
          OPENUR:{objetive:"Выполнить Скрытую Операцию UR",resource:""},
          TCKSUR:{objetive:"Нанять Выжившего один раз",resource:"ВСЕ Билеты Выжившего"},
          SAVETS:{objetive:"СОХРАНИТЬ ВСЕ Билеты Выжившего",resource:"Билет Выжившего"},
          FREETS:{objetive:"Использовать ТОЛЬКО Бесплатные Билеты Выжившего",resource:"Билет Выжившего"},
          RAVCH1:{objetive:"Открыть Сундук Снаряжения Ворона",resource:""},
          STDSCR:{objetive:"Использовать Свиток Изучения в исследовании",resource:"Награда за Дуэль Альянсов"},
          TCH1SP:{objetive:"Использовать Ускорение Исследований", resource:"Активировать Министерство Исследований"},
          TCHMGH:{objetive:"Увеличить Мощь Технологии на 1", resource:"Искать исследования с помощью Свитков Изучения"},
          SHRDSR:{objetive:"Потребить Осколок Героя SR", resource:"Магазин Святилища"},
          SHRDSS:{objetive:"Потребить Осколок Героя SSR", resource:"Магазин Святилища"},
          SHRDUR:{objetive:"Потребить Осколок Героя UR", resource:"Магазин Святилища"},
          SKILLB:{objetive:"Использовать Значок Навыка", resource:"Повысить Навык Героя UR"},
          TCKHER:{objetive:"Нанять Героев с помощью Билетов",resource:"ВСЕ Билеты Героя"},
          SAVETH:{objetive:"СОХРАНИТЬ ВСЕ Билеты Героя",resource:"Билет Героя"},
          FREETH:{objetive:"Использовать ТОЛЬКО Бесплатные Билеты Героя",resource:"Билет Героя"},
          SOLD1TRN:{objetive:"Использовать Ускорение Обучения", resource:"Активировать Министра Войны"},
          SOLDT10:{objetive:"Обучить Солдата, предпочтительно повысить", resource:"Повысить Солдат"},
          HEA1SP:{objetive:"Использовать Ускорение Лечения",resource:"Бонус Лечения +150%"},
          SOLDDFT:{objetive:"Победить Солдат, Дуэль Альянсов",resource:"Атака"},
          SOLDLST:{objetive:"Потерять Солдат, Дуэль Альянсов",resource:"Оборона"},
          SOLDMTC:{objetive:"Победить Солдат (конкретный матч)",resource:"T8 vs T8"},
          DYFALCON:{objetive:"Начать Миссии Сокола, но не завершать их",resource:"Сохранить 35 Миссий Сокола"},
          DYELITE:{objetive:"Элитные Монстры, Чума, получить Билет Героя и Антитоксин",resource:""},
          DYBOTT:{objetive:"Сохранить Стамину",resource:"Бутылка Стамины"},
          DYHERBS:{objetive:"Начать собирать Травы",resource:"Травяной Сад Ур.10, 8H, 1.1M"},
          EQGEAR:{objetive:"Использовать Камень Снаряжения на Снаряжении UR",resource:"Улучшить Снаряжение"},
          EQBPRN:{objetive:"Использовать Чертёж Снаряжения, повысить Доп. характеристики UR",resource:"Повысить Снаряжение"},
          ELIXIR:{objetive:"Захватить Здания, получить Очки", resource:"Замок Эликсира"},
          SCRAMBLE:{objetive:"Захватить/Защитить Ферму, 100K Очков Чести",resource:"Ферма Королевской Города в Грязи"},
          KWAR:{objetive:"Убить/Победить Солдат, 1.5M Очков Чести",resource:"Война Королевств"},
          SHIELD:{objetive:"Активировать Щиты 24H, Бесплатный Щит 8H",resource:"Магазин Альянса"},
          CUMULUS:{objetive:"Собирать Кристалл 30мин, из Кристальных Холмов",resource:"Событие Долина Кристальных Холмов"}
        },
        adPhases:{ P00:"Фаза 0 : Подготовка", P01:"Фаза 1 : Улучшение Ворона", P02:"Фаза 2 : Развитие Территории", P03:"Фаза 3 : Технологические Исследования", P04:"Фаза 4 : Рост Героев", P05:"Фаза 5 : Подготовка к Войне", P06:"Фаза 6 : Поход на Врага" },
        adEvents:{ DY:"Совет Дня", AD:"Дуэль Альянсов", KVK:"Война Королевств", ROY:"Мятеж в Королевском Городе", BS:"Расписание Battle Survival", EQ:"Улучшение Снаряжения", BEX:"Битва Эликсира", CUM:"Долина Кристаллических Наносов" }
    },
    zh: {
        scheduleBattleSurvival:"Battle Survival 日程",
        survivalMessage:"根据网页浏览器时区计算的自动活动周期。",
        bsHeaders:["倒计时", "状态", "活动", "任务", "服务器"],
bsPast:"已结束",
bsCurrent:"进行中",
bsNext:"即将开始",
        bsEvents:{ BUILD:"建造领地", HEROE:"强化英雄", RAVEN:"强化渡鸦", SOLDIER:"训练士兵", TECH:"科技研究", STANDBY:"待命" },
        scheduleAllianceDuel:"联盟对决",
        adHeaders:["计数器", "", "任务", "", "资源", "活动"],
        pageDailyTitle:"每日活动",
pageDailyLead:"每日活动的详细信息，帮助你每天不断进步。",
        adActivities:{
          ANTX:{objetive:"消耗解毒剂",resource:"购买解毒剂补给"},
          FAQS:{objetive:"完成猎鹰任务",resource:"猎鹰塔"},
          EPIUR:{objetive:"获取UR碑文碎片",resource:"打开碑文宝箱"},
          HERBS:{objetive:"全天采集草药",resource:"草药园 10 级, 8H, 1.1M"},
          GRAIN:{objetive:"采集 100 谷物/100 木材",resource:"农场 10 级, 6.5H, 2.2M"},
          RAVESS:{objetive:"消耗渡鸦精华",resource:""},
          RAVFRT:{objetive:"消耗渡鸦果实",resource:""},
          STMN:{objetive:"消耗体力",resource:"使用体力瓶"},
          CON1SP:{objetive:"使用建造加速", resource:"激活建设大臣"},
          CONMGH:{objetive:"提升建筑战力",resource:"优先更短的建造时间"},
          CRVNUR:{objetive:"派遣UR商队",resource:""},
          OPENUR:{objetive:"执行UR秘密行动",resource:""},
          TCKSUR:{objetive:"招募一次幸存者",resource:"全部幸存者票券"},
          SAVETS:{objetive:"保存所有幸存者票券",resource:"幸存者票券"},
          FREETS:{objetive:"仅使用免费幸存者票券",resource:"幸存者票券"},
          RAVCH1:{objetive:"打开渡鸦装备宝箱",resource:""},
          STDSCR:{objetive:"在研究中使用研究卷轴",resource:"联盟对决奖励"},
          TCH1SP:{objetive:"使用研究加速", resource:"激活研究大臣"},
          TCHMGH:{objetive:"提升科技战力", resource:"使用研究卷轴寻找研究"},
          SHRDSR:{objetive:"消耗SR英雄碎片", resource:"圣所商店"},
          SHRDSS:{objetive:"消耗SSR英雄碎片", resource:"圣所商店"},
          SHRDUR:{objetive:"消耗UR英雄碎片", resource:"圣所商店"},
          SKILLB:{objetive:"使用技能徽章", resource:"提升UR英雄技能"},
          TCKHER:{objetive:"使用票券招募英雄",resource:"全部英雄票券"},
          SAVETH:{objetive:"保存所有英雄票券",resource:"英雄票券"},
          FREETH:{objetive:"仅使用免费英雄票券",resource:"英雄票券"},
          SOLD1TRN:{objetive:"使用训练加速", resource:"激活战争大臣"},
          SOLDT10:{objetive:"训练士兵，优先晋升", resource:"晋升士兵"},
          HEA1SP:{objetive:"使用治疗加速",resource:"治疗增益 +150%"},
          SOLDDFT:{objetive:"击败士兵，联盟对决",resource:"攻击"},
          SOLDLST:{objetive:"损失士兵，联盟对决",resource:"防御"},
          SOLDMTC:{objetive:"击败士兵（指定战斗）",resource:"T8 vs T8"},
          DYFALCON:{objetive:"开始猎鹰任务，但不要完成",resource:"保存35个猎鹰任务"},
          DYELITE:{objetive:"精英怪物、瘟疫，获取英雄票券和解毒剂",resource:""},
          DYBOTT:{objetive:"保存体力",resource:"体力瓶"},
          DYHERBS:{objetive:"开始采集草药",resource:"草药园 10 级, 8H, 1.1M"},
          EQGEAR:{objetive:"在UR装备上使用装备石",resource:"升级装备"},
          EQBPRN:{objetive:"使用装备图纸，晋升UR附加属性",resource:"晋升装备"},
          ELIXIR:{objetive:"占领建筑，获得点数", resource:"魔力城堡"},
          SCRAMBLE:{objetive:"占领/防守农场，100K 荣誉点数",resource:"泥泞中的王都农场"},
          KWAR:{objetive:"击杀/击败士兵，1.5M 荣誉点数",resource:"王国战争"},
          SHIELD:{objetive:"启用 24H 护盾与免费 8H 护盾",resource:"联盟商店"},
          CUMULUS:{objetive:"从水晶堆中采集 30 分钟水晶",resource:"活动 水晶堆谷"}
        },
        adPhases:{ P00:"阶段 0：准备", P01:"阶段 1：强化渡鸦", P02:"阶段 2：领地发展", P03:"阶段 3：科技研究", P04:"阶段 4：英雄成长", P05:"阶段 5：战前准备", P06:"阶段 6：突袭敌人" },
        adEvents:{ DY:"每日提示", AD:"联盟对决", KVK:"王国战争", ROY:"王都骚乱", BS:"Battle Survival 日程", EQ:"装备升级", BEX:"灵药争夺战", CUM:"水晶堆谷" }
    },
    tr: {
        scheduleBattleSurvival:"Hayatta Kalma Savaşı Programı",
        survivalMessage:"Web tarayıcısının saat dilimine göre hesaplanan otomatik etkinlik döngüsü.",
        bsHeaders:["Geri Sayım", "Durum", "Etkinlik", "Aktiviteler", "Sunucu"],
        bsPast:"Tamamlandı",
        bsCurrent:"Devam Ediyor",
        bsNext:"Yaklaşan",
        bsEvents:{
          BUILD:"Bölge İnşa Et",
          HEROE:"Kahramanları Güçlendir",
          RAVEN:"Kargayı Güçlendir",
          SOLDIER:"Askerleri Eğit",
          TECH:"Teknoloji Araştır",
          STANDBY:"Beklemede"
        },
        scheduleAllianceDuel:"İttifak Düellosu",
        adHeaders:["Geri Sayım", "", "Görev", "", "Kaynak", "Etkinlik"],
        pageDailyTitle:"Günlük Etkinlikler",
        pageDailyLead:"Her gün gelişmene yardımcı olacak günlük etkinliklerin ayrıntıları.",
        adPhases:{
          P00:"Faz 0 : Hazırlık",
          P01:"Faz 1 : Kargayı Güçlendir",
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
            objetive:"Antitoksinleri tüket",
            resource:"Antidot Malzemeleri Satın Al"
          },
          FAQS:{
            objetive:"Şahin Görevlerini Tamamla",
            resource:"Şahin Kulesi"
          },
          EPIUR:{
            objetive:"UR Epigraf Parçalarını Edin",
            resource:"Epigraf Sandıklarını Aç"
          },
          HERBS:{
            objetive:"Bütün gün ot topla",
            resource:"Bitki Bahçesi Sv.10, 8S, 1.1M"
          },
          GRAIN:{
            objetive:"100 Tahıl/100 Odun Topla",
            resource:"Çiftlik Sv.10, 6.5S, 2.2M"
          },
          RAVESS:{
            objetive:"Karga Özünü Tüket",
            resource:""
          },
          RAVFRT:{
            objetive:"Karga Meyvesini Tüket",
            resource:""
          },
          STMN:{
            objetive:"Dayanıklılık Tüket",
            resource:"Dayanıklılık Şişeleri Kullan"
          },
          CON1SP:{
            objetive:"İnşa Hızlandırması Kullan", resource:"İnşa Bakanlığını Etkinleştir"
          },
          CONMGH:{
            objetive:"Bina Gücünü Artır",
            resource:"Daha kısa inşa süresini tercih et"
          },
          CRVNUR:{
            objetive:"UR Karavanı Gönder",
            resource:""
          },
          OPENUR:{
            objetive:"UR Gizli Operasyonu Gerçekleştir",
            resource:""
          },
          TCKSUR:{
            objetive:"Hayatta Kalanı Bir kez Işe Al",
            resource:"TÜM Hayatta Kalan Biletleri"
          },
          SAVETS:{
            objetive:"TÜM Hayatta Kalan Biletlerini KAYDET",
            resource:"Hayatta Kalan Bileti"
          },
          FREETS:{
            objetive:"YALNIZCA ÜCRETSİZ Hayatta Kalan Biletlerini Kullan",
            resource:"Hayatta Kalan Bileti"
          },
          RAVCH1:{
            objetive:"Karga Ekipman Sandığını Aç",
            resource:""
          },
          STDSCR:{
            objetive:"Araştırmada Çalışma Parmak Derisi Kullan",
            resource:"İttifak Düellosu Ödülü"
          },
          TCH1SP:{
            objetive:"Araştırma Hızlandırması Kullan", resource:"Araştırma Bakanlığını Etkinleştir"
          },
          TCHMGH:{
            objetive:"Teknoloji Gücünü Artır", resource:"Çalışma Parmak Derisiyle Araştırma Yap"
          },
          SHRDSR:{
            objetive:"SR Kahraman Parçası Tüket", resource:"Kutsal Alan Mağazası"
          },
          SHRDSS:{
            objetive:"SSR Kahraman Parçası Tüket", resource:"Kutsal Alan Mağazası"
          },
          SHRDUR:{
            objetive:"UR Kahraman Parçası Tüket", resource:"Kutsal Alan Mağazası"
          },
          SKILLB:{
            objetive:"Yetenek Rozeti Kullan", resource:"UR Kahramanın Yeteneğini Artır"
          },
          TCKHER:{
            objetive:"Biletleri Kullanarak Kahramanları Işe Al",
            resource:"TÜM Kahraman Biletleri"
          },
          SAVETH:{
            objetive:"TÜM Kahraman Biletlerini KAYDET",
            resource:"Kahraman Bileti"
          },
          FREETH:{
            objetive:"YALNIZCA ÜCRETSİZ Kahraman Biletlerini Kullan",
            resource:"Kahraman Bileti"
          },
          SOLD1TRN:{
            objetive:"Eğitim Hızlandırması Kullan", resource:"Savaş Bakanını Etkinleştir"
          },
          SOLDT10:{
            objetive:"Asker eğit, terfi etmeyi tercih et", resource:"Askerleri Terfi Et"
          },
          HEA1SP:{
            objetive:"İyileşme Hızlandırması Kullan",
            resource:"İyileşme Buff'ı +150%"
          },
          SOLDDFT:{
            objetive:"Askerleri Yen, İttifak Düellosu",
            resource:"Saldırı"
          },
          SOLDLST:{
            objetive:"Askerleri Kaybet, İttifak Düellosu",
            resource:"Savunma"
          },
          SOLDMTC:{
            objetive:"Askerleri Yen (belirli maç)",
            resource:"T8 vs T8"
          },
          DYFALCON:{
            objetive:"Şahin Görevlerini başlat ancak tamamla",
            resource:"35 Şahin Görevini Kaydet"
          },
          DYELITE:{
            objetive:"Elit Canavar Vebası, Kahraman Bileti ve Antitoksin Al",
            resource:""
          },
          DYBOTT:{
            objetive:"Dayanıklılığı Kaydet",
            resource:"Dayanıklılık Şişesi"
          },
          DYHERBS:{
            objetive:"Ot Toplamaya Başla",
            resource:"Bitki Bahçesi Sv.10, 8S, 1.1M"
          },
          EQGEAR:{
            objetive:"UR Ekipmanda Ekipman Taşı Kullan",
            resource:"Ekipmanı Yükselt"
          },
          EQBPRN:{
            objetive:"Ekipman Planını Kullan, UR Ek İstatistikleri Terfi Et",
            resource:"Ekipmanı Terfi Et"
          },
          ELIXIR:{
            objetive:"Binaları Yakala, Puan Kazan", resource:"Elixir Kalesi"
          },
          SCRAMBLE:{
            objetive:"Çiftliği Yakala/Koru, 100K Onur Puanı",
            resource:"Çamurda Kral Şehri Çiftliği"
          },
          KWAR:{
            objetive:"Askerleri Öldür/Yen, 1.5M Onur Puanı",
            resource:"Krallar Savaşı"
          },
          SHIELD:{
            objetive:"24H Kalkanları Etkinleştir, Ücretsiz 8H Kalkan",
            resource:"İttifak Mağazası"
          },
          CUMULUS:{
            objetive:"30dk Kristal Topla, Kristal Yığınlarından",
            resource:"Etkinlik Kristal Yığınları Vadisi"
          }
        }
      }
  };

  Object.keys(texts).forEach(function (lang) {
    window.I18N[lang] = Object.assign(window.I18N[lang] || {}, texts[lang]);
  });
})();
