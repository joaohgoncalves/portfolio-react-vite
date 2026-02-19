import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider ${
          i18n.language === 'pt' ? 'bg-brand-accent text-white' : 'bg-white/10 text-white/60 hover:text-white'
        } transition-colors`}
      >
        PT
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider ${
          i18n.language === 'en' ? 'bg-brand-accent text-white' : 'bg-white/10 text-white/60 hover:text-white'
        } transition-colors`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;