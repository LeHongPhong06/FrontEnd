import {ProjectType} from '../types';
import instance from './instance';

export const projectApi = {
  getAll: async (search: string, page: number): Promise<ProjectType[]> => {
    const url = `project?limit=10&page=${page}&search=${search}`;
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data.items;
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getProjectById: async (
    projectId: string,
  ): Promise<ProjectType | undefined> => {
    const url = `project/${projectId}`;
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data;
      }
    } catch (error: any) {
      throw error;
    }
  },
  createProject: async (payload: any) => {
    const url = 'project/create';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateProject: async (projectId: string, payload: any): Promise<any> => {
    const url = `project/update/${projectId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteProject: async (projectId: string) => {
    const url = `project/delete/${projectId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
