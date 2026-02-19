import React from 'react';
import { Reveal } from './Reveal';
import { SOCIALS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <Reveal>
            {/* 
                Interaction Update: 
                Applied hover effects to individual spans instead of using group-hover.
                This ensures only the specific word being hovered turns blue.
            */}
            <a href="mailto:hello@joaohenrique.dev" className="block cursor-pointer">
                <h2 className="text-4xl md:text-8xl lg:text-9xl font-display font-bold text-white tracking-tighter mb-8 md:mb-12">
                    {t('contact.title').split(' ').map((word, index) => (
                        <span key={index} className="transition-colors duration-500 hover:text-brand-accent mr-4 last:mr-0">
                            {word}
                        </span>
                    ))}
                </h2>
            </a>
        </Reveal>
        
        <Reveal delay={0.2}>
            <a 
                href="mailto:joaohenriquegon2009@gmail.com" 
                className="text-xl md:text-3xl font-light text-brand-accent hover:text-white transition-colors border-b-2 border-brand-accent hover:border-white pb-2 mb-16 md:mb-24 inline-block break-all md:break-normal"
            >
                {t('contact.email')}
            </a>
        </Reveal>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 md:pt-12 gap-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {SOCIALS.map((social) => (
                    <a 
                        key={social.platform} 
                        href={social.url} 
                        className="text-white/60 hover:text-brand-accent transition-colors text-xs md:text-sm uppercase tracking-widest flex items-center gap-1"
                    >
                        {social.platform}
                        <ArrowUpRight size={12} />
                    </a>
                ))}
            </div>
            
            <p className="text-white/30 text-xs md:text-sm font-mono text-center md:text-right">
                {t('contact.copyright', { year: new Date().getFullYear() })}
            </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;