/* eslint-disable no-console */
import { AppThunk } from 'services/types';
import { TUserData } from 'services/types/data';
import { api } from 'utils/api';
import { deleteCookie, setCookie } from 'utils/cookies';
import {
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
} from '../slices/auth';

export const signUp: AppThunk = (userData: TUserData) => (dispatch) => {
  dispatch(postRegisterRequest());
  api
    .postRegisterUser(userData)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(postRegisterSuccess(res.user));
      } else {
        dispatch(postRegisterFailed());
      }
    })
    .catch((err) => {
      dispatch(postRegisterFailed());
      console.log(`Ошибка регистрации: ${err.message}`);
    });
};

export const signIn: AppThunk = (userData: TUserData) => (dispatch) => {
  dispatch(postLoginRequest());
  api
    .postLoginUser(userData)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(postLoginSuccess(res.user));
      } else {
        dispatch(postLoginFailed());
      }
    })
    .catch((err) => {
      dispatch(postLoginFailed());
      console.log(`Ошибка авторизации: ${err.message}`);
    });
};

export const signOut: AppThunk = () => (dispatch) => {
  api
    .postLogoutUser()
    .then((res) => {
      if (res && res.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(resetAuth());
      }
    })
    .catch((err) => {
      console.log(`Ошибка выхода из системы: ${err.message}`);
    });
};

export const getUserData: AppThunk = () => (dispatch) => {
  dispatch(updateUserRequest());
  api
    .getUserData()
    .then((res) => {
      console.log('RES', res)
      if (res && res.success) {
        
        dispatch(updateUserSuccess(res.user));
      } else {
        dispatch(updateUserFailed());
      }
    })
    .catch((err) => {
      dispatch(updateUserFailed());
      console.log(`Ошибка получения данных пользователя: ${err.message}`);
    });
};

export const editUserData: AppThunk = (userData: TUserData) => (dispatch) => {
  dispatch(updateUserRequest());
  api
    .patchUserData(userData)
    .then((res) => {
      if (res && res.success) {
        dispatch(updateUserSuccess(res.user));
      } else {
        dispatch(updateUserFailed());
      }
    })
    .catch((err) => {
      dispatch(updateUserFailed());
      console.log(`Ошибка обновления данных пользователя: ${err.message}`);
    });
};

export const forgotPassword: AppThunk =
  ({ email }: { email: string }) =>
  (dispatch) => {
    dispatch(postForgotPasswordRequest());
    api
      .postForgotPassword({ email })
      .then((res) => {
        if (res && res.success) {
          dispatch(postForgotPasswordSuccess());
        } else {
          dispatch(postForgotPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(postForgotPasswordFailed());
        console.log(`Ошибка восстановления пароля: ${err.message}`);
      });
  };

export const resetPassword: AppThunk =
  ({ password, token }: { password: string; token: string }) =>
  (dispatch) => {
    dispatch(postResetPasswordRequest());
    api
      .postResetPassword({ password, token })
      .then((res) => {
        if (res && res.success) {
          dispatch(postResetPasswordSuccess());
        } else {
          dispatch(postResetPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(postResetPasswordFailed());
        console.log(`Ошибка обновления пароля: ${err.message}`);
      });
  };
