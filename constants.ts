import { Project, Experience, NavItem, SocialLink } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Projetos', href: '#work' },
  { label: 'Sobre', href: '#about' },
  { label: 'Tecnologias', href: '#partners' },
  { label: 'Contato', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modelo-Vapor-Wordpress',
    category: 'Interface E-commerce',
    description:
      'O site foi desenvolvido com foco em usabilidade e eficiência, priorizando uma navegação simples, objetiva e orientada à tarefa principal do usuário.',
    year: '2025',
    imageUrl:
      'https://github.com/joaohgoncalves/Modelo-Vapor-Wordpress/blob/main/banner.png?raw=true',
    tags: ['Wordpress', 'Elementor'],
    caseUrl: 'https://github.com/joaohgoncalves/Modelo-Vapor-Wordpress'
  },
  {
    id: '2',
    title: 'Website-Juridico',
    category: 'Template Jurídico',
    description:
      'Transformação digital completa para uma marca jurídica de alto padrão, com foco em experiência do usuário, credibilidade institucional e navegação intuitiva, alinhando sofisticação visual à eficiência funcional.',
    year: '2025',
    imageUrl: 'https://github.com/joaohgoncalves/Website-Juridico-Template-WordPress-com-Elementor/blob/main/banner.png?raw=true',
    tags: ['Wordpress', 'Elementor'],
    caseUrl: 'https://exemplo.com/aero-brand'
  },
  {
    id: '3',
    title: 'Landing page',
    category: 'Sistema de Portfólio',
    description:
      'Um portfólio minimalista e brutalista para um programador.',
    year: '2026',
    imageUrl: 'https://github.com/joaohgoncalves/portfolio-react-vite/blob/main/banner.png?raw=true',
    tags: ['TypeScript', 'JavaScript', 'React', 'Vite'],
    caseUrl: 'https://github.com/joaohgoncalves/portfolio-react-vite'
  }
];


export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    role: 'Estagio',
    company: 'TRP Imports',
    period: '2025 — Atual',
    description: 'Atuo também no suporte e evolução de sistemas ERP e e-commerces, auxiliando na integração, manutenção e otimização de fluxos operacionais e interfaces. Possuo experiência no desenvolvimento e customização de temas para a Nuvemshop, com foco em performance, usabilidade, SEO e conversão.'
  }
  
];

export const SOCIALS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jo%C3%A3o-gon%C3%A7alves-27a5ba347/', label: 'linkedin.com/in/joao-henrique' },
  { platform: 'GitHub', url: 'https://github.com/joaohgoncalves', label: 'github.com/joao-henrique' },
];