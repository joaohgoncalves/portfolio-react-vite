import { Project, Experience, NavItem, SocialLink } from './types';

import { Project, Experience, NavItem, SocialLink } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'navigation.projects', href: '#work' },
  { label: 'navigation.about', href: '#about' },
  { label: 'navigation.technologies', href: '#partners' },
  { label: 'navigation.contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'work.projects.modeloVapor.title',
    category: 'work.projects.modeloVapor.category',
    description: 'work.projects.modeloVapor.description',
    year: '2025',
    imageUrl:
      'https://github.com/joaohgoncalves/Modelo-Vapor-Wordpress/blob/main/banner.png?raw=true',
    tags: ['Wordpress', 'Elementor'],
    caseUrl: 'https://github.com/joaohgoncalves/Modelo-Vapor-Wordpress'
  },
  {
    id: '2',
    title: 'work.projects.websiteJuridico.title',
    category: 'work.projects.websiteJuridico.category',
    description: 'work.projects.websiteJuridico.description',
    year: '2025',
    imageUrl: 'https://github.com/joaohgoncalves/Website-Juridico-Template-WordPress-com-Elementor/blob/main/banner.png?raw=true',
    tags: ['Wordpress', 'Elementor'],
    caseUrl: 'https://exemplo.com/aero-brand'
  },
  {
    id: '3',
    title: 'work.projects.portfolio.title',
    category: 'work.projects.portfolio.category',
    description: 'work.projects.portfolio.description',
    year: '2026',
    imageUrl: 'https://github.com/joaohgoncalves/portfolio-react-vite/blob/main/banner.png?raw=true',
    tags: ['TypeScript', 'JavaScript', 'React', 'Vite'],
    caseUrl: 'https://github.com/joaohgoncalves/portfolio-react-vite'
  }
];


export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    role: 'experience.role',
    company: 'experience.company',
    period: 'experience.period',
    description: 'experience.description'
  }
  
];

export const SOCIALS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jo%C3%A3o-gon%C3%A7alves-27a5ba347/', label: 'linkedin.com/in/joao-henrique' },
  { platform: 'GitHub', url: 'https://github.com/joaohgoncalves', label: 'github.com/joao-henrique' },
];