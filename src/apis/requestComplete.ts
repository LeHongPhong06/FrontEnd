import {AcceptRequestComplete} from '../../types';
import instance from './instance';

export const requestCompleteApi = {
  getRequestListByProjectId: async (projectId: string): Promise<any> => {
    const url = `request-complete/${projectId}`;
    try {
      const res = await instance.get(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  createRequest: async (taskId: string): Promise<any> => {
    const url = 'request-complete/create';
    try {
      const res = await instance.post(url, {taskId});
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  acceptRequest: async (payload: AcceptRequestComplete): Promise<any> => {
    const url = 'request-complete/accept';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  refuseRequest: async (payload: AcceptRequestComplete): Promise<any> => {
    const url = 'request-complete/refuse';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteRequest: async (requestCompleteId: string): Promise<any> => {
    const url = `request-complete/delete/${requestCompleteId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
