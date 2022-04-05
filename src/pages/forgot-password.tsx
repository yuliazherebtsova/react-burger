import React, { useCallback, useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectForgotPassword,
  selectForgotPasswordFailed,
  selectForgotPasswordRequest,
  selectUserData,
} from 'services/selectors/auth';
import { forgotPassword } from 'services/thunks/auth';
import { resetAuth } from 'services/slices/auth';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { TLocationState } from 'components/app/app';
import { Button, Input } from 'modules/common/components';
import styles from './forms.module.css';

const ForgotPasswordPage: React.VFC = () => {
  const { user } = useSelector(selectUserData);

  const forgotPasswordRequest = useSelector(selectForgotPasswordRequest);

  const isPasswordForgotten = useSelector(selectForgotPassword);

  const forgotPasswordFailed = useSelector(selectForgotPasswordFailed);

  const dispatch = useDispatch();

  const history = useHistory();

  const { state } = useLocation<TLocationState>();

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

  if (user) {
    return <Redirect to={state?.from || '/'} />;
  }

  if (isPasswordForgotten) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
          state: { from: history.location },
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
