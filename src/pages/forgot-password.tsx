import React, { useCallback, useState } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectForgotPassword,
  selectForgotPasswordFailed,
  selectForgotPasswordRequest,
} from 'services/selectors/auth';
import { forgotPassword } from 'services/thunks/auth';
import { resetAuth } from 'services/slices/auth';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import styles from './forms.module.css';

const ForgotPasswordPage: React.VFC = () => {
  const forgotPasswordRequest = useSelector(selectForgotPasswordRequest);
  const forgotPasswordSuccess = useSelector(selectForgotPassword);
  const forgotPasswordFailed = useSelector(selectForgotPasswordFailed);

  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: '' });

  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const onForgotPasswordFormSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      dispatch(forgotPassword(form));
    },
    [dispatch, form]
  );

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  if (forgotPasswordSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
        }}
      />
    );
  }

  return (
    <main className={`${styles.form__container}`}>
      <ErrorIndicator
        hasError={forgotPasswordFailed}
        hasData
        errorMessage="Ошибка восстановления пароля. Попробуйте позже"
        onErrorModalClose={handleErrorModalClose}
      >
        <form
          className={`${styles.form}`}
          onSubmit={onForgotPasswordFormSubmit}
        >
          <h1 className="text_type_main-medium pb-6">Восстановление пароля</h1>
          <div className={`${styles.form__field} pb-6`}>
            <Input
              type="email"
              placeholder="Укажите e-mail"
              value={form.email}
              name="email"
              error={false}
              errorText="Ошибка"
              onChange={onChange}
            />
          </div>
          <Button type="primary" size="medium">
            {forgotPasswordRequest
              ? 'Отправляем проверочный код...'
              : 'Восстановить'}
          </Button>
          <p className="text_type_main-default text_color_inactive pt-20 pb-4">
            Вспомнили пароль?&nbsp;
            <Link className={`${styles.form__link}`} to="/login">
              Войти
            </Link>
          </p>
        </form>
      </ErrorIndicator>
    </main>
  );
};
export default ForgotPasswordPage;
