// src/app/api/tasks/assign/route.ts
import { assignTasksHandler } from '@/lib/apiHandlers';

export async function POST(request: Request) {
  return assignTasksHandler(request);
}