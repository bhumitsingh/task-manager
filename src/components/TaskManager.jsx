import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ProjectSelector from './ProjectSelector';
import useTasks from '../hooks/useTasks';
import useProjects from '../hooks/useProjects';
import { generateTasksWithAI } from '../api/gemini';
import TaskImport from './TaskImport';
import TaskDistribution from './TaskDistribution';

const TaskManager = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const { tasks, addTask, updateTask, deleteTask } = useTasks(selectedProject?.id);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (taskData) => {
    const taskWithProject = {
      ...taskData,
      projectId: selectedProject?.id
    };
    
    if (currentTask) {
      updateTask(currentTask.id, taskWithProject);
    } else {
      addTask(taskWithProject);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleGenerateTasks = async () => {
    if (!aiPrompt.trim() || !selectedProject) return;
    
    setIsGenerating(true);
    try {
      const generatedTasks = await generateTasksWithAI(aiPrompt);
      // Add generated tasks to the database
      for (const task of generatedTasks) {
        await addTask({
          ...task,
          projectId: selectedProject.id
        });
      }
      setAiPrompt('');
    } catch (error) {
      console.error('Error generating tasks:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter tasks by selected project
  const projectTasks = selectedProject 
    ? tasks.filter(task => task.projectId === selectedProject.id)
    : tasks;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!selectedProject}
        >
          Add Task
        </button>
      </div>

      <ProjectSelector 
        projects={projects} 
        selectedProject={selectedProject} 
        onSelect={handleProjectSelect} 
      />

      {selectedProject && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">AI Task Generation</h2>
            <div className="flex">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Enter a task prompt (e.g., 'Plan a marketing campaign')"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              />
              <button
                onClick={handleGenerateTasks}
                className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                disabled={isGenerating || !aiPrompt.trim()}
              >
                {isGenerating ? 'Generating...' : 'Generate Tasks'}
              </button>
            </div>
          </div>

          <TaskImport projectId={selectedProject.id} />
          <TaskDistribution tasks={projectTasks} projectId={selectedProject.id} />
        </>
      )}

      {showForm ? (
        <TaskForm
          task={currentTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <TaskList tasks={projectTasks} onEdit={handleEditTask} onDelete={deleteTask} />
      )}
    </div>
  );
};

export default TaskManager;