import { create } from 'zustand';
import type { Project } from '@/types';

interface ProjectFilters {
  search: string;
  tags: string[];
  year?: string;
}

interface ProjectStore {
  projects: Project[];
  filters: ProjectFilters;
  filteredProjects: Project[];

  setProjects: (projects: Project[]) => void;
  updateFilter: (key: keyof ProjectFilters, value: any) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  filters: {
    search: '',
    tags: [],
    year: undefined,
  },
  filteredProjects: [],

  setProjects: (projects) => {
    set((state) => ({
      projects,
      filteredProjects: filterProjects(projects, state.filters),
    }));
  },

  updateFilter: (key, value) => {
    set((state) => {
      const newFilters = { ...state.filters, [key]: value };
      return {
        filters: newFilters,
        filteredProjects: filterProjects(state.projects, newFilters),
      };
    });
  },

  toggleTag: (tag) => {
    set((state) => {
      const newTags = state.filters.tags.includes(tag)
        ? state.filters.tags.filter((t) => t !== tag)
        : [...state.filters.tags, tag];

      const newFilters = { ...state.filters, tags: newTags };
      return {
        filters: newFilters,
        filteredProjects: filterProjects(state.projects, newFilters),
      };
    });
  },

  clearFilters: () => {
    set((state) => {
      const newFilters = { search: '', tags: [], year: undefined };
      return {
        filters: newFilters,
        filteredProjects: filterProjects(state.projects, newFilters),
      };
    });
  },
}));

function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter((project) => {
    const matchSearch =
      !filters.search ||
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchTags =
      filters.tags.length === 0 || filters.tags.some((tag) => project.tags.includes(tag));

    const matchYear = !filters.year || project.year === filters.year;

    return matchSearch && matchTags && matchYear;
  });
}
