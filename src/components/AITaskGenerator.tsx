// src/components/AITaskGenerator.tsx
'use client';

import { useState } from 'react';
import { generateTasksFromPrompt } from '@/lib/aiService';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AITaskGeneratorProps {
  onTasksGenerated: (tasks: Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]) => void;
}

export default function AITaskGenerator({ onTasksGenerated }: AITaskGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTasks = async () => {
    if (!prompt.trim()) {
      toast(
        "Validation Error",
        "Please enter a prompt for task generation."
      );
      return;
    }

    setIsGenerating(true);
    try {
      const tasks = await generateTasksFromPrompt(prompt);
      onTasksGenerated(tasks);
      toast(
        "Success",
        `Generated ${tasks.length} tasks.`
      );
    } catch (error) {
      console.error('Failed to generate tasks:', error);
      toast(
        "Error",
        "Failed to generate tasks. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ai-prompt">AI Task Generator</Label>
        <Textarea
          id="ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a high-level task description (e.g., 'Plan a marketing campaign')"
          className="mt-1"
        />
      </div>
      <Button onClick={handleGenerateTasks} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Tasks'}
      </Button>
    </div>
  );
}