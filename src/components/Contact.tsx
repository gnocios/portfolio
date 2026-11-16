import { useTranslation } from "react-i18next";

const EMAIL = "ignaciomontali8@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ignacioalfredomontali/";
const GITHUB_URL = "https://github.com/gnocios";

// Objeto que mapea el código de idioma con la ruta del archivo correspondiente
const CV_FILES: Record<string, string> = {
  es: "cv/Ignacio-Montali-CV-es.pdf",
  en: "cv/Ignacio-Montali-CV-en.pdf",
  fr: "cv/Ignacio-Montali-CV-fr.pdf",
  ja: "cv/Ignacio-Montali-CV-ja.pdf",
  pt: "cv/Ignacio-Montali-CV-pt.pdf",
};

function Contact() {
  const { t, i18n } = useTranslation();

  // Obtenemos el idioma base (ej: "es-ES" se convierte en "es")
  const currentLang = i18n.language ? i18n.language.split("-")[0] : "en";

  // Seleccionamos el CV correspondiente o usamos inglés ("en") como respaldo (fallback)
  const cvFile = CV_FILES[currentLang] || CV_FILES["en"];

  const btn =
    "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 font-semibold transition hover:-translate-y-0.5 sm:w-auto";

  return (
    <section id="contact" className="scroll-mt-16 py-12 text-center md:py-20">
      <h2 className="mb-2 text-2xl font-bold text-text-h md:text-4xl">
        {t("contact.title")}
      </h2>
      <p className="mx-auto mb-2 max-w-2xl text-base md:text-lg">
        {t("contact.description")}
      </p>
      <p className="mb-6">
        <a
          href={`mailto:${EMAIL}`}
          className="font-semibold text-text-h underline hover:text-accent"
        >
          {EMAIL}
        </a>
      </p>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4">
        <a
          href={`mailto:${EMAIL}`}
          className={`${btn} bg-accent text-bg hover:opacity-90`}
        >
          {t("contact.emailButton")}
        </a>

        <a
          href={cvFile}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-border text-text-h hover:border-accent`}
        >
          {t("contact.cvButton")}
        </a>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-border text-text-h hover:border-accent`}
        >
          GitHub
        </a>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-border text-text-h hover:border-accent`}
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Contact;