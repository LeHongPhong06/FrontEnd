import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants';
import {EditWorkScreen, WorkDetailScreen, WorkListScreen} from '../screens';

const WorkNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screens.WORKLIST_SCREEN}>
      <Stack.Screen name={screens.WORKLIST_SCREEN} component={WorkListScreen} />
      <Stack.Screen
        name={screens.WORKDETAIL_SCREEN}
        component={WorkDetailScreen}
      />
      <Stack.Screen name={screens.EDITWORK_SCREEN} component={EditWorkScreen} />
    </Stack.Navigator>
  );
};

export default WorkNavigator;
