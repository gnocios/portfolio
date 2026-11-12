import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

type ProjectsJSON = {
  title: string;
  items: Project[];
};

function Projects() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Project | null>(null);

  const data = t("projects", { returnObjects: true }) as ProjectsJSON;
  const items = Array.isArray(data.items) ? data.items : [];

  return (
    <section id="projects" className="scroll-mt-16 py-12 md:py-20">
      <h2 className="mb-8 text-center text-2xl font-bold text-text-h md:text-4xl">
        {data.title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {items.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

export default Projects;