import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {ReactNode} from 'react';
import {screens} from '../constants';
import {useAppSelector} from '../hooks';
import {
  InfoTeacherScreen,
  JoinWorkplaceSreeen,
  RequestJoinListScreen,
  TeacherAddScreen,
  UpdateWorkplaceScreen,
  WorkplaceScreen,
} from '../screens';

const WorkplaceNavigator = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const {workplaceId} = dataAuth;
  return workplaceId ? <InfoWorkplace /> : <JoinWorkplace />;
};
const StackNavigator = ({children}: {children: ReactNode}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {children}
    </Stack.Navigator>
  );
};
const JoinWorkplace = () => {
  const Stack = createNativeStackNavigator();
  return (
    <StackNavigator>
      <Stack.Screen
        name={screens.JOINWORKPLACE_SCREEN}
        component={JoinWorkplaceSreeen}
      />
    </StackNavigator>
  );
};
const InfoWorkplace = () => {
  const Stack = createNativeStackNavigator();
  return (
    <StackNavigator>
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
      <Stack.Screen
        name={screens.REQUESTJOINLIST_SCREEN}
        component={RequestJoinListScreen}
      />
    </StackNavigator>
  );
};
export default WorkplaceNavigator;
