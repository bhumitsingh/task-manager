import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const TaskImport = ({ projectId }) => {
  const { addTask } = useTasks(projectId);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const content = await readFileAsText(file);
      const tasks = JSON.parse(content);
      
      if (!Array.isArray(tasks)) {
        throw new Error('Invalid file format. Expected an array of tasks.');
      }

      let successCount = 0;
      let errorCount = 0;

      for (const task of tasks) {
        try {
          await addTask({
            ...task,
            projectId
          });
          successCount++;
        } catch (error) {
          console.error('Error importing task:', error);
          errorCount++;
        }
      }

      setImportResult({
        success: true,
        message: `Imported ${successCount} tasks successfully. ${errorCount} tasks failed.`
      });
    } catch (error) {
      console.error('Error importing tasks:', error);
      setImportResult({
        success: false,
        message: `Error importing tasks: ${error.message}`
      });
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Import Tasks</h2>
      <div className="flex items-center">
        <label className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Choose File
          <input
            type="file"
            accept=".json"
            onChange={handleFileImport}
            className="hidden"
            disabled={isImporting}
          />
        </label>
        {isImporting && (
          <div className="ml-4 text-gray-600">Importing tasks...</div>
        )}
      </div>
      {importResult && (
        <div className={`mt-4 p-3 rounded ${importResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {importResult.message}
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        <p>Import tasks from a JSON file. The file should contain an array of task objects with the following properties:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>title (string, required)</li>
          <li>description (string, optional)</li>
          <li>priority (string: "low", "medium", or "high", optional)</li>
          <li>dueDate (string in YYYY-MM-DD format, optional)</li>
          <li>assignee (string, optional)</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskImport;