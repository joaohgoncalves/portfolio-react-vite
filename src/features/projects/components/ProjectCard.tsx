import React from 'react';
import type { Project } from './../../../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="p-4 border rounded">
    <h3>{project.title}</h3>
    <p>{project.description}</p>
  </div>
);

export default ProjectCard;
