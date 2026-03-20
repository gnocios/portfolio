import { useState } from "react";
import i18n from "../../i18n";

// importar los SVG
import EnFlag from "../../assets/flags/en.svg";
import EsFlag from "../../assets/flags/es.svg";
import PtFlag from "../../assets/flags/pt.svg";
import FrFlag from "../../assets/flags/fr.svg";
import JaFlag from "../../assets/flags/ja.svg";

const languages = [
  { code: "en", label: "EN", flag: EnFlag },
  { code: "es", label: "ES", flag: EsFlag },
  { code: "pt", label: "PT", flag: PtFlag },
  { code: "fr", label: "FR", flag: FrFlag },
  { code: "ja", label: "JA", flag: JaFlag },
];

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const currentLang = i18n.language;

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="lang-dropdown">
      <button className="lang-current" onClick={() => setOpen(!open)}>
        {currentLang.toUpperCase()} ▾
      </button>

      {open && (
        <ul className="lang-menu">
          {languages.map((lang) => (
            <li key={lang.code} onClick={() => handleChange(lang.code)}>
              <img src={lang.flag} alt={lang.label} className="flag-icon" />
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;