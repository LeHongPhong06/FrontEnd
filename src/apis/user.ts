import {UpdateAvatarUser, UpdateInfoUser, UserType} from '../types';
import instance from './instance';

export const userApi = {
  getAll: async () => {
    const url = 'user';
    try {
      const res = await instance.get(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getById: async (userId: string) => {
    const url = `user/${userId}`;
    try {
      const res = await instance.get(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getUserAllByWorkplaceById: async (
    workplaceId: string,
  ): Promise<UserType[]> => {
    const url = `user/workplace/all/${workplaceId}`;
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
  updateInfo: async (userId: string, payload: UpdateInfoUser) => {
    const url = `user/update/${userId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateAvatar: async (userId: string, payload: UpdateAvatarUser) => {
    const url = `user/avatar/${userId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
