import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pt from './locales/pt.json';
import en from './locales/en.json';

// Função para detectar idioma baseado no IP (será chamada depois da inicialização)
const detectLanguageFromIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const country = data.country_code;

    // Mapeamento de países para idiomas
    const countryToLanguage: { [key: string]: string } = {
      'BR': 'pt',
      'PT': 'pt',
      'US': 'en',
      'GB': 'en',
      'CA': 'en',
      'AU': 'en',
      'IE': 'en',
      'NZ': 'en',
    };

    return countryToLanguage[country] || 'en';
  } catch (error) {
    console.warn('Failed to detect language from IP:', error);
    return 'en';
  }
};

// Inicializar i18next com detecção síncrona primeiro
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Detectar idioma por IP após a inicialização (não bloqueia a renderização)
detectLanguageFromIP().then((detectedLang) => {
  if (!i18n.language || i18n.language === 'en') {
    i18n.changeLanguage(detectedLang);
  }
});

export default i18n;