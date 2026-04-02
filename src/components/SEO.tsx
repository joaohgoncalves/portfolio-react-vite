import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  author?: string;
}

const SEO: React.FC<Props> = ({
  title = 'João Gonçalves | Desenvolvedor Full Stack – React, Node.js e Performance Digital',
  description = 'Desenvolvedor Full Stack especializado em interfaces modernas, performance digital e soluções web escaláveis. Criando experiências digitais com React, Node.js e Vite onde movimento, tecnologia e usabilidade se encontram.',
  keywords = 'Full Stack Developer, React Developer, Node.js Developer, Frontend Development, Web Performance, UI/UX Design, Development Portfolio, São Paulo',
  url = 'https://joaogoncalvesdev.vercel.app',
  image = 'https://joaogoncalvesdev.vercel.app/og-image.png',
  author = 'João Henrique Gonçalves',
}) => {
  // JSON-LD Schema for Person/WebSite
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author,
    url: url,
    image: image,
    jobTitle: 'Full Stack Developer',
    description: description,
    email: 'joaohenriquegon2009@gmail.com',
    sameAs: [
      'https://github.com/joaohgoncalves',
      'https://linkedin.com/in/joaohgoncalves',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    areaOfExpertise: ['React', 'Node.js', 'TypeScript', 'Performance Optimization', 'UI/UX Design'],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="João Gonçalves Portfolio" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@joaohgoncalves" />

      {/* Additional Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#000000" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
