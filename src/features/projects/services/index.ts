// placeholder for project service layer
export const getProjectById = async (id: string) => {
  const projects = (await import('@/data/projects')).PROJECTS;
  return projects.find((project) => project.id === id);
};
