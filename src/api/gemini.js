// Gemini API implementation for task generation
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

/**
 * Generate tasks based on a prompt using the Gemini API
 * @param {string} prompt - The prompt to generate tasks from
 * @returns {Promise<Array>} - Array of generated tasks
 */
export const generateTasksWithAI = async (prompt) => {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a list of tasks based on the following prompt: "${prompt}". 
            Respond with a JSON array of task objects. Each task should have:
            - title: A concise title (string)
            - description: A detailed description (string)
            - priority: Either "low", "medium", or "high" (string)
            - dueDate: A date in YYYY-MM-DD format or null if no date (string or null)
            - assignee: A suggested assignee name or "Unassigned" if none (string)
            
            Example format:
            [
              {
                "title": "Research target audience",
                "description": "Conduct market research to identify our target audience demographics and preferences",
                "priority": "medium",
                "dueDate": "2023-06-15",
                "assignee": "Marketing Team"
              }
            ]
            
            Please generate 3-5 tasks for the prompt: "${prompt}"`
          }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the JSON response from the AI
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    let tasks;
    try {
      tasks = JSON.parse(textResponse);
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from markdown code blocks
      const jsonMatch = textResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        tasks = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }
    
    // Validate and format tasks
    return tasks.map(task => ({
      title: task.title || 'Untitled Task',
      description: task.description || '',
      priority: ['low', 'medium', 'high'].includes(task.priority) ? task.priority : 'medium',
      dueDate: task.dueDate || null,
      assignee: task.assignee || 'Unassigned'
    }));
  } catch (error) {
    console.error('Error generating tasks with AI:', error);
    throw error;
  }
};