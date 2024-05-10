import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {AddUserScreen, UpdateUserScreen, UserDetailScreen} from '../screens';
import ManageUserScreen from '../screens/admin/user/ManageUserScreen';

const ManagerUserNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={screens.MANAGERUSER_SCREEN}
        component={ManageUserScreen}
      />
      <Stack.Screen
        name={screens.USERDETAIL_SCREEN}
        component={UserDetailScreen}
      />
      <Stack.Screen name={screens.ADDUSER_SCREEN} component={AddUserScreen} />
      <Stack.Screen
        name={screens.UPDATEUSER_SCREEN}
        component={UpdateUserScreen}
      />
    </Stack.Navigator>
  );
};

export default ManagerUserNavigator;
