import React, { useRef, useState } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './auth-forms.module.css';

// interface LoginPage {
// }

const ForgotPasswordPage: React.VFC = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => (evt: any) => setValue(evt.target.value);

  return (
    <main className={`${styles.form__container}`}>
      <form className={`${styles.form}`}>
        <h1 className="text_type_main-medium pb-6">Восстановление пароля</h1>
        <div className={`${styles.form__field} pb-6`}>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={onIconClick}
            value={value}
            name="email"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
          />
        </div>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
        <p className="text_type_main-default text_color_inactive pt-20 pb-4">
          Вспомнили пароль?&nbsp;
          <Link className={`${styles.form__link}`} to="/login">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};
export default ForgotPasswordPage;
