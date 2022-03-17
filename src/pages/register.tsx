import { useCallback, VFC } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetAuth,
  setUserEmail,
  setUserName,
  setUserPassword,
} from 'services/slices/auth';
import {
  selectRegisterFailed,
  selectRegisterRequest,
  selectUserData,
} from 'services/selectors/auth';
import signUp from 'services/thunks/auth';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import styles from './forms.module.css';

const RegisterPage: VFC = () => {
  const { name, email, password } = useSelector(selectUserData);
  const registerRequest = useSelector(selectRegisterRequest);
  const registerFailed = useSelector(selectRegisterFailed);
  const hasAccessToken = 
  const dispatch = useDispatch();
  const onNameChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.target as HTMLInputElement;
    dispatch(setUserName(eventTarget.value));
  };
  const onEmailChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.target as HTMLInputElement;
    dispatch(setUserEmail(eventTarget.value));
  };
  const onPasswordChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.target as HTMLInputElement;
    dispatch(setUserPassword(eventTarget.value));
  };
  const onRegistrationFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(signUp({ name, email, password }));
  };

  const handleOrderModalClose = useCallback(() => {
    dispatch(resetAuth());
  }, [dispatch]);
  

  return (
    <main className={`${styles.form__container}`}>
      <ErrorIndicator
        hasError={registerFailed}
        hasData
        onErrorModalClose={handleOrderModalClose}
        errorMessage="Пользователь с таким Email уже существует."
      >
        <form className={`${styles.form}`} onSubmit={onRegistrationFormSubmit}>
          <h1 className="text_type_main-medium pb-6">Регистрация</h1>
          <div className={`${styles.form__field} pb-6`}>
            <Input
              type="text"
              placeholder="Имя"
              onChange={onNameChange}
              value={name}
              name="name"
              error={false}
              errorText=""
            />
          </div>
          <div className={`${styles.form__field} pb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={onEmailChange}
              value={email}
              name="email"
              error={false}
              errorText=""
            />
          </div>
          <div className={`${styles.form__field} pb-6`}>
            <Input
              type="password"
              placeholder="Пароль"
              onChange={onPasswordChange}
              value={password}
              name="password"
              error={false}
              errorText=""
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
