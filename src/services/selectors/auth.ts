/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRootState } from 'services/types';

export const selectUserData = (state: TRootState) => state.auth;
export const selectRegisterRequest = (state: TRootState) =>
  state.auth.registerRequest;
export const selectRegisterFailed = (state: TRootState) =>
  state.auth.registerFailed;
export const selectLoginRequest = (state: TRootState) =>
  state.auth.loginRequest;
export const selectLoginFailed = (state: TRootState) => state.auth.loginFailed;
export const selectUserDataRequest = (state: TRootState) =>
  state.auth.userDataRequest;
  export const selectUserDataSuccess = (state: TRootState) =>
  state.auth.userDataSuccess;
export const selectUserDataFailed = (state: TRootState) =>
  state.auth.userDataFailed;
export const selectForgotPasswordRequest = (state: TRootState) =>
  state.auth.forgotPasswordRequest;
export const selectForgotPassword = (state: TRootState) =>
  state.auth.forgotPassword;
export const selectForgotPasswordFailed = (state: TRootState) =>
  state.auth.forgotPasswordFailed;
export const selectResetPassword = (state: TRootState) =>
  state.auth.resetPassword;
export const selectResetPasswordRequest = (state: TRootState) =>
  state.auth.resetPasswordRequest;
export const selectResetPasswordFailed = (state: TRootState) =>
  state.auth.resetPasswordFailed;
