// src/i18n.js
import { createI18n } from "vue-i18n";
import en from "../lang/en.json";
import km from "../lang/km.json";

// ------- support english, khmer language
const messages = {
  en,
  km,
};

const i18n = createI18n({
  legacy: false, // Set to false to use Composition API
  locale: "en", // default locale
  fallbackLocale: "en", // fallback if key is missing
  messages,
});

export default i18n;
