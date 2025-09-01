// src/app/api/projects/route.ts
import { createProjectHandler, getProjectsHandler } from '@/lib/apiHandlers';

export async function GET() {
  return getProjectsHandler();
}

export async function POST(request: Request) {
  return createProjectHandler(request);
}