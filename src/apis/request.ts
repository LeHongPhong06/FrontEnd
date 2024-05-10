import {RequestToJoin} from '../types';
import instance from './instance';

export const requestToJoinApi = {
  getReqquestByWorkplaceId: async (
    workplaceId: string,
    page: number,
    seach: string,
    limit: number,
  ): Promise<RequestToJoin[]> => {
    const url = `request-to-join/${workplaceId}?limit=${limit}&search=${seach}&page=${page}`;
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
  createRequest: async (payload: any): Promise<any> => {
    const url = 'request-to-join/create';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  acceptRequest: async (payload: any): Promise<any> => {
    const url = 'request-to-join/accept';
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  refuseRequest: async (payload: any): Promise<any> => {
    const url = 'request-to-join/refuse';
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteRequest: async (requestId: string) => {
    const url = `request-to-join/delete/${requestId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
