/* Tarjetas de video tutorial de YouTube.
   El reproductor se crea bajo demanda: solo cuando el visitante
   interactua con la tarjeta. El audio exige un clic, porque los
   navegadores no habilitan el sonido sin una interaccion explicita. */
(function () {
  "use strict";

  var API_SRC = "https://www.youtube.com/iframe_api";
  var cards = [];
  var apiPromise = null;

  function supportsHover() {
    return !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* La API de YouTube se carga una sola vez y de forma diferida. */
  function loadApi() {
    if (window.YT && window.YT.Player) return Promise.resolve();
    if (apiPromise) return apiPromise;

    apiPromise = new Promise(function (resolve) {
      var previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previous === "function") previous();
        resolve();
      };

      var script = document.createElement("script");
      script.src = API_SRC;
      script.async = true;
      document.head.appendChild(script);
    });

    return apiPromise;
  }

  function Card(element) {
    this.element = element;
    this.media = element.querySelector(".card-video-media");
    this.playButton = element.querySelector(".card-video-play");
    this.soundButton = element.querySelector(".card-video-sound");
    this.player = null;
    this.soundEnabled = false;
    this.pendingSound = false;
    this.pendingPlay = false;
  }

  /* Crea el reproductor de la tarjeta en su contenedor de video. */
  Card.prototype.createPlayer = function () {
    if (this.player) return Promise.resolve(this.player);

    var self = this;
    var videoId = this.element.getAttribute("data-youtube-id");
    if (!videoId) return Promise.resolve(null);

    return loadApi().then(function () {
      if (self.player) return self.player;

      var holder = document.createElement("div");
      holder.className = "card-video-holder";
      holder.style.width = "100%";
      holder.style.height = "100%";

      self.media.appendChild(holder);
      self.element.classList.add("is-playing");

      self.player = new window.YT.Player(holder, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: function (event) {
            self.onPlayerReady(event);
          }
        }
      });

      return self.player;
    });
  };

  Card.prototype.onPlayerReady = function () {
    if (this.pendingSound) {
      this.enableSound();
    } else {
      this.player.mute();
      this.element.classList.add("is-muted");
    }
    if (this.pendingPlay) {
      this.player.playVideo();
    }
  };

  /* Reproduce sin sonido: es la unica opcion que permite el hover. */
  Card.prototype.playMuted = function () {
    var self = this;
    this.pendingPlay = true;
    this.pendingSound = false;

    return this.createPlayer().then(function () {
      if (!self.player || !self.player.playVideo) return;
      if (!self.soundEnabled) {
        self.player.mute();
        self.element.classList.add("is-muted");
      }
      self.player.playVideo();
    });
  };

  /* Habilita el audio: requiere un clic del visitante. */
  Card.prototype.enableSound = function () {
    var self = this;
    this.pendingSound = true;

    return this.createPlayer().then(function () {
      if (!self.player || !self.player.unMute) return;
      self.player.unMute();
      self.player.setVolume(100);
      self.soundEnabled = true;
      self.element.classList.remove("is-muted");
      self.player.playVideo();
    });
  };

  Card.prototype.pause = function () {
    this.pendingPlay = false;
    if (this.player && this.player.pauseVideo) this.player.pauseVideo();
  };

  Card.prototype.resume = function () {
    if (!this.player) {
      this.playMuted();
      return;
    }
    if (this.soundEnabled) this.player.playVideo();
    else this.playMuted();
  };

  /* ---------- Eventos de cada tarjeta ---------- */
  function bindCard(card) {
    var element = card.element;

    element.addEventListener("mouseenter", function () {
      if (!supportsHover() || prefersReducedMotion()) return;
      card.resume();
    });

    element.addEventListener("mouseleave", function () {
      if (!supportsHover()) return;
      card.pause();
    });

    card.playButton.addEventListener("click", function () {
      card.enableSound();
    });

    card.soundButton.addEventListener("click", function () {
      if (card.soundEnabled) {
        card.pause();
      } else {
        card.enableSound();
      }
    });
  }

  function initVideoCards() {
    var elements = document.querySelectorAll(".card-video");
    if (!elements.length) return;

    for (var i = 0; i < elements.length; i++) {
      var card = new Card(elements[i]);
      cards.push(card);
      bindCard(card);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoCards);
  } else {
    initVideoCards();
  }
})();
