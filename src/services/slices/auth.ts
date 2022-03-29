import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserData } from 'services/types/data';

type TAuthState = {
  user: TUserData | null;
  forgotPassword: boolean;
  resetPassword: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  userDataRequest: boolean;
  userDataFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
};

const authInitialState: TAuthState = {
  user: null,
  forgotPassword: false,
  resetPassword: false,
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  userDataRequest: false,
  userDataFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    setUserEmail(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    setUserPassword(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.password = action.payload;
      }
    },
    postRegisterRequest(state) {
      state.registerRequest = true;
    },
    postRegisterSuccess(state, action: PayloadAction<TUserData>) {
      const { name, email } = action.payload;
      state.user = {
        ...state.user,
        name,
        email,
        password: '',
      };
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
    postLoginSuccess(state, action: PayloadAction<TUserData>) {
      const { name, email } = action.payload;
      state.user = {
        ...state.user,
        name,
        email,
        password: '',
      };
      state.loginFailed = false;
      state.loginRequest = false;
    },
    postLoginFailed(state) {
      state.loginFailed = true;
      state.loginRequest = false;
    },
    updateUserRequest(state) {
      state.userDataRequest = true;
    },
    updateUserSuccess(state, action: PayloadAction<TUserData>) {
      const { name, email } = action.payload;
      state.user = {
        ...state.user,
        name,
        email,
        password: '',
      };
      state.userDataFailed = false;
      state.userDataRequest = false;
    },
    updateUserFailed(state) {
      state.userDataFailed = true;
      state.userDataRequest = false;
    },
    postForgotPasswordRequest(state) {
      state.forgotPasswordRequest = true;
    },
    postForgotPasswordSuccess(state) {
      state.forgotPassword = true;
      state.forgotPasswordFailed = false;
      state.forgotPasswordRequest = false;
    },
    postForgotPasswordFailed(state) {
      state.forgotPasswordFailed = true;
      state.forgotPasswordRequest = false;
    },
    postResetPasswordRequest(state) {
      state.resetPasswordRequest = true;
    },
    postResetPasswordSuccess(state) {
      state.resetPassword = true;
      state.resetPasswordFailed = false;
      state.resetPasswordRequest = false;
    },
    postResetPasswordFailed(state) {
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
  postLoginRequest,
  postLoginSuccess,
  postLoginFailed,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  postForgotPasswordRequest,
  postForgotPasswordSuccess,
  postForgotPasswordFailed,
  postResetPasswordRequest,
  postResetPasswordSuccess,
  postResetPasswordFailed,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
