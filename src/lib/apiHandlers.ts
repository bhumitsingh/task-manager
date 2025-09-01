// Import necessary modules
import { createProject, getProjects, updateProject, deleteProject } from '@/lib/projectService';
import { createTask, getTasks, updateTask, deleteTask, assignTasks } from '@/lib/taskService';
import { generateTasksFromPrompt } from '@/lib/aiService';
import { Project, Task } from '@/lib/types';

// Project API handlers
export const createProjectHandler = async (req: Request) => {
  try {
    const projectData = await req.json();
    const project = await createProject(projectData);
    return new Response(JSON.stringify(project), { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({ error: 'Failed to create project' }), { status: 500 });
  }
};

export const getProjectsHandler = async () => {
  try {
    const projects = await getProjects();
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), { status: 500 });
  }
};

export const updateProjectHandler = async (req: Request, id: string) => {
  try {
    const projectData = await req.json();
    const project = await updateProject(id, projectData);
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return new Response(JSON.stringify({ error: 'Failed to update project' }), { status: 500 });
  }
};

export const deleteProjectHandler = async (id: string) => {
  try {
    await deleteProject(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete project' }), { status: 500 });
  }
};

// Task API handlers
export const createTaskHandler = async (req: Request) => {
  try {
    const taskData = await req.json();
    const task = await createTask(taskData);
    return new Response(JSON.stringify(task), { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return new Response(JSON.stringify({ error: 'Failed to create task' }), { status: 500 });
  }
};

export const getTasksHandler = async (projectId?: string) => {
  try {
    const tasks = await getTasks(projectId);
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), { status: 500 });
  }
};

export const updateTaskHandler = async (req: Request, id: string) => {
  try {
    const taskData = await req.json();
    const task = await updateTask(id, taskData);
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return new Response(JSON.stringify({ error: 'Failed to update task' }), { status: 500 });
  }
};

export const deleteTaskHandler = async (id: string) => {
  try {
    await deleteTask(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete task' }), { status: 500 });
  }
};

// AI API handlers
export const generateTasksHandler = async (req: Request) => {
  try {
    const { prompt } = await req.json();
    const tasks = await generateTasksFromPrompt(prompt);
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error('Error generating tasks:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate tasks' }), { status: 500 });
  }
};

// Task assignment handler
export const assignTasksHandler = async (req: Request) => {
  try {
    const { taskIds, assignees } = await req.json();
    const assignments = await assignTasks(taskIds, assignees);
    return new Response(JSON.stringify(assignments), { status: 200 });
  } catch (error) {
    console.error('Error assigning tasks:', error);
    return new Response(JSON.stringify({ error: 'Failed to assign tasks' }), { status: 500 });
  }
};