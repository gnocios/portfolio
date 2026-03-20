import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./Navbar.css";
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
  const { t } = useTranslation("navbar");
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#" onClick={() => setOpen(false)}>{t("title")}</a>
      </div>

      <div className={`links ${open ? "active" : ""}`}>
        <LanguageSwitcher />

        <a href="#about" onClick={() => setOpen(false)}>{t("about")}</a>
        <a href="#skills" onClick={() => setOpen(false)}>{t("skills")}</a>
        <a href="#experience" onClick={() => setOpen(false)}>{t("experience")}</a>
        <a href="#projects" onClick={() => setOpen(false)}>{t("projects")}</a>
        <a href="#resume" onClick={() => setOpen(false)}>{t("resume")}</a>
        <a href="#contact" onClick={() => setOpen(false)}>{t("contact")}</a>
      </div>



      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
