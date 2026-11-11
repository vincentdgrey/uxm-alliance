/* Traducciones propias de esta pagina. Amplian el nucleo común de window.I18N. */
(function () {
  "use strict";

  var texts = {
    es: {
        pageContactTitle:"Contacto",
pageContactLead:"Escríbenos para compartir tu opinión o informarnos sobre saqueos, y comparte nuestro canal de YouTube @VincentDantesGrey.",
        contactFormTitle:"Formulario de contacto",
contactFormOpen:"Abrir el formulario en una pestaña nueva",
contactFormFrameTitle:"Formulario de contacto de UXM",
    },
    en: {
        pageContactTitle:"Contact",
pageContactLead:"Write to us to share your opinion or tell us about raids, and share our YouTube channel @VincentDantesGrey.",
        contactFormTitle:"Contact Form",
contactFormOpen:"Open the form in a new tab",
contactFormFrameTitle:"UXM contact form",
    },
    pt: {
        pageContactTitle:"Contato",
pageContactLead:"Escreva-nos para partilhar a sua opinião ou avisar sobre saques, e partilhe o nosso canal do YouTube @VincentDantesGrey.",
        contactFormTitle:"Formulário de contacto",
contactFormOpen:"Abrir o formulário num novo separador",
contactFormFrameTitle:"Formulário de contacto da UXM",
    },
    it: {
        pageContactTitle:"Contatti",
pageContactLead:"Scrivici per condividere la tua opinione o segnalarci i saccheggi, e condividi il nostro canale YouTube @VincentDantesGrey.",
        contactFormTitle:"Modulo di contatto",
contactFormOpen:"Apri il modulo in una nuova scheda",
contactFormFrameTitle:"Modulo di contatto UXM",
    },
    fr: {
        pageContactTitle:"Contact",
pageContactLead:"Écrivez-nous pour partager votre avis ou nous signaler des razzias, et partagez notre chaîne YouTube @VincentDantesGrey.",
        contactFormTitle:"Formulaire de contact",
contactFormOpen:"Ouvrir le formulaire dans un nouvel onglet",
contactFormFrameTitle:"Formulaire de contact UXM",
    },
    ja: {
        pageContactTitle:"お問合せ先",
pageContactLead:"ご意見や襲撃に関する情報を送ってください。YouTubeチャンネル @VincentDantesGrey も共有してください。",
        contactFormTitle:"お問い合わせフォーム",
contactFormOpen:"新しいタブでフォームを開く",
contactFormFrameTitle:"UXM お問い合わせフォーム",
    },
    ru: {
        pageContactTitle:"Контакты",
pageContactLead:"Напиши нам, чтобы поделиться мнением или сообщить о налётах, и поделись нашим YouTube-каналом @VincentDantesGrey.",
        contactFormTitle:"Форма обратной связи",
contactFormOpen:"Открыть форму в новой вкладке",
contactFormFrameTitle:"Форма обратной связи UXM",
    },
    zh: {
        pageContactTitle:"联系我们",
pageContactLead:"写信给我们分享你的看法或告知掠夺情况，并分享我们的 YouTube 频道 @VincentDantesGrey。",
        contactFormTitle:"联系表单",
contactFormOpen:"在新标签页打开表单",
contactFormFrameTitle:"UXM 联系表单",
    },
    tr: {
        pageContactTitle:"İletişim",
        pageContactLead:"Görüşünü paylaşmak veya yağmaları bildirmek için bize yaz; YouTube kanalımızı @VincentDantesGrey ile paylaş.",
        contactFormTitle:"İletişim Formu",
        contactFormOpen:"Formu yeni sekmede aç",
        contactFormFrameTitle:"UXM iletişim formu"
      }
  };

  Object.keys(texts).forEach(function (lang) {
    window.I18N[lang] = Object.assign(window.I18N[lang] || {}, texts[lang]);
  });
})();
