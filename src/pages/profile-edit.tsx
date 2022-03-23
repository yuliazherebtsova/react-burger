import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  selectUserData,
  selectUserDataFailed,
  selectUserDataRequest,
} from 'services/selectors/auth';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData, getUserData } from 'services/thunks/auth';
import styles from './profile.module.css';

const ProfileEditPage: React.VFC = () => {
  const { user } = useSelector(selectUserData);

  const userDataRequest = useSelector(selectUserDataRequest);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const onEditFormSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      dispatch(editUserData(form));
    },
    [dispatch, form]
  );

  return (
    <form className="mt-30" onSubmit={onEditFormSubmit}>
      <div className={`${styles.profile__field}`}>
        <Input
          type="text"
          placeholder="Имя"
          icon="EditIcon"
          onChange={onChange}
          value={user ? user.name : ''}
          name="name"
          error={false}
          errorText="Ошибка"
          disabled
        />
      </div>
      <div className={`${styles.profile__field} pt-6`}>
        <EmailInput
          onChange={onChange}
          value={user ? user.email : ''}
          name="email"
        />
      </div>
      <div className={`${styles.profile__field} pt-6 pb-6`}>
      <Input
          type="password"
          placeholder="Пароль"
          icon="EditIcon"
          onChange={onChange}
          value=''
          name="password"
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
        {userDataRequest ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  );
};
export default ProfileEditPage;
