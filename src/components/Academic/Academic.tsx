import React from "react";
import { useTranslation } from "react-i18next";
import "./Academic.css";

interface AcademicItem {
  title: string;
  institution: string;
  year?: string;
  description?: string;
}

interface AcademicTranslation {
  sectionTitle: string;
  items: AcademicItem[];
}

const Academic: React.FC = () => {
  const { t } = useTranslation("academic");

  const sectionTitle = t("sectionTitle") as string;

  const rawItems = t("items", { returnObjects: true });
  const items: AcademicItem[] = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section id="academic" className="academic-section">
      <h1 className="academic-title">{sectionTitle}</h1>
      <div className="academic-items">
        {items.map((item, index) => (
          <div key={index} className="academic-item">
            <h3 className="academic-item-title">{item.title}</h3>
            <p className="academic-item-institution">{item.institution}{item.year ? ` - ${item.year}` : ""}</p>
            {item.description && <p className="academic-item-description">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Academic;