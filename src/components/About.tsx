import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-16 py-12 text-center md:py-20">
      <h2 className="mb-4 text-2xl font-bold text-text-h md:text-4xl">
        {t("about.title")}
      </h2>
      <p className="mx-auto max-w-3xl text-base leading-relaxed md:text-lg">
        {t("about.description")}
      </p>
    </section>
  );
}

export default About;