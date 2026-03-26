import React from "react";
import "./Projects.css";

export type Project = {
  id: number;
  title: string;
  description: string;
  logo?: string[];       // <-- usamos logo ahora
  images?: string[];
  liveLink?: string;
  codeLink?: string;
  detailsLink?: string;
  video?: string;
  type?: "fullstack" | "frontend" | "backend" | "mobile";
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  if (!project) return null;

  const { title, description, logo, liveLink, codeLink, detailsLink } = project;
  const hasLogo = logo && logo.length > 0;
  const logoSrc = hasLogo ? logo[0] : undefined;

  return (
    <div className="project-card">
      {logoSrc ? (
        <div className="project-logo-container">
          <img src={logoSrc} alt={title} className="project-logo" />
        </div>
      ) : (
        <div className="project-logo-container">No logo available</div>
      )}

      <h5 className="ff-jose">{title}</h5>
      <p className="text-muted">{description}</p>

      <div className="project-links">
        {liveLink && (
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
            Watch Live
          </a>
        )}
        {codeLink && (
          <a href={codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
            Source Code
          </a>
        )}
        {detailsLink && (
          <a href={detailsLink} target="_blank" rel="noopener noreferrer" className="project-link project-link-gray">
            Ver más
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;