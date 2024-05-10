import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {
  AddWorkplaceScreen,
  ManagerWorkplaceScreen,
  WorkplaceDetailScreen,
} from '../screens';

const ManagerWorkplaceNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={screens.MANAGEWORKPLACE_SCREEN}
        component={ManagerWorkplaceScreen}
      />
      <Stack.Screen
        name={screens.WORKPLACEDETAIL_SCREEN}
        component={WorkplaceDetailScreen}
      />
      <Stack.Screen
        name={screens.ADDWORKPLACE_SCREEN}
        component={AddWorkplaceScreen}
      />
    </Stack.Navigator>
  );
};

export default ManagerWorkplaceNavigator;
