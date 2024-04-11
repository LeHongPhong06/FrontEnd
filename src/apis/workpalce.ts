import {UserFilterPagination, UserType, WorkplaceType} from '../types';
import instance from './instance';

export const workplaceApi = {
  getTearcherList: async (
    workplaceId: string,
    query: UserFilterPagination,
  ): Promise<UserType[]> => {
    const {page, limit, search} = query;
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
  getWorkplaceById: async (workplaceId: string): Promise<WorkplaceType> => {
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
};
