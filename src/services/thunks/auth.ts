import { AppThunk } from 'services/types';
import { TUserData } from 'services/types/data';
import { api } from 'utils/api';
import { setCookie } from 'utils/cookies';
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
      // eslint-disable-next-line no-console
      console.log(`Ошибка регистрации: ${err}`);
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
      // eslint-disable-next-line no-console
      console.log(`Ошибка авторизации: ${err}`);
    });
};

export const getUserData: AppThunk = () => (dispatch) => {
  dispatch(updateUserRequest());
  api
    .getUserData()
    .then((res) => {
      if (res && res.success) {
        dispatch(updateUserSuccess(res.user));
      } else {
        dispatch(updateUserFailed());
      }
    })
    .catch((err) => {
      dispatch(updateUserFailed());
      // eslint-disable-next-line no-console
      console.log(`Ошибка получения данных пользователя: ${err}`);
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
      // eslint-disable-next-line no-console
      console.log(`Ошибка обновления данных пользователя: ${err}`);
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
        // eslint-disable-next-line no-console
        console.log(`Ошибка восстановления пароля: ${err}`);
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
        // eslint-disable-next-line no-console
        console.log(`Ошибка обновления пароля: ${err}`);
      });
  };
