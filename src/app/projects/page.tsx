// src/app/projects/page.tsx
'use client';

import { useState } from 'react';
import ProjectList from '@/components/ProjectList';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
      <ProjectList />
    </div>
  );
}