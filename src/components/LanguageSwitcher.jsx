import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../style/Language.css";
import turkishFlag from "../../public/turkey.jpg";
import ukFlag from "../../public/uk.jpg";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "tr");

  const languages = [
    { code: "tr", name: "Türkçe", flag: turkishFlag },
    { code: "en", name: "English", flag: ukFlag },
  ];

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("lang", langCode); // ✅ sayfa yenilense bile aynı dili açar
    setIsOpen(false);
  };

  const currentLangData =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <div className="language-switcher">
      <img
        className="current-flag"
        src={currentLangData.flag}
        alt={currentLangData.name}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="dropdown-menu">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="language-option"
              onClick={() => handleLanguageChange(lang.code)}
            >
              <img src={lang.flag} alt={lang.name} className="option-flag" />
              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
