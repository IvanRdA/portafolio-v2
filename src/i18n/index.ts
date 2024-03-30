import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationInSpa from "@/locales/spa/translation.json";
import translationInEng from "@/locales/eng/translation.json";

const resources = {
  spa: {
    translation: translationInSpa,
  },
  eng: {
    translation: translationInEng,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "spa",
  debug: true,
  fallbackLng: "spa",
  interpolation: {
    escapeValue: false,
  },
  ns: "translation",
  defaultNS: "translation",
});

export default i18n;
