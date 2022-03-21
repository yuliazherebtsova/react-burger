import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserData } from 'services/types/data';

type TAuthState = {
  user: TUserData;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
};

const authInitialState: TAuthState = {
  user: { name: '', email: '', password: '' },
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
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
    postLoginRequest(state) {
      state.loginRequest = true;
    },
    postLoginSuccess(state) {
      state.loginFailed = false;
      state.loginRequest = false;
    },
    postLoginFailed(state) {
      state.loginFailed = true;
      state.loginRequest = false;
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
  postLoginRequest,
  postLoginSuccess,
  postLoginFailed,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
