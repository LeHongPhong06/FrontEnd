import instance from './instance';

export const userApi = {
  getAll: async () => {
    const url = 'user';
    try {
      const res = await instance.get(url);
      return res.data();
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getById: async (userId: string) => {
    const url = `user/${userId}`;
    try {
      const res = await instance.get(url);
      return res.data();
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
