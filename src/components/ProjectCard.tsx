// src/components/ProjectCard.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleViewTasks = () => {
    router.push(`/projects/${project.id}`);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await onDelete(project.id);
      } catch (error) {
        console.error('Failed to delete project:', error);
        toast(
          "Error",
          "Failed to delete project. Please try again."
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          Created: {project.createdAt.toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleViewTasks} variant="outline">
          View Tasks
        </Button>
        <Button onClick={handleDelete} variant="destructive" disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}