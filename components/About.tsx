import React from 'react';
import { Reveal } from './Reveal';
import { EXPERIENCE } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-brand-gray relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24 md:mb-32">
          <div className="md:w-1/3">
             <Reveal>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                FORA DA ROTA <span className="text-brand-accent text-lg align-top ml-2">02</span>
                </h2>
             </Reveal>
          </div>
          <div className="md:w-2/3">
            <Reveal delay={0.2}>
                <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed mb-8">
                    Minha filosofia é simples: <strong className="text-white font-semibold">Frontend é a primeira impressão.</strong> Não deve apenas funcionar; deve parecer vivo. Combino precisão de engenharia com um amor caótico por motion design.
                </p>
            </Reveal>
            <Reveal delay={0.3}>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    Baseado no Brasil,Trabalho onde engenharia encontra movimento, combinando precisão técnica com motion design para criar experiências que parecem vivas, não artificiais. Especialista no ecossistema React, mas minha verdadeira ferramenta é a resolução visual de problemas.
                </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-white/10 pt-16 md:pt-24">
            <Reveal>
                <h3 className="text-lg font-mono text-brand-accent mb-12 uppercase tracking-widest">Experiência</h3>
            </Reveal>
            
            <div className="space-y-12 md:space-y-16">
                {EXPERIENCE.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12">
                        <div className="md:col-span-1">
                            <Reveal>
                                <span className="text-white/40 font-mono text-xs md:text-sm inline-block border border-white/10 px-2 py-1 rounded md:border-none md:p-0">{exp.period}</span>
                            </Reveal>
                        </div>
                        <div className="md:col-span-3">
                            <Reveal delay={0.2}>
                                <h4 className="text-xl md:text-2xl text-white font-display font-bold mb-1 md:mb-2">{exp.role}</h4>
                                <p className="text-brand-accent mb-4 text-sm md:text-base">{exp.company}</p>
                                <p className="text-white/60 font-light text-sm md:text-base">{exp.description}</p>
                            </Reveal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;