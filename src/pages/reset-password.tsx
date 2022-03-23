import React, { useCallback, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import {
  selectResetPassword,
  selectResetPasswordFailed,
  selectResetPasswordRequest,
} from 'services/selectors/auth';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from 'services/thunks/auth';
import styles from './forms.module.css';

const ResetPasswordPage: React.VFC = () => {
  const resetPasswordRequest = useSelector(selectResetPasswordRequest);
  const resetPasswordSuccess = useSelector(selectResetPassword);
  const resetPasswordFailed = useSelector(selectResetPasswordFailed);

  const dispatch = useDispatch();

  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const onResetPasswordFormSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      dispatch(resetPassword(form));
    },
    [dispatch, form]
  );

  return (
    <main className={`${styles.form__container}`}>
      <form className={`${styles.form}`} onSubmit={onResetPasswordFormSubmit}>
        <h1 className="text_type_main-medium pb-6">Восстановление пароля</h1>
        <div className={`${styles.form__field} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name="password" />
        </div>
        <div className={`${styles.form__field} pb-6`}>
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={onChange}
            value={form.token}
            name="code"
            error={false}
            errorText="Ошибка"
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
        <p className="text_type_main-default text_color_inactive pt-20">
          Вспомнили пароль?&nbsp;
          <Link className={`${styles.form__link}`} to="/login">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};
export default ResetPasswordPage;
