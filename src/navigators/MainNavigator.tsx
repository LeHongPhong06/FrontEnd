import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TabNavigator} from '.';
import {navigator, screens} from '../constants';
import {useAppSelector} from '../hooks';
import {
  AddTaskWorkDetailScreen,
  DiscussScreen,
  EditTaskDetailScreen,
  EditWorkScreen,
  RequestCompleteScreen,
  ScheduleScreen,
  StatisticalScreen,
  TaskWorkDetailScreen,
  WorkDetailScreen,
} from '../screens';
import TabAdminNavigator from './TabAdminNavigator';

const MainNavigator = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const {roleId} = dataAuth;
  return roleId === 'Admin' ? <AdminNavigator /> : <UserNavigator />;
};
const UserNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigator.TABS_NAVIGATOR} component={TabNavigator} />
      <Stack.Screen name={screens.DISCUSS_SCREEN} component={DiscussScreen} />
      <Stack.Screen name={screens.SCHEDULE_SCREEN} component={ScheduleScreen} />
      <Stack.Screen
        name={screens.TASKWORKDETAIL_SCREEN}
        component={TaskWorkDetailScreen}
      />
      <Stack.Screen
        name={screens.EDITTASKWORKDETAIL_SCREEN}
        component={EditTaskDetailScreen}
      />
      <Stack.Screen
        name={screens.WORKDETAIL_SCREEN}
        component={WorkDetailScreen}
      />
      <Stack.Screen name={screens.EDITWORK_SCREEN} component={EditWorkScreen} />
      <Stack.Screen
        name={screens.ADDTASKWORKDETAIL_SCREEN}
        component={AddTaskWorkDetailScreen}
      />
      <Stack.Screen
        name={screens.STATISTICAL_SCREEN}
        component={StatisticalScreen}
      />
      <Stack.Screen
        name={screens.REQUESTCOMPLETE_SCREEN}
        component={RequestCompleteScreen}
      />
    </Stack.Navigator>
  );
};
const AdminNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={navigator.TABSADMIN_NAVIGATOR}
        component={TabAdminNavigator}
      />
    </Stack.Navigator>
  );
};
export default MainNavigator;
