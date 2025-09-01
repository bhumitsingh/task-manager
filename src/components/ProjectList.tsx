// src/components/ProjectList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { getProjects, deleteProject } from '@/lib/projectService';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
        toast(
          "Error",
          "Failed to fetch projects. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
      toast(
        "Success",
        "Project deleted successfully."
      );
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast(
        "Error",
        "Failed to delete project. Please try again."
      );
    }
  };

  const handleCreateProject = () => {
    router.push('/create-project');
  };

  if (loading) return <div className="flex justify-center items-center h-32">Loading projects...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleCreateProject}>Create Project</Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground mb-4">No projects found.</p>
          <Button onClick={handleCreateProject}>Create Your First Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDelete={handleDeleteProject} 
            />
          ))}
        </div>
      )}
    </div>
  );
}