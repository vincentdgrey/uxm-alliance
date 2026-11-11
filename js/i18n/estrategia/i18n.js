/* Traducciones propias de esta pagina. Amplian el nucleo común de window.I18N. */
(function () {
  "use strict";

  var texts = {
    es: {
        pageStrategyTitle:"Estrategia",
pageStrategyLead:"Instrucciones tácticas que te ayudarán en los eventos y en tu proyección de crecimiento de héroes.",
    },
    en: {
        pageStrategyTitle:"Strategy",
pageStrategyLead:"Tactical instructions to help you in events and in your heroes growth projection.",
    },
    pt: {
        pageStrategyTitle:"Estratégia",
pageStrategyLead:"Instruções táticas que vão ajudar você nos eventos e na sua projeção de crescimento de heróis.",
    },
    it: {
        pageStrategyTitle:"Strategia",
pageStrategyLead:"Istruzioni tattiche che ti aiuteranno negli eventi e nella tua crescita di eroi.",
    },
    fr: {
        pageStrategyTitle:"Stratégie",
pageStrategyLead:"Des instructions tactiques pour vous aider lors des événements et dans la progression de vos héros.",
    },
    ja: {
        pageStrategyTitle:"戦略",
pageStrategyLead:"イベントでの戦いと英雄の成長を見積もるための戦術的な指示です。",
    },
    ru: {
        pageStrategyTitle:"Стратегия",
pageStrategyLead:"Тактические инструкции, которые помогут в событиях и в росте твоих героев.",
    },
    zh: {
        pageStrategyTitle:"战略",
pageStrategyLead:"战术指引，帮助你应对活动并规划英雄成长。",
    },
    tr: {
        pageStrategyTitle:"Strateji",
        pageStrategyLead:"Etkinliklerde ve kahramanlarının gelişim projesinde sana yardımcı olacak taktik talimatları."
      }
  };

  Object.keys(texts).forEach(function (lang) {
    window.I18N[lang] = Object.assign(window.I18N[lang] || {}, texts[lang]);
  });
})();
