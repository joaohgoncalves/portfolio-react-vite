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
      // Países de língua portuguesa
      'BR': 'pt', // Brasil
      'PT': 'pt', // Portugal
      'AO': 'pt', // Angola
      'MZ': 'pt', // Moçambique
      'CV': 'pt', // Cabo Verde
      'GW': 'pt', // Guiné-Bissau
      'ST': 'pt', // São Tomé e Príncipe
      'TL': 'pt', // Timor-Leste

      // Países de língua inglesa
      'US': 'en', // Estados Unidos
      'GB': 'en', // Reino Unido
      'CA': 'en', // Canadá
      'AU': 'en', // Austrália
      'IE': 'en', // Irlanda
      'NZ': 'en', // Nova Zelândia
      'ZA': 'en', // África do Sul
      'IN': 'en', // Índia
      'SG': 'en', // Singapura
      'MY': 'en', // Malásia
      'PH': 'en', // Filipinas
      'HK': 'en', // Hong Kong
      'RU': 'en', // Rússia (inglês como fallback)
      'DE': 'en', // Alemanha
      'FR': 'en', // França
      'ES': 'en', // Espanha
      'IT': 'en', // Itália
      'NL': 'en', // Holanda
      'BE': 'en', // Bélgica
      'CH': 'en', // Suíça
      'AT': 'en', // Áustria
      'SE': 'en', // Suécia
      'NO': 'en', // Noruega
      'DK': 'en', // Dinamarca
      'FI': 'en', // Finlândia
      'PL': 'en', // Polônia
      'CZ': 'en', // República Tcheca
      'HU': 'en', // Hungria
      'RO': 'en', // Romênia
      'BG': 'en', // Bulgária
      'GR': 'en', // Grécia
      'TR': 'en', // Turquia
      'JP': 'en', // Japão
      'KR': 'en', // Coreia do Sul
      'CN': 'en', // China
      'TW': 'en', // Taiwan
      'TH': 'en', // Tailândia
      'VN': 'en', // Vietnã
      'ID': 'en', // Indonésia
      'MX': 'en', // México
      'AR': 'en', // Argentina
      'CL': 'en', // Chile
      'CO': 'en', // Colômbia
      'PE': 'en', // Peru
      'VE': 'en', // Venezuela
      'UY': 'en', // Uruguai
      'PY': 'en', // Paraguai
      'BO': 'en', // Bolívia
      'EC': 'en', // Equador
    };

    return countryToLanguage[country] || 'en';
  } catch (error) {
    // Fallback para inglês em caso de erro
    console.warn('Erro na detecção de idioma por IP, usando fallback para inglês:', error);
    return 'en';
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