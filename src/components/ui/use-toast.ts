// src/components/ui/use-toast.ts
// This file provides a mock useToast hook since we're using sonner instead
// In a real implementation, you would use the useToast hook from shadcn's toast component
// or replace all useToast references with the sonner toast function

import { toast } from 'sonner';

export function useToast() {
  return { toast };
}