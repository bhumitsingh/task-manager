// src/components/TaskItem.tsx
'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { updateTask } from '@/lib/taskService';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TaskItemProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
}

export default function TaskItem({ task, onTaskUpdate }: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(task.status === 'done');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCheckboxChange = async (checked: boolean) => {
    setIsUpdating(true);
    try {
      const updatedTask = await updateTask(task.id, {
        status: checked ? 'done' : 'todo'
      });
      setIsChecked(checked);
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
      toast(
        "Error",
        "Failed to update task. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-200';
      case 'in-progress':
        return 'bg-yellow-200';
      case 'done':
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent">
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        disabled={isUpdating}
      />
      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">
          {task.description}
        </p>
        
        {task.assignee && (
          <p className="text-xs text-muted-foreground mt-2">
            Assignee: {task.assignee}
          </p>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto mt-2 text-xs">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium">Description</h4>
                    <p className="text-muted-foreground">{task.description}</p>
                  </div>
                  
                  {task.assignee && (
                    <div>
                      <h4 className="font-medium">Assignee</h4>
                      <p className="text-muted-foreground">{task.assignee}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Status</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Created</h4>
                      <p className="text-muted-foreground text-xs">
                        {task.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}