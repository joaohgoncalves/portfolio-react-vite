import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Zap } from 'lucide-react';
import { NAV_ITEMS, SOCIALS } from '@/data/navigation';
import MenuBackground from './MenuBackground';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle Smooth Scroll with Offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // Close menu first if it's open (for mobile)
      if (isOpen) setIsOpen(false);

      // Wait a tiny bit for menu animation if needed, or just scroll
      // Calculating offset to account for fixed header (approx 80-100px)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none md:pointer-events-auto ${
          scrolled ? 'py-4' : 'py-8'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo - Hide when menu is open on mobile to avoid clutter, visible on desktop */}
          <a
            href="#root"
            className={`text-xl font-bold font-display tracking-tight text-white uppercase pointer-events-auto transition-opacity duration-300 ${
              isOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'
            }`}
          >
            {t('navigation.logo')}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 pointer-events-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-white/70 hover:text-brand-accent transition-colors uppercase tracking-widest"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle Button (Hamburger) - Only visible when menu is CLOSED */}
          <button
            onClick={toggleMenu}
            className={`md:hidden text-white pointer-events-auto focus:outline-none transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Replicating Reference Image Structure */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[60] flex flex-col overflow-hidden"
          >
            {/* Background Interactive Lines */}
            <MenuBackground />

            {/* 1. Header Area: CTA Left, Close Right */}
            <div className="flex justify-between items-start p-6 relative z-10">
              {/* CTA Button - Improved Design */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.2 }}
                className="group relative px-5 py-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center gap-3 backdrop-blur-md"
              >
                {/* Hover/Active Fill Effect */}
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                {/* Icon Box */}
                <div className="relative z-10 bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                  <Zap
                    size={14}
                    className="text-brand-accent group-hover:text-white transition-colors"
                    fill="currentColor"
                  />
                </div>

                {/* Text */}
                <span className="relative z-10 font-display font-bold text-sm uppercase tracking-wider text-white">
                  {t('navigation.talkToMe')}
                </span>
              </motion.a>

              {/* Close Button (White Square) */}
              <motion.button
                onClick={toggleMenu}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-md hover:scale-95 transition-transform"
              >
                <X size={20} strokeWidth={3} />
              </motion.button>
            </div>

            {/* 2. Main Navigation (Center Stack) */}
            <div className="flex-1 flex flex-col justify-center items-center relative z-10">
              <nav className="flex flex-col items-center gap-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                      duration: 0.8,
                    }}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-5xl font-display font-bold text-white uppercase tracking-tighter hover:text-brand-accent transition-colors leading-none text-center"
                  >
                    {t(item.label)}
                  </motion.a>
                ))}
              </nav>

              {/* Decorative Center Element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 flex flex-col items-center gap-2"
              >
                <div className="flex gap-1 text-brand-accent">
                  <span className="text-xl">{'('}</span>
                  <Zap size={20} />
                  <span className="text-xl">{')'}</span>
                </div>
                <span className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase">
                  {t('navigation.location')}
                </span>
              </motion.div>
            </div>

            {/* 3. Footer (Socials & Business) */}
            <div className="p-6 pb-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-8"
              >
                <a
                  href="mailto:hello@joaohenrique.dev"
                  className="text-white font-display font-bold uppercase tracking-widest text-sm hover:text-brand-accent transition-colors"
                >
                  {t('navigation.business')}
                </a>

                <div className="flex flex-wrap justify-center gap-6">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      className="text-white/60 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
