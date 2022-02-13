import React, { useState } from 'react';
import NavigationLink from 'components/navigation-link/navigation-link';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

const AppHeader: React.VFC = () => {
  const [currentPage, setCurrentPage] = useState<string>('constructor');

  const handleNavigationClick = (title: string) => {
    setCurrentPage(title);
  };

  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.header__container} pt-4 pb-4`}>
        <nav>
          <ul className={headerStyles.header__navigation}>
            <li>
              <NavigationLink
                title="constructor"
                icon={
                  <BurgerIcon
                    type={
                      currentPage === 'constructor' ? 'primary' : 'secondary'
                    }
                  />
                }
                isActive={currentPage === 'constructor'}
                onNavigationClick={handleNavigationClick}
              >
                Конструктор
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                title="orderList"
                icon={
                  <ListIcon
                    type={currentPage === 'orderList' ? 'primary' : 'secondary'}
                  />
                }
                isActive={currentPage === 'orderList'}
                onNavigationClick={handleNavigationClick}
              >
                Лента заказов
              </NavigationLink>
            </li>
            <li className={headerStyles.header__logo}>
              <a href="/#">
                <Logo />
              </a>
            </li>
            <li>
              <NavigationLink
                title="profile"
                icon={
                  <ProfileIcon
                    type={currentPage === 'profile' ? 'primary' : 'secondary'}
                  />
                }
                isActive={currentPage === 'profile'}
                onNavigationClick={handleNavigationClick}
              >
                Личный кабинет
              </NavigationLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
