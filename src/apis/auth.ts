import {AuthChangePassword, AuthLogin} from '../types';
import instance from './instance';

export const authApi = {
  login: async (payload: AuthLogin) => {
    const url = 'auth/login';
    try {
      const res = await instance.post(url, payload);
      const data = await res.data;
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  register: async (payload: any) => {
    const url = 'auth/register';
    try {
      const res = await instance.post(url, payload);
      const data = await res.data;
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  changePassword: async (userId: string, payload: AuthChangePassword) => {
    const url = `auth/changepassword/${userId}`;
    try {
      const res = await instance.patch(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  verificationCode: async (payload: {email: string}) => {
    const url = 'mailer/verify';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  verificationCodeResetPassword: async (payload: {email: string}) => {
    const url = 'mailer/resetPassword';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
