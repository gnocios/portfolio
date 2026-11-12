import { useTranslation } from "react-i18next";

const EMAIL = "ignaciomontali8@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ignacioalfredomontali/";
// const GITHUB_URL = "https://github.com/gnocios";

function Contact() {
  const { t, i18n } = useTranslation();

  const cvFile = i18n.language.startsWith("es")
    ? "cv/Ignacio-Montali-CV-es.pdf"
    : "cv/Ignacio-Montali-CV-en.pdf";

  const btn =
    "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 font-semibold transition hover:-translate-y-0.5 sm:w-auto";

  return (
    <section id="contact" className="scroll-mt-16 py-12 text-center md:py-20">
      <h2 className="mb-2 text-2xl font-bold text-text-h md:text-4xl">
        {t("contact.title")}
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-base md:text-lg">
        {t("contact.description")}
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
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-border text-text-h hover:border-accent`}
        >
          LinkedIn
        </a>

        {/* GitHub: uncomment when there are public repos
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-border text-text-h hover:border-accent`}
        >
          GitHub
        </a>
        */}
      </div>
    </section>
  );
}

export default Contact;