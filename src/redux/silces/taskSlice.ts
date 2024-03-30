import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TaskType} from '../../types/taskType';
interface InitialStateType {
  taskList: TaskType[];
}
const initialState: InitialStateType = {
  taskList: [],
};
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTaskId: (state, action: PayloadAction<string>) => {
      state.taskList.find(item => item.taskId === action.payload);
    },
    setTaskAll: (state, action: PayloadAction<TaskType[]>) => {
      state.taskList = action.payload;
    },
    createTask: (state, action: PayloadAction<TaskType>) => {
      if (action.payload) {
        state.taskList.push(action.payload);
      }
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      state.taskList.some((item, index) => {
        if (item.taskId === action.payload.taskId) {
          state.taskList[index] = action.payload;
          return true;
        }
        return false;
      });
    },
    deteleTask: (state, action: PayloadAction<string>) => {
      const indexTask = state.taskList.findIndex(
        (item: TaskType) => item.taskId === action.payload,
      );
      if (indexTask !== -1) {
        state.taskList.splice(indexTask, 1);
      }
    },
  },
});

const taskReducer = taskSlice.reducer;
export default taskReducer;
export const {setTaskAll, updateTask, deteleTask, createTask} =
  taskSlice.actions;
