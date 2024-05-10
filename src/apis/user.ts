import {
  UpdateAvatarUser,
  UpdateFcmToken,
  UpdateInfoUser,
  UserType,
} from '../types';
import {AdminUpdateUser} from '../types/user';
import instance from './instance';

export const userApi = {
  getAll: async (): Promise<UserType[]> => {
    const url = 'user';
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
  getById: async (userId: string): Promise<UserType | undefined> => {
    const url = `user/${userId}`;
    try {
      const res = await instance.get(url);
      if (res.data.success === true) {
        return res.data?.data;
      }
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
  createUser: async (payload: any) => {
    const url = 'user/create';
    try {
      const res = await instance.post(url, payload);
      return res.data;
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
  updateFcmToken: async (userId: string, payload: UpdateFcmToken) => {
    const url = `user/update-fcmtoken/${userId}`;
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
  adminUpdateUser: async (userId: string, payload: AdminUpdateUser) => {
    const url = `user/admin-update/${userId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteUser: async (userId: string) => {
    const url = `user/delete/${userId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
