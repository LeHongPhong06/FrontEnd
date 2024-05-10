import {CreateTask, TaskType} from '../types';
import {formatDateISO} from '../utils';
import instance from './instance';

export const taskApi = {
  getTaskByUserIdForDate: async (
    userId: string,
    payload: any,
  ): Promise<TaskType[]> => {
    const url = `task/date/${userId}`;
    try {
      const res = await instance.post(url, payload);
      if (res.data && res.data.success === true) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getTaskDetails: async (taskId: string): Promise<TaskType | undefined> => {
    const url = `task/${taskId}`;
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getTasksToday: async (userId: string): Promise<TaskType[]> => {
    const url = `task/today/${userId}`;
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  createTask: async (payload: CreateTask) => {
    const url = 'task/create';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateTask: async (taskId: string, payload: any) => {
    const url = `task/update/${taskId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  completedTask: async (taskId: string) => {
    const url = `task/completed/${taskId}`;
    const date = formatDateISO(Date.now());
    try {
      const res = await instance.patch(url, {date});
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteTask: async (taskId: string) => {
    const url = `task/delete/${taskId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
