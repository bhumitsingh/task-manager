import React from 'react';

const ProjectSelector = ({ projects, selectedProject, onSelect }) => {
  return (
    <div className="mb-6">
      <label htmlFor="project-select" className="block text-gray-700 font-bold mb-2">
        Select Project
      </label>
      <div className="flex">
        <select
          id="project-select"
          value={selectedProject?.id || ''}
          onChange={(e) => {
            const project = projects.find(p => p.id === e.target.value) || null;
            onSelect(project);
          }}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        {!selectedProject && (
          <div className="ml-2 text-red-500 flex items-center">
            Please select a project
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelector;