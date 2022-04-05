import { useCallback, useState, VFC } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth } from 'services/slices/auth';
import {
  selectRegisterFailed,
  selectRegisterRequest,
  selectUserData,
} from 'services/selectors/auth';
import { signUp } from 'services/thunks/auth';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { TLocationState } from 'components/app/app';
import styles from './forms.module.css';

const RegisterPage: VFC = () => {
  const { user } = useSelector(selectUserData);

  const registerRequest = useSelector(selectRegisterRequest);

  const registerFailed = useSelector(selectRegisterFailed);
  
  const { state } = useLocation<TLocationState>();

  const dispatch = useDispatch();

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const onRegistrationFormSubmit = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(signUp(form));
  }, [dispatch, form]);

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  if (user) {
    return (
      <Redirect
        to={state?.from || '/'}
      />
    );
  }

  return (
    <main className={`${styles.form__container}`}>
      <ErrorIndicator
        hasError={registerFailed}
        hasData
        onErrorModalClose={handleErrorModalClose}
        errorMessage="Пользователь с таким логином уже существует."
      >
        <form className={`${styles.form}`} onSubmit={onRegistrationFormSubmit}>
          <h1 className="text_type_main-medium pb-6">Регистрация</h1>
          <div className={`${styles.form__field} pb-6`}>
            <Input
              type="text"
              placeholder="Имя"
              onChange={onChange}
              value={form.name}
              name="name"
              error={false}
              errorText=""
            />
          </div>
          <div className={`${styles.form__field} pb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={onChange}
              value={form.email}
              name="email"
              error={false}
              errorText=""
            />
          </div>
          <div className={`${styles.form__field} pb-6`}>
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name="password"
            />
          </div>
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            name="registerFormSubmitBtn"
          >
            {registerRequest ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
          <p className="text_type_main-default text_color_inactive pt-20 pb-4">
            Уже зарегистрированы?&nbsp;
            <Link className={`${styles.form__link}`} to="/login">
              Войти
            </Link>
          </p>
        </form>
      </ErrorIndicator>
    </main>
  );
};
export default RegisterPage;
