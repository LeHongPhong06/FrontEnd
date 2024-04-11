/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {AuthNavigator, MainNavigator} from '../navigators';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
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
  const {dataAuth} = useAppSelector(state => state.auth);
  useEffect(() => {
    const timeSplash = setTimeout(() => {
      setHideSlapsh(false);
    }, 1500);
    return () => clearTimeout(timeSplash);
  }, []);
  const Router = () => {
    return dataAuth?.access_token ? <MainNavigator /> : <AuthNavigator />;
  };
  return hideSlapsh ? <SplashScreen /> : <Router />;
};

export default RootRouter;
