import React, { Suspense, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import About from '@/components/About';
import Partnerships from '@/components/Partnerships';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import BackgroundReveal from '@/components/BackgroundReveal';
import SEO from '@/components/SEO';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isDark, setIsDark] = useState(false); // padrão claro
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rootClasses = isDark
    ? 'bg-brand-dark text-white selection:bg-brand-accent selection:text-white'
    : 'bg-slate-100 text-slate-900 selection:bg-brand-accent selection:text-white';

  return (
    <div id="root" className={`${rootClasses} min-h-screen`}>
      <BackgroundReveal />
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed top-4 right-4 z-50 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs backdrop-blur transition hover:bg-white/20"
        aria-label="Alternar tema"
      >
        {isDark ? 'Tema Claro' : 'Tema Escuro'}
      </button>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-[100]"
        style={{ scaleX }}
      />
      <Navigation />
      <PerformanceMonitor />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Partnerships />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <HelmetProvider>
    <Analytics />
    <SpeedInsights />
    <SEO />
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="text-slate-900 text-xl">Carregando...</div>
        </div>
      }
    >
      <AppContent />
    </Suspense>
  </HelmetProvider>
);

export default App;
