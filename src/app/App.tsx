import React, { Suspense } from 'react';
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-accent selection:text-white">
      <BackgroundReveal />
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
        <div className="min-h-screen bg-brand-dark flex items-center justify-center">
          <div className="text-white text-xl">Carregando...</div>
        </div>
      }
    >
      <AppContent />
    </Suspense>
  </HelmetProvider>
);

export default App;
