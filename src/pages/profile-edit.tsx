import React, { useRef, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRouteMatch } from 'react-router-dom';
import { selectUserData } from 'services/selectors/auth';
import { useSelector } from 'react-redux';
import styles from './profile.module.css';

const ProfileEditPage: React.VFC = () => {
  const { user } = useSelector(selectUserData);
  const onChange = (evt: any) => {};
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => (evt: any) => {};

  return (
    <form className="mt-30">
      <div className={`${styles.profile__field}`}>
        <Input
          type="text"
          placeholder="Имя"
          icon="EditIcon"
          onChange={onIconClick}
          onIconClick={onIconClick}
          value={user ? user.name : ''}
          name="name"
          error={false}
          ref={inputRef}
          errorText="Ошибка"
          disabled
        />
      </div>
      <div className={`${styles.profile__field} pt-6`}>
        <EmailInput onChange={onIconClick} value={user ? user.email : ''} name="email" />
      </div>
      <div className={`${styles.profile__field} pt-6 pb-6`}>
        <Input
          type="password"
          placeholder="Пароль"
          icon="EditIcon"
          onChange={onChange}
          onIconClick={onIconClick}
          value="******"
          name="password"
          error={false}
          ref={inputRef}
          errorText="Ошибка"
          disabled
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
        Сохранить
      </Button>
    </form>
  );
};
export default ProfileEditPage;
