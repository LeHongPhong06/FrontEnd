import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';

const instance: AxiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8888/'
      : 'http://localhost:8888',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getToken = async () => {
  try {
    const auth = await AsyncStorage.getItem('auth');
    return auth ? JSON.parse(auth)?.access_token : '';
  } catch (error) {
    console.log('error :>> ', error);
  }
};
instance.interceptors.request.use(
  async req => {
    try {
      const token = await getToken();
      req.headers.Authorization = token ? `Bearer ${token}` : '';
    } catch (error) {
      console.log('error :>> ', error);
    }
    return req;
  },
  error => {
    throw new Error(error.response);
  },
);

instance.interceptors.response.use(
  res => {
    if (res.status === 403) {
    }
    return res;
  },
  error => {
    throw new Error(error);
  },
);

export default instance;
