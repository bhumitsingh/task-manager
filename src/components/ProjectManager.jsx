import React, { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import useProjects from '../hooks/useProjects';

const ProjectManager = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleAddProject = () => {
    setCurrentProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setShowForm(true);
  };

  const handleFormSubmit = (projectData) => {
    if (currentProject) {
      updateProject(currentProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Manager</h1>
        <button
          onClick={handleAddProject}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Project
        </button>
      </div>

      {showForm ? (
        <ProjectForm
          project={currentProject}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ProjectList projects={projects} onEdit={handleEditProject} onDelete={deleteProject} />
      )}
    </div>
  );
};

export default ProjectManager;