import {AddMember, UserType, WorkplaceType} from '../types';
import instance from './instance';

export const workplaceApi = {
  getAllWorkplace: async (payload: any): Promise<WorkplaceType[]> => {
    const {page, limit, search} = payload;
    const url = `workplace?page=${page}&limit=${limit}&search=${search}`;
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
  getTearcherList: async (
    workplaceId: string,
    page: number,
    limit: number,
    search: string,
  ): Promise<UserType[]> => {
    const url = `user/workplace/${workplaceId}?page=${page}&limit=${limit}&search=${search}`;
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data?.items;
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getWorkplaceById: async (
    workplaceId: string,
  ): Promise<WorkplaceType | undefined> => {
    const url = `workplace/${workplaceId}`;
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },

  addMemberByEmail: async (payload: AddMember): Promise<any> => {
    const url = 'workplace/add';
    try {
      const res = await instance.post(url, payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  createWorkplace: async (payload: any) => {
    const url = 'workplace/create';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateWorkplace: async (workplaceId: string, payload: any) => {
    const url = `workplace/update/${workplaceId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateNameWorkplace: async (workplaceId: string, name: string) => {
    const url = `workplace/update-name/${workplaceId}`;
    try {
      const res = await instance.patch(url, name);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteWorkplace: async (workplaceId: string) => {
    const url = `workplace/delete/${workplaceId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
