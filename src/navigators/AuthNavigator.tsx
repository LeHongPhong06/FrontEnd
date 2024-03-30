import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  VerificationScreen,
} from '../screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={screens.REGISTER_SCREEN} component={RegisterScreen} />
      <Stack.Screen
        name={screens.FORGOTPASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={screens.VERIFICATION_SCREEN}
        component={VerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
