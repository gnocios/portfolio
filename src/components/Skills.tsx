import { useTranslation } from "react-i18next";

interface SkillCategory {
  title: string;
  description: string;
  techStack: Record<string, string[]>;
}

function Skills() {
  const { t } = useTranslation();

  const rawCategories = t("skills.categories", { returnObjects: true });
  const categories: SkillCategory[] = Array.isArray(rawCategories)
    ? rawCategories
    : [];

  return (
    <section id="skills" className="scroll-mt-16 py-12 md:py-20">
      <h2 className="mb-8 text-center text-2xl font-bold text-text-h md:text-4xl">
        {t("skills.title")}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {categories.map((cat) => (
          <article
            key={cat.title}
            className="rounded-xl border border-border p-4 transition hover:-translate-y-0.5 hover:border-accent md:p-6"
          >
            <h3 className="mb-2 text-lg font-semibold text-text-h md:text-xl">
              {cat.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed md:text-base">
              {cat.description}
            </p>

            <div className="flex flex-col gap-3">
              {Object.entries(cat.techStack ?? {}).map(([group, skills]) => (
                <div key={group}>
                  <p className="mb-1 text-sm font-semibold text-text-h">
                    {group}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-text-h md:text-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;