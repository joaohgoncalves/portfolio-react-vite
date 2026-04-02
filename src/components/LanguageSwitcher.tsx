import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log('🔄 Mudando idioma manualmente para:', lng);
    i18n.changeLanguage(lng);
  };

  const clearStorage = () => {
    console.log('🗑️ Limpando localStorage');
    localStorage.removeItem('i18nextLng');
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-black/80 p-2 rounded-lg">
      <div className="text-white text-xs">
        Idioma: <strong>{i18n.language}</strong>
      </div>
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
      <button
        onClick={clearStorage}
        className="px-3 py-1 rounded text-xs font-mono uppercase tracking-wider bg-red-500/20 text-red-300 hover:text-red-100 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default LanguageSwitcher;