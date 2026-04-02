import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'technical' | 'professional' | 'process';
}

const faqData: FAQItem[] = [
  {
    id: 'react-performance',
    question: 'Como você otimiza a performance em aplicações React?',
    answer:
      'Utilizo técnicas como code splitting, lazy loading, memoização de componentes com React.memo(), useCallback e useMemo para evitar re-renders desnecessários. Também implemento virtual scrolling para listas grandes e otimizo bundle size com tree-shaking e dynamic imports. Monitoro métricas com Web Vitals (LCP, FID, CLS).',
    category: 'technical',
  },
  {
    id: 'state-management',
    question: 'Qual é sua abordagem para state management complexo?',
    answer:
      'Prefiro Zustand por sua simplicidade e zero boilerplate, mas também trabalho com Redux e Context API conforme necessário. A chave é separar estado global de local, usar normalized stores, e implementar seletores para otimizar re-renders. Evito lifting state desnecessário.',
    category: 'technical',
  },
  {
    id: 'typescript-benefits',
    question: 'Por que usar TypeScript em todo o projeto?',
    answer:
      'TypeScript reduz bugs em produção, melhora a documentação do código, oferece refactoring seguro e proporciona autocomplete robusto. Em projetos escaláveis, a segurança de tipos se paga rapidamente. Uso strict mode para máxima confiabilidade.',
    category: 'technical',
  },
  {
    id: 'design-system',
    question: 'Como você aborda design systems e componentes reutilizáveis?',
    answer:
      'Criei uma arquitetura baseada em features onde componentes dumb são isolados em components/, e lógica complexa fica em hooks customizados. Cada feature é independente e pode ser copiada inteira para outro projeto. Uso Tailwind para design tokens consistentes.',
    category: 'process',
  },
  {
    id: 'testing-strategy',
    question: 'Qual é sua estratégia de testes?',
    answer:
      'Implemento testes em camadas: unit tests para funções puras e lógica de store, integration tests para hooks + service + store, e E2E tests para fluxos críticos com Cypress. Alvo de cobertura é >80% para código crítico. Uso Vitest + React Testing Library.',
    category: 'technical',
  },
  {
    id: 'api-integration',
    question: 'Como você estrutura integração com APIs externas?',
    answer:
      'Uso uma camada de serviços isolada que abstrai API calls. Isso permite trocar de fonte de dados (REST, GraphQL, etc) sem afetar componentes. Implemento retry logic, error handling robusto, e cache quando apropriado. APIs são tipadas com TypeScript.',
    category: 'process',
  },
  {
    id: 'responsive-design',
    question: 'Como você garante responsive design de qualidade?',
    answer:
      'Uso mobile-first approach com Tailwind breakpoints. Testo em múltiplos devices, valido com ferramentas como Lighthouse e DevTools. Implemento imagens responsivas com srcset, lazy loading, e otimizo performance mobile agressivamente.',
    category: 'technical',
  },
  {
    id: 'accessibility',
    question: 'Qual é sua abordagem para acessibilidade (a11y)?',
    answer:
      'Sigo WCAG 2.1 AA. Implemento semantic HTML, ARIA labels quando necessário, suporto navegação por teclado, garantir contraste suficiente, e uso alt text descritivo em imagens. Testo com ferramentas como axe DevTools e screen readers reais.',
    category: 'process',
  },
  {
    id: 'collaboration',
    question: 'Como você trabalha em equipe e comunica progresso?',
    answer:
      'Uso Git Flow para versionamento, PRs com reviewers, e commits atômicos com mensagens semânticas. Documento decisões de arquitetura em ARCHITECTURE.md, faço daily standups, e comunico bloqueadores rapidamente. Valoro feedback e iteração contínua.',
    category: 'professional',
  },
  {
    id: 'learning',
    question: 'Como você mantém skills atualizados com o ecossistema React?',
    answer:
      'Acompanho RFCs da React, leio blogs de expert developers, contribuo em open source, e experimento com novas ferramentas em projetos paralelos. Mantenho curiosidade ativa sobre Vite, Web Components, e padrões emergentes. Faço code reviews com peers.',
    category: 'professional',
  },
  {
    id: 'seo-performance',
    question: 'Como você otimiza SEO e Core Web Vitals?',
    answer:
      'Implemento Server-Side Rendering (SSR) / Static Generation quando necessário para SEO. Otimizo imagens com formatos modernos (WebP), implemento lazy loading, minimizo JavaScript crítico, e monitoro Core Web Vitals (LCP, FID, CLS). Uso schema markup JSON-LD para rich snippets.',
    category: 'technical',
  },
  {
    id: 'portfolio-approach',
    question: 'Por que seu portfólio demonstra arquitetura profissional?',
    answer:
      'Meu portfólio não é apenas um showcase de projetos, é uma demonstração prática de boas práticas: git flow com versionamento, arquitetura em camadas (app/features/services/hooks), estado management com Zustand, testes automatizados, documentação técnica, e performance otimizada. Cada decisão tem propósito educacional.',
    category: 'professional',
  },
];

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  // JSON-LD Schema for FAQ
  const faqs = faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs,
  };

  const toggleExpanded = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section id="faq" className="relative bg-brand-dark border-t border-white/5 py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-6 md:mb-8">
              Perguntas Frequentes
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Dúvidas técnicas, processuais ou profissionais? Aqui estão respostas sobre minha
              abordagem, tecnologias e como trabalho.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
            {(['technical', 'process', 'professional'] as const).map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-brand-accent transition-colors text-sm uppercase tracking-wider font-medium"
              >
                {category === 'technical' && 'Técnico'}
                {category === 'process' && 'Processo'}
                {category === 'professional' && 'Profissional'}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl space-y-4">
            {faqData.map((item) => (
              <motion.div
                key={item.id}
                className="group border border-white/10 rounded-sm overflow-hidden hover:border-white/20 transition-colors"
                initial={false}
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-white/2 hover:bg-white/5 transition-colors"
                  aria-expanded={expanded === item.id}
                >
                  <span className="text-left text-base md:text-lg font-medium text-white group-hover:text-brand-accent transition-colors">
                    {item.question}
                  </span>
                  <motion.div
                    initial={false}
                    animate={{ rotate: expanded === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown size={20} className="text-brand-accent" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expanded === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 bg-white/2 border-t border-white/10">
                        <p className="text-white/70 leading-relaxed text-base md:text-lg">
                          {item.answer}
                        </p>

                        {/* Category Tag */}
                        <div className="mt-4 flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-wider text-brand-accent font-mono">
                            {item.category === 'technical' && '→ TÉCNICO'}
                            {item.category === 'process' && '→ PROCESSO'}
                            {item.category === 'professional' && '→ PROFISSIONAL'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-24 max-w-3xl pt-16 border-t border-white/10">
            <p className="text-white/60 text-base md:text-lg mb-6">
              Não encontrou resposta para sua dúvida?
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-brand-accent text-brand-dark font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              Fale Comigo
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
