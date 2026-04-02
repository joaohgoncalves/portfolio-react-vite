import type { Project } from '@/types';

/**
 * Service layer para carregar projetos.
 * Abstracts API/data source logic - pode ser GitHub API, DB, ou static data.
 * Permite mudar source sem afetar componentes.
 */

export async function fetchProjects(): Promise<Project[]> {
  // In production: fetch from GitHub API
  // const response = await fetch(`https://api.github.com/users/joaohgoncalves/repos?type=owner&sort=updated`);
  // return response.json().then(repos => mapGitHubToProject(repos));

  // Mock data com real structure para demo
  return Promise.resolve([
    {
      id: '1',
      title: 'work.projects.modeloVapor.title',
      category: 'E-commerce',
      description: 'work.projects.modeloVapor.description',
      year: '2025',
      imageUrl: 'https://github.com/joaohgoncalves/Modelo-Vapor-Wordpress/blob/main/banner.png?raw=true',
      tags: ['WordPress', 'Elementor', 'PHP'],
      caseUrl: 'https://github.com/joaohgoncalves/Modelo-Vapor-Wordpress',
    },
    {
      id: '2',
      title: 'work.projects.websiteJuridico.title',
      category: 'Legal',
      description: 'work.projects.websiteJuridico.description',
      year: '2025',
      imageUrl: 'https://github.com/joaohgoncalves/Website-Juridico-Template-WordPress-com-Elementor/blob/main/banner.png?raw=true',
      tags: ['WordPress', 'Elementor', 'Design'],
      caseUrl: 'https://exemplo.com',
    },
    {
      id: '3',
      title: 'work.projects.portfolio.title',
      category: 'Portfolio',
      description: 'work.projects.portfolio.description',
      year: '2026',
      imageUrl: 'https://github.com/joaohgoncalves/portfolio-react-vite/blob/main/banner.png?raw=true',
      tags: ['React', 'TypeScript', 'Vite', 'Zustand'],
      caseUrl: 'https://github.com/joaohgoncalves/portfolio-react-vite',
    },
  ]);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await fetchProjects();
  return projects.find((p) => p.id === id) || null;
}
