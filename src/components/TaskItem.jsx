import React, { useState } from 'react';
import TaskModal from './TaskModal';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      <li className="border-b border-gray-200 last:border-b-0">
        <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <span className={`ml-2 px-2 py-1 text-xs text-white rounded ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <div className="flex flex-wrap gap-2">
                {task.dueDate && (
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
                {task.assignee && (
                  <p className="text-sm text-gray-500">
                    Assignee: {task.assignee}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleViewDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                View
              </button>
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
      
      {showModal && (
        <TaskModal task={task} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default TaskItem;