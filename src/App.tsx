import React, { useState, useEffect, Suspense } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { ParticleCanvas } from './components/ui/ParticleCanvas';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { useTheme } from './hooks/useTheme';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SEO_CONFIG, STRUCTURED_DATA } from './constants/seo';

// Lazy loading de secciones
const Hero = React.lazy(() => import('./components/sections/Hero').then(mod => ({ default: mod.Hero })));
const MenuSection = React.lazy(() => import('./components/sections/MenuSection').then(mod => ({ default: mod.MenuSection })));
const SpecialtiesSection = React.lazy(() => import('./components/sections/SpecialtiesSection').then(mod => ({ default: mod.SpecialtiesSection })));
const ExperienceSection = React.lazy(() => import('./components/sections/ExperienceSection').then(mod => ({ default: mod.ExperienceSection })));
const DeveloperSection = React.lazy(() => import('./components/sections/DeveloperSection').then(mod => ({ default: mod.DeveloperSection })));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })));

const CubanLanding: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // JSON-LD para SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(STRUCTURED_DATA);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      window.history.pushState({}, '', `#${sectionId}`);
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return <LoadingOverlay theme={theme} />;
  }

  return (
    <>
      {/* Metadatos dinámicos */}
      <title>{SEO_CONFIG.title}</title>
      <meta name="description" content={SEO_CONFIG.description} />
      <meta name="keywords" content={SEO_CONFIG.keywords} />
      
      <div className={`min-h-screen bg-gradient-to-b ${
        theme === 'dark' 
          ? 'from-stone-950 via-amber-950/30 to-stone-950 text-amber-50' 
          : 'from-amber-50 via-orange-50/30 to-stone-100 text-stone-900'
      } overflow-hidden relative font-sans`}>
        <ParticleCanvas theme={theme} reducedMotion={reducedMotion} />
        
        <Navigation
          theme={theme}
          onThemeToggle={toggleTheme}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={toggleMobileMenu}
          onNavigate={scrollToSection} activeSection={''}        />

        <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
          <main id="main-content" role="main">
            <Hero theme={theme} reducedMotion={reducedMotion} onExplore={() => scrollToSection('menu')} />
            <MenuSection theme={theme} reducedMotion={reducedMotion} />
            <SpecialtiesSection theme={theme} />
            <ExperienceSection theme={theme} reducedMotion={reducedMotion} />
            <DeveloperSection theme={theme} />
            <ContactSection theme={theme} reducedMotion={reducedMotion} />
          </main>
        </Suspense>

        <Footer theme={theme} />
      </div>
    </>
  );
};

export default CubanLanding;
