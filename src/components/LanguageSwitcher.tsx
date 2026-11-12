import { useState } from "react";
import { useTranslation } from "react-i18next";

import EnFlag from "../assets/flags/en.svg";
import EsFlag from "../assets/flags/es.svg";
import PtFlag from "../assets/flags/pt.svg";
import FrFlag from "../assets/flags/fr.svg";
import JaFlag from "../assets/flags/ja.svg";

const languages = [
  { code: "en", label: "EN", flag: EnFlag },
  { code: "es", label: "ES", flag: EsFlag },
  { code: "pt", label: "PT", flag: PtFlag },
  { code: "fr", label: "FR", flag: FrFlag },
  { code: "ja", label: "JA", flag: JaFlag },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = i18n.language.split("-")[0];

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="px-2 py-1 font-medium text-text-h"
      >
        {current.toUpperCase()} ▾
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-50 mt-1 min-w-24 overflow-hidden rounded border border-border bg-bg md:left-auto md:right-0">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => handleChange(lang.code)}
                className="flex w-full items-center gap-2 px-3 py-2 text-text hover:bg-border hover:text-text-h"
              >
                <img src={lang.flag} alt="" className="size-5 shrink-0" />
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;