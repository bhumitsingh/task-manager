// src/app/projects/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/lib/types';
import { getTasks, createTask } from '@/lib/taskService';
import TaskItem from '@/components/TaskItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import AITaskGenerator from '@/components/AITaskGenerator';
import TaskImport from '@/components/TaskImport';
import TaskAssignment from '@/components/TaskAssignment';

export default function ProjectTasksPage({ params }: { params: { id: string } }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(params.id);
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        toast(
          "Error",
          "Failed to fetch tasks. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [params.id]);

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      toast(
        "Validation Error",
        "Task title is required."
      );
      return;
    }

    setIsCreating(true);
    try {
      const task = await createTask({
        projectId: params.id,
        title: newTask.title,
        description: newTask.description,
        assignee: newTask.assignee || null,
        status: 'todo'
      });

      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', assignee: '' });
      setIsDialogOpen(false);
      toast(
        "Success",
        "Task created successfully."
      );
    } catch (error) {
      console.error('Failed to create task:', error);
      toast(
        "Error",
        "Failed to create task. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    router.push('/projects');
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTasksGenerated = async (generatedTasks: Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]) => {
    try {
      const taskPromises = generatedTasks.map(task => 
        createTask({
          projectId: params.id,
          title: task.title,
          description: task.description,
          status: 'todo',
          assignee: null
        })
      );
      const createdTasks = await Promise.all(taskPromises);
      setTasks([...tasks, ...createdTasks]);
      toast(
        "Success",
        `Created ${createdTasks.length} tasks from AI generation.`
      );
    } catch (error) {
      console.error('Failed to create tasks from AI generation:', error);
      toast(
        "Error",
        "Failed to create tasks from AI generation. Please try again."
      );
    }
  };

  const handleTasksImported = async (importedTasks: Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]) => {
    try {
      const taskPromises = importedTasks.map(task => 
        createTask({
          projectId: params.id,
          title: task.title,
          description: task.description,
          status: 'todo',
          assignee: null
        })
      );
      const createdTasks = await Promise.all(taskPromises);
      setTasks([...tasks, ...createdTasks]);
      toast(
        "Success",
        `Imported ${createdTasks.length} tasks.`
      );
    } catch (error) {
      console.error('Failed to import tasks:', error);
      toast(
        "Error",
        "Failed to import tasks. Please try again."
      );
    }
  };

  const handleTasksAssigned = async () => {
    // Refresh tasks to show updated assignees
    try {
      const data = await getTasks(params.id);
      setTasks(data);
      setSelectedTasks([]);
      toast(
        "Success",
        "Tasks assigned successfully."
      );
    } catch (err) {
      console.error('Failed to refresh tasks:', err);
      toast(
        "Error",
        "Failed to refresh tasks. Please try again."
      );
    }
  };

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  if (loading) return <div className="flex justify-center items-center h-32">Loading tasks...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Tasks</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleBack}>
            Back to Projects
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to this project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task description"
                  />
                </div>
                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input
                    id="assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    placeholder="Assignee (optional)"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Task'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tasks</h2>
            
            {tasks.length === 0 ? (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No tasks found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3"
                      checked={selectedTasks.includes(task.id)}
                      onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                    />
                    <TaskItem 
                      task={task} 
                      onTaskUpdate={handleTaskUpdate} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">AI Task Generation</h2>
            <AITaskGenerator onTasksGenerated={handleTasksGenerated} />
          </div>
          
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Task Import</h2>
            <TaskImport onTasksImported={handleTasksImported} />
          </div>
          
          {selectedTasks.length > 0 && (
            <TaskAssignment 
              selectedTasks={selectedTasks} 
              onTasksAssigned={handleTasksAssigned} 
            />
          )}
        </div>
      </div>
    </div>
  );
}