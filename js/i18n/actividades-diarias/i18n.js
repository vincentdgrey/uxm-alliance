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
        adPointsNote:"Los Puntos mostrados son referencia a un jugador con VIP 9 e Investigación del Duelo de Alianza en , estos aumentaran, según tu nivel de investigación en el Duelo de Alianza.",
        pageDailyTitle:"Actividades Diarias",
        pageDailyLead:"Detalles de las actividades diarias que te ayudaran a mejorar diariamente.",
        adActivities:{
          ANTX:{ objective:"Consume Antitoxinas x660, priorizar primer escuadrón UR",resource:"Suministros Antídoto"},

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
          OPENUR:{objective:"Ejecuta Operaciones Encubiertas UR, mínimo 6 UR, la última más difícil dejarla en SSR",resource:"7 Operaciones Encubiertas"},
          
          TCKSUR:{objective:"Recluta Supervivientes, usando TODOS los Tickets de Superviviente",resource:"Ticket de Superviviente"},
          SAVETS:{objective:"GUARDA TODOS los Tickets de Superviviente",resource:"Ticket de Superviviente"},
          FREETS:{objective:"Usa SOLO 1 Ticket GRATIS de Superviviente",resource:"Ticket de Superviviente"},

          TCKHER:{objective:"Recluta Héroes, usando TODOS los Tickets de Héroe, +50 obtienes Héroe UR",resource:"Ticket de Héroe"},
          SAVETH:{objective:"GUARDA TODOS los Tickets de Héroe",resource:"Ticket de Héroe"},
          FREETH:{objective:"Usa SOLO 1 Ticket GRATIS de Héroe",resource:"Ticket de Héroe"},

          SHRDSR:{objective:"Consume Fragmento de Héroe SR, prioriza en tu héroe a Promover, ejemplo Robin",resource:"Fragmento de Héroe SR"},
          SHRDSS:{objective:"Consume Fragmento de Héroe SSR, prioriza en tu héroe a Promover, ejemplo Claire o Bella",resource:"Fragmento de Héroe SSR"},
          SHRDUR:{objective:"Consume Fragmento de Héroe UR, prioriza DPS > Soporte > Tanque",resource:"Fragmento de Héroe UR"},
          SKILLB:{objective:"Usa Insignia de Habilidad, Prioridad Aumentar Habilidad Héroe UR",resource:"Insignia de Habilidad"},

          SOLD1TRN:{objective:"Usa Aceleración de Entrenamiento, Activa Ministerio de Guerra",resource:"Acelerador Entrenamiento"},
          SOLDT10:{objective:"Entrena Soldado, Prioridad Promover T7 a T8",resource:"Soldados T6 > T7 > T8"},
          SOLDDFT:{objective:"Derrota Soldados, Duelo de Alianzas",resource:"Atacando"},
          SOLDLST:{objective:"Pierde Soldados, Duelo de Alianzas",resource:"Defensa"},
          SOLDMTC:{objective:"Derrota Soldados (partida específica)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Entrena Soldados T6 o T7; Promover el Día de Preparación de Guerra",resource:"Soldado T7"},
          DYWALL:{objective:"Retira tus soldados del Muro; Día de Guerra",resource:"Muro Santuario"},

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

          CHEESE7:{objective:"335M de Daño al Ladrón del Queso Lv.7, 30min duración, 1.4B de daño para el MVP1",resource:"Trampa del Queso"},
          UNDEAD:{objective:"Resistir 20 Oleadas del Asedio de No Muertos, Colocar/Reforzar soldados en el Muro",resource:"Soldados en Muro"},
          DEMONW:{objective:"Rey Demonio Guerrero, Daño Héroe Ranger +50%, 4 DPS + 1 Soporte",resource:"Rey Demonio"},
          DEMONR:{objective:"Rey Demonio Montaraz, Daño Héroe Brujo +50%, 4 DPS + 1 Soporte",resource:"Rey Demonio"},
          DEMONZ:{objective:"Rey Demonio Brujo, Daño Héroe Guerrero +50%, 4 DPS + 1 Soporte",resource:"Rey Demonio"},

          BSBUILD:{objective:"★ Insignias de Habilidad, Oportunidad al Terminar Construcciones [subir 30.000 poder] ó Acelerar [50H]",resource:"Edificios"},
          BSHERO:{objective:"★ Insignias de Habilidad, Oportunidad al Usar [23.4M] Antitoxinas ó [30] Tickets de Héroe",resource:"Heroes"},
          BSRAVEN:{objective:"★ Insignias de Habilidad, Oportunidad de usar Stamina/Energía en [15] Rallys ó Fruta de Cuervo",resource:"Cuervo"},
          BSSOLDIER:{objective:"★ Insignias de Habilidad, Oportunidad de entrenar [2.800] Soldados ó Acelerar [17H] Entrenamiento",resource:"Soldados"},
          BSTECH:{objective:"★ Insignias de Habilidad, Oportunidad al Terminar Investigación [subir 30.000 poder] ó Acelerar [50H]",resource:"Investigación"},
          BSTRAIN:{objective:"Consejo: Tiempo de Entrenamiento Optimo {time}, hasta la proxima Batalla de Supervivencia Tema Soldados",resource:"Soldados"},

          OFFBUILD:{objective:"Próxima Batalla Supervivencia, Terminar Construcciones [subir 30.000 poder] ó Acelerar [50H] Construcción",resource:"Edificios"},
          OFFHERO:{objective:"Próxima Batalla Supervivencia, Usar [23.4M] Antitoxinas ó [30] Tickets de Héroe",resource:"Heroes"},
          OFFRAVEN:{objective:"Próxima Batalla Supervivencia, Usar Stamina/Energía en [15] Rallys ó Fruta de Cuervo",resource:"Cuervo"},
          OFFSOLDIER:{objective:"Próxima Batalla Supervivencia, Entrenar [2.800] Soldados ó Acelerar [17H] Entrenamiento",resource:"Soldados"},
          OFFTECH:{objective:"Próxima Batalla Supervivencia, Terminar Investigación [subir 30.000 poder] ó Acelerar [50H] Investigación",resource:"Investigación"},
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
        adPointsNote:"The Points shown are a reference to a player with VIP 9 and Alliance Duel Research, they will increase according to your research level in the Alliance Duel.",
        pageDailyTitle:"Daily Activities",
pageDailyLead:"Details of the daily activities that will help you improve every day.",
        adActivities:{
          ANTX:{objective:"Consume 660 Antitoxins, prioritize the first UR squad",resource:"Antidote Supplies"},

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
          OPENUR:{objective:"Execute UR Covert Operations, minimum 6 UR, leave the hardest one at SSR",resource:"7 Black Ops"},

          TCKSUR:{objective:"Recruit Survivors, using ALL Survivor Tickets",resource:"Survivor Ticket"},
          SAVETS:{objective:"SAVE ALL Survivor Tickets",resource:"Survivor Ticket"},
          FREETS:{objective:"Use ONLY 1 FREE Survivor Ticket",resource:"Survivor Ticket"},

          TCKHER:{objective:"Recruit Heroes, using ALL Hero Tickets, +50 you get a UR Hero",resource:"Hero Ticket"},
          SAVETH:{objective:"SAVE ALL Hero Tickets",resource:"Hero Ticket"},
          FREETH:{objective:"Use ONLY 1 FREE Hero Ticket",resource:"Hero Ticket"},

          SHRDSR:{objective:"Consume SR Hero Shard, prioritize promoting your Hero, example Robin",resource:"SR Hero Shard"},
          SHRDSS:{objective:"Consume SSR Hero Shard, prioritize promoting your Hero, example Claire or Bella",resource:"SSR Hero Shard"},
          SHRDUR:{objective:"Consume UR Hero Shard, prioritize DPS > Support > Tank",resource:"UR Hero Shard"},
          SKILLB:{objective:"Use Skill Badge, Priority Increase UR Hero Skill",resource:"Skill Badge"},

          SOLD1TRN:{objective:"Use Training Boost, Activate Ministry of War",resource:"Training Boost"},
          SOLDT10:{objective:"Train Soldier, Priority Promote T7 to T8",resource:"Soldiers T6 > T7 > T8"},
          SOLDDFT:{objective:"Defeating Soldiers, Alliance Duel",resource:"Attacking"},
          SOLDLST:{objective:"Losing Soldiers, Alliance Duel",resource:"Defense"},
          SOLDMTC:{objective:"Defeating Soldiers (specific match)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Train T6 or T7 Soldiers; Promote on the War Preparation Day",resource:"Soldier T7"},
          DYWALL:{objective:"Withdraw your soldiers from the Wall; War Day",resource:"Sanctuary Wall"},

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
          CHEESE7:{objective:"335M Damage to the Cheese Thief Lv.7, 30min duration, 1.4B damage for MVP1",resource:"Cheese Trap"},
          UNDEAD:{objective:"Withstand 20 Waves of the Undead Siege, Place/Reinforce soldiers on the Wall",resource:"Soldiers on the Wall"},
          DEMONW:{objective:"Demon King Warrior, Ranger Hero Damage +50%, 4 DPS + 1 Support",resource:"Demon King"},
          DEMONR:{objective:"Demon King Ranger, Wizard Hero Damage +50%, 4 DPS + 1 Support",resource:"Demon King"},
          DEMONZ:{objective:"Demon King Wizard, Warrior Hero Damage +50%, 4 DPS + 1 Support",resource:"Demon King"},

          BSBUILD:{objective:"★ Skill Badges, Opportunity when finishing Constructions [raise 30.000 might] or Speed up [50H]",resource:"Buildings"},
          BSHERO:{objective:"★ Skill Badges, Opportunity when using [23.4M] Antitoxins or [30] Hero Tickets",resource:"Heroes"},
          BSRAVEN:{objective:"★ Skill Badges, Opportunity to use Stamina/Energy in [15] Rallys or Raven Fruit",resource:"Raven"},
          BSSOLDIER:{objective:"★ Skill Badges, Opportunity to train [2.800] Soldiers or Speed up [17H] Training",resource:"Soldiers"},
          BSTECH:{objective:"★ Skill Badges, Opportunity when finishing Research [raise 30.000 might] or Speed up [50H]",resource:"Research"},
          BSTRAIN:{objective:"Tip: Optimal Training Time {time}, until the next Soldiers Battle Survival",resource:"Soldiers"},

          OFFBUILD:{objective:"Next Battle Survival, Finish Constructions [raise 30.000 might] or Speed up [50H] Construction",resource:"Buildings"},
          OFFHERO:{objective:"Next Battle Survival, Use [23.4M] Antitoxins or [30] Hero Tickets",resource:"Heroes"},
          OFFRAVEN:{objective:"Next Battle Survival, Use Stamina/Energy in [15] Rallys or Raven Fruit",resource:"Raven"},
          OFFSOLDIER:{objective:"Next Battle Survival, Train [2.800] Soldiers or Speed up [17H] Training",resource:"Soldiers"},
          OFFTECH:{objective:"Next Battle Survival, Finish Research [raise 30.000 might] or Speed up [50H] Research",resource:"Research"}
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
        adPointsNote:"Os Pontos mostrados são uma referência para um jogador com VIP 9 e Pesquisa do Duelo de Alianças, eles aumentarão conforme seu nível de pesquisa no Duelo de Alianças.",
        pageDailyTitle:"Atividades Diárias",
pageDailyLead:"Detalhes das atividades diárias que o ajudarão a melhorar todos os dias.",
        adActivities:{
          ANTX:{objective:"Consuma 660 Antitoxinas, priorize o primeiro esquadrão UR",resource:"Suprimentos de Antídoto"},

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
          OPENUR:{objective:"Execute Operações Secretas UR, mínimo 6 UR, a última mais difícil deixe em SSR",resource:"7 Operações Secretas"},

          TCKSUR:{objective:"Recrute Sobreviventes, usando TODOS os Tickets de Sobrevivente",resource:"Ticket de Sobrevivente"},
          SAVETS:{objective:"GUARDE TODOS os Tickets de Sobrevivente",resource:"Ticket de Sobrevivente"},
          FREETS:{objective:"Use SOMENTE 1 Ticket GRATUITO de Sobrevivente",resource:"Ticket de Sobrevivente"},

          TCKHER:{objective:"Recrute Heróis, usando TODOS os Tickets de Herói, +50 você obtém um Herói UR",resource:"Ticket de Herói"},
          SAVETH:{objective:"GUARDE TODOS os Tickets de Herói",resource:"Ticket de Herói"},
          FREETH:{objective:"Use SOMENTE 1 Ticket GRATUITO de Herói",resource:"Ticket de Herói"},

          SHRDSR:{objective:"Consuma Fragmentos de Herói SR, priorize promover no seu Herói, exemplo Robin",resource:"Fragmento de Herói SR"},
          SHRDSS:{objective:"Consuma Fragmentos de Herói SSR, priorize promover no seu Herói, exemplo Claire ou Bella",resource:"Fragmento de Herói SSR"},
          SHRDUR:{objective:"Consuma Fragmentos de Herói UR, priorize DPS > Suporte > Tanque",resource:"Fragmento de Herói UR"},
          SKILLB:{objective:"Use Emblema de Habilidade, Prioridade Aumentar a Habilidade do Herói UR",resource:"Emblema de Habilidade"},

          SOLD1TRN:{objective:"Use Aceleração de Treinamento, Ative Ministério da Guerra",resource:"Aceleração de Treinamento"},
          SOLDT10:{objective:"Treine Soldado, Prioridade Promover T7 a T8",resource:"Soldados T6 > T7 > T8"},
          SOLDDFT:{objective:"Derrote Soldados, Duelo de Alianças",resource:"Atacando"},
          SOLDLST:{objective:"Perca Soldados, Duelo de Alianças",resource:"Defesa"},
          SOLDMTC:{objective:"Derrote Soldados (partida específica)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Treine Soldados T6 ou T7; Promova no Dia de Preparação para a Guerra",resource:"Soldado T7"},
          DYWALL:{objective:"Retire seus soldados do Muro; Dia de Guerra",resource:"Muro do Santuário"},

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
          CHEESE7:{objective:"335M de Dano ao Ladrão de Queijo Lv.7, 30min de duração, 1.4B de dano para o MVP1",resource:"Armadilha de Queijo"},
          UNDEAD:{objective:"Resista a 20 Ondas do Cerco dos Mortos-Vivos, Coloque/Reforce soldados no Muro",resource:"Soldados no Muro"},
          DEMONW:{objective:"Rei Demônio Guerreiro, Dano do Herói Ranger +50%, 4 DPS + 1 Suporte",resource:"Rei Demônio"},
          DEMONR:{objective:"Rei Demônio Montaraz, Dano do Herói Bruxo +50%, 4 DPS + 1 Suporte",resource:"Rei Demônio"},
          DEMONZ:{objective:"Rei Demônio Bruxo, Dano do Herói Guerreiro +50%, 4 DPS + 1 Suporte",resource:"Rei Demônio"},

          BSBUILD:{objective:"★ Emblemas de Habilidade, Oportunidade ao Terminar Construções [aumentar 30.000 poder] ou Acelerar [50H]",resource:"Edifícios"},
          BSHERO:{objective:"★ Emblemas de Habilidade, Oportunidade ao Usar [23.4M] Antitoxinas ou [30] Tickets de Herói",resource:"Heróis"},
          BSRAVEN:{objective:"★ Emblemas de Habilidade, Oportunidade de usar Stamina/Energia em [15] Rallys ou Fruta de Corvo",resource:"Corvo"},
          BSSOLDIER:{objective:"★ Emblemas de Habilidade, Oportunidade de treinar [2.800] Soldados ou Acelerar [17H] Treinamento",resource:"Soldados"},
          BSTECH:{objective:"★ Emblemas de Habilidade, Oportunidade ao Terminar Pesquisa [aumentar 30.000 poder] ou Acelerar [50H]",resource:"Pesquisa"},
          BSTRAIN:{objective:"Dica: Tempo Ótimo de Treinamento {time}, até a próxima Battle Survival de Tema Soldados",resource:"Soldados"},

          OFFBUILD:{objective:"Próxima Battle Survival, Terminar Construções [aumentar 30.000 poder] ou Acelerar [50H] Construção",resource:"Edifícios"},
          OFFHERO:{objective:"Próxima Battle Survival, Usar [23.4M] Antitoxinas ou [30] Tickets de Herói",resource:"Heróis"},
          OFFRAVEN:{objective:"Próxima Battle Survival, Usar Energia/Stamina em [15] Rallys ou Fruta de Corvo",resource:"Corvo"},
          OFFSOLDIER:{objective:"Próxima Battle Survival, Treinar [2.800] Soldados ou Acelerar [17H] Treinamento",resource:"Soldados"},
          OFFTECH:{objective:"Próxima Battle Survival, Terminar Pesquisa [aumentar 30.000 poder] ou Acelerar [50H] Pesquisa",resource:"Pesquisa"}
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
        adPointsNote:"I Punti mostrati sono un riferimento per un giocatore con VIP 9 e Ricerca del Duello di Alleanze, aumenteranno in base al tuo livello di ricerca nel Duello di Alleanze.",
        pageDailyTitle:"Attività Giornaliere",
pageDailyLead:"Dettagli delle attività giornaliere che ti aiuteranno a migliorare ogni giorno.",
        adActivities:{
          ANTX:{objective:"Consuma 660 Antitossine, dai priorità al primo squadrone UR",resource:"Rifornimenti Antidoto"},

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
          OPENUR:{objective:"Esegui Operazioni Segrete UR, minimo 6 UR, lascia la più difficile a SSR",resource:"7 Operazioni Segrete"},

          TCKSUR:{objective:"Recluta Sopravvissuti, usando TUTTI i Ticket del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          SAVETS:{objective:"SALVA TUTTI i Ticket del Sopravvissuto",resource:"Ticket del Sopravvissuto"},
          FREETS:{objective:"Usa SOLO 1 Ticket GRATIS del Sopravvissuto",resource:"Ticket del Sopravvissuto"},

          TCKHER:{objective:"Recluta Eroi, usando TUTTI i Ticket dell'Eroe, +50 ottieni un Eroe UR",resource:"Ticket dell'Eroe"},
          SAVETH:{objective:"SALVA TUTTI i Ticket dell'Eroe",resource:"Ticket dell'Eroe"},
          FREETH:{objective:"Usa SOLO 1 Ticket GRATIS dell'Eroe",resource:"Ticket dell'Eroe"},

          SHRDSR:{objective:"Consuma Frammento di Eroe SR, dai priorità alla promozione del tuo Eroe, esempio Robin",resource:"Frammento di Eroe SR"},
          SHRDSS:{objective:"Consuma Frammento di Eroe SSR, dai priorità alla promozione del tuo Eroe, esempio Claire o Bella",resource:"Frammento di Eroe SSR"},
          SHRDUR:{objective:"Consuma Frammento di Eroe UR, priorità DPS > Supporto > Tank",resource:"Frammento di Eroe UR"},
          SKILLB:{objective:"Usa Distintivo di Abilità, Priorità Aumenta l'Abilità dell'Eroe UR",resource:"Distintivo di Abilità"},

          SOLD1TRN:{objective:"Usa Accelerazione di Addestramento, Attiva il Ministero della Guerra",resource:"Accelerazione di Addestramento"},
          SOLDT10:{objective:"Addestra un Soldato, Priorità Promozione da T7 a T8", resource:"Soldati T6 > T7 > T8"},
          SOLDDFT:{objective:"Sconfiggi Soldati, Duelo delle Alleanze",resource:"Attacco"},
          SOLDLST:{objective:"Perdi Soldati, Duelo delle Alleanze",resource:"Difesa"},
          SOLDMTC:{objective:"Sconfiggi Soldati (partita specifica)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Addestra Soldati T6 o T7; Promuovi il Giorno di Preparazione alla Guerra",resource:"Soldato T7"},
          DYWALL:{objective:"Ritira i tuoi soldati dal Muro; Giorno di Guerra",resource:"Muro del Santuario"},

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
          CHEESE7:{objective:"335M di Danno al Ladro di Formaggio Lv.7, 30min di durata, 1.4B di danno per l'MVP1",resource:"Trappola del Formaggio"},
          UNDEAD:{objective:"Resisti a 20 Ondate dell'Assedio dei Non Morti, Colloca/Rinforza soldati sul Muro",resource:"Soldati sul Muro"},
          DEMONW:{objective:"Re Demone Guerriero, Danno Eroe Ranger +50%, 4 DPS + 1 Supporto",resource:"Re Demone"},
          DEMONR:{objective:"Re Demone Montaraz, Danno Eroe Mago +50%, 4 DPS + 1 Supporto",resource:"Re Demone"},
          DEMONZ:{objective:"Re Demone Mago, Danno Eroe Guerriero +50%, 4 DPS + 1 Supporto",resource:"Re Demone"},

          BSBUILD:{objective:"★ Distintivi di Abilità, Opportunità al Termine delle Costruzioni [aumentare 30.000 potenza] o Accelerare [50H]",resource:"Edifici"},
          BSHERO:{objective:"★ Distintivi di Abilità, Opportunità all'Uso [23.4M] Antitossine o [30] Ticket dell'Eroe",resource:"Eroi"},
          BSRAVEN:{objective:"★ Distintivi di Abilità, Opportunità di usare Stamina/Energia in [15] Rally o Frutto di Corvo",resource:"Corvo"},
          BSSOLDIER:{objective:"★ Distintivi di Abilità, Opportunità di addestrare [2.800] Soldati o Accelerare [17H] Addestramento",resource:"Soldati"},
          BSTECH:{objective:"★ Distintivi di Abilità, Opportunità al Termine della Ricerca [aumentare 30.000 potenza] o Accelerare [50H]",resource:"Ricerca"},
          BSTRAIN:{objective:"Consiglio: Tempo di Addestramento Ottimale {time}, fino alla prossima Battle Survival a Tema Soldati",resource:"Soldati"},

          OFFBUILD:{objective:"Prossima Battle Survival, Termina le Costruzioni [aumenta 30.000 potenza] o Accelera [50H] Costruzione",resource:"Edifici"},
          OFFHERO:{objective:"Prossima Battle Survival, Usa [23.4M] Antitossine o [30] Ticket Eroe",resource:"Eroi"},
          OFFRAVEN:{objective:"Prossima Battle Survival, Usa Energia/Stamina in [15] Rally o Frutto del Corvo",resource:"Corvo"},
          OFFSOLDIER:{objective:"Prossima Battle Survival, Addestra [2.800] Soldati o Accelera [17H] Addestramento",resource:"Soldati"},
          OFFTECH:{objective:"Prossima Battle Survival, Termina la Ricerca [aumenta 30.000 potenza] o Accelera [50H] Ricerca",resource:"Ricerca"}
        },
        adPhases:{ P00:"Fase 0 : Raccolta e Riserva", P01:"Fase 1 : Migliora Corvo", P02:"Fase 2 : Sviluppo del Territorio", P03:"Fase 3 : Ricerca Tecnologica", P04:"Fase 4 : Crescita degli Eroi", P05:"Fase 5 : Preparazione alla Guerra", P06:"Fase 6 : Assalta il Nemico" },
        adEvents:{ DY:"Consiglio Giornaliero", AD:"Duello delle Alleanze", KVK:"Guerra tra Regni", ROY:"Tumulto della Città Reale", BS:"Calendario Battle Survival", EQ:"Miglioramento Equipaggiamento", BEX:"Battaglia dell'Elisir", CUM:"Valle dei Cumulo di Cristallo", CHE:"Trappola del Formaggio" }
    },
    de: {
        scheduleBattleSurvival:"Battle Survival Zeitplan",
        survivalMessage:"Automatischer Aktivitätszyklus, berechnet anhand der Zeitzone des Webbrowsers, mit Angabe der verstrichenen Zeit des aktuellen Events und der verbleibenden Dauer bis zu seinem Ende.",
        allianceMessage:"Liste der Aktivitäten auf Basis des Allianz-Duels, mit der du die Aktivitäten des heutigen und der kommenden Tage ausführen kannst. Zähler zeigen an, wann du sie durchführen sollst, sofern sie einen festen Zeitplan haben oder mit Battle Survival verknüpft sind.",
        bsHeaders:["Countdown", "Status", "Battle Survival Event", "Aktivitäten", "Server"],
        bsPast:"Beendet",
        bsCurrent:"Läuft",
        bsNext:"Nächste",
        bsEvents:{ BUILD:"Gebiet bauen", HEROE:"Helden verbessern", RAVEN:"Rabe verbessern", SOLDIER:"Soldaten trainieren", TECH:"Technologie-Forschung", STANDBY:"Bereitschaft" },
        scheduleAllianceDuel:"Allianz-Duell",
        adHeaders:["Countdown", "", "Aufgabe", "Ressource", "Event"],
        adPointsNote:"Die angezeigten Punkte sind ein Richtwert für einen Spieler mit VIP 9 und Allianz-Duell-Forschung, sie steigen mit deinem Forschungslevel im Allianz-Duell.",
        pageDailyTitle:"Tägliche Aktivitäten",
        pageDailyLead:"Details der täglichen Aktivitäten, die dir helfen, jeden Tag besser zu werden.",
        adActivities:{
          ANTX:{ objective:"Verbrauche 660 Antitoxine, priorisiere die erste UR-Gruppe",resource:"Antidot-Vorräte"},

          STMN: { objective:"Verbrauche Energie/Ausdauer, kaufe 24 Flaschen im VIP-Shop",resource:"Energie-/Ausdauerflasche"},
          DYBOTT: {objective:"Bewahre Energie-/Ausdauerflaschen für die nächste Rabenphase auf",resource:"Energie-/Ausdauerflasche"},
          DYBOTWAR: {objective:"Bewahre Energie-/Ausdauerflaschen für die Kriegsphase auf",resource:"Energie-/Ausdauerflasche"},

          FALCON: { objective:"Erledige Falkenmissionen, 10 oder 11 alle 6 Stunden",resource:"Falkenturm"},
          DYFALCON: {objective:"Starte Falkenmissionen, aber schließe sie nicht ab, halte 35 oder 40 offen",resource:"Falkenturm"},

          DYHERBS: {objective:"Beginne Kräuter zu sammeln",resource:"Kräutergarten Lv.10, 8H, 1.1M"},
          HERBS: {objective:"Sammle x60 Kräuter, den ganzen Tag",resource:"Kräutergarten Lv.10, 8H, 1.1M"},
          GRAIN: {objective:"Sammle x100 Getreide/Holz",resource:"Farm Lv.10, 6.5H, 2.2M"},

          EPIUR: {objective:"Erhalte UR-Inschrift-Fragmente, nutze jede Art von Inschriftentruhe",resource:"Inschriftentruhen"},
          RAVESS:{objective:"Verbrauche Rabenessenz, Priorität",resource:"Rabenessenz"},
          RAVFRT:{objective:"Verbrauche Rabenfrucht",resource:"Rabenfrucht"},
          RAVCH1:{objective:"Öffne Raben-Ausrüstungstruhe",resource:"Rabentruhe"},

          CON1SP:{objective:"Nutze Beschleunigung des Baus, aktiviere Bauministerium",resource:"Bau-Beschleunigung"},
          CONMGH:{objective:"Erhöhe die Stärke eines Gebäudes, kürzere Bauzeiten bevorzugt",resource:"Gebäude aufwerten"},

          STDSCR:{objective:"Nutze die Studierrolle in der Forschung",resource:"Belohnung des Allianz-Duels"},
          TCH1SP:{objective:"Nutze Forschungsbeschleunigung, aktiviere Forschungsministerium",resource:"Forschungsbeschleunigung"},
          TCHMGH:{objective:"Erhöhe die Technologiestärke, suche Forschung mit Studierrollen",resource:"Studierrolle"},

          CRVNUR:{objective:"Entsende UR-Karawanen",resource:"4 Karawanen"},
          OPENUR:{objective:"Führe UR-Geheime Operationen aus, mindestens 6 UR, die schwierigste auf SSR lassen",resource:"7 Geheime Operationen"},

          TCKSUR:{objective:"Rekrutiere Überlebende, mit ALLEN Überlebenden-Tickets",resource:"Überlebenden-Ticket"},
          SAVETS:{objective:"BEWAHRE ALLE Überlebenden-Tickets auf",resource:"Überlebenden-Ticket"},
          FREETS:{objective:"Nutze NUR 1 KOSTENLOSES Überlebenden-Ticket",resource:"Überlebenden-Ticket"},

          TCKHER:{objective:"Rekrutiere Helden, mit ALLEN Helden-Tickets, +50 erhältst du einen UR-Helden",resource:"Helden-Ticket"},
          SAVETH:{objective:"BEWAHRE ALLE Helden-Tickets auf",resource:"Helden-Ticket"},
          FREETH:{objective:"Nutze NUR 1 KOSTENLOSES Helden-Ticket",resource:"Helden-Ticket"},

          SHRDSR:{objective:"Verbrauche SR-Heldenfragment, priorisiere die Beförderung deines Helden, Beispiel Robin",resource:"SR-Heldenfragment"},
          SHRDSS:{objective:"Verbrauche SSR-Heldenfragment, priorisiere die Beförderung deines Helden, Beispiel Claire oder Bella",resource:"SSR-Heldenfragment"},
          SHRDUR:{objective:"Verbrauche UR-Heldenfragment, Priorität DPS > Support > Tank",resource:"UR-Heldenfragment"},
          SKILLB:{objective:"Nutze das Fähigkeitsabzeichen, Priorität UR-Heldenfähigkeit erhöhen",resource:"Fähigkeitsabzeichen"},

          SOLD1TRN:{objective:"Nutze Trainingsbeschleunigung, aktiviere Kriegsministerium",resource:"Trainingsbeschleunigung"},
          SOLDT10:{objective:"Trainiere Soldaten, Priorität T7 zu T8 befördern",resource:"Soldaten T6 > T7 > T8"},
          SOLDDFT:{objective:"Besiege Soldaten, Allianz-Duell",resource:"Angriff"},
          SOLDLST:{objective:"Verliere Soldaten, Allianz-Duell",resource:"Verteidigung"},
          SOLDMTC:{objective:"Besiege Soldaten (bestimmtes Match)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Trainiere T6- oder T7-Soldaten; am Vorkriegstag befördern",resource:"Soldat T7"},
          DYWALL:{objective:"Ziehe deine Soldaten von der Mauer zurück; Kriegstag",resource:"Heiligtums-Mauer"},

          HEA1SP:{objective:"Nutze Heilungsbeschleunigung, Heilungsbuff +150%",resource:"Heilungsbeschleunigung"},
          DYHOSPITAL:{objective:"Heile KEINE Soldaten; im Krankenhaus lassen, um am Kriegstag Heilungsbeschleuniger zu nutzen",resource:"Krankenhaus"},

          DYELITE:{objective:"Elite-Monster der Pest, erhalte Helden-Ticket und Antitoxin",resource:"Monster"},

          EQGEAR:{objective:"Nutze Ausrüstungsstein, Priorität bei UR-Ausrüstung",resource:"Ausrüstungsstein"},
          EQBPRN:{objective:"Nutze Ausrüstungsbauplan, befördere UR-Zusatzwerte",resource:"Ausrüstungsbauplan"},

          SHIELD:{objective:"Aktiviere 24H-Schilde, kaufe kostenlosen 8H-Schild im Allianz-Shop",resource:"Schild"},
          ELIXIR:{objective:"Erzeuge Punkte durch Erobern von Gebäuden",resource:"Elixierburg"},
          SCRAMBLE:{objective:"100K Ehrenpunkte, eroberte/verteidige eine Farm im Schlamm",resource:"Farmen der Königsstadt"},
          KWAR:{objective:"1.5M Ehrenpunkte, Soldaten besiegen/verlieren/heilen",resource:"Königreichskrieg (KvK)"},
          CUMULUS:{objective:"Sammle gereinigten Kristall in Kristallhaufen, 30min Dauer",resource:"Kristallhaufen"},
          CHEESE7:{objective:"335M Schaden am Käse-Dieb Lv.7, 30min Dauer, 1.4B Schaden für den MVP1",resource:"Käsefalle"},
          UNDEAD:{objective:"Halte 20 Wellen der Belagerung der Untoten stand, Stelle/Verstärke Soldaten auf der Mauer",resource:"Soldaten auf der Mauer"},
          DEMONW:{objective:"Dämonenkönig Krieger, Schaden des Helden Ranger +50%, 4 DPS + 1 Support",resource:"Dämonenkönig"},
          DEMONR:{objective:"Dämonenkönig Montaraz, Schaden des Helden Magier +50%, 4 DPS + 1 Support",resource:"Dämonenkönig"},
          DEMONZ:{objective:"Dämonenkönig Magier, Schaden des Helden Krieger +50%, 4 DPS + 1 Support",resource:"Dämonenkönig"},

          BSBUILD:{objective:"★ Fähigkeitsabzeichen, Gelegenheit beim Fertigstellen von Bauten [Stärke um 30.000 erhöhen] oder Beschleunigen [50H]",resource:"Gebäude"},
          BSHERO:{objective:"★ Fähigkeitsabzeichen, Gelegenheit beim Verwenden [23.4M] Antitoxinen oder [30] Helden-Tickets",resource:"Helden"},
          BSRAVEN:{objective:"★ Fähigkeitsabzeichen, Gelegenheit, Ausdauer/Energie in [15] Rallys oder Rabenfrucht zu nutzen",resource:"Rabe"},
          BSSOLDIER:{objective:"★ Fähigkeitsabzeichen, Gelegenheit, [2.800] Soldaten zu trainieren oder [17H] Training zu beschleunigen",resource:"Soldaten"},
          BSTECH:{objective:"★ Fähigkeitsabzeichen, Gelegenheit beim Fertigstellen der Forschung [Stärke um 30.000 erhöhen] oder Beschleunigen [50H]",resource:"Forschung"},
          BSTRAIN:{objective:"Hinweis: Optimale Trainingszeit {time}, bis zur nächsten Battle Survival mit dem Thema Soldaten",resource:"Soldaten"},

          OFFBUILD:{objective:"Nächste Battle Survival, Bauen abschließen [Stärke um 30.000 erhöhen] oder [50H] Construction beschleunigen",resource:"Gebäude"},
          OFFHERO:{objective:"Nächste Battle Survival, [23.4M] Antitoxine oder [30] Heldentickets verwenden",resource:"Helden"},
          OFFRAVEN:{objective:"Nächste Battle Survival, Energie/Ausdauer in [15] Rallies oder Ravenfrucht verwenden",resource:"Rabe"},
          OFFSOLDIER:{objective:"Nächste Battle Survival, [2.800] Soldaten trainieren oder [17H] Training beschleunigen",resource:"Soldaten"},
          OFFTECH:{objective:"Nächste Battle Survival, Forschung abschließen [Stärke um 30.000 erhöhen] oder [50H] Forschung beschleunigen",resource:"Forschung"}
        },
        adPhases:{
          P00:"Phase 0 : Sammeln und Lagern",
          P01:"Phase 1 : Rabe verbessern",
          P02:"Phase 2 : Gebietsentwicklung",
          P03:"Phase 3 : Technologie-Forschung",
          P04:"Phase 4 : Heldenwachstum",
          P05:"Phase 5 : Kriegsvorbereitung",
          P06:"Phase 6 : Angriff auf den Feind"
        },
        adEvents:{
          DY:"Täglicher Tipp",
          AD:"Allianz-Duell",
          KVK:"Königreichskrieg",
          ROY:"Aufruhr um die Königsstadt",
          BS:"Battle Survival",
          EQ:"Ausrüstungsaufwertung",
          BEX:"Elixier-Schlacht",
          CUM:"Tal der Kristallhaufen",
          CHE:"Käsefalle"
        }
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
        adPointsNote:"Les Points affichés sont une référence pour un joueur VIP 9 avec une Recherche du Duel d'Alliance, ils augmenteront selon votre niveau de recherche dans le Duel d'Alliance.",
        pageDailyTitle:"Activités Quotidiennes",
pageDailyLead:"Détails des activités quotidiennes qui vous aideront à vous améliorer chaque jour.",
        adActivities:{
          ANTX:{objective:"Consommez 660 Antitoxines, priorisez la première escouade UR",resource:"Fournitures d'Antidote"},

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
          OPENUR:{objective:"Effectuez des Opérations Secrètes UR, minimum 6 UR, laissez la plus difficile en SSR",resource:"7 Opérations Secrètes"},

          TCKSUR:{objective:"Recrutez des Survivants, en utilisant TOUS les Tickets de Survivant",resource:"Ticket de Survivant"},
          SAVETS:{objective:"SAUVEGARDEZ TOUS les Tickets de Survivant",resource:"Ticket de Survivant"},
          FREETS:{objective:"Utilisez UNIQUEMENT 1 Ticket GRATUIT de Survivant",resource:"Ticket de Survivant"},

          TCKHER:{objective:"Recrutez des Héros, en utilisant TOUS les Tickets de Héros, +50 vous obtenez un Héros UR",resource:"Ticket de Héros"},
          SAVETH:{objective:"SAUVEGARDEZ TOUS les Tickets de Héros",resource:"Ticket de Héros"},
          FREETH:{objective:"Utilisez UNIQUEMENT 1 Ticket GRATUIT de Héros",resource:"Ticket de Héros"},

          SHRDSR:{objective:"Consommez un Fragment de Héros SR, priorisez la promotion de votre Héros, exemple Robin",resource:"Fragment de Héros SR"},
          SHRDSS:{objective:"Consommez un Fragment de Héros SSR, priorisez la promotion de votre Héros, exemple Claire ou Bella",resource:"Fragment de Héros SSR"},
          SHRDUR:{objective:"Consommez un Fragment de Héros UR, priorité DPS > Support > Tank",resource:"Fragment de Héros UR"},
          SKILLB:{objective:"Utilisez un Badge de Compétence, Priorité Augmentez la Compétence du Héros UR",resource:"Badge de Compétence"},

          SOLD1TRN:{objective:"Utilisez une Accélération d'Entraînement, Activez le Ministère de la Guerre",resource:"Accélération d'Entraînement"},
          SOLDT10:{objective:"Entraînez un Soldat, Priorité Promotion de T7 à T8", resource:"Soldats T6 > T7 > T8"},
          SOLDDFT:{objective:"Vaincre des Soldats, Duel d'Alliance",resource:"Attaque"},
          SOLDLST:{objective:"Perdre des Soldats, Duel d'Alliance",resource:"Défense"},
          SOLDMTC:{objective:"Vaincre des Soldats (match spécifique)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Entraînez des Soldats T6 ou T7 ; promouvez-les le Jour de Préparation à la Guerre",resource:"Soldat T7"},
          DYWALL:{objective:"Retirez vos soldats du Mur ; Jour de Guerre",resource:"Mur du Sanctuaire"},

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
          CHEESE7:{objective:"335M de Dégâts au Voleur de Fromage Nv.7, 30min de durée, 1.4B de dégâts pour le MVP1",resource:"Piège à Fromage"},
          UNDEAD:{objective:"Résistez à 20 Vagues du Siège des Morts-Vivants, Placez/Renforcez des soldats sur le Mur",resource:"Soldats sur le Mur"},
          DEMONW:{objective:"Roi Démon Guerrier, Dégâts du Héros Rôdeur +50%, 4 DPS + 1 Support",resource:"Roi Démon"},
          DEMONR:{objective:"Roi Démon Montaraz, Dégâts du Héros Mage +50%, 4 DPS + 1 Support",resource:"Roi Démon"},
          DEMONZ:{objective:"Roi Démon Mage, Dégâts du Héros Guerrier +50%, 4 DPS + 1 Support",resource:"Roi Démon"},

          BSBUILD:{objective:"★ Badges de Compétence, Opportunité à la fin des Constructions [augmenter la Puissance de 30.000] ou Accélérer [50H]",resource:"Bâtiments"},
          BSHERO:{objective:"★ Badges de Compétence, Opportunité lors de l'Utilisation [23.4M] Antitoxines ou [30] Tickets de Héros",resource:"Héros"},
          BSRAVEN:{objective:"★ Badges de Compétence, Opportunité d'utiliser de l'Énergie/Endurance lors de [15] Rallys ou du Fruit de Corbeau",resource:"Corbeau"},
          BSSOLDIER:{objective:"★ Badges de Compétence, Opportunité d'entraîner [2.800] Soldats ou d'Accélérer l'Entraînement [17H]",resource:"Soldats"},
          BSTECH:{objective:"★ Badges de Compétence, Opportunité à la fin de la Recherche [augmenter la Puissance de 30.000] ou Accélérer [50H]",resource:"Recherche"},
          BSTRAIN:{objective:"Conseil : Temps d'Entraînement Optimal {time}, jusqu'à la prochaine Battle Survival au thème Soldats",resource:"Soldats"},

          OFFBUILD:{objective:"Prochaine Battle Survival, Terminer les Constructions [augmenter la Puissance de 30.000] ou Accélérer [50H] Construction",resource:"Bâtiments"},
          OFFHERO:{objective:"Prochaine Battle Survival, Utiliser [23.4M] Antitoxines ou [30] Tickets de Héros",resource:"Héros"},
          OFFRAVEN:{objective:"Prochaine Battle Survival, Utiliser Énergie/Endurance dans [15] Rallys ou Fruit du Corbeau",resource:"Corbeau"},
          OFFSOLDIER:{objective:"Prochaine Battle Survival, Entraîner [2.800] Soldats ou Accélérer l'Entraînement [17H]",resource:"Soldats"},
          OFFTECH:{objective:"Prochaine Battle Survival, Terminer la Recherche [augmenter la Puissance de 30.000] ou Accélérer [50H] Recherche",resource:"Recherche"}
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
        adPointsNote:"表示されたポイントはVIP9かつ同盟デュエル研究を持つプレイヤー基準の参考値であり、同盟デュエルでの研究レベルに応じて増加します。",
        pageDailyTitle:"デイリー活動",
pageDailyLead:"毎日改善するためのデイリー活動の詳細。",
        adActivities:{
          ANTX:{objective:"解毒剤を660個消費する、最初のUR小隊を優先する",resource:"解毒剤の物資"},

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
          OPENUR:{objective:"UR秘密作戦を実行する、最低6回UR、最も難しいものはSSRのままにする",resource:"秘密作戦 7回"},

          TCKSUR:{objective:"生存者をリクルートする、すべての生存者のチケットを使う",resource:"生存者のチケット"},
          SAVETS:{objective:"生存者のチケットをすべて保存する",resource:"生存者のチケット"},
          FREETS:{objective:"無料の生存者のチケット1個だけを使う",resource:"生存者のチケット"},

          TCKHER:{objective:"英雄をリクルートする、すべての英雄のチケットを使う、+50でUR英雄を獲得",resource:"英雄のチケット"},
          SAVETH:{objective:"英雄のチケットをすべて保存する",resource:"英雄のチケット"},
          FREETH:{objective:"無料の英雄チケット1枚だけを使う",resource:"英雄のチケット"},

          SHRDSR:{objective:"SR英雄の欠片を消費する、英雄の昇格を優先、例:ロビン",resource:"SR英雄の欠片"},
          SHRDSS:{objective:"SSR英雄の欠片を消費する、英雄の昇格を優先、例:クレアまたはベラ",resource:"SSR英雄の欠片"},
          SHRDUR:{objective:"UR英雄の欠片を消費する、DPS > サポート > タンクの順を優先",resource:"UR英雄の欠片"},
          SKILLB:{objective:"スキルバッジを使う、優先してUR英雄のスキルを上げる",resource:"スキルバッジ"},

          SOLD1TRN:{objective:"訓練速度アップを使う、戦争大臣の役職を発動",resource:"訓練速度アップ"},
          SOLDT10:{objective:"兵士を訓練する、優先してT7からT8へ昇格", resource:"兵士 T6 > T7 > T8"},
          SOLDDFT:{objective:"兵士を撃破する、同盟対決",resource:"攻撃"},
          SOLDLST:{objective:"兵士を失う、同盟対決",resource:"防御"},
          SOLDMTC:{objective:"兵士を撃破する（特定の戦闘）",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"T6またはT7兵士を訓練し、戦争準備日に昇格させる",resource:"兵士 T7"},
          DYWALL:{objective:"壁から兵士を撤退させる、戦争当日",resource:"聖域の壁"},

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
          CHEESE7:{objective:"チーズ泥棒 Lv.7 に335Mダメージ、30分間、1.4BダメージでMVP1",resource:"チーズの罠"},
          UNDEAD:{objective:"アンデッドSiegeの20波に耐える、壁に兵士を配置/増援する",resource:"壁の兵士"},
          DEMONW:{objective:"デーモンキング ウォリアー、レンジャー英雄のダメージ +50%、4 DPS + 1 Support",resource:"デーモンキング"},
          DEMONR:{objective:"デーモンキング モンタラーズ、ウィザード英雄のダメージ +50%、4 DPS + 1 Support",resource:"デーモンキング"},
          DEMONZ:{objective:"デーモンキング ウィザード、ウォリアー英雄のダメージ +50%、4 DPS + 1 Support",resource:"デーモンキング"},

          BSBUILD:{objective:"スキルバッジ ★、建設完了時の機会 [威力を30.000上昇] または加速 [50H]",resource:"建物"},
          BSHERO:{objective:"スキルバッジ ★、使用時の機会 [23.4M] 解毒剤 または [30] 英雄チケット",resource:"英雄"},
          BSRAVEN:{objective:"スキルバッジ ★、エネルギー/スタミナを [15] 集结で使用 または レイベンの果物 を使う機会",resource:"レイベン"},
          BSSOLDIER:{objective:"スキルバッジ ★、兵士 [2.800] を訓練 または [17H] 訓練を加速 する機会",resource:"兵士"},
          BSTECH:{objective:"スキルバッジ ★、研究完了時の機会 [威力を30.000上昇] または加速 [50H]",resource:"研究"},
          BSTRAIN:{objective:"ヒント: 最適な訓練時間 {time}、次の兵士テーマの Battle Survival まで",resource:"兵士"},

          OFFBUILD:{objective:"次の Battle Survival、建設完了 [威力を30.000上昇] または [50H] 建設を加速",resource:"建物"},
          OFFHERO:{objective:"次の Battle Survival、解毒剤 [23.4M] または英雄チケット [30] 使用",resource:"英雄"},
          OFFRAVEN:{objective:"次の Battle Survival、エネルギー/スタミナを [15] 集结で使用 またはレイベンの果物 を使う機会",resource:"レイベン"},
          OFFSOLDIER:{objective:"次の Battle Survival、兵士 [2.800] を訓練 または [17H] 訓練を加速 する機会",resource:"兵士"},
          OFFTECH:{objective:"次の Battle Survival、研究完了 [威力を30.000上昇] または [50H] 研究を加速",resource:"研究"}
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
        adPointsNote:"Показанные Очки являются ориентиром для игрока с VIP 9 и Исследованием Дуэли Альянсов, они увеличатся в зависимости от вашего уровня исследований в Дуэли Альянсов.",
        pageDailyTitle:"Ежедневные активности",
pageDailyLead:"Подробности ежедневных активностей, которые помогут вам постоянно совершенствоваться.",
        adActivities:{
          ANTX:{objective:"Потребить 660 Антитоксинов, приоритет первому отряду UR",resource:"Припасы Антидота"},

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
          OPENUR:{objective:"Выполнить 7 Скрытых Операций UR, минимум 6 UR, самую сложную оставить на SSR",resource:"7 Скрытых Операций"},

          TCKSUR:{objective:"Нанять Выживших, используйте ВСЕ Билеты Выжившего",resource:"Билет Выжившего"},
          SAVETS:{objective:"СОХРАНИТЬ ВСЕ Билеты Выжившего",resource:"Билет Выжившего"},
          FREETS:{objective:"Использовать ТОЛЬКО 1 Бесплатный Билет Выжившего",resource:"Билет Выжившего"},

          TCKHER:{objective:"Нанять Героев, используйте ВСЕ Билеты Героя, +50 получите Героя UR",resource:"Билет Героя"},
          SAVETH:{objective:"СОХРАНИТЬ ВСЕ Билеты Героя",resource:"Билет Героя"},
          FREETH:{objective:"Использовать ТОЛЬКО 1 Бесплатный Билет Героя",resource:"Билет Героя"},

          SHRDSR:{objective:"Потребить Осколок Героя SR, приоритет повышению Героя, например Роджер",resource:"Осколок Героя SR"},
          SHRDSS:{objective:"Потребить Осколок Героя SSR, приоритет повышению Героя, например Клэр или Белла",resource:"Осколок Героя SSR"},
          SHRDUR:{objective:"Потребить Осколок Героя UR, приоритет DPS > Поддержка > Танк",resource:"Осколок Героя UR"},
          SKILLB:{objective:"Использовать Значок Навыка, Приоритет повысить Навык Героя UR",resource:"Значок Навыка"},

          SOLD1TRN:{objective:"Использовать Ускорение Обучения, Активировать Министерство Обучения",resource:"Ускорение Обучения"},
          SOLDT10:{objective:"Обучить Солдата, приоритет повышение с T7 до T8", resource:"Солдаты T6 > T7 > T8"},
          SOLDDFT:{objective:"Победить Солдат, Дуэль Альянсов",resource:"Атака"},
          SOLDLST:{objective:"Потерять Солдат, Дуэль Альянсов",resource:"Оборона"},
          SOLDMTC:{objective:"Победить Солдат (конкретный матч)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Обучить Солдат T6 или T7; повысить их в День Подготовки к Войне",resource:"Солдат T7"},
          DYWALL:{objective:"Отозвать солдат со Стены; День Войны",resource:"Стена Святилища"},

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
          CHEESE7:{objective:"Нанести 335M урона Вору Сыра Ур.7, 30мин, 1.4B урона для MVP1",resource:"Сырная Ловушка"},
          UNDEAD:{objective:"Выдержать 20 волн Осады Нежити, Разместить/Усилить солдат на Стене",resource:"Солдаты на Стене"},
          DEMONW:{objective:"Король Демон Воин, Урон Героя Рейнджера +50%, 4 DPS + 1 Support",resource:"Король Демон"},
          DEMONR:{objective:"Король Демон Монтараз, Урон Героя Волшебника +50%, 4 DPS + 1 Support",resource:"Король Демон"},
          DEMONZ:{objective:"Король Демон Волшебник, Урон Героя Воина +50%, 4 DPS + 1 Support",resource:"Король Демон"},

          BSBUILD:{objective:"★ Значки Навыка, Возможность при завершении Строительств [повысить Мощь на 30.000] или Ускорить [50H]",resource:"Здания"},
          BSHERO:{objective:"★ Значки Навыка, Возможность при Использовании [23.4M] Антитоксинов или [30] Билетов Героя",resource:"Герои"},
          BSRAVEN:{objective:"★ Значки Навыка, Возможность использовать Энергию/Стамину в [15] Ралли или Плод Ворона",resource:"Ворона"},
          BSSOLDIER:{objective:"★ Значки Навыка, Возможность обучить [2.800] Солдат или Ускорить Обучение [17H]",resource:"Солдаты"},
          BSTECH:{objective:"★ Значки Навыка, Возможность при завершении Исследований [повысить Мощь на 30.000] или Ускорить [50H]",resource:"Исследования"},
          BSTRAIN:{objective:"Совет: Оптимальное время тренировки {time}, до следующей Battle Survival с темой Солдат",resource:"Солдаты"},

          OFFBUILD:{objective:"Следующая Battle Survival, Завершить Постройки [повысить Мощь на 30.000] или Ускорить [50H] Строительство",resource:"Здания"},
          OFFHERO:{objective:"Следующая Battle Survival, Использовать [23.4M] Антитоксины или [30] Билетов Героя",resource:"Герои"},
          OFFRAVEN:{objective:"Следующая Battle Survival, Использовать Энергию/Выносливость в [15] Ралли или Ягоду Ворона",resource:"Ворон"},
          OFFSOLDIER:{objective:"Следующая Battle Survival, Обучить [2.800] Солдат или Ускорить Обучение [17H]",resource:"Солдаты"},
          OFFTECH:{objective:"Следующая Battle Survival, Завершить Исследование [повысить Мощь на 30.000] или Ускорить [50H] Исследование",resource:"Исследования"}
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
        adPointsNote:"显示的点数是拥有VIP9和联盟对决研究的玩家的参考值，会根据你在联盟对决中的研究等级而增加。",
        pageDailyTitle:"每日活动",
pageDailyLead:"每日活动的详细信息，帮助你每天不断进步。",
        adActivities:{
          ANTX:{objective:"消耗660解毒剂，优先第一UR小队",resource:"解毒剂补给"},

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
          OPENUR:{objective:"执行7次UR秘密行动，至少6次UR，最难的一次保留为SSR",resource:"7次秘密行动"},

          TCKSUR:{objective:"招募幸存者，使用所有幸存者票券",resource:"幸存者票券"},
          SAVETS:{objective:"保存所有幸存者票券",resource:"幸存者票券"},
          FREETS:{objective:"仅使用1张免费幸存者票券",resource:"幸存者票券"},

          TCKHER:{objective:"招募英雄，使用所有英雄票券，+50获得UR英雄",resource:"英雄票券"},
          SAVETH:{objective:"保存所有英雄票券",resource:"英雄票券"},
          FREETH:{objective:"仅使用1张免费英雄票券",resource:"英雄票券"},

          SHRDSR:{objective:"消耗SR英雄碎片，优先晋升你的英雄，例如罗宾",resource:"SR英雄碎片"},
          SHRDSS:{objective:"消耗SSR英雄碎片，优先晋升你的英雄，例如克莱尔或贝拉",resource:"SSR英雄碎片"},
          SHRDUR:{objective:"消耗UR英雄碎片，优先输出 > 辅助 > 坦克",resource:"UR英雄碎片"},
          SKILLB:{objective:"使用技能徽章，优先提升UR英雄技能",resource:"技能徽章"},

          SOLD1TRN:{objective:"使用训练加速，激活战争大臣",resource:"训练加速"},
          SOLDT10:{objective:"训练士兵，优先将T7晋升为T8", resource:"士兵 T6 > T7 > T8"},
          SOLDDFT:{objective:"击败士兵，联盟对决",resource:"攻击"},
          SOLDLST:{objective:"损失士兵，联盟对决",resource:"防御"},
          SOLDMTC:{objective:"击败士兵（指定战斗）",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"训练T6或T7士兵，并在战争准备日晋升他们",resource:"士兵 T7"},
          DYWALL:{objective:"将士兵从城墙撤回；战争日",resource:"圣所城墙"},

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
          CHEESE7:{objective:"对奶酪小偷 7 级造成335M伤害，持续30分钟，1.4B伤害达成MVP1",resource:"奶酪陷阱"},
          UNDEAD:{objective:"抵挡亡灵围攻的20波，在城墙上布置/增援士兵",resource:"城墙上的士兵"},
          DEMONW:{objective:"恶魔王 战士，游侠英雄伤害 +50%，4 伤害输出 + 1 辅助",resource:"恶魔王"},
          DEMONR:{objective:"恶魔王 山地人，巫师英雄伤害 +50%，4 伤害输出 + 1 辅助",resource:"恶魔王"},
          DEMONZ:{objective:"恶魔王 巫师，战士英雄伤害 +50%，4 伤害输出 + 1 辅助",resource:"恶魔王"},

          BSBUILD:{objective:"技能徽章 ★，完成建造时的机会 [提升 30.000 战力] 或加速 [50H]",resource:"建筑"},
          BSHERO:{objective:"技能徽章 ★，使用时的机会 [23.4M] 解毒剂 或 [30] 英雄票券",resource:"英雄"},
          BSRAVEN:{objective:"技能徽章 ★，在 [15] 次集结中使用体力/能量 或 渡鸦果实 的机会",resource:"渡鸦"},
          BSSOLDIER:{objective:"技能徽章 ★，训练 [2.800] 名士兵 或 加速 [17H] 训练 的机会",resource:"士兵"},
          BSTECH:{objective:"技能徽章 ★，完成研究时的机会 [提升 30.000 战力] 或加速 [50H]",resource:"研究"},
          BSTRAIN:{objective:"提示：最佳训练时间 {time}，直到下一次士兵主题的 Battle Survival",resource:"士兵"},

          OFFBUILD:{objective:"下次 Battle Survival，完成建造 [提升 30.000 战力] 或加速 [50H] 建造",resource:"建筑"},
          OFFHERO:{objective:"下次 Battle Survival，使用 [23.4M] 解毒剂 或 [30] 英雄券",resource:"英雄"},
          OFFRAVEN:{objective:"下次 Battle Survival，在 [15] 次集结中使用 能量/耐力 或使用渡鸦果实",resource:"渡鸦"},
          OFFSOLDIER:{objective:"下次 Battle Survival，训练 [2.800] 名士兵 或加速 [17H] 训练",resource:"士兵"},
          OFFTECH:{objective:"下次 Battle Survival，完成研究 [提升 30.000 战力] 或加速 [50H] 研究",resource:"研究"}
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
        adPointsNote:"Gösterilen Puanlar, VIP 9 ve İttifak Düellosu Araştırmasına sahip bir oyuncuyu referans alır, İttifak Düellosu'ndaki araştırma seviyenize göre artacaktır.",
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
            objective:"660 Antitoksin tüket, ilk UR takımına öncelik ver",
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
            objective:"UR Gizli Operasyonları Yap, en az 6 UR, en zor olanı SSR'de bırak",
            resource:"7 Gizli Operasyon"
          },

          TCKSUR:{
            objective:"Hayatta Kalanları İşe Al, Tüm Hayatta Kalana Biletlerini Kullan",
            resource:"Hayatta Kalana Bileti"
          },
          SAVETS:{
            objective:"TÜM Hayatta Kalana Biletlerini Kaydet",
            resource:"Hayatta Kalana Bileti"
          },
          FREETS:{
            objective:"Yalnızca 1 Ücretsiz Hayatta Kalana Biletini Kullan",
            resource:"Hayatta Kalana Bileti"
          },

          TCKHER:{
            objective:"Kahramanları İşe Al, Tüm Kahraman Biletlerini Kullan, +50 ile UR Kahraman kazanırsın",
            resource:"Kahraman Bileti"
          },
          SAVETH:{
            objective:"TÜM Kahraman Biletlerini Kaydet",
            resource:"Kahraman Bileti"
          },
          FREETH:{
            objective:"Yalnızca 1 Ücretsiz Kahraman Biletini Kullan",
            resource:"Kahraman Bileti"
          },

          SHRDSR:{
            objective:"SR Kahraman Parçası Tüket, Kahramanını Yükseltmeye Öncelik Ver, örnek Robin",
            resource:"SR Kahraman Parçası"
          },
          SHRDSS:{
            objective:"SSR Kahraman Parçası Tüket, Kahramanını Yükseltmeye Öncelik Ver, örnek Claire veya Bella",
            resource:"SSR Kahraman Parçası"
          },
          SHRDUR:{
            objective:"UR Kahraman Parçası Tüket, Öncelik DPS > Destek > Tank",
            resource:"UR Kahraman Parçası"
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
          DYWALL:{
            objective:"Askerlerini Surlardan Geri Çek, Savaş Günü",
            resource:"Kutsal Alan Surları"
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
          },
          UNDEAD:{
            objective:"Ölüler Kuşatması'nın 20 Dalgasına Dayan, Surlara Asker Yerleştir/Güçlendir",
            resource:"Surlardaki Askerler"
          },
          DEMONW:{
            objective:"Şeytan Kralı Savaşçı, Ranger Kahraman Hasarı +50%, 4 DPS + 1 Support",
            resource:"Şeytan Kralı"
          },
          DEMONR:{
            objective:"Şeytan Kralı Montaraz, Büyücü Kahraman Hasarı +50%, 4 DPS + 1 Support",
            resource:"Şeytan Kralı"
          },
          DEMONZ:{
            objective:"Şeytan Kralı Büyücü, Savaşçı Kahraman Hasarı +50%, 4 DPS + 1 Support",
            resource:"Şeytan Kralı"
          },

          BSBUILD:{
            objective:"★ Yetenek Rozeti, İnşaatları Bitirdiğinizde Fırsat [30.000 güç artır] veya Hızlandır [50H]",
            resource:"Binalar"
          },
          BSHERO:{
            objective:"★ Yetenek Rozeti, Kullanma Fırsatı [23.4M] Antitoksin veya [30] Kahraman Bileti",
            resource:"Kahramanlar"
          },
          BSRAVEN:{
            objective:"★ Yetenek Rozeti, Enerji/Dayanıklılığı [15] Rally'de Kullanma veya Karga Meyvesi Fırsatı",
            resource:"Karga"
          },
          BSSOLDIER:{
            objective:"★ Yetenek Rozeti, [2.800] Asker Eğitme veya [17H] Eğitimi Hızlandırma Fırsatı",
            resource:"Askerler"
          },
          BSTECH:{
            objective:"★ Yetenek Rozeti, Araştırmayı Bitirdiğinizde Fırsat [30.000 güç artır] veya Hızlandır [50H]",
            resource:"Araştırma"
          },
          BSTRAIN:{
            objective:"İpucu: Optimal Eğitim Süresi {time}, bir sonraki Asker Teması Battle Survival'a kadar",
            resource:"Askerler"
          },

          OFFBUILD:{
            objective:"Sıradaki Battle Survival, İnşaatları Bitir [30.000 güç artır] veya [50H] İnşaat Hızlandır",
            resource:"Binalar"
          },
          OFFHERO:{
            objective:"Sıradaki Battle Survival, [23.4M] Antitoksin veya [30] Kahraman Bileti Kullan",
            resource:"Kahramanlar"
          },
          OFFRAVEN:{
            objective:"Sıradaki Battle Survival, Enerji/Dayanıklılığı [15] Rally'de Kullan veya Karga Meyvesi Fırsatı",
            resource:"Karga"
          },
          OFFSOLDIER:{
            objective:"Sıradaki Battle Survival, [2.800] Asker Eğit veya [17H] Eğitimi Hızlandır",
            resource:"Askerler"
          },
          OFFTECH:{
            objective:"Sıradaki Battle Survival, Araştırmayı Bitir [30.000 güç artır] veya [50H] Araştırma Hızlandır",
            resource:"Araştırma"
          }
        }
      },
    pl: {
        scheduleBattleSurvival:"Harmonogram Battle Survival",
        survivalMessage:"Automatyczny cykl aktywności, obliczany według strefy czasowej przeglądarki, wskazujący czas, jaki upłynął od rozpoczęcia bieżącego wydarzenia, oraz ile pozostało do jego końca.",
        allianceMessage:"Lista aktywności oparta na Pojedynku Sojuszy, która pozwala wykonać zadania na dziś i w przyszłości, z licznikami wskazującymi, kiedy je wykonać, jeśli mają ustalony termin albo są powiązane z Battle Survival.",
        bsHeaders:["Licznik", "Status", "Wydarzenie Battle Survival", "Aktywności", "Serwer"],
        bsPast:"Zakończona",
        bsCurrent:"W toku",
        bsNext:"Następna",
        bsEvents:{ BUILD:"Buduj Terytorium", HEROE:"Ulepsz Bohaterów", RAVEN:"Ulepsz Kruka", SOLDIER:"Szkol Żołnierzy", TECH:"Badania Technologiczne", STANDBY:"Czekaj" },
        scheduleAllianceDuel:"Pojedynek Sojuszy",
        adHeaders:["Licznik", "", "Zadanie", "Zasób", "Wydarzenie"],
        adPointsNote:"Punkty są odniesieniem dla gracza z VIP 9 i badaniami Pojedynku Sojuszy; wzrosną zgodnie z Twoim poziomem badań w Pojedynku Sojuszy.",
        pageDailyTitle:"Codzienne aktywności",
        pageDailyLead:"Szczegóły codziennych aktywności, które pomogą Ci codziennie się rozwijać.",
        adPhases:{
          P00:"Faza 0 : Zbieranie i Zapasy",
          P01:"Faza 1 : Ulepsz Kruka",
          P02:"Faza 2 : Rozwój Terytorium",
          P03:"Faza 3 : Badania Technologiczne",
          P04:"Faza 4 : Rozwój Bohaterów",
          P05:"Faza 5 : Przygotowanie do Wojny",
          P06:"Faza 6 : Napad na Wroga"
        },
        adEvents:{ DY:"Codzienna Wskazówka", AD:"Pojedynek Sojuszy", KVK:"Wojna Królestw", ROY:"Zamieszanie w Królewskim Mieście", BS:"Battle Survival", EQ:"Ulepszanie Ekwipunku", BEX:"Bitwa o Eliksir", CUM:"Dolina Kryształowych Skał", CHE:"Pułapka na Ser" },
        adActivities:{
          ANTX:{ objective:"Zużyj 660 Antidotów, priorytet dla pierwszego oddziału UR",resource:"Zapasy Antydotów"},

          STMN: { objective:"Zużyj energię/wytrzymałość, kup 24 butelki w Sklepie VIP",resource:"Butelka Energii/Wytrzymałości"},
          DYBOTT: {objective:"Zachowaj butelki energii/wytrzymałości na Następną Fazę Kruka",resource:"Butelka Energii/Wytrzymałości"},
          DYBOTWAR: {objective:"Zachowaj butelki energii/wytrzymałości na Fazę Wojenną",resource:"Butelka Energii/Wytrzymałości"},

          FALCON: { objective:"Ukończ Misje Sokoła, 10 lub 11 co 6 Godzin",resource:"Wieża Sokoła"},
          DYFALCON: {objective:"Rozpocznij Misje Sokoła, ale ich nie kończ, trzymaj 35 lub 40 w oczekiwaniu",resource:"Wieża Sokoła"},

          DYHERBS: {objective:"Rozpocznij Zbieranie Ziół",resource:"Ogród Ziołowy Lv.10, 8H, 1.1M"},
          HERBS: {objective:"Zbierz x60 Ziół, cały dzień",resource:"Ogród Ziołowy Lv.10, 8H, 1.1M"},
          GRAIN: {objective:"Zbierz x100 Zboża/Drewna",resource:"Farma Lv.10, 6.5H, 2.2M"},

          EPIUR: {objective:"Zdobądź Fragmenty Epigrafu UR, użyj każdego rodzaju Skrzyni Epigrafu",resource:"Skrzynie Epigrafów"},
          RAVESS:{objective:"Zużyj Esencję Kruka, Priorytet",resource:"Esencja Kruka"},
          RAVFRT:{objective:"Zużyj Owoc Kruka",resource:"Owoc Kruka"},
          RAVCH1:{objective:"Otwórz Skrzynię Wyposażenia Kruka",resource:"Skrzynia Kruka"},

          CON1SP:{objective:"Użyj Przyspieszenia Budowy, aktywuj Ministerstwo Budowy",resource:"Przyspieszenie Budowy"},
          CONMGH:{objective:"Zwiększ Moc Budynku, preferuj krótsze czasy budowy",resource:"Ulepsz Budynek"},

          STDSCR:{objective:"Użyj Zwijki Nauki w badaniach",resource:"Nagroda Pojedynku Sojuszy"},
          TCH1SP:{objective:"Użyj Przyspieszenia Badań, aktywuj Ministerstwo Badań",resource:"Przyspieszenie Badań"},
          TCHMGH:{objective:"Zwiększ Moc Technologii, szukaj badań ze Zwijkami Nauki",resource:"Zwijka Nauki"},

          CRVNUR:{objective:"Wyślij 4 Karawany UR",resource:"4 Karawany"},
          OPENUR:{objective:"Wykonaj Tajne Operacje UR, minimum 6 UR, najtrudniejszą zostaw na SSR",resource:"7 Tajnych Operacji"},

          TCKSUR:{objective:"Zatrudnij Ocalałych, używając WSZYSTKICH Biletów Ocalałego",resource:"Bilet Ocalałego"},
          SAVETS:{objective:"ZACHOWAJ WSZYSTKIE Bilety Ocalałego",resource:"Bilet Ocalałego"},
          FREETS:{objective:"Użyj TYLKO 1 DARMOWEGO Biletu Ocalałego",resource:"Bilet Ocalałego"},

          TCKHER:{objective:"Zatrudnij Bohaterów, używając WSZYSTKICH Biletów Bohatera, +50 zdobędziesz Bohatera UR",resource:"Bilet Bohatera"},
          SAVETH:{objective:"ZACHOWAJ WSZYSTKIE Bilety Bohatera",resource:"Bilet Bohatera"},
          FREETH:{objective:"Użyj TYLKO 1 DARMOWEGO Biletu Bohatera",resource:"Bilet Bohatera"},

          SHRDSR:{objective:"Zużyj Fragment Bohatera SR, priorytet: awansuj Bohatera, przykład Robin",resource:"Fragment Bohatera SR"},
          SHRDSS:{objective:"Zużyj Fragment Bohatera SSR, priorytet: awansuj Bohatera, przykład Claire lub Bella",resource:"Fragment Bohatera SSR"},
          SHRDUR:{objective:"Zużyj Fragment Bohatera UR, priorytet: DPS > Wsparcie > Czołg",resource:"Fragment Bohatera UR"},
          SKILLB:{objective:"Użyj Odznaki Umiejętności, Priorytet: Zwiększ Umiejętność Bohatera UR",resource:"Odznaka Umiejętności"},

          SOLD1TRN:{objective:"Użyj Przyspieszenia Szkolenia, aktywuj Ministerstwo Wojny",resource:"Przyspieszenie Szkolenia"},
          SOLDT10:{objective:"Wyszkol Żołnierza, Priorytet: Awansuj T7 do T8",resource:"Żołnierze T6 > T7 > T8"},
          SOLDDFT:{objective:"Pokonaj Żołnierzy, Pojedynek Sojuszy",resource:"Atak"},
          SOLDLST:{objective:"Strac żołnierzy, Pojedynek Sojuszy",resource:"Obrona"},
          SOLDMTC:{objective:"Pokonaj Żołnierzy (wybrane starcie)",resource:"T8 vs T8"},
          DYSOLDIER:{objective:"Wyszkol żołnierzy T6 lub T7; awansuj w Dniu Przygotowania do Wojny",resource:"Żołnierz T7"},
          DYWALL:{objective:"Wycofaj swoich żołnierzy z Muru; Dzień Wojny",resource:"Mur Sanktuarium"},

          HEA1SP:{objective:"Użyj Przyspieszenia Leczenia, Bonus Leczenia +150%",resource:"Przyspieszenie Leczenia"},
          DYHOSPITAL:{objective:"NIE lecz żołnierzy; zostaw ich w Szpitalu, aby użyć przyspieszeń leczenia w Dniu Wojny",resource:"Szpital"},

          DYELITE:{objective:"Elitarna Zaraza Potworów, zdobądź Bilet Bohatera i Antidot",resource:"Potwory"},

          EQGEAR:{objective:"Użyj Kamienia Ekwipunku, Priorytet: Ekwipunek UR",resource:"Kamień Ekwipunku"},
          EQBPRN:{objective:"Użyj Planu Ekwipunku, awansuj dodatkowe statystyki UR",resource:"Plan Ekwipunku"},

          SHIELD:{objective:"Aktywuj Osłony 24H, kup darmową Osłonę 8H w Sklepie Sojuszu",resource:"Osłona"},
          ELIXIR:{objective:"Zdobywaj Punkty przez zajmowanie Budynków",resource:"Zamek Eliksiru"},
          SCRAMBLE:{objective:"100K Punktów Honoru, zajmij/obroń farmę w błocie",resource:"Farmy Królewskiego Miasta"},
          KWAR:{objective:"1.5M Punktów Honoru, pokonaj/strac/ulecz żołnierzy",resource:"Wojna Królestw (KvK)"},
          CUMULUS:{objective:"Zbieraj oczyszczony Kryształ ze Skał, 30min czasu",resource:"Kryształowe Skały"},
          CHEESE7:{objective:"Zadaj 335M obrażeń Złodziejowi Ser Lv.7, 30min czasu, 1.4B obrażeń dla MVP1",resource:"Pułapka na Ser"},
          UNDEAD:{objective:"Wytrzymaj 20 Fal Oblężenia Zombies, Postaw/Wzmocnij żołnierzy na Murze",resource:"Żołnierze na Murze"},
          DEMONW:{objective:"Król Demonów Wojownik, obrażenia Bohatera Rangera +50%, 4 DPS + 1 Support",resource:"Król Demonów"},
          DEMONR:{objective:"Król Demonów Montaraz, obrażenia Bohatera Czarodzieja +50%, 4 DPS + 1 Support",resource:"Król Demonów"},
          DEMONZ:{objective:"Król Demonów Czarodziej, obrażenia Bohatera Wojownika +50%, 4 DPS + 1 Support",resource:"Król Demonów"},

          BSBUILD:{objective:"★ Odznaka Umiejętności, okazja po zakończeniu budowy [zwiększ moc o 30.000] lub przyspiesz [50H]",resource:"Budynki"},
          BSHERO:{objective:"★ Odznaka Umiejętności, okazja przy użyciu [23.4M] Antydotów lub [30] Biletów Bohatera",resource:"Bohaterowie"},
          BSRAVEN:{objective:"★ Odznaka Umiejętności, okazja na zużycie energii/wytrzymałości w [15] Rajdach lub Owocu Kruka",resource:"Kruk"},
          BSSOLDIER:{objective:"★ Odznaka Umiejętności, okazja na wyszkolenie [2.800] Żołnierzy lub przyspieszenie [17H] szkolenia",resource:"Żołnierze"},
          BSTECH:{objective:"★ Odznaka Umiejętności, okazja po zakończeniu badań [zwiększ moc o 30.000] lub przyspiesz [50H]",resource:"Badania"},
          BSTRAIN:{objective:"Wskazówka: Optymalny Czas Szkolenia {time}, do następnej Battle Survival z tematem Żołnierze",resource:"Żołnierze"},

          OFFBUILD:{objective:"Następna Battle Survival, Zakończ budowy [zwiększ moc o 30.000] lub przyspiesz [50H] budowy",resource:"Budynki"},
          OFFHERO:{objective:"Następna Battle Survival, Użyj [23.4M] Antydotów lub [30] Biletów Bohatera",resource:"Bohaterowie"},
          OFFRAVEN:{objective:"Następna Battle Survival, Użyj energii/wytrzymałości w [15] Rajdach lub Owocu Kruka",resource:"Kruk"},
          OFFSOLDIER:{objective:"Następna Battle Survival, Wyszkol [2.800] Żołnierzy lub przyspiesz [17H] szkolenia",resource:"Żołnierze"},
          OFFTECH:{objective:"Następna Battle Survival, Zakończ badania [zwiększ moc o 30.000] lub przyspiesz [50H] badań",resource:"Badania"}
        }
      }
  };

  Object.keys(texts).forEach(function (lang) {
    window.I18N[lang] = Object.assign(window.I18N[lang] || {}, texts[lang]);
  });
})();
