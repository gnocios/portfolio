import React from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

interface SocialLink {
  label: string;
  url: string;
}

interface ContactTranslation {
  title: string;
  description: string;
  socials: SocialLink[];
  shareLabel: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation("contact");

  const title = t("title") as string;
  const description = t("description") as string;

  const rawSocials = t("socials", { returnObjects: true });
  const socials: SocialLink[] = Array.isArray(rawSocials) ? rawSocials : [];

  const shareLabel = t("shareLabel") as string;

  // Función simple para compartir portfolio
  const sharePortfolio = () => {
    if (navigator.share) {
      navigator.share({
        title: "Portfolio Ignacio Montali",
        text: "Check out my portfolio!",
        url: window.location.href,
      }).catch((err) => console.log("Share failed", err));
    } else {
      // fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert("Portfolio link copied to clipboard!");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h1 className="contact-title">{title}</h1>
      <p className="contact-description">{description}</p>

      <div className="contact-socials">
        {socials.length > 0 &&
          socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              {social.label}
            </a>
          ))}
      </div>

      <button className="contact-btn share-btn" onClick={sharePortfolio}>
        {shareLabel}
      </button>
    </section>
  );
};

export default Contact;