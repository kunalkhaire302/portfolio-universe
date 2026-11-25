import React, { useEffect } from 'react';
import ProjectStudy, { resolveProject } from './components/ProjectStudy';

// Components
import CustomCursor from './components/UI/CustomCursor';
import ScrollProgress from './components/UI/ScrollProgress';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';

// Sections
import HeroSection from './components/Sections/HeroSection';
import AboutSection from './components/Sections/AboutSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import ExperienceSection from './components/Sections/ExperienceSection';
import CertificationSection from './components/Sections/CertificationSection';
import ContactSection from './components/Sections/ContactSection';


function App() {
  const isHome = window.location.pathname === '/';
  useEffect(() => {
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, []);
  return (
    <div className="min-h-screen bg-canvas text-porcelain selection:bg-coral selection:text-canvas">
      <CustomCursor />
      <ScrollProgress />
      <Navigation projectPage={!isHome} />

      {isHome ? <main className="relative z-10 w-full">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationSection />
        <ContactSection />
      </main> : <ProjectStudy project={resolveProject(window.location.pathname)} />}

      <Footer />
    </div>
  );
}

export default App;
