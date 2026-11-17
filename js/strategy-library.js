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

  /* Normaliza el texto para comparar: minusculas y sin diacriticos latinos. */
  function normalize(value) {
    return String(value || "")
      .toLowerCase()
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

    var list = element("div", "searchEngine-topics-list");
    list.setAttribute("role", "group");

    topics.forEach(function (topic) {
      var button = element("button", "searchEngine-topic", topicTitle(topic));
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

    var root = element("ul", "searchEngine-tree-list");
    root.setAttribute("role", "list");

    groups.forEach(function (group) {
      var item = element("li", "searchEngine-tree-item searchEngine-tree-group");
      var groupButton = element("button", "searchEngine-tree-group-button", groupTitle(group));
      var subList = element("ul", "searchEngine-tree-sublist");
      var subListId = "searchEngine-group-" + group.id;
      var expanded = false;

      groupButton.type = "button";
      groupButton.setAttribute("data-tree-group", group.id);
      groupButton.setAttribute("aria-expanded", String(expanded));
      groupButton.setAttribute("aria-controls", subListId);

      subList.id = subListId;
      subList.setAttribute("role", "list");
      subList.hidden = !expanded;

      group.topics.forEach(function (topic) {
        var subItem = element("li", "searchEngine-tree-subitem");
        var subButton = element("button", "searchEngine-tree-sublink searchEngine-tree-topic", topicTitle(topic));
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

    var safe = String(image.src).replace(/^\/+/, "");
    if (safe.indexOf("..") >= 0 || /^[a-z]+:/i.test(safe)) return null;

    var figure = element("figure", "searchEngine-figure");
    var img = document.createElement("img");
    img.className = "img-fluid searchEngine-image";
    img.src = "../" + safe;
    img.alt = localize(image.alt);
    img.loading = "lazy";
    figure.appendChild(img);

    var caption = localize(image.caption);
    if (caption) figure.appendChild(element("figcaption", "searchEngine-caption", caption));

    return figure;
  }

  function renderSection(section) {
    var block = element("section", "searchEngine-section");
    var title = localize(section.title);
    if (title) block.appendChild(element("h3", "searchEngine-section-title", title));

    var body = element("div", "row g-3 searchEngine-section-body");
    var figure = renderImage(section);

    var textColumn = element("div", "col-12");
    if (figure) {
      figure.classList.add("col-12", "col-md-5", "searchEngine-section-media");
      body.appendChild(figure);
      textColumn.className = "col-12 col-md-7 searchEngine-section-text";
    } else {
      textColumn.classList.add("searchEngine-section-text");
    }

    var paragraphs = localizeList(section.paragraphs);
    paragraphs.forEach(function (value) {
      var text = String(value).trim();
      if (text) textColumn.appendChild(element("p", "searchEngine-paragraph", text));
    });

    var items = localizeList(section.items);
    if (items.length) {
      var list = element("ul", "searchEngine-list");
      items.forEach(function (value) {
        var text = String(value).trim();
        if (!text) return;
        list.appendChild(element("li", "", text));
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

    var article = element("article", "searchEngine-article");
    article.setAttribute("data-topic", topic.id);
    article.appendChild(element("h2", "searchEngine-topic-title", topicTitle(topic)));

    if (topic.group) {
      article.appendChild(element("p", "searchEngine-topic-group", groupTitle(topic.group)));
    }

    var summary = topicSummary(topic);
    if (summary) article.appendChild(element("p", "searchEngine-topic-summary", summary));

    var sections = Array.isArray(topic.sections) ? topic.sections : [];
    if (!sections.length) {
      article.appendChild(element("p", "searchEngine-empty", texts().searchEngineTopicEmpty || ""));
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
      container.appendChild(element("p", "searchEngine-empty", t.searchEngineNoResults || ""));
      return;
    }

    entries.forEach(function (entry) {
      var article = element("article", "searchEngine-article");
      article.setAttribute("data-topic", entry.topic.id);
      article.appendChild(element("h2", "searchEngine-topic-title", topicTitle(entry.topic)));

      if (entry.topic.group) {
        article.appendChild(element("p", "searchEngine-topic-group", groupTitle(entry.topic.group)));
      }

      var summary = topicSummary(entry.topic);
      if (summary) article.appendChild(element("p", "searchEngine-topic-summary", summary));

      var sections = Array.isArray(entry.topic.sections) ? entry.topic.sections : [];

      if (!sections.length) {
        article.appendChild(element("p", "searchEngine-empty", t.searchEngineTopicEmpty || ""));
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
        article.appendChild(element("p", "searchEngine-empty", t.searchEngineTopicEmpty || ""));
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
        container.appendChild(element("p", "searchEngine-placeholder", texts().searchEngineInitial || ""));
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

      var container = byId("searchEngineContents");
      if (container && !topics.length) {
        clear(container);
        container.appendChild(element("p", "searchEngine-empty", texts().searchEngineTopicEmpty || ""));
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
        box.appendChild(element("p", "searchEngine-empty", texts().searchEngineLoadError || ""));
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
