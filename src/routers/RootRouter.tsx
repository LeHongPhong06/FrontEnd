import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {AuthNavigator, MainNavigator} from '../navigators';
import {addAuth} from '../redux/silces/authSlice';
import {SplashScreen} from '../screens';

const RootRouter = () => {
  const dispatch = useAppDispatch();
  const {getItem} = useAsyncStorage('auth');
  const [hideSlapsh, setHideSlapsh] = useState(true);
  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    const auth = await getItem();
    if (auth) {
      const data = JSON.parse(auth);
      auth && dispatch(addAuth(data));
    }
  };
  useEffect(() => {
    const timeSplash = setTimeout(() => {
      setHideSlapsh(false);
    }, 1500);
    return () => clearTimeout(timeSplash);
  }, []);
  return hideSlapsh ? <SplashScreen /> : <Router />;
};
const Router = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  return dataAuth?.access_token ? <MainNavigator /> : <AuthNavigator />;
};
export default RootRouter;
