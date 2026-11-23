/* Biblioteca estrategica: carga jerarquica, busqueda y renderizado de temas.
   Los grupos viven en db/library/*.json y cada tema en su propia subcarpeta. */
(function () {
  "use strict";

  /* ---------- Configuracion ---------- */
  var LIBRARY_BASE = "../db/library/";
  var INDEX_FILE = LIBRARY_BASE + "index.json";
  var DEFAULT_LANG = "en";
  var FALLBACK_LANGS = ["en", "es"];

  /* ---------- Utilidades ---------- */
  function byId(id) { return document.getElementById(id); }

  function currentLang() {
    var attr = document.documentElement.getAttribute("data-lang");
    if (attr && window.I18N && window.I18N[attr]) return attr;
    return DEFAULT_LANG;
  }

  function texts() {
    var lang = currentLang();
    return (window.I18N && window.I18N[lang]) || {};
  }

  /* Resuelve un campo multilingue: idioma activo, ingles y español. */
  function localize(field) {
    if (field === null || field === undefined) return "";
    if (typeof field === "string") return field;
    if (Array.isArray(field)) return field.join(" ");

    var lang = currentLang();
    var candidates = [field[lang]];
    for (var i = 0; i < FALLBACK_LANGS.length; i++) {
      candidates.push(field[FALLBACK_LANGS[i]]);
    }

    for (var c = 0; c < candidates.length; c++) {
      var value = candidates[c];
      if (typeof value === "string" && value) return value;
      if (Array.isArray(value) && value.length) return value.join(" ");
    }
    return "";
  }

  /* Devuelve el valor del idioma activo como lista de textos. */
  function localizeList(field) {
    if (field === null || field === undefined) return [];

    var lang = currentLang();
    var value = field;

    if (!Array.isArray(field) && typeof field === "object") {
      value = field[lang];
      if (value === undefined || value === null || value === "") {
        for (var i = 0; i < FALLBACK_LANGS.length; i++) {
          var fallback = field[FALLBACK_LANGS[i]];
          if (fallback !== undefined && fallback !== null && fallback !== "") {
            value = fallback;
            break;
          }
        }
      }
    }

    if (value === null || value === undefined || value === "") return [];
    if (Array.isArray(value)) return value.map(String);
    return String(value).split("\n");
  }

  /* Normaliza el texto para comparar: minusculas y sin diacriticos latinos.
     La letra polaca "l" con crossed (l) no se descompone con Unicode NFD,
     asi que se sustituye de forma explicita. */
  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/ł/g, "l")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* Une los valores de un campo multilingue en un solo texto plano. */
  function flatten(field) {
    if (field === null || field === undefined) return "";
    if (typeof field === "string") return field;
    if (Array.isArray(field)) return field.join(" ");

    var parts = [];
    Object.keys(field).forEach(function (key) {
      var value = field[key];
      if (typeof value === "string") parts.push(value);
      else if (Array.isArray(value)) parts.push(value.join(" "));
    });
    return parts.join(" ");
  }

  function normalizeList(list) {
    var out = [];
    if (!Array.isArray(list)) return out;
    for (var i = 0; i < list.length; i++) {
      var value = normalize(list[i]);
      if (value) out.push(value);
    }
    return out;
  }

  function groupTitle(group) {
    return localize(group.title) || group.id;
  }

  function topicTitle(topic) {
    return localize(topic.title) || topic.id;
  }

  function topicSummary(topic) {
    return localize(topic.summary) || "";
  }

  /* ---------- Fecha de actualizacion ---------- */
  /* Valida el formato YYYY-MM-DD y devuelve la cadena o una cadena vacia. */
  function updatedDate(source) {
    var value = String((source && source.updated) || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";

    /* Se descarta tambien una fecha que no exista en el calendario. */
    var date = new Date(value + "T00:00:00Z");
    if (isNaN(date.getTime())) return "";
    if (date.toISOString().slice(0, 10) !== value) return "";

    return value;
  }

  /* Formatea la fecha en el idioma activo, siempre en UTC para no cambiar de dia. */
  function formatUpdated(value) {
    if (!value) return "";
    var date = new Date(value + "T00:00:00Z");
    if (isNaN(date.getTime())) return value;

    try {
      return new Intl.DateTimeFormat(currentLang(), {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      }).format(date);
    } catch (error) {
      return value;
    }
  }

  /* Construye el bloque de fecha de actualizacion de un tema o de un grupo. */
  function renderUpdated(source, className) {
    var value = updatedDate(source);
    if (!value) return null;

    var wrapper = element("p", className || "search-engine-updated");
    wrapper.appendChild(document.createTextNode((texts().searchEngineUpdated || "") + " "));

    var time = element("time", "search-engine-updated-date", formatUpdated(value));
    time.setAttribute("datetime", value);
    wrapper.appendChild(time);

    return wrapper;
  }

  /* ---------- Indice de texto por tema ---------- */
  function sectionText(section) {
    var parts = [];
    parts.push(flatten(section.title));
    parts.push(flatten(section.paragraphs));
    parts.push(flatten(section.items));
    parts.push(flatten(section.image && section.image.alt));
    parts.push(flatten(section.image && section.image.caption));
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  function topicKeywords(topic) {
    var lang = currentLang();
    var keywords = topic.keywords || {};
    var list = [];

    function collect(value) {
      if (Array.isArray(value)) list = list.concat(value);
      else if (typeof value === "string" && value) list.push(value);
    }

    collect(keywords[lang]);
    for (var i = 0; i < FALLBACK_LANGS.length; i++) {
      collect(keywords[FALLBACK_LANGS[i]]);
    }
    return normalizeList(list);
  }

  /* Construye el indice de busqueda de cada tema y sus secciones. */
  function buildIndex(topics) {
    var index = [];

    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i];
      var entry = {
        topic: topic,
        topicText: normalize(topicTitle(topic) + " " + topicSummary(topic) + " " + flatten(topic.title) + " " + flatten(topic.summary)),
        keywords: topicKeywords(topic),
        sections: []
      };

      var sections = Array.isArray(topic.sections) ? topic.sections : [];
      for (var s = 0; s < sections.length; s++) {
        var section = sections[s];
        entry.sections.push({
          section: section,
          text: normalize(sectionText(section))
        });
      }

      index.push(entry);
    }

    return index;
  }

  function matches(entry, needle) {
    if (!needle) return false;
    if (entry.topicText.indexOf(needle) >= 0) return true;
    if (entry.keywords.indexOf(needle) >= 0) return true;
    for (var i = 0; i < entry.sections.length; i++) {
      if (entry.sections[i].text.indexOf(needle) >= 0) return true;
    }
    return false;
  }

  function searchIndex(index, query) {
    var needle = normalize(query);
    if (!needle) return [];
    var found = [];
    for (var i = 0; i < index.length; i++) {
      if (matches(index[i], needle)) found.push(index[i]);
    }
    return found;
  }

  /* ---------- Carga de datos ---------- */
  function fetchJson(url) {
    return fetch(url, { cache: "no-cache" }).then(function (response) {
      if (!response.ok) throw new Error("No se pudo cargar " + url);
      return response.json();
    });
  }

  function loadLibrary() {
    return fetchJson(INDEX_FILE).then(function (index) {
      var files = Array.isArray(index && index.files) ? index.files : [];
      var groupRequests = files.map(function (file) {
        return fetchJson(LIBRARY_BASE + file).then(
          function (group) { return { group: group, error: null }; },
          function () { return { group: null, error: file }; }
        );
      });

      return Promise.all(groupRequests).then(function (groupResults) {
        var groups = [];
        var errors = [];
        var topicRequests = [];

        groupResults.forEach(function (result) {
          if (!result.group) {
            errors.push(result.error);
            return;
          }

          var group = result.group;
          var topicFiles = Array.isArray(group.topics) ? group.topics : [];
          var topics = [];

          group.order = typeof group.order === "number" ? group.order : 999;
          group.topicFiles = topicFiles.slice();
          group.topics = [];
          groups.push(group);

          group.topicFiles.forEach(function (file) {
            topicRequests.push(fetchJson(LIBRARY_BASE + file).then(
              function (topic) {
                topic.group = group;
                topic.order = typeof topic.order === "number" ? topic.order : 999;
                topics.push(topic);
                group.topics.push(topic);
              },
              function () { errors.push(file); }
            ));
          });
        });

        return Promise.all(topicRequests).then(function () {
          groups.sort(function (a, b) {
            if (a.order !== b.order) return a.order - b.order;
            return groupTitle(a).localeCompare(groupTitle(b), currentLang());
          });

          groups.forEach(function (group) {
            group.topics.sort(function (a, b) {
              if (a.order !== b.order) return a.order - b.order;
              return topicTitle(a).localeCompare(topicTitle(b), currentLang());
            });
          });

          var topics = [];
          groups.forEach(function (group) {
            group.topics.forEach(function (topic) { topics.push(topic); });
          });

          return { groups: groups, topics: topics, errors: errors };
        });
      });
    });
  }

  /* ---------- Enlaces y medios embebidos ---------- */
  var URL_PATTERN = /https?:\/\/[^\s<>"'`]+/gi;
  var IMAGE_PATTERN = /\.(png|jpe?g|webp|gif|svg)(?:[?#][^\s]*)?$/i;
  var YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"];
  var YOUTUBE_SHORT_HOSTS = ["youtu.be", "www.youtu.be"];

  /* Quita los signos de puntuacion que quedan pegados al final de la URL. */
  function trimUrl(url) {
    return url.replace(/[)\],.;:!?]+$/, "");
  }

  /* Devuelve la URL limpia o una cadena vacia si no es valida. */
  function safeUrl(value) {
    var raw = trimUrl(String(value || "").trim());
    if (!raw) return "";

    var parsed;
    try {
      parsed = new URL(raw);
    } catch (error) {
      return "";
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return parsed.href;
  }

  /* Extrae el ID de un video de YouTube en cualquiera de sus formatos. */
  function youtubeId(url) {
    var parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      return "";
    }

    var host = parsed.hostname.toLowerCase();
    var id = "";

    if (YOUTUBE_SHORT_HOSTS.indexOf(host) >= 0) {
      id = parsed.pathname.split("/").filter(Boolean)[0] || "";
    } else if (YOUTUBE_HOSTS.indexOf(host) >= 0) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v") || "";
      } else if (/^\/(embed|shorts|live)\//.test(parsed.pathname)) {
        id = parsed.pathname.split("/").filter(Boolean)[1] || "";
      }
    }

    if (!/^[A-Za-z0-9_-]{6,20}$/.test(id)) return "";
    return id;
  }

  /* Localiza el primer medio embebible dentro de un texto. */
  function detectMedia(text) {
    var matches = String(text || "").match(URL_PATTERN) || [];
    for (var i = 0; i < matches.length; i++) {
      var url = safeUrl(matches[i]);
      if (!url) continue;

      if (youtubeId(url)) return { type: "video", url: url };
      if (IMAGE_PATTERN.test(url)) return { type: "image", url: url };
    }
    return null;
  }

  /* Crea un enlace navegable con el estilo de link del sitio. */
  function linkNode(url, label) {
    var anchor = document.createElement("a");
    anchor.className = "link-info search-engine-link";
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = label || url;
    return anchor;
  }

  /* Lee el destino de una etiqueta <a>, en forma estandar o simplificada. */
  function anchorHref(attributes) {
    var attrs = String(attributes || "").trim();
    if (!attrs) return "";

    /* Forma estandar: href con comillas simples, dobles o sin comillas. */
    var match = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (match) return safeUrl(match[1] !== undefined ? match[1] : (match[2] !== undefined ? match[2] : match[3]));

    /* Forma simplificada: la URL aparece como atributo suelto, con o sin target. */
    var simple = attrs.match(/(?:^|\s)(https?:\/\/[^\s>]+)/i);
    if (simple) return safeUrl(simple[1]);

    return "";
  }

  /* Extrae el texto visible de una etiqueta <a> sin interpretar su contenido. */
  function anchorLabel(content) {
    var text = String(content || "");
    /* Solo se admite texto plano como rotulo del enlace. */
    if (/<[^>]*>/.test(text)) text = text.replace(/<[^>]*>/g, "");
    return text.trim();
  }

  /* Inserta el texto de un nodo convertiendo las URL en enlaces. */
  function appendPlainText(node, text) {
    var value = String(text || "");
    var last = 0;
    var matches = value.match(URL_PATTERN) || [];

    for (var i = 0; i < matches.length; i++) {
      var raw = matches[i];
      var url = safeUrl(raw);
      if (!url) continue;

      var start = value.indexOf(raw, last);
      if (start < 0) continue;

      if (start > last) node.appendChild(document.createTextNode(value.slice(last, start)));
      node.appendChild(linkNode(url, raw));
      last = start + raw.length;
    }

    if (last < value.length) node.appendChild(document.createTextNode(value.slice(last)));
    return node;
  }

  /* Inserta el texto admitiendo enlaces <a> y URL sueltas. */
  function appendLinkedText(node, text) {
    var value = String(text || "");
    var pattern = /<a\s*((?:"[^"]*"|'[^']*'|[^>])*)>([\s\S]*?)<\/a\s*>/gi;
    var last = 0;
    var match;

    while ((match = pattern.exec(value)) !== null) {
      if (match.index > last) appendPlainText(node, value.slice(last, match.index));

      var href = anchorHref(match[1]);
      var label = anchorLabel(match[2]);

      if (href && label) {
        node.appendChild(linkNode(href, label));
      } else if (label) {
        /* Etiqueta no utilizable: se conserva el rotulo como texto plano. */
        node.appendChild(document.createTextNode(label));
      }

      last = match.index + match[0].length;
    }

    if (last < value.length) appendPlainText(node, value.slice(last));
    return node;
  }

  /* Reproductor de YouTube: solo se acepta un ID validado. */
  function videoNode(id, title) {
    var frame = document.createElement("div");
    frame.className = "search-engine-media search-engine-media-video";

    var iframe = document.createElement("iframe");
    iframe.className = "search-engine-video";
    iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id);
    iframe.title = title || "YouTube";
    iframe.loading = "lazy";
    iframe.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    frame.appendChild(iframe);
    return frame;
  }

  /* Imagen embebida: local en media/ o remota por HTTPS. */
  function imageNode(url, alt) {
    var frame = document.createElement("div");
    frame.className = "search-engine-media search-engine-media-image";

    var img = document.createElement("img");
    img.className = "search-engine-image";
    img.alt = alt || "";
    img.loading = "lazy";

    if (/^https?:/i.test(url)) {
      if (!/^https:/i.test(url)) return null;
      img.src = url;
    } else {
      var safe = String(url).replace(/^\/+/, "");
      if (safe.indexOf("..") >= 0) return null;
      img.src = "../" + safe;
    }

    frame.appendChild(img);
    return frame;
  }

  /* ---------- Renderizado ---------- */
  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== "") node.textContent = text;
    return node;
  }

  function renderTopics(container, topics, onSelect) {
    clear(container);
    if (!container) return;

    var list = element("div", "search-engine-topics-list");
    list.setAttribute("role", "group");

    topics.forEach(function (topic) {
      var button = element("button", "search-engine-topic", topicTitle(topic));
      button.type = "button";
      button.setAttribute("data-topic", topic.id);
      button.addEventListener("click", function () { onSelect(topic.id); });
      list.appendChild(button);
    });

    container.appendChild(list);
  }

  function renderTree(container, groups, onSelect) {
    clear(container);
    if (!container) return;

    var root = element("ul", "search-engine-tree-list");
    root.setAttribute("role", "list");

    groups.forEach(function (group) {
      var item = element("li", "search-engine-tree-item search-engine-tree-group");
      var groupButton = element("button", "search-engine-tree-group-button");
      var subList = element("ul", "search-engine-tree-sublist");
      var subListId = "searchEngine-group-" + group.id;
      var expanded = false;

      /* El boton del grupo lleva su nombre y la fecha de actualizacion. */
      groupButton.appendChild(element("span", "search-engine-tree-group-name", groupTitle(group)));

      var groupUpdated = renderUpdated(group, "search-engine-updated search-engine-tree-group-updated");
      if (groupUpdated) groupButton.appendChild(groupUpdated);

      groupButton.type = "button";
      groupButton.setAttribute("data-tree-group", group.id);
      groupButton.setAttribute("aria-expanded", String(expanded));
      groupButton.setAttribute("aria-controls", subListId);

      subList.id = subListId;
      subList.setAttribute("role", "list");
      subList.hidden = !expanded;

      group.topics.forEach(function (topic) {
        var subItem = element("li", "search-engine-tree-subitem");
        var subButton = element("button", "search-engine-tree-sublink search-engine-tree-topic", topicTitle(topic));
        subButton.type = "button";
        subButton.setAttribute("data-tree-topic", topic.id);
        subButton.addEventListener("click", function () { onSelect(topic.id); });
        subItem.appendChild(subButton);
        subList.appendChild(subItem);
      });

      groupButton.addEventListener("click", function () {
        expanded = !expanded;
        groupButton.setAttribute("aria-expanded", String(expanded));
        subList.hidden = !expanded;
      });

      group.button = groupButton;
      group.subList = subList;
      group.setExpanded = function (value) {
        expanded = value;
        groupButton.setAttribute("aria-expanded", String(expanded));
        subList.hidden = !expanded;
      };

      item.appendChild(groupButton);
      item.appendChild(subList);
      root.appendChild(item);
    });

    container.appendChild(root);
  }

  function renderImage(section) {
    var image = section.image;
    if (!image || !image.src) return null;

    var figure = element("figure", "search-engine-figure");
    var img = document.createElement("img");
    img.className = "img-fluid search-engine-image";
    img.alt = localize(image.alt);
    img.loading = "lazy";

    var src = String(image.src).trim();
    if (/^https?:/i.test(src)) {
      if (!/^https:/i.test(src)) return null;
      img.src = src;
    } else {
      var safe = src.replace(/^\/+/, "");
      if (safe.indexOf("..") >= 0 || /^[a-z]+:/i.test(safe)) return null;
      img.src = "../" + safe;
    }

    figure.appendChild(img);

    var caption = localize(image.caption);
    if (caption) figure.appendChild(element("figcaption", "search-engine-caption", caption));

    return figure;
  }

  /* Construye el bloque de dos columnas: medio a la izquierda, texto a la derecha. */
  function renderMediaRow(media, text, tagName, className) {
    var row = element("div", "row g-3 search-engine-section-body search-engine-media-row");

    var mediaColumn = element("div", "col-12 col-md-5 search-engine-section-media");
    mediaColumn.appendChild(media);

    var textColumn = element("div", "col-12 col-md-7 search-engine-section-text");
    var node = element(tagName || "p", className || "search-engine-paragraph");
    appendLinkedText(node, text);
    textColumn.appendChild(node);

    row.appendChild(mediaColumn);
    row.appendChild(textColumn);
    return row;
  }

  /* Renderiza un parrafo o elemento de lista, con medio embebido si lo contiene. */
  function renderContent(text, tagName, className, mediaTitle) {
    var value = String(text).trim();
    var media = detectMedia(value);

    if (media) {
      var row = null;
      if (media.type === "video") {
        row = renderMediaRow(videoNode(youtubeId(media.url), mediaTitle), value, "p", "search-engine-paragraph");
      } else {
        var image = imageNode(media.url, mediaTitle);
        if (image) row = renderMediaRow(image, value, "p", "search-engine-paragraph");
      }

      if (row) {
        /* Dentro de una lista el bloque conserva el elemento li. */
        if (tagName === "li") {
          var item = element("li", "search-engine-item-media");
          item.appendChild(row);
          return item;
        }
        return row;
      }
    }

    var node = element(tagName, className);
    appendLinkedText(node, value);
    return node;
  }

  function renderSection(section) {
    var block = element("section", "search-engine-section");
    var title = localize(section.title);
    if (title) block.appendChild(element("h3", "search-engine-section-title", title));

    var body = element("div", "row g-3 search-engine-section-body");
    var figure = renderImage(section);

    var textColumn = element("div", "col-12");
    if (figure) {
      figure.classList.add("col-12", "col-md-5", "search-engine-section-media");
      body.appendChild(figure);
      textColumn.className = "col-12 col-md-7 search-engine-section-text";
    } else {
      textColumn.classList.add("search-engine-section-text");
    }

    var paragraphs = localizeList(section.paragraphs);
    paragraphs.forEach(function (value) {
      var text = String(value).trim();
      if (!text) return;
      textColumn.appendChild(renderContent(text, "p", "search-engine-paragraph", title));
    });

    var items = localizeList(section.items);
    if (items.length) {
      var list = element("ul", "search-engine-list");
      items.forEach(function (value) {
        var text = String(value).trim();
        if (!text) return;
        list.appendChild(renderContent(text, "li", "", title));
      });
      if (list.firstChild) textColumn.appendChild(list);
    }

    body.appendChild(textColumn);
    block.appendChild(body);
    return block;
  }

  function renderTopic(container, topic) {
    clear(container);
    if (!container) return;

    var article = element("article", "search-engine-article");
    article.setAttribute("data-topic", topic.id);
    article.appendChild(element("h2", "search-engine-topic-title", topicTitle(topic)));

    if (topic.group) {
      article.appendChild(element("p", "search-engine-topic-group", groupTitle(topic.group)));
    }

    var topicUpdated = renderUpdated(topic, "search-engine-updated search-engine-topic-updated");
    if (topicUpdated) article.appendChild(topicUpdated);

    var summary = topicSummary(topic);
    if (summary) article.appendChild(element("p", "search-engine-topic-summary", summary));

    var sections = Array.isArray(topic.sections) ? topic.sections : [];
    if (!sections.length) {
      article.appendChild(element("p", "search-engine-empty", texts().searchEngineTopicEmpty || ""));
      container.appendChild(article);
      return;
    }

    sections.forEach(function (section) {
      article.appendChild(renderSection(section));
    });

    container.appendChild(article);
  }

  function renderSearchResults(container, entries) {
    clear(container);
    if (!container) return;

    var t = texts();

    if (!entries.length) {
      container.appendChild(element("p", "search-engine-empty", t.searchEngineNoResults || ""));
      return;
    }

    entries.forEach(function (entry) {
      var article = element("article", "search-engine-article");
      article.setAttribute("data-topic", entry.topic.id);
      article.appendChild(element("h2", "search-engine-topic-title", topicTitle(entry.topic)));

      if (entry.topic.group) {
        article.appendChild(element("p", "search-engine-topic-group", groupTitle(entry.topic.group)));
      }

      var entryUpdated = renderUpdated(entry.topic, "search-engine-updated search-engine-topic-updated");
      if (entryUpdated) article.appendChild(entryUpdated);

      var summary = topicSummary(entry.topic);
      if (summary) article.appendChild(element("p", "search-engine-topic-summary", summary));

      var sections = Array.isArray(entry.topic.sections) ? entry.topic.sections : [];

      if (!sections.length) {
        article.appendChild(element("p", "search-engine-empty", t.searchEngineTopicEmpty || ""));
        container.appendChild(article);
        return;
      }

      var shown = 0;
      sections.forEach(function (section, position) {
        var record = entry.sections[position];
        if (!record) return;
        var hit = record.text.indexOf(currentNeedle) >= 0;
        if (!hit) return;
        article.appendChild(renderSection(section));
        shown++;
      });

      if (!shown) {
        article.appendChild(element("p", "search-engine-empty", t.searchEngineTopicEmpty || ""));
      }

      container.appendChild(article);
    });
  }

  /* ---------- Estado de la pagina ---------- */
  var currentNeedle = "";
  var topics = [];
  var index = [];
  var selectedTopic = "";

  function setStatus(message) {
    var status = byId("searchEngineStatus");
    if (status) status.textContent = message || "";
  }

  function setActiveTopic(id) {
    selectedTopic = id;
    var nodes = document.querySelectorAll("[data-topic], [data-tree-topic]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var value = node.getAttribute("data-topic") || node.getAttribute("data-tree-topic");
      if (value === id) {
        node.classList.add("active");
        node.setAttribute("aria-current", "true");
      } else {
        node.classList.remove("active");
        node.removeAttribute("aria-current");
      }
    }
  }

  function expandTopicGroup(id) {
    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i];
      if (topic.id !== id || !topic.group || typeof topic.group.setExpanded !== "function") continue;
      topic.group.setExpanded(true);
      return;
    }
  }

  /* Despliega el grupo indicado en la URL (?group=id) sin elegir un tema. */
  function expandGroupFromUrl(groups) {
    var id = requestedGroup();
    if (!id) return;

    for (var i = 0; i < groups.length; i++) {
      if (groups[i].id !== id) continue;
      if (typeof groups[i].setExpanded === "function") groups[i].setExpanded(true);
      return;
    }
  }

  /* Lee el grupo solicitado en la URL. */
  function requestedGroup() {
    var query = window.location.search || "";
    var match = /[?&]group=([^&#]+)/.exec(query);
    if (!match) return "";
    try {
      return decodeURIComponent(match[1]);
    } catch (e) {
      return match[1];
    }
  }

  function selectTopic(id) {
    var topic = null;
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].id === id) { topic = topics[i]; break; }
    }
    if (!topic) return;

    setActiveTopic(id);
    expandTopicGroup(id);
    renderTopic(byId("searchEngineContents"), topic);
  }

  function runSearch(query) {
    currentNeedle = normalize(query);
    var container = byId("searchEngineContents");
    if (!container) return;

    if (!currentNeedle) {
      setStatus("");
      if (selectedTopic) {
        selectTopic(selectedTopic);
      } else {
        clear(container);
        container.appendChild(element("p", "search-engine-placeholder", texts().searchEngineInitial || ""));
      }
      return;
    }

    var found = searchIndex(index, query);
    renderSearchResults(container, found);

    var t = texts();
    var template = t.searchEngineResults || "";
    setStatus(template.replace("{count}", String(found.length)));
  }

  /* ---------- Init ---------- */
  function init() {
    var input = byId("searchEngineInput");
    var clearButton = byId("searchEngineClear");
    var form = byId("searchEngineForm");
    if (!input && !form) return;

    setStatus(texts().searchEngineLoading || "");

    loadLibrary().then(function (result) {
      topics = result.topics;
      index = buildIndex(topics);

      renderTopics(byId("searchEngineTopics"), topics, function (id) {
        if (input) input.value = "";
        currentNeedle = "";
        selectTopic(id);
      });

      renderTree(byId("searchEngineTree"), result.groups, function (id) {
        if (input) input.value = "";
        currentNeedle = "";
        selectTopic(id);
      });

      expandGroupFromUrl(result.groups);

      var container = byId("searchEngineContents");
      if (container && !topics.length) {
        clear(container);
        container.appendChild(element("p", "search-engine-empty", texts().searchEngineTopicEmpty || ""));
      }

      if (result.errors.length) {
        setStatus(texts().searchEngineLoadError || "");
      } else {
        setStatus("");
      }
    }, function () {
      var box = byId("searchEngineContents");
      if (box) {
        clear(box);
        box.appendChild(element("p", "search-engine-empty", texts().searchEngineLoadError || ""));
      }
      setStatus(texts().searchEngineLoadError || "");
    });

    if (input) {
      input.addEventListener("input", function () { runSearch(input.value); });
      input.addEventListener("search", function () { runSearch(input.value); });
    }

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        if (input) {
          input.value = "";
          input.focus();
        }
        runSearch("");
      });
    }

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (input) runSearch(input.value);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
