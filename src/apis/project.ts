import instance from './instance';

export const projectApi = {
  getAll: async () => {
    const url = 'project';
    try {
      const res = await instance.get(url);
      return res.data();
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getProjectById: async (projectId: string) => {
    const url = `project/${projectId}`;
    try {
      const res = await instance.get(url);
      return res.data();
    } catch (error: any) {
      throw new Error(error);
    }
  },
  createProject: async (payload: any) => {
    const url = 'project/create';
    try {
      const res = await instance.post(url, payload);
      return res.data();
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateProject: async (projectId: string, payload: any) => {
    const url = `project/update/${projectId}`;
    try {
      const res = await instance.put(url, payload);
      return res.data();
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
