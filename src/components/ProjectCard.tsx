export type ProjectLink = { label: string; url: string };

export type Project = {
  id: number;
  type: string;
  title: string;
  tagline: string;
  description: string;
  traction?: string;
  logo?: string[];
  links?: ProjectLink[];
  stack?: string[];
  highlights?: string[];
  learnings?: string[];
};

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { title, tagline, type, logo } = project;
  const logoSrc = logo?.[0];

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="flex h-full w-full cursor-pointer flex-col rounded-xl border border-border p-4 text-center transition hover:-translate-y-0.5 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent md:p-6"
    >
      {logoSrc && (
        <span className="mb-4 flex h-32 items-center justify-center rounded-lg bg-white p-3">
          <img
            src={logoSrc}
            alt=""
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </span>
      )}

      <span className="mb-2 block text-xs font-medium uppercase tracking-wide">
        {type}
      </span>
      <span className="mb-2 block text-lg font-semibold text-text-h">
        {title}
      </span>
      <span className="block text-sm leading-relaxed">{tagline}</span>
    </button>
  );
}

export default ProjectCard;