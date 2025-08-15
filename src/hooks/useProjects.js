import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'projects'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new project
  const addProject = async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), projectData);
      setProjects(prevProjects => [
        ...prevProjects,
        {
          id: docRef.id,
          ...projectData
        }
      ]);
    } catch (err) {
      console.error('Error adding project:', err);
      setError(err.message);
    }
  };

  // Update an existing project
  const updateProject = async (projectId, projectData) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, projectData);
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId ? { ...project, ...projectData } : project
        )
      );
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err.message);
    }
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err.message);
    }
  };

  // Fetch projects when the hook is used
  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject
  };
};

export default useProjects;