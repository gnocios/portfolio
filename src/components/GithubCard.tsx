import { Link } from "react-router";

export type GithubLink = { label: string; url: string };

export type GithubProject = {
  id: number;
  title: string;
  description: string;
  stack?: string[];
  links?: GithubLink[];
};

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-6 w-6 shrink-0 fill-current text-text-h"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function GithubCard({ project }: { project: GithubProject }) {
  const { title, description, stack, links } = project;

  const btn =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90";

  return (
    <article className="flex h-full flex-col rounded-xl border border-border p-4 text-left md:p-6">
      <div className="mb-3 flex items-center gap-3">
        <GithubIcon />
        <h3 className="text-lg font-semibold text-text-h">{title}</h3>
      </div>

      <p className="mb-4 text-sm leading-relaxed">{description}</p>

      {stack && stack.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {links && links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-3">
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
    </article>
  );
}

export default GithubCard;