import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const SEO: React.FC<Props> = ({
  title = 'João Henrique Gonçalves — Frontend Developer',
  description = 'Portfolio profissional focado em high-performance, UI/UX e React + Vite.',
  url = 'https://joaogoncalvesdev.vercel.app',
  image = 'https://joaogoncalvesdev.vercel.app/banner.png',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);

export default SEO;
