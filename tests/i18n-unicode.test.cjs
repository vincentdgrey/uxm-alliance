const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const pageFiles = [
  "js/i18n/index/i18n.js",
  "js/i18n/actividades-diarias/i18n.js",
  "js/i18n/normas-uxm/i18n.js",
  "js/i18n/video-tutoriales/i18n.js",
  "js/i18n/estrategia/i18n.js",
  "js/i18n/contacto/i18n.js"
];
const languages = ["es", "en", "pt", "it", "fr", "ja", "ru", "zh", "tr"];

function loadAllI18n() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(read("js/i18n.js"), context);
  for (const file of pageFiles) vm.runInContext(read(file), context);
  return context.window.I18N;
}

function collectStrings(value, pathParts = [], output = []) {
  if (typeof value === "string") {
    output.push({ value, path: pathParts.join(".") });
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, pathParts.concat(String(index)), output));
    return output;
  }
  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => collectStrings(value[key], pathParts.concat(key), output));
  }
  return output;
}

function withoutMarkup(value) {
  return value
    .replace(/https?:\/\/[^\s"'<>]+/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/gi, "");
}

const cjkPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;
const kanaPattern = /[\p{Script=Hiragana}\p{Script=Katakana}]/u;
const hanPattern = /\p{Script=Han}/u;
const cyrillicPattern = /\p{Script=Cyrillic}/u;

test("los archivos i18n usan UTF-8 valido sin caracteres corruptos o invisibles", () => {
  const files = ["js/i18n.js", ...pageFiles];
  const mojibake = ["â€", "ðŸ", "ï¿½", "Ã©", "Ã¡", "Ã³", "Ãº", "Â "];

  for (const file of files) {
    const original = fs.readFileSync(path.join(root, file));
    const text = original.toString("utf8");

    assert.ok(Buffer.from(text, "utf8").equals(original), file + " debe ser UTF-8 canonico");
    assert.ok(!text.includes("\uFFFD"), file + " no debe contener el caracter de reemplazo");
    assert.doesNotMatch(text, /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200D\uFEFF]/,
      file + " no debe contener controles o caracteres invisibles");
    for (const fragment of mojibake) {
      assert.ok(!text.includes(fragment), file + " no debe contener mojibake " + JSON.stringify(fragment));
    }
  }
});

test("solo japones y chino usan caracteres CJK", () => {
  const i18n = loadAllI18n();

  for (const language of languages) {
    const strings = collectStrings(i18n[language]);
    for (const { value, path: valuePath } of strings) {
      if (language === "ja" || language === "zh") continue;
      assert.doesNotMatch(value, cjkPattern, language + "/" + valuePath + " no debe contener CJK");
    }
  }
});

test("el japones usa kana y no mezcla cirilico ni formas chinas prohibidas", () => {
  const i18n = loadAllI18n();
  const strings = collectStrings(i18n.ja);
  const forbidden = ["训练", "建筑", "堆积", "击杀", "ファalcon", "Allergy", "rob得ます", "Cwす", "領土的建筑", "兵士的训练", "雾囲気"];

  let linguisticStrings = 0;
  for (const { value, path: valuePath } of strings) {
    assert.doesNotMatch(value, cyrillicPattern, "ja/" + valuePath + " no debe contener cirilico");
    for (const fragment of forbidden) {
      assert.ok(!value.includes(fragment), "ja/" + valuePath + " no debe contener " + JSON.stringify(fragment));
    }
    const plain = withoutMarkup(value);
    if (plain && /[A-Za-z\p{Script=Han}]/u.test(plain)) linguisticStrings++;
  }
  assert.ok(linguisticStrings > 0, "el japones debe contener textos lingüísticos");
  assert.ok(strings.some(({ value }) => kanaPattern.test(value)), "el japones debe contener kana");
});

test("el chino usa han y no mezcla kana ni cirilico", () => {
  const i18n = loadAllI18n();
  const strings = collectStrings(i18n.zh);

  for (const { value, path: valuePath } of strings) {
    assert.doesNotMatch(value, kanaPattern, "zh/" + valuePath + " no debe contener kana");
    assert.doesNotMatch(value, cyrillicPattern, "zh/" + valuePath + " no debe contener cirilico");
  }
  assert.ok(strings.some(({ value }) => hanPattern.test(value)), "el chino debe contener caracteres Han");
});

test("el ruso usa cirilico y no mezcla CJK", () => {
  const i18n = loadAllI18n();
  const strings = collectStrings(i18n.ru);

  let linguisticStrings = 0;
  for (const { value, path: valuePath } of strings) {
    assert.doesNotMatch(value, cjkPattern, "ru/" + valuePath + " no debe contener CJK");
    const plain = withoutMarkup(value);
    if (!plain) continue;
    if (/[\p{Script=Cyrillic}]/u.test(plain)) linguisticStrings++;
    else if (/[A-Za-z]{3,}/u.test(plain)) {
      const technical = /^(?:©\s*2026\s*UXM\s*[–-]\s*Under Xtreme Madness Alliance|YouTube|UXM|SSR|UR|SR|T8|Lv\.\d+|R[1-5]|Rally HP\/ATK\/DEF|MVP)$/;
      assert.ok(technical.test(plain.trim()), "ru/" + valuePath + " solo admite valores tecnicos en latin");
    }
  }
  assert.ok(linguisticStrings > 0, "el ruso debe contener textos lingüísticos");
});

test("las traducciones respetan los valores y codigos del juego", () => {
  const i18n = loadAllI18n();
  const canonical = i18n.en.adActivities;
  const protectedTokens = ["UR", "SSR", "SR", "T8", "150%", "24H", "1.1M", "2.2M", "100K", "1.5M", "35"];

  for (const language of languages) {
    const activities = i18n[language].adActivities;
    for (const code of Object.keys(canonical)) {
      const sourceText = String(canonical[code].objetive + " " + canonical[code].resource);
      const translatedText = String(activities[code].objetive + " " + activities[code].resource);
      for (const token of protectedTokens) {
        if (!sourceText.includes(token)) continue;
        assert.ok(translatedText.includes(token), language + "/" + code + " debe conservar " + token);
      }
    }
  }
});
