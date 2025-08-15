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
  orderBy,
  where
} from 'firebase/firestore';

const useTasks = (projectId = null) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    try {
      setLoading(true);
      let q;
      if (projectId) {
        q = query(
          collection(db, 'tasks'), 
          where('projectId', '==', projectId),
          orderBy('dueDate')
        );
      } else {
        q = query(collection(db, 'tasks'), orderBy('dueDate'));
      }
      
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), taskData);
      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: docRef.id,
          ...taskData
        }
      ]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.message);
    }
  };

  // Update an existing task
  const updateTask = async (taskId, taskData) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, taskData);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, ...taskData } : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.message);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.message);
    }
  };

  // Fetch tasks when the hook is used or when projectId changes
  useEffect(() => {
    if (projectId !== undefined) {
      fetchTasks();
    }
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask
  };
};

export default useTasks;