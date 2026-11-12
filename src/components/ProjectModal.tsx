import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "./ProjectCard";
import { Link } from "react-router";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-base font-semibold text-text-h md:text-lg">
        {title}
      </h3>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed md:text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = () => dialogRef.current?.close();

  const { title, type, description, traction, logo, links, stack, highlights, learnings } =
    project;
  const logoSrc = logo?.[0];

  const btn =
    "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition hover:opacity-90 sm:w-auto";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="project-modal-title"
      className="m-auto h-full max-h-full w-full max-w-full overflow-y-auto bg-bg p-0 text-inherit backdrop:bg-black/60 md:h-auto md:max-h-[90vh] md:max-w-3xl md:rounded-xl md:border md:border-border"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-bg p-4 md:px-8">
        <div className="flex items-center gap-3">
          {logoSrc && (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
              <img
                src={logoSrc}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
            </span>
          )}
          <div className="text-left">
            <h2
              id="project-modal-title"
              className="text-xl font-bold text-text-h md:text-2xl"
            >
              {title}
            </h2>
            <p className="text-xs font-medium uppercase tracking-wide">
              {type}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label={t("projects.ui.close")}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border text-text-h hover:border-accent"
        >
          ✕
        </button>
      </header>

      <div className="p-4 text-left md:p-8">
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          {description}
        </p>

        {traction && (
          <p className="mb-6 rounded-lg border border-border p-3 text-sm font-medium text-text-h md:text-base">
            {traction}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {links.map((link, index) => {
              const className = `${btn} ${
                index === 0
                  ? "bg-accent text-bg"
                  : "border border-border text-text-h hover:border-accent"
              }`;

              return link.url.startsWith("/") ? (
                <Link key={link.url} to={link.url} className={className}>
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}

        <Section title={t("projects.ui.highlights")} items={highlights} />
        <Section title={t("projects.ui.stack")} items={stack} />
        <Section title={t("projects.ui.learnings")} items={learnings} />

        <p className="text-xs leading-relaxed md:text-sm">
          {t("projects.ui.privateRepo")}
        </p>
      </div>
    </dialog>
  );
}

export default ProjectModal;