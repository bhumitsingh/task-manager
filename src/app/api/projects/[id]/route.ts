// src/app/api/projects/[id]/route.ts
import { updateProjectHandler, deleteProjectHandler } from '@/lib/apiHandlers';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return updateProjectHandler(request, params.id);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return deleteProjectHandler(params.id);
}