export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  imageUrl: string;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}