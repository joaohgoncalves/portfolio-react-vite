import { Project, Experience, NavItem, SocialLink } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Projetos', href: '#work' },
  { label: 'Sobre', href: '#about' },
  { label: 'Parceiros', href: '#partners' },
  { label: 'Contato', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Velocity',
    category: 'Interface Fintech',
    description: 'Redesign de dashboard de alta frequência focado em visualização de dados e redução de carga cognitiva. Implementado com WebGL para gráficos em tempo real.',
    year: '2024',
    imageUrl: 'https://picsum.photos/seed/finance/1600/900',
    tags: ['React', 'WebGL', 'D3.js']
  },
  {
    id: '2',
    title: 'Aero Brand',
    category: 'Experiência E-commerce',
    description: 'Transformação digital completa para uma marca de luxo aeroespacial. Venda narrativa orientada por scroll com uso intenso de texturas de vídeo.',
    year: '2023',
    imageUrl: 'https://picsum.photos/seed/aero/1600/900',
    tags: ['Next.js', 'Framer Motion', 'Shopify']
  },
  {
    id: '3',
    title: 'Mono Architecture',
    category: 'Sistema de Portfólio',
    description: 'Um portfólio minimalista e brutalista para um escritório de arquitetura premiado. Foco em imagens grandes e hierarquia tipográfica.',
    year: '2023',
    imageUrl: 'https://picsum.photos/seed/arch/1600/900',
    tags: ['TypeScript', 'Tailwind', 'CMS']
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    role: 'Engenheiro Frontend Sênior',
    company: 'TechFlow Solutions',
    period: '2022 — Atual',
    description: 'Liderando a equipe de design system e implementando arquitetura de micro-frontends para aplicações corporativas escaláveis.'
  },
  {
    id: 'e2',
    role: 'Desenvolvedor Criativo',
    company: 'Studio Kinetic',
    period: '2019 — 2022',
    description: 'Unindo design e engenharia para criar experiências web interativas e premiadas para marcas globais.'
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: 'LinkedIn', url: '#', label: 'linkedin.com/in/joao-henrique' },
  { platform: 'GitHub', url: '#', label: 'github.com/joao-henrique' },
  { platform: 'Twitter', url: '#', label: '@joao_dev' },
];