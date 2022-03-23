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
