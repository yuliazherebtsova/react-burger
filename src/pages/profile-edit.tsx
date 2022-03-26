import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { selectUserData, selectUserDataRequest } from 'services/selectors/auth';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData } from 'services/thunks/auth';
import {
  setUserEmail,
  setUserName,
  setUserPassword,
} from 'services/slices/auth';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';

const ProfileEditPage: React.VFC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(selectUserData);

  const userDataRequest = useSelector(selectUserDataRequest);

  const [fieldDisabled, setDisabled] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

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

  const onBlur = () => {
    setDisabled(true);
  };

  const onNameIconClick = () => {
    setDisabled(false);
    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const onPasswordIconClick = () => {
    setDisabled(false);
    setTimeout(() => passwordRef.current?.focus(), 0);
  };

  const onEditFormSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      dispatch(editUserData(user));
    },
    [dispatch, user]
  );

  const onEditFormReset = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      history.replace({ pathname: '/' });
    },
    [history]
  );

  return (
    <form
      className="mt-30"
      onSubmit={onEditFormSubmit}
      onReset={onEditFormReset}
    >
      <div className={`${styles.profile__field}`}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={user ? user.name : ''}
          icon="EditIcon"
          onChange={onNameChange}
          onBlur={onBlur}
          onIconClick={onNameIconClick}
          ref={nameRef}
          disabled={fieldDisabled}
        />
      </div>
      <div className={`${styles.profile__field} pt-6`}>
        <EmailInput
          onChange={onEmailChange}
          value={user ? user.email : ''}
          name="email"
        />
      </div>
      <div className={`${styles.profile__field} pt-6 pb-6`}>
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={user ? user.password : ''}
          icon="EditIcon"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={onPasswordChange}
          onBlur={onBlur}
          onIconClick={onPasswordIconClick}
          ref={passwordRef}
          disabled={fieldDisabled}
          error={false}
          errorText="Ошибка"
        />
      </div>
      <Button
        type="secondary"
        size="medium"
        name="profileEditCancelButton"
        htmlType="reset"
      >
        Отмена
      </Button>
      <Button
        type="primary"
        size="medium"
        name="profileEditSubmitButton"
        htmlType="submit"
      >
        {userDataRequest ? 'Загрузка...' : 'Сохранить'}
      </Button>
    </form>
  );
};
export default ProfileEditPage;
