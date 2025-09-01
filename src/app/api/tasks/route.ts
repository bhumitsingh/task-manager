// src/app/api/tasks/route.ts
import { createTaskHandler, getTasksHandler } from '@/lib/apiHandlers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId') || undefined;
  return getTasksHandler(projectId);
}

export async function POST(request: Request) {
  return createTaskHandler(request);
}