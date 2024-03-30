import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TabNavigator} from '.';
import {navigator, screens} from '../constants';
import {ScheduleScreen} from '../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigator.TABS_NAVIGATOR} component={TabNavigator} />
      <Stack.Screen name={screens.SCHEDULE_SCREEN} component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
