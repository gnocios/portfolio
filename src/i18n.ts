import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import ja from "./locales/ja.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    resources: {
      en: { ui: en },
      es: { ui: es },
      fr: { ui: fr },
      pt: { ui: pt },
      ja: { ui: ja },
    },
    fallbackLng: "en",
    ns: ["ui"],
    defaultNS: "ui",
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng.split("-")[0];
});

export default i18n;