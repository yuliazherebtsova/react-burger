import React, { useRef, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './auth-forms.module.css';

// interface LoginPage {
// }

const RegisterPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('bob@example.com');
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const onChangePassword = (e: any) => {
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
          <EmailInput onChange={onChangeEmail} value={email} name="email" />
        </div>
        <div className={`${styles.form__field} pb-6`}>
          <PasswordInput onChange={onChangePassword} value={password} name="password" />
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
