import React from "react";
import { useTranslation } from "react-i18next";
import "./Resume.css";

interface CVFile {
  label: string;
  file: string;
}

interface ResumeTranslation {
  title: string;
  description: string;
  cvs: CVFile[];
}

const Resume: React.FC = () => {
  const { t } = useTranslation("resume");

  // Extraemos cada campo por separado y validamos
  const title = t("title") as string;
  const description = t("description") as string;

  const rawCVs = t("cvs", { returnObjects: true });
  const cvs: CVFile[] = Array.isArray(rawCVs) ? rawCVs : [];

  return (
    <section id="resume" className="resume-section">
      <h1 className="resume-title">{title}</h1>
      <p className="resume-description">{description}</p>

      <div className="resume-buttons">
        {cvs.length > 0 ? (
          cvs.map((cv) => (
            <a
              key={cv.file}
              href={cv.file}
              download
              className="resume-btn"
            >
              {cv.label}
            </a>
          ))
        ) : (
          <p>No CVs available.</p>
        )}
      </div>
    </section>
  );
};

export default Resume;