import React from 'react';

const ProjectItem = ({ project, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(project);
  };

  const handleDelete = () => {
    onDelete(project.id);
  };

  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProjectItem;