import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const STACK = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "C#", "PYTHON", "PHP", "NODE.JS", "SQL", "WEBGL", "FRAMER MOTION", "VERCEL", "SHOPIFY PLUS", "THREE.JS", "TAILWIND"
];

const Partnerships: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="partners" className="py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden flex flex-col justify-center">
      
      {/* Intro Text Block based on README philosophy */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
                <Reveal>
                    <h2 className="text-brand-accent font-mono text-xs md:text-sm mb-6 uppercase tracking-[0.2em]">
                        Ecossistema & Arquitetura
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight">
                        Performance perceptiva. <br />
                        <span className="text-white/40">Código orientado à intenção.</span>
                    </p>
                </Reveal>
            </div>
            <div className="md:pl-12">
                <Reveal delay={0.2}>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                        Não utilizo ferramentas apenas por conveniência. Seleciono tecnologias que permitem transformar identidade em experiência digital. Uma stack desenhada para fluidez, onde o <strong className="text-white font-medium">motion design</strong> faz parte da engenharia, não apenas da decoração.
                    </p>
                </Reveal>
            </div>
        </div>
      </div>

      {/* Infinite Marquee Animation with Pause on Click */}
      <div 
        className="relative w-full py-8 border-y border-white/5 bg-brand-gray/20 cursor-pointer"
        onClick={() => setIsPaused(!isPaused)}
        title={isPaused ? "Clique para continuar" : "Clique para pausar"}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark pointer-events-none" />
        
        <div className="flex whitespace-nowrap overflow-hidden">
            <div 
                className="flex gap-16 md:gap-32 items-center pr-16 md:pr-32"
                style={{
                    animation: 'marquee 60s linear infinite',
                    animationPlayState: isPaused ? 'paused' : 'running',
                    width: 'max-content'
                }}
            >
                {/* Triple the list to ensure seamless looping without gaps */}
                {[...STACK, ...STACK, ...STACK].map((item, index) => (
                    <div 
                        key={`${item}-${index}`} 
                        className={`group relative flex items-center justify-center transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                    >
                        <span 
                            className={`text-4xl md:text-7xl font-display font-bold text-transparent stroke-text transition-all duration-300 
                            ${isPaused ? 'text-white' : 'group-hover:text-white'}`}
                        >
                            {item}
                        </span>
                        {/* Dot separator */}
                        <div className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2 w-1 h-1 md:w-2 md:h-2 bg-brand-accent rounded-full opacity-50" />
                    </div>
                ))}
            </div>
        </div>
        
        {/* Pause Icon Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isPaused ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="bg-brand-dark/80 backdrop-blur-sm p-5 rounded-full border border-white/10 shadow-2xl">
                 <span className="text-2xl md:text-3xl text-brand-accent leading-none">⏸</span>
            </div>
        </div>
      </div>
      
      {/* CSS for Outline Text effect and Keyframes */}
      <style>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
        /* When paused or hovered, remove stroke and fill */
        .group:hover .stroke-text, .stroke-text.text-white {
            -webkit-text-stroke: 0px transparent;
        }

        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); } /* Move 1/3 because we have 3 sets of items */
        }
      `}</style>
    </section>
  );
};

export default Partnerships;