import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginFailed,
  selectLoginRequest,
  selectUserData,
} from 'services/selectors/auth';
import { resetAuth } from 'services/slices/auth';
import { getUserData, signIn } from 'services/thunks/auth';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import formStyles from './forms.module.css';

const LoginPage: React.VFC = () => {
  const { user } = useSelector(selectUserData);

  const loginRequest = useSelector(selectLoginRequest);

  const loginFailed = useSelector(selectLoginFailed);

  const history = useHistory();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { state }: any = history.location;

  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: '', password: '' });

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const onLoginFormSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      dispatch(signIn(form));
    },
    [dispatch, form]
  );

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetAuth());
  }, [dispatch]);


  if (user) {
    return (
      <Redirect
        // Если объект state не undefined, вернём пользователя назад
        to={state?.from || '/'}
      />
    );
  }

  return (
    <main>
      <div className={`${formStyles.form__container}`}>
        <ErrorIndicator
          hasError={loginFailed}
          hasData
          onErrorModalClose={handleErrorModalClose}
          errorMessage="Не удалось войти в личный кабинет. Пожалуйста, проверьте правильность введенных данных"
        >
          <form className={`${formStyles.form}`} onSubmit={onLoginFormSubmit}>
            <h1 className="text_type_main-medium pb-6">Вход</h1>
            <div className={`${formStyles.form__field} pb-6`}>
              <Input
                type="email"
                placeholder="E-mail"
                onChange={onChange}
                value={form.email}
                name="email"
                error={false}
                errorText="Ошибка"
              />
            </div>
            <div className={`${formStyles.form__field} pb-6`}>
              <PasswordInput
                onChange={onChange}
                value={form.password}
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
              <Link
                className={`${formStyles.form__link}`}
                to="/forgot-password"
              >
                Восстановить пароль
              </Link>
            </p>
          </form>
        </ErrorIndicator>
      </div>
    </main>
  );
};
export default LoginPage;
