import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {tasks.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No tasks found. Add a new task to get started!
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;