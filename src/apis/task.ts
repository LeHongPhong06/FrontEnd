import instance from './instance';

export const taskApi = {
  deleteTask: async (taskId: string) => {
    const url = `task/delete/${taskId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error) {}
  },
};
