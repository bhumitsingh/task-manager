import React, { useState, useEffect } from 'react';
import TaskManager from './components/TaskManager';
import ProjectManager from './components/ProjectManager';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [activeView, setActiveView] = useState('tasks'); // 'tasks' or 'projects'
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client side
    setIsClient(true);
    console.log('App component mounted on client');
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-center">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeView === 'tasks'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveView('tasks')}
              >
                Task Manager
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  activeView === 'projects'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveView('projects')}
              >
                Project Manager
              </button>
            </div>
          </div>
        </div>
        
        {activeView === 'tasks' ? <TaskManager /> : <ProjectManager />}
      </div>
    </ErrorBoundary>
  );
};

export default App;