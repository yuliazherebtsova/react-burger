import React, { useRef, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './form.module.css';

// interface LoginPage {
// }

const RegisterPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [password, setPassword] = React.useState('');
  const onChange = (e: any) => {
    setPassword(e.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => (e: any) => setValue(e.target.value);

  return (
    <main className={`${styles.form__container}`}>
      <form className={`${styles.form}`}>
        <h1 className="text_type_main-medium pb-6">Регистрация</h1>
        <div className={`${styles.form__field} pb-6`}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={onIconClick}
            value={value}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
          />
        </div>
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
        <div
          className={`${styles.form__field} pb-6`}
        >
          <PasswordInput onChange={onChange} value={password} name="password" />
        </div>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p className="text_type_main-default text_color_inactive pt-20 pb-4">
          Уже зарегистрированы?&nbsp;
          <Link className={`${styles.form__link}`} to="/login">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};
export default RegisterPage;