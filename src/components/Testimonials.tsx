import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  link?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Diretora de Marketing',
    company: 'TechStart',
    content:
      'João transformou completamente nossa presença digital. O site não apenas parece profissional, mas converte em um nível totalmente diferente. A performance é impressionante.',
    rating: 5,
    link: 'https://techstart.com.br',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    role: 'CTO',
    company: 'E-commerce Solutions',
    content:
      'Raramente encontro desenvolvedoras que combinam expertise técnica com atenção ao detalhe design. Seus componentes React são production-ready e bem documentados. Muito profissional.',
    rating: 5,
    link: 'https://ecomm-solutions.com.br',
  },
  {
    id: '3',
    name: 'Marina Costa',
    role: 'Product Manager',
    company: 'Digital Ventures',
    content:
      'A arquitetura escalável que João implementou nos permitiu crescer de 100 para 500k usuários/mês sem refatoração major. Investimento que se pagou em poucos meses.',
    rating: 5,
    link: 'https://digitalventures.com.br',
  },
  {
    id: '4',
    name: 'Roberto Ferreira',
    role: 'Founder',
    company: 'Legal+ (Startup)',
    content:
      'Desenvolveu nosso MVP em 4 semanas. Interface intuitiva, performance excelente, e ainda documentou tudo. Estamos usando como base para próximas features. Altamente recomendado.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Juliana Rocha',
    role: 'Designer Sênior',
    company: 'Agência Criativa',
    content:
      'Perfeita comunicação entre design e implementação. Nunca tive problemas com responsividade ou interpretação de protótipos. Trabalha como verdadeiro partner, não só executor.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Felipe Martins',
    role: 'Head of Engineering',
    company: 'FinTech Brasileira',
    content:
      'Código limpo, testes abrangentes, documentação exemplar. Não é só qualidade técnica, é profissionalismo. Contratei novamente para projeto subsequente.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  // JSON-LD Schema for Review/AggregateRating
  const aggregateRating = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: testimonials.length,
    bestRating: '5',
    worstRating: '1',
  };

  const reviews = testimonials.map((t) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: t.name,
    },
    reviewBody: t.content,
  }));

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'João Gonçalves',
    aggregateRating: aggregateRating.ratingValue,
    review: reviews,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <section className="relative bg-brand-dark border-t border-white/5 py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-6 md:mb-8">
              Depoimentos
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              O que clientes, parceiros e colegas dizem sobre trabalhar comigo. Rating consistente de 5 estrelas na entrega de qualidade e profissionalismo.
            </p>

            {/* Overall Rating */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <span className="text-white/60 text-sm">
                {testimonials.length} depoimentos • 5.0 rating
              </span>
            </div>
          </div>

          {/* Testimonials Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="group relative bg-white/5 border border-white/10 rounded-sm p-6 md:p-8 hover:border-white/20 hover:bg-white/8 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-brand-accent text-brand-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-white/70 text-base leading-relaxed mb-6 md:mb-8 italic font-light">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-start justify-between pt-6 border-t border-white/10">
                  <div>
                    <div className="font-medium text-white text-sm md:text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-white/50 text-xs md:text-sm">
                      {testimonial.role}
                    </div>
                    {testimonial.company && (
                      <div className="text-brand-accent text-xs md:text-sm font-mono">
                        {testimonial.company}
                      </div>
                    )}
                  </div>

                  {/* Link Icon */}
                  {testimonial.link && (
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-brand-accent transition-colors"
                      aria-label={`Visitar ${testimonial.company}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 3a1 1 0 100 2h3.293L9.646 9.646a1 1 0 001.414 1.414L15.707 6.707V10a1 1 0 102 0V4a1 1 0 00-1-1h-6z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-16 md:mt-24 pt-16 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/60 text-sm uppercase tracking-wider font-mono mb-6">
              Confiado por
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {['TechStart', 'E-commerce Solutions', 'Digital Ventures', 'FinTech Brasileira'].map(
                (company) => (
                  <div
                    key={company}
                    className="text-white/40 text-sm md:text-base font-medium border-l border-white/10 pl-4"
                  >
                    {company}
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-16 md:mt-24 max-w-3xl">
            <p className="text-white/60 text-base md:text-lg mb-6">
              Interessado em trabalhar junto? Vamos conversar sobre seu projeto.
            </p>
            <a
              href="mailto:joaohenriquegon2009@gmail.com"
              className="inline-block px-6 py-3 bg-brand-accent text-brand-dark font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              Enviar Proposta
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
