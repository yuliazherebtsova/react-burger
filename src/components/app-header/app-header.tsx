import React from 'react';
import NavigationLink from 'components/navigation-link/navigation-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { selectUserData } from 'services/selectors/auth';
import styles from './app-header.module.css';

const AppHeader: React.VFC = () => {
  const { user } = useSelector(selectUserData);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} pt-4 pb-4`}>
        <nav>
          <ul className={styles.header__navigation}>
            <li>
              <NavigationLink title="Конструктор">Конструктор</NavigationLink>
            </li>
            <li>
              <NavigationLink title="Лента заказов">
                Лента заказов
              </NavigationLink>
            </li>
            <li className={styles.header__logo}>
              <NavigationLink title="Лого">
                <Logo />
              </NavigationLink>
            </li>
            <li>
              <NavigationLink title="Личный кабинет">
                {user ? user?.name : 'Личный кабинет'}
              </NavigationLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
