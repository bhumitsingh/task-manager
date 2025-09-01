// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Collaborative Task Planner</h1>
          <p className="text-lg mb-8">
            A web-based application for project management and team collaboration
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/projects">
              <Button size="lg">
                View Projects
              </Button>
            </Link>
            
            <Link href="/create-project">
              <Button variant="outline" size="lg">
                Create New Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}