import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language if detection fails or translation is missing
    debug: false, // Set to true for development to see logs
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path to your translation files
    },
  });

export default i18n;