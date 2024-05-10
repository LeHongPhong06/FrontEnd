import {MemberProjectUpdate} from '../types';
import instance from './instance';

export const memberApi = {
  getMemberByProjectId: async (projectId: string) => {
    const url = `member/${projectId}`;
    try {
      const res = await instance.get(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  updateMemberByProjectId: async (
    projectId: string,
    payload: MemberProjectUpdate[],
  ): Promise<any> => {
    const url = `member/update/${projectId}`;
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  deleteMemberByProject: async (projectId: string) => {
    const url = `member/delete/${projectId}`;
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
