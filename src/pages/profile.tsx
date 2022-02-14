import React, { useRef, useState } from 'react';
import {
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationLink from 'components/navigation-link/navigation-link';
import styles from './profile.module.css';

// interface LoginPage {
// }

const ProfilePage: React.VFC = () => {
  const [login, setLogin] = useState('mail@mail.ru');
  const [password, setPassword] = React.useState('********');
  const onChange = (evt: any) => {
    setPassword(evt.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => (evt: any) => setLogin(evt.target.value);
  const [currentPage, setCurrentPage] = useState<string>('profile');

  const handleNavigationClick = (title: string) => {
    setCurrentPage(title);
  };
  return (
    <main className={`${styles.profile__container}`}>
      <nav>
        <ul className={`${styles.profile__navigation} mt-20`}>
          <li>
            <NavigationLink
              title="profile"
              size="medium"
              isActive={currentPage === 'profile'}
              onNavigationClick={handleNavigationClick}
            >
              Профиль
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              title="orders"
              size="medium"
              isActive={currentPage === 'orders'}
              onNavigationClick={handleNavigationClick}
            >
              История заказов
            </NavigationLink>
          </li>

          <li>
            <NavigationLink
              title="logout"
              size="medium"
              isActive={currentPage === 'logout'}
              onNavigationClick={handleNavigationClick}
            >
              Выход
            </NavigationLink>
          </li>
          <li>
            <p
              className={`${styles.profile__description} text_type_main-small text_color_inactive mt-20 ml-7`}
            >
              В этом разделе вы можете изменить свои&nbsp;персональные данные
            </p>
          </li>
        </ul>
      </nav>
      <form className="mt-20">
        <div>
          <Input
            type="text"
            placeholder="Имя"
            icon="EditIcon"
            onChange={onIconClick}
            onIconClick={onIconClick}
            value={login}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            disabled
          />
        </div>
        <div className="pt-6">
          <EmailInput onChange={onIconClick} value={login} name="email" />
        </div>
        <div className="pt-6">
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
      </form>
    </main>
  );
};
export default ProfilePage;
