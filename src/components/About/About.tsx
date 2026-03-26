import React from "react";
import { useTranslation } from "react-i18next";
import "./About.css";

interface AboutTranslation {
  title: string;
  description: string;
  portfolioText: string;
  portfolioLinks: string[];
}

const About: React.FC = () => {
  const { t } = useTranslation("about");

  const title = t("title") as string;
  const description = t("description") as string;

  return (
    <section id="about" className="about-section">
      <h1 className="about-title">{title}</h1>
      <p className="about-description">{description}</p>
    </section>
  );
};

export default About;