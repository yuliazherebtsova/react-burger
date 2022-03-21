import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginFailed,
  selectLoginRequest,
  selectUserData,
} from 'services/selectors/auth';
import { resetAuth, setUserEmail, setUserPassword } from 'services/slices/auth';
import { signIn, signUp } from 'services/thunks/auth';
import formStyles from './forms.module.css';

// interface LoginPage {
// }

const LoginPage: React.VFC = () => {
  const { email, password } = useSelector(selectUserData);
  const loginRequest = useSelector(selectLoginRequest);
  const loginFailed = useSelector(selectLoginFailed);
  const dispatch = useDispatch();
  const onEmailChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.target as HTMLInputElement;
    dispatch(setUserEmail(eventTarget.value));
  };
  const onPasswordChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.target as HTMLInputElement;
    dispatch(setUserPassword(eventTarget.value));
  };
  const onLoginFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(signIn({ email, password }));
  };

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  return (
    <main>
      <div className={`${formStyles.form__container}`}>
        <form className={`${formStyles.form}`} onSubmit={onLoginFormSubmit}>
          <h1 className="text_type_main-medium pb-6">Вход</h1>
          <div className={`${formStyles.form__field} pb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={onEmailChange}
              value={email}
              name="email"
              error={false}
              errorText="Ошибка"
            />
          </div>
          <div className={`${formStyles.form__field} pb-6`}>
            <PasswordInput
              onChange={onPasswordChange}
              value={password}
              name="password"
            />
          </div>

          <Button type="primary" size="medium">
            {loginRequest ? 'Вход...' : 'Войти'}
          </Button>
          <p className="text_type_main-default text_color_inactive pt-20 pb-4">
            Вы - новый пользователь?&nbsp;
            <Link className={`${formStyles.form__link}`} to="/register">
              Зарегистрироваться
            </Link>
          </p>
          <p className="text_type_main-default text_color_inactive">
            Забыли пароль?&nbsp;
            <Link className={`${formStyles.form__link}`} to="/forgot-password">
              Восстановить пароль
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
export default LoginPage;
