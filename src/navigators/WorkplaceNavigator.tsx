import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {
  InfoTeacherScreen,
  TeacherAddScreen,
  UpdateWorkplaceScreen,
  WorkplaceScreen,
} from '../screens';

const WorkplaceNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={screens.WORKPLACE_SCREEN}
        component={WorkplaceScreen}
      />
      <Stack.Screen
        name={screens.INFOTEARCHERDETAIL_SCREEN}
        component={InfoTeacherScreen}
      />
      <Stack.Screen
        name={screens.UPDATEWORKPLACE_SCREEN}
        component={UpdateWorkplaceScreen}
      />
      <Stack.Screen
        name={screens.ADDTEACHER_SCREEN}
        component={TeacherAddScreen}
      />
    </Stack.Navigator>
  );
};

export default WorkplaceNavigator;
