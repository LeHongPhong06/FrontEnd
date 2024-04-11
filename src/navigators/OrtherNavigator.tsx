import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {AccountScreen, PasswordScreen, ProfileScreen} from '../screens';

const OrtherNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screens.PROFILE_SCREEN}>
      <Stack.Screen name={screens.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={screens.PASSWORD_SCREEN} component={PasswordScreen} />
      <Stack.Screen name={screens.ACCOUNT_SCREEN} component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default OrtherNavigator;
