import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationTR from "./locales/tr/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  tr: { translation: translationTR },
  en: { translation: translationEN },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "tr", // ✅ dil tercihini hatırlasın
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false }, // ✅ render sorunu çözülür
  });

export default i18n;
