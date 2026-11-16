import { useTranslation } from "react-i18next";
import GithubCard, { type GithubProject } from "./GithubCard";

type GithubJSON = {
  title: string;
  items: GithubProject[];
};

function GithubProjects() {
  const { t } = useTranslation();

  const data = t("github", { returnObjects: true }) as GithubJSON;
  const items = Array.isArray(data.items) ? data.items : [];

  if (!items.length) return null;

  return (
    <section id="github" className="scroll-mt-16 py-12 md:py-20">
      <h2 className="mb-8 text-center text-2xl font-bold text-text-h md:text-4xl">
        {data.title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
        {items.map((project) => (
          <GithubCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default GithubProjects;