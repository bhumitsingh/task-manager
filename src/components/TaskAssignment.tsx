// src/components/TaskAssignment.tsx
'use client';

import { useState } from 'react';
import { assignTasks } from '@/lib/taskService';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface TaskAssignmentProps {
  selectedTasks: string[];
  onTasksAssigned: () => void;
}

export default function TaskAssignment({ selectedTasks, onTasksAssigned }: TaskAssignmentProps) {
  const [assignees, setAssignees] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssignTasks = async () => {
    if (selectedTasks.length === 0) {
      toast(
        "No Tasks Selected",
        "Please select at least one task to assign."
      );
      return;
    }

    if (!assignees.trim()) {
      toast(
        "No Assignees",
        "Please enter at least one assignee."
      );
      return;
    }

    const assigneeList = assignees.split(',').map(a => a.trim()).filter(a => a);

    if (assigneeList.length === 0) {
      toast(
        "Invalid Assignees",
        "Please enter valid assignees separated by commas."
      );
      return;
    }

    setIsAssigning(true);
    try {
      await assignTasks(selectedTasks, assigneeList);
      onTasksAssigned();
      toast(
        "Success",
        `Assigned ${selectedTasks.length} tasks to ${assigneeList.length} collaborator(s).`
      );
    } catch (error) {
      console.error('Failed to assign tasks:', error);
      toast(
        "Error",
        "Failed to assign tasks. Please try again."
      );
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Assign Tasks</h3>
      <div>
        <Label htmlFor="assignees">Collaborators</Label>
        <Input
          id="assignees"
          value={assignees}
          onChange={(e) => setAssignees(e.target.value)}
          placeholder="Enter names separated by commas"
        />
      </div>
      <Button onClick={handleAssignTasks} disabled={isAssigning}>
        {isAssigning ? 'Assigning...' : `Assign ${selectedTasks.length} Task(s)`}
      </Button>
    </div>
  );
}