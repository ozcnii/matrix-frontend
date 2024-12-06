import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import initialNsEn from "./locales/en/initial.json";
import initialNsRu from "./locales/ru/initial.json";

export const defaultNS = "initialNs";
export const resources = {
  en: {
    initialNs: initialNsEn,
  },
  ru: {
    initialNs: initialNsRu,
  },
} as const;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["initialNs"],
    defaultNS,
    resources,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });
