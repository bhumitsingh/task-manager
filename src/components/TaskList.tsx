// src/components/TaskList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { getTasks } from '@/lib/taskService';
import TaskItem from '@/components/TaskItem';
import { toast } from 'sonner';

interface TaskListProps {
  projectId?: string;
}

export default function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(projectId);
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
        toast(
          "Error",
          "Failed to fetch tasks. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  if (loading) return <div className="flex justify-center items-center h-32">Loading tasks...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tasks</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">No tasks found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskUpdate={handleTaskUpdate} 
            />
          ))}
        </div>
      )}
    </div>
  );
}