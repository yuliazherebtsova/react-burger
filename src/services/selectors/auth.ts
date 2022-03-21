/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRootState } from 'services/types';

export const selectUserData = (state: TRootState) => state.auth.user;
export const selectRegisterRequest = (state: TRootState) =>
  state.auth.registerRequest;
export const selectRegisterFailed = (state: TRootState) =>
  state.auth.registerFailed;
export const selectLoginRequest = (state: TRootState) =>
  state.auth.loginRequest;
export const selectLoginFailed = (state: TRootState) => state.auth.loginFailed;
