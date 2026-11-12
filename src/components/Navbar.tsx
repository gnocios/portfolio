import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { key: "home", id: "hero" },
  { key: "about", id: "about" },
  { key: "projects", id: "projects" },
  { key: "skills", id: "skills" },
  { key: "contact", id: "contact" },
] as const;

function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="relative mx-auto flex h-16 max-w-[1126px] items-center justify-between px-4">
        <a href="#hero" onClick={close} className="text-lg font-bold text-text-h">
          {t("navbar.title")}
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={t("navbar.menu")}
          aria-expanded={open}
          className="text-2xl text-text-h md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>

        <div
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-4 border-b border-border bg-bg p-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
        >
          {links.map(({ key, id }) => (
            <a
              key={key}
              href={`#${id}`}
              onClick={close}
              className="text-text transition hover:text-text-h"
            >
              {t(`navbar.${key}`)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;