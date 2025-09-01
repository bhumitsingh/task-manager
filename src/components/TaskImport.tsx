// src/components/TaskImport.tsx
'use client';

import { useState, useRef } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TaskImportProps {
  onTasksImported: (tasks: Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]) => void;
}

export default function TaskImport({ onTasksImported }: TaskImportProps) {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      toast(
        "Invalid File Type",
        "Please upload a JSON file."
      );
      return;
    }

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedTasks = JSON.parse(content);
        
        // Validate the structure of the imported tasks
        if (!Array.isArray(parsedTasks)) {
          throw new Error('Invalid JSON structure. Expected an array of tasks.');
        }
        
        // Validate each task has required properties
        const validTasks = parsedTasks.filter(task => 
          typeof task.title === 'string' && typeof task.description === 'string'
        );
        
        if (validTasks.length === 0) {
          throw new Error('No valid tasks found in the JSON file.');
        }
        
        onTasksImported(validTasks);
        toast(
          "Success",
          `Imported ${validTasks.length} tasks.`
        );
      } catch (error) {
        console.error('Failed to import tasks:', error);
        toast(
          "Error",
          error instanceof Error ? error.message : "Failed to import tasks. Please check the file format."
        );
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
      <Button onClick={handleImportClick} disabled={isImporting}>
        {isImporting ? 'Importing...' : 'Import Tasks from JSON'}
      </Button>
      <p className="text-sm text-muted-foreground">
        Import tasks from a JSON file. The file should contain an array of objects with &quot;title&quot; and &quot;description&quot; properties.
      </p>
    </div>
  );
}