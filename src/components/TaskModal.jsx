import React from 'react';

const TaskModal = ({ task, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          
          <div className="mb-4">
            <span className={`px-2 py-1 text-sm text-white rounded ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700">{task.description || 'No description provided.'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {task.dueDate && (
              <div>
                <h3 className="font-semibold">Due Date</h3>
                <p className="text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            )}
            
            {task.assignee && (
              <div>
                <h3 className="font-semibold">Assignee</h3>
                <p className="text-gray-700">{task.assignee}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;