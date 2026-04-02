import { useMemo } from 'react';
import { PROJECTS } from '@/data/projects';

export const useProjects = () => {
  return useMemo(() => PROJECTS, []);
};
