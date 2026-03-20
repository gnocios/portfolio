import React from "react";
import { useTranslation } from "react-i18next";
import "./Experience.css"; // CSS profesional que ya tenías

// Definimos interfaces TS estrictas
interface Job {
  position: string;
  company: string;
  date: string;
  details: string[];
}

interface ExperienceTranslation {
  title: string;
  jobs: Job[];
}

const Experience: React.FC = () => {
  const { t } = useTranslation("experience");

  // Extraemos el título y jobs con tipado
  const title: string = t("title");
  const jobs: Job[] = (t("jobs", { returnObjects: true }) as Job[])?.slice() || [];

  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">{title}</h2>

      <div className="jobs-container">
        {jobs.map((job, index) => (
          <div key={index} className="job-item">
            <h3 className="job-position">
              {job.position} - <span className="job-company">{job.company}</span>
            </h3>
            <p className="job-date">{job.date}</p>
            <ul className="job-details">
              {job.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;