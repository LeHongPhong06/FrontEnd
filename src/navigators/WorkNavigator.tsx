import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {WorkDetailScreen, WorkListScreen} from '../screens';

const WorkNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.WORKLIST_SCREEN} component={WorkListScreen} />
      <Stack.Screen
        name={screens.WORKDETAIL_SCREEN}
        component={WorkDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default WorkNavigator;
