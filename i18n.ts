import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';

// Função para detectar idioma baseado no IP (será chamada depois da inicialização)
const detectLanguageFromIP = async (): Promise<string> => {
  try {
    // Para desenvolvimento local, vamos simular baseado na URL ou usar uma lógica simples
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Simulação: se a URL contiver ?lang=en, força inglês
      const urlParams = new URLSearchParams(window.location.search);
      const forcedLang = urlParams.get('lang');
      if (forcedLang) {
        return forcedLang;
      }

      // Para simular usuário dos EUA no desenvolvimento
      return 'en';
    }

    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

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
    // Fallback para português
    return 'pt';
  }
};

// Inicializar i18next sem detector automático
i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    lng: 'en', // Começar com inglês (simulando EUA)
    fallbackLng: 'en',
    debug: false, // Desabilitar debug em produção

    interpolation: {
      escapeValue: false,
    },
  });

// Detectar idioma por IP e mudar se necessário
detectLanguageFromIP().then((detectedLang) => {
  if (detectedLang !== i18n.language) {
    i18n.changeLanguage(detectedLang);
  }
}).catch((error) => {
  console.error('Erro na detecção de idioma:', error);
});

export default i18n;