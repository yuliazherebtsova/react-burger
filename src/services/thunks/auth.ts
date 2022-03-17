import { AppThunk } from 'services/types';
import { TUserData } from 'services/types/data';
import { api } from 'utils/api';
import { setCookie } from 'utils/cookies';
import {
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailed,
} from '../slices/auth';

const signUp: AppThunk = (userData: TUserData) => (dispatch) => {
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

export default signUp;
