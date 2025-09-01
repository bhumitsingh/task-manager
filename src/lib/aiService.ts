// aiService.ts
import { Task } from './types';

// Mock implementation of AI task generation
// In a real application, this would call the Gemini API
export const generateTasksFromPrompt = async (prompt: string): Promise<Omit<Task, 'id' | 'projectId' | 'assignee' | 'status' | 'createdAt' | 'updatedAt'>[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response based on the prompt
  if (prompt.toLowerCase().includes('marketing campaign')) {
    return [
      {
        title: 'Define target audience',
        description: 'Research and document the primary and secondary target demographics for the campaign.'
      },
      {
        title: 'Create campaign messaging',
        description: 'Develop key messages and value propositions that resonate with the target audience.'
      },
      {
        title: 'Design campaign visuals',
        description: 'Create visual assets including logos, banners, and social media graphics.'
      },
      {
        title: 'Select marketing channels',
        description: 'Choose the most effective channels to reach the target audience (e.g., social media, email, paid ads).'
      },
      {
        title: 'Set campaign budget',
        description: 'Allocate budget across different channels and activities.'
      },
      {
        title: 'Create content calendar',
        description: 'Plan and schedule content publication across all selected channels.'
      },
      {
        title: 'Launch campaign',
        description: 'Execute the campaign according to the content calendar.'
      },
      {
        title: 'Monitor campaign performance',
        description: 'Track key metrics and adjust strategy as needed.'
      }
    ];
  }
  
  // Default mock tasks if prompt doesn't match specific cases
  return [
    {
      title: 'Research',
      description: 'Conduct research related to: ' + prompt
    },
    {
      title: 'Planning',
      description: 'Create a plan for: ' + prompt
    },
    {
      title: 'Execution',
      description: 'Execute the plan for: ' + prompt
    },
    {
      title: 'Review',
      description: 'Review the results of: ' + prompt
    }
  ];
};