import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../silces/authSlice';
import taskReducer from '../silces/taskSlice';
export const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
