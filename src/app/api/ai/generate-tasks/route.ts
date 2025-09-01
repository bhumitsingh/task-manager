// src/app/api/ai/generate-tasks/route.ts
import { generateTasksHandler } from '@/lib/apiHandlers';

export async function POST(request: Request) {
  return generateTasksHandler(request);
}