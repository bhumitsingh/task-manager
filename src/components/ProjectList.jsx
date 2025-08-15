import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {projects.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No projects found. Add a new project to get started!
        </div>
      ) : (
        <ul>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;