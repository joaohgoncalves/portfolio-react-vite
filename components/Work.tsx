import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Work: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768; // Tailwind md breakpoint
      setIsDesktop(desktop);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop && contentRef.current) {
        const calculateWidth = () => {
            if (contentRef.current) {
                // Calculate how much we need to translate: Total Width - Viewport Width
                const fullWidth = contentRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                setScrollRange(fullWidth - viewportWidth);
            }
        };

        calculateWidth();
        // Recalculate on resize as window width changes
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    } else {
        setScrollRange(0);
    }
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll into horizontal movement based on calculated range
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

  return (
    <section 
        ref={targetRef} 
        id="work" 
        // Mobile: auto height (vertical stack). Desktop: 300vh (scroll container)
        className={`relative bg-brand-dark border-t border-white/5 ${isDesktop ? 'h-[300vh]' : 'h-auto py-24'}`}
    >
      <div className={`${isDesktop ? 'sticky top-0 h-screen overflow-hidden flex items-center' : 'container mx-auto px-6 overflow-visible'}`}>
        
        {/* 
            Conditional Layout:
            - Desktop: motion.div handles horizontal translation with w-max to ensure full width measurement
            - Mobile: Standard div with vertical flex
        */}
        <motion.div 
            ref={contentRef}
            style={{ x: isDesktop ? x : 0 }} 
            className={`flex ${isDesktop ? 'gap-24 px-24 items-center w-max' : 'flex-col gap-24'}`}
        >
            {/* Intro Block */}
            <div className={`${isDesktop ? 'w-[30vw] shrink-0' : 'w-full mb-12'}`}>
                 <h2 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter mb-6 md:mb-8">
                    {t('work.title')} <span className="text-brand-accent text-lg align-top">{t('work.number')}</span>
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md">
                    {t('work.description')}
                    <br /><br />
                    {isDesktop && <span className="text-sm font-mono opacity-50 uppercase tracking-widest">{t('work.explore')}</span>}
                </p>
            </div>

            {/* Project Cards */}
            {PROJECTS.map((project) => (
               <div 
                    key={project.id} 
                    className={`${isDesktop ? 'w-[45vw] shrink-0' : 'w-full'} flex flex-col justify-center group relative`}
               >
                  {/* Image Container */}
                  <div className="aspect-[16/9] w-full bg-brand-gray/50 overflow-hidden mb-6 md:mb-8 relative rounded-sm">
                     <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
                     <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="object-cover w-full h-full grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105" 
                     />
                  </div>

                  {/* Text Content */}
                  <div className="md:pr-8">
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                        <span className="text-brand-accent font-mono text-[10px] md:text-xs uppercase tracking-wider">{project.year} — {t(project.category)}</span>
                        <div className="flex gap-2">
                             {project.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] uppercase border border-white/10 px-2 py-0.5 rounded-full text-white/40">{tag}</span>
                             ))}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4 group-hover:text-brand-accent transition-colors">
                          {t(project.title)}
                      </h3>
                      
                      <p className="text-white/60 mb-6 md:mb-8 font-light text-sm md:text-base leading-relaxed">
                          {t(project.description)}
                      </p>
                      
                      {project.caseUrl && (
                      <a
                        href={project.caseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-brand-accent transition-colors group/link"
                      >
                        <span className="uppercase tracking-widest text-xs md:text-sm font-medium border-b border-transparent group-hover/link:border-brand-accent pb-0.5">
                          {t('work.caseStudy')}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                        />
                      </a>
                    )}
                  </div>
               </div>
            ))}
            
            {/* End Spacer for desktop smooth scrolling - Reduced to 5vw to minimize empty space */}
            {isDesktop && <div className="w-[5vw] shrink-0" />}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;