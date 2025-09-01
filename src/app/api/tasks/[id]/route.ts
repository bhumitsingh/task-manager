// src/app/api/tasks/[id]/route.ts
import { updateTaskHandler, deleteTaskHandler } from '@/lib/apiHandlers';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return updateTaskHandler(request, params.id);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return deleteTaskHandler(params.id);
}