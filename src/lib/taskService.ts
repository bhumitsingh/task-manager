// taskService.ts
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, Timestamp } from 'firebase/firestore';
import { Task } from './types';

const TASKS_COLLECTION = 'tasks';

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const taskWithTimestamps: any = {
    ...task,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now)
  };

  const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskWithTimestamps);
  return { ...taskWithTimestamps, id: docRef.id };
};

export const getTasks = async (projectId?: string) => {
  let q = query(collection(db, TASKS_COLLECTION));
  
  if (projectId) {
    q = query(collection(db, TASKS_COLLECTION), where('projectId', '==', projectId));
  }
  
  const querySnapshot = await getDocs(q);
  
  // Convert Firestore Timestamps to Date objects
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as Task;
  });
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  const updatedTask: any = { ...task, updatedAt: Timestamp.fromDate(new Date()) };
  
  // Remove undefined fields
  Object.keys(updatedTask).forEach(key => 
    updatedTask[key] === undefined && delete updatedTask[key]
  );
  
  await updateDoc(taskRef, updatedTask);
  
  // Convert Timestamps back to Date for return value
  const returnTask: any = { id, ...updatedTask };
  if (returnTask.createdAt && returnTask.createdAt.toDate) {
    returnTask.createdAt = returnTask.createdAt.toDate();
  }
  if (returnTask.updatedAt && returnTask.updatedAt.toDate) {
    returnTask.updatedAt = returnTask.updatedAt.toDate();
  }
  
  return returnTask as Task;
};

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, TASKS_COLLECTION, id));
};

export const assignTasks = async (taskIds: string[], assignees: string[]) => {
  const assignments = taskIds.map((taskId, index) => ({
    taskId,
    assignee: assignees[index % assignees.length]
  }));

  const batchPromises = assignments.map(({ taskId, assignee }) => 
    updateTask(taskId, { assignee })
  );

  await Promise.all(batchPromises);
  return assignments;
};