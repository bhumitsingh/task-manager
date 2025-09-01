// src/app/create-project/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/lib/projectService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import AITaskGenerator from '@/components/AITaskGenerator';
import { createTask } from '@/lib/taskService';
import { Task } from '@/lib/types';

export default function CreateProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast(
        "Validation Error",
        "Project name is required."
      );
      return;
    }

    setIsCreating(true);
    try {
      const project = await createProject({ name, description });
      
      // Create tasks if any were generated
      if (generatedTasks.length > 0) {
        const taskPromises = generatedTasks.map(task => 
          createTask({
            projectId: project.id,
            title: task.title,
            description: task.description,
            status: 'todo',
            assignee: null
          })
        );
        await Promise.all(taskPromises);
      }
      
      router.push('/projects');
      toast(
        "Success",
        "Project created successfully."
      );
    } catch (err) {
      console.error('Failed to create project:', err);
      toast(
        "Error",
        "Failed to create project. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleTasksGenerated = (tasks: Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]) => {
    setGeneratedTasks(tasks);
  };

  const handleRemoveTask = (index: number) => {
    setGeneratedTasks(generatedTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
          />
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">AI Task Generation</h2>
          <AITaskGenerator onTasksGenerated={handleTasksGenerated} />
          
          {generatedTasks.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Generated Tasks ({generatedTasks.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {generatedTasks.map((task, index) => (
                  <div key={index} className="flex justify-between items-start p-2 border rounded">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveTask(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => router.push('/projects')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
}