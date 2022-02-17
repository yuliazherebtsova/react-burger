import React, { useRef, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRouteMatch } from 'react-router-dom';
import styles from './profile.module.css';

// interface LoginPage {
// }

const ProfileEditPage: React.VFC = () => {
  const [login, setLogin] = useState('rey.skywalker@jakku.space');
  const [password, setPassword] = React.useState('********');
  const onChange = (evt: any) => {
    setPassword(evt.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => (evt: any) => setLogin(evt.target.value);

  const { path } = useRouteMatch();
  // console.log(path);

  return (
    <form className="mt-30">
      <div className={`${styles.profile__field}`}>
        <Input
          type="text"
          placeholder="Имя"
          icon="EditIcon"
          onChange={onIconClick}
          onIconClick={onIconClick}
          value="Rey Skywalker"
          name="name"
          error={false}
          ref={inputRef}
          errorText="Ошибка"
          disabled
        />
      </div>
      <div className={`${styles.profile__field} pt-6`}>
        <EmailInput onChange={onIconClick} value={login} name="email" />
      </div>
      <div className={`${styles.profile__field} pt-6 pb-6`}>
        <Input
          type="password"
          placeholder="Пароль"
          icon="EditIcon"
          onChange={onChange}
          onIconClick={onIconClick}
          value={password}
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
