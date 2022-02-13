import React, { useRef, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './auth-forms.module.css';

// interface LoginPage {
// }

const LoginPage: React.VFC = () => {
  const [value, setValue] = useState('');
  const [password, setPassword] = React.useState('');
  const onChange = (evt: any) => {
    setPassword(evt.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => (evt: any) => setValue(evt.target.value);

  return (
    <main className={`${styles.form__container}`}>
      <form className={`${styles.form}`}>
        <h1 className="text_type_main-medium pb-6">Вход</h1>
        <div className={`${styles.form__field} pb-6`}>
          <Input
            type="email"
            placeholder="E-mail"
            onChange={onIconClick}
            value={value}
            name="email"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
          />
        </div>
        <div className={`${styles.form__field} pb-6`}>
          <PasswordInput onChange={onChange} value={password} name="password" />
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
        <p className="text_type_main-default text_color_inactive pt-20 pb-4">
          Вы - новый пользователь?&nbsp;
          <Link className={`${styles.form__link}`} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text_type_main-default text_color_inactive">
          Забыли пароль?&nbsp;
          <Link className={`${styles.form__link}`} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </form>
    </main>
  );
};
export default LoginPage;
