import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/UI/CustomCursor';
import ScrollProgress from './components/UI/ScrollProgress';
import Navigation from './components/Layout/Navigation';
import ParticleBackground from './components/ParticleBackground';
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
  const [loading, setLoading] = useState(true);

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Restore scroll
    }
  }, [loading]);

  return (
    <div className="bg-space-dark min-h-screen text-star-white selection:bg-neon-teal selection:text-space-dark">
      <AnimatePresence>
        {loading && (
          <LoadingScreen onLoadingComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <ParticleBackground />
          <Navigation />

          <main className="relative z-10 w-full overflow-hidden">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CertificationSection />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
