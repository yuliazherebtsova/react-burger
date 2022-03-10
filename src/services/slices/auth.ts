import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserData } from 'services/types/data';

type TAuthState = {
  user: TUserData;
  registerRequest: boolean;
  registerFailed: boolean;
};

const authInitialState: TAuthState = {
  user: { name: '', email: '', password: '' },
  registerRequest: false,
  registerFailed: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState: authInitialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.user.name = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    setUserPassword(state, action: PayloadAction<string>) {
      state.user.password = action.payload;
    },
    postRegisterRequest(state) {
      state.registerRequest = true;
    },
    postRegisterSuccess(state) {
      state.registerFailed = false;
      state.registerRequest = false;
    },
    postRegisterFailed(state) {
      state.registerFailed = true;
      state.registerRequest = false;
    },
    resetAuth() {
      return authInitialState;
    },
  },
});

export const {
  setUserName,
  setUserEmail,
  setUserPassword,
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailed,
  resetAuth
} = authSlice.actions;

export default authSlice.reducer;
