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
} from '../slices/auth';

export const signUp: AppThunk = (userData: TUserData) => (dispatch) => {
  dispatch(postRegisterRequest());
  api
    .postRegisterUser(userData)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(postRegisterSuccess());
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
        dispatch(postLoginSuccess());
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
