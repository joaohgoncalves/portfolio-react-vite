import type { NavItem, SocialLink } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'navigation.projects', href: '#work' },
  { label: 'navigation.about', href: '#about' },
  { label: 'navigation.technologies', href: '#partners' },
  { label: 'navigation.contact', href: '#contact' },
];

export const SOCIALS: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jo%C3%A3o-gon%C3%A7alves-27a5ba347/',
    label: 'linkedin.com/in/joao-henrique',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/joaohgoncalves',
    label: 'github.com/joao-henrique',
  },
];
