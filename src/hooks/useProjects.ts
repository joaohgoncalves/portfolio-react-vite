import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { fetchProjects } from '@/services/projects';

/**
 * Custom hook para carregar e gerenciar projetos.
 * Separa lógica de data-fetching de componentes.
 * Permite reuso e testes isolados.
 */

export function useProjects() {
  const {
    projects,
    filteredProjects,
    filters,
    setProjects,
    updateFilter,
    toggleTag,
    clearFilters,
  } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [setProjects]);

  return {
    projects,
    filteredProjects,
    filters,
    isLoading,
    error,
    updateFilter,
    toggleTag,
    clearFilters,
  };
}
