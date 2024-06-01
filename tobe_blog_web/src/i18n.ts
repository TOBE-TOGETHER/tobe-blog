import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      caches: ["localStorage", "sessionStorage", "cookie"],
    },
  });

export default i18n;

export const LANGUAGE = {
  ZH: "zh",
  EN: "en",
};
