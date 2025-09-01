// projectService.ts
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Project } from './types';

const PROJECTS_COLLECTION = 'projects';

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const projectWithTimestamps: Project = {
    ...project,
    id: '',
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectWithTimestamps);
  return { ...projectWithTimestamps, id: docRef.id };
};

export const getProjects = async () => {
  const q = query(collection(db, PROJECTS_COLLECTION));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const projectRef = doc(db, PROJECTS_COLLECTION, id);
  const updatedProject = { ...project, updatedAt: new Date() };
  await updateDoc(projectRef, updatedProject);
  return { id, ...updatedProject };
};

export const deleteProject = async (id: string) => {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
};