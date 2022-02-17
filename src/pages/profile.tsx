import React from 'react';
import NavigationLink from 'components/navigation-link/navigation-link';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styles from './profile.module.css';
import ProfileEditPage from './profile-edit';
import OrdersPage from './orders';

const ProfilePage: React.VFC = () => {
  const { path } = useRouteMatch();
  // console.log(path, url);

  return (
    <main className={`${styles.profile__container}`}>
      <nav>
        <ul className={`${styles.profile__navigation} mt-30`}>
          <li>
            <NavigationLink title="Профиль" size="medium">
              Профиль
            </NavigationLink>
          </li>
          <li>
            <NavigationLink title="История заказов" size="medium">
              История заказов
            </NavigationLink>
          </li>
          <li>
            <NavigationLink title="Выход" size="medium">
              Выход
            </NavigationLink>
          </li>
          <li>
            <p
              className={`${styles.profile__description} 
              text_type_main-small text_color_inactive mt-20 ml-7`}
            >
              В этом разделе вы можете изменить свои&nbsp;персональные данные
            </p>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={path} exact>
          <ProfileEditPage />
        </Route>
        <Route path={`${path}/orders`} exact>
          <OrdersPage />
        </Route>
      </Switch>
    </main>
  );
};
export default ProfilePage;
