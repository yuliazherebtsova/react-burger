import React, { useRef, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import formStyles from './forms.module.css';

// interface LoginPage {
// }

const LoginPage: React.VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');
  const onChangePassword = (evt: any) => {
    setPassword(evt.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeEmail = (evt: any) => {
    setEmail(evt.target.value);
  };

  return (
    <main>
      <div className={`${formStyles.form__container}`}>
        <form className={`${formStyles.form}`}>
          <h1 className="text_type_main-medium pb-6">Вход</h1>
          <div className={`${formStyles.form__field} pb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={onChangeEmail}
              value={email}
              name="email"
              error={false}
              ref={inputRef}
              errorText="Ошибка"
            />
          </div>
          <div className={`${formStyles.form__field} pb-6`}>
            <PasswordInput
              onChange={onChangePassword}
              value={password}
              name="password"
            />
          </div>
          <Button type="primary" size="medium">
            Войти
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
