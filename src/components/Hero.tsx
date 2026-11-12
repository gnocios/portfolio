import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="flex flex-col items-center px-2 py-12 text-center md:py-24 scroll-mt-16"
    >
      {/* Photo: uncomment when you have it (put the file in /public)
      <img
        src="/me.jpg"
        alt={t("hero.name")}
        width={160}
        height={160}
        className="mb-6 h-32 w-32 rounded-full object-cover md:h-40 md:w-40"
      />
      */}

      <p className="mb-3 text-sm font-medium uppercase tracking-wide md:text-base">
        {t("hero.name")}
      </p>

      <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight text-text-h md:text-5xl">
        {t("hero.headline")}
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed md:text-lg">
        {t("hero.subheadline")}
      </p>

      <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
        <span className="text-sm font-medium md:text-base">
          {t("hero.cta")}
        </span>
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-bg sm:w-auto"
        >
          {t("hero.ctaButton")}
        </a>
      </div>
    </section>
  );
}

export default Hero;