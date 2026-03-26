import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
type Project = import("./ProjectCard").Project;
import "./Projects.css";

type ProjectsJSON = {
  title: string;
  fullstack: Project[];
  frontend: Project[];
  backend: Project[];
  mobile: Project[];
};

const Projects: React.FC = () => {
  const { t } = useTranslation("projects");

  const rawProjects = t("projects", { returnObjects: true }) as ProjectsJSON;

  const sectionTitle: string = rawProjects.title || "Projects";

  const sections = Object.entries(rawProjects)
    .filter(([key]) => key !== "title")
    .map(([key, value]) => ({
      type: key.charAt(0).toUpperCase() + key.slice(1),
      items: Array.isArray(value) ? value : []
    }));

  return (
    <section id="projects" className="projects-section container py-4">
      <div className="row mb-3">
        <div className="col">
          <h2 className="ff-jose fw-bold ls-2 text-center">{sectionTitle}</h2>
        </div>
      </div>

      {sections.map((section) =>
        section.items.length > 0 && (
          <div key={section.type} className="mb-4">
            <h3 className="ff-jose mt-4">{section.type}</h3>
            <div className="row">
              {section.items.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Projects;