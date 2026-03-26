import React from "react";
import { useTranslation } from "react-i18next";
import "./Skills.css";

interface SkillCategory {
  title: string;
  description: string;
  techStack: Record<string, string[]>;
}

const Skills: React.FC = () => {
  const { t } = useTranslation("skills");

  const title = t("title");

  const rawCategories = t("categories", { returnObjects: true });

  const categories: SkillCategory[] = Array.isArray(rawCategories)
    ? rawCategories
    : [];

  return (
    <section id="skills" className="skills-section">
      <h1 className="section-title">{title}</h1>

      <div className="categories-container">
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
            <h3 className="category-title">{cat.title}</h3>
            <p className="category-description">{cat.description}</p>

            <div className="flex-chips">
              {Object.entries(cat.techStack || {}).map(
                ([subcategory, skills]) => (
                  <div key={subcategory}>
                    <strong>{subcategory}:</strong>{" "}
                    {skills.map((skill, i) => (
                      <span key={i} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;