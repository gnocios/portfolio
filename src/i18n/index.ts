import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enAbout from "./locales/en/about.json";
import esAbout from "./locales/es/about.json";
import enAcademic from "./locales/en/academic.json";
import esAcademic from "./locales/es/academic.json";
import enContact from "./locales/en/contact.json";
import esContact from "./locales/es/contact.json";
import enExperience from "./locales/en/experience.json";
import esExperience from "./locales/es/experience.json";
import enNavbar from "./locales/en/navbar.json";
import esNavbar from "./locales/es/navbar.json";
import enProjects from "./locales/en/projects.json";
import esProjects from "./locales/es/projects.json";
import enResume from "./locales/en/resume.json";
import esResume from "./locales/es/resume.json";
import enSkills from "./locales/en/skills.json";
import esSkills from "./locales/es/skills.json";

i18n
.use(LanguageDetector) // detecta idioma automáticamente
.use(initReactI18next)
.init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
        escapeValue: false,
    },

    resources: {
        en: {
            about: enAbout,
            academic: enAcademic,
            contact: enContact,
            experience: enExperience,
            navbar: enNavbar,
            projects: enProjects,
            resume: enResume,
            skills: enSkills,
        },
        es: {
            about: esAbout,
            academic: esAcademic,
            contact: esContact,
            experience: esExperience,
            navbar: esNavbar,
            projects: esProjects,
            resume: esResume,
            skills: esSkills,
        },
    },
});

export default i18n;
