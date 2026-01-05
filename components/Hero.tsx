import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useCursor } from './CursorContext';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const { setCursorVariant } = useCursor();
  
  // Parallax effects
  const textY = useTransform(scrollY, [0, 1000], [0, 300]); 
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  
  // Enhanced Parallax: Increased movement range from 150 to 450 for more depth
  const bgY = useTransform(scrollY, [0, 1000], [0, 450]); 
  const bgOpacity = useTransform(scrollY, [0, 1200], [0.1, 0.4]);

  // Scroll Indicator Exit Animation
  // Increased range to 300px for a smoother fade-out
  // Added downward movement to create a "fall-off" effect
  const scrollButtonOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scrollButtonY = useTransform(scrollY, [0, 300], [0, 50]);

  const words = "Design de impacto e engenharia de performance: criando experiências digitais onde movimento, tecnologia e usabilidade se encontram.".split(" ");

  const handleScrollClick = () => {
    const element = document.getElementById('work');
    if(element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    // Use svh (small viewport height) for better mobile browser support
    <section className="relative min-h-[100svh] flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 overflow-hidden pt-20 md:pt-0">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-accent/40 via-brand-dark to-brand-dark"
      />
      
      <motion.div 
        style={{ y: textY, opacity }}
        className="z-10 w-full max-w-7xl mx-auto flex flex-col justify-center h-full"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-brand-accent font-mono text-xs md:text-sm mb-4 tracking-widest uppercase"
        >
          Frontend Developer & Designer
        </motion.p>
        
        {/* Responsive Typography: 5xl on mobile -> 9xl on desktop */}
        <h1 
          className="font-display font-bold text-5xl sm:text-7xl lg:text-9xl leading-[0.9] tracking-tighter text-white mb-6 md:mb-8"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="overflow-hidden">
            <motion.div 
                initial={{ y: "110%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
                JOÃO
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div 
                initial={{ y: "110%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            >
                HENRIQUE
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div 
                className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white/50" 
                initial={{ y: "110%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
                GONÇALVES
            </motion.div>
          </div>
        </h1>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 1.6,
                staggerChildren: 0.06
              }
            }
          }}
          // Added pb-32 on mobile to lift text away from the absolute positioned bottom arrow
          className="max-w-xl pb-32 md:pb-0"
        >
          <p className="text-white/60 text-base md:text-xl font-light leading-relaxed">
            {words.map((word, index) => {
                // Highlight logic based on specific words
                const isHighlight = word === "movimento" || word.includes("arquitetura");
                return (
                    <motion.span
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { 
                                opacity: 1, 
                                y: 0,
                                transition: { duration: 0.8, ease: "easeOut" } // Smooth fade duration
                            }
                        }}
                        className={`inline-block mr-[0.25em] ${isHighlight ? 'text-white' : ''}`}
                    >
                        {word}
                    </motion.span>
                );
            })}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Positioned nicely on mobile */}
      {/* Wrapper to handle Scroll Opacity independently of Entrance Animation */}
      <motion.div 
        style={{ opacity: scrollButtonOpacity, y: scrollButtonY }}
        className="absolute bottom-8 md:bottom-12 left-6 md:left-24 z-20 pointer-events-none"
      >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 1,
                y: [-4, 4, -4],
            }}
            transition={{ 
                opacity: { delay: 2.5, duration: 1.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="flex items-center gap-4 cursor-pointer text-white/70 hover:text-white transition-colors duration-300 pointer-events-auto"
            onClick={handleScrollClick}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
        >
            <ArrowDown size={20} />
            <span className="hidden md:inline text-xs uppercase tracking-widest">Role para experienciar</span>
            <span className="md:hidden text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;