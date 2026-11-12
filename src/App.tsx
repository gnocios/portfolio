import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Hero from "./components/Hero";

const Rpsls = lazy(() => import("./games/rpsls/Rpsls"));

// Scrolls to the #section of the URL, or to the top on a normal route change
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Landing() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1126px] divide-y divide-border px-4">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

function RpslsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Link
        to="/#projects"
        className="fixed left-4 top-4 z-50 rounded-lg border border-border bg-bg/80 px-3 py-2 text-sm font-medium text-text-h backdrop-blur hover:border-accent"
      >
        ← {t("games.back")}
      </Link>
      <Suspense fallback={null}>
        <Rpsls />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/games/rpsls" element={<RpslsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;