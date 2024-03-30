import {createSlice} from '@reduxjs/toolkit';
interface InitialState {
  userId: string;
  email: string;
  phoneNumber: string;
  access_token: string;
  fullName: string;
  password?: string;
  avatar?: string;
  fcmToken?: string;
  workplaceId?: string;
}

const initialState: InitialState = {
  access_token: '',
  fullName: '',
  userId: '',
  email: '',
  phoneNumber: '',
  avatar: '',
  fcmToken: '',
  workplaceId: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    dataAuth: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.dataAuth = action.payload;
    },
    removeAuth: state => {
      state.dataAuth = initialState;
    },
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
export const {addAuth, removeAuth} = authSlice.actions;
