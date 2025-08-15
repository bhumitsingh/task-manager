import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const TaskDistribution = ({ tasks, projectId }) => {
  const { updateTask } = useTasks(projectId);
  const [collaborators, setCollaborators] = useState('');
  const [isDistributing, setIsDistributing] = useState(false);
  const [distributionResult, setDistributionResult] = useState(null);

  const handleDistributeTasks = async () => {
    if (!collaborators.trim()) {
      setDistributionResult({
        success: false,
        message: 'Please enter at least one collaborator name.'
      });
      return;
    }

    if (tasks.length === 0) {
      setDistributionResult({
        success: false,
        message: 'No tasks available for distribution.'
      });
      return;
    }

    setIsDistributing(true);
    setDistributionResult(null);

    try {
      const collaboratorList = collaborators
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);

      if (collaboratorList.length === 0) {
        throw new Error('No valid collaborators found.');
      }

      // Distribute tasks using round-robin algorithm
      let collaboratorIndex = 0;
      let updateCount = 0;

      for (const task of tasks) {
        if (!task.assignee || task.assignee === 'Unassigned') {
          const assignee = collaboratorList[colaboratorIndex];
          await updateTask(task.id, { assignee });
          updateCount++;
          
          // Move to next collaborator (round-robin)
          collaboratorIndex = (collaboratorIndex + 1) % collaboratorList.length;
        }
      }

      setDistributionResult({
        success: true,
        message: `Successfully distributed ${updateCount} tasks among ${collaboratorList.length} collaborators.`
      });
      
      // Clear the input
      setCollaborators('');
    } catch (error) {
      console.error('Error distributing tasks:', error);
      setDistributionResult({
        success: false,
        message: `Error distributing tasks: ${error.message}`
      });
    } finally {
      setIsDistributing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Distribute Tasks</h2>
      <div className="flex">
        <input
          type="text"
          value={collaborators}
          onChange={(e) => setCollaborators(e.target.value)}
          placeholder="Enter collaborator names (comma separated)"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isDistributing}
        />
        <button
          onClick={handleDistributeTasks}
          className="ml-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          disabled={isDistributing}
        >
          {isDistributing ? 'Distributing...' : 'Distribute Tasks'}
        </button>
      </div>
      {distributionResult && (
        <div className={`mt-4 p-3 rounded ${distributionResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {distributionResult.message}
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        <p>Enter names of collaborators separated by commas. Unassigned tasks will be distributed among them using a round-robin approach.</p>
      </div>
    </div>
  );
};

export default TaskDistribution;