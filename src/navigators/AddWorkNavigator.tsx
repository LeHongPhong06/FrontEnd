import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {AddTaskScreen, AddWorkScreen, EditTaskScreen} from '../screens';

const AddWorkNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.ADDWORD_SCREEN} component={AddWorkScreen} />
      <Stack.Screen name={screens.ADDTASK_SCREEN} component={AddTaskScreen} />
      <Stack.Screen name={screens.EDITTASK_SCREEN} component={EditTaskScreen} />
    </Stack.Navigator>
  );
};

export default AddWorkNavigator;
