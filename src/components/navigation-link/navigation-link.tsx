import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './navigation-link.module.css';

interface INavigationLinkProps {
  title: string;
  size?: string;
}

interface ITitleToPath {
  [title: string]: string;
}

interface ITitleToIcon {
  [title: string]: React.ReactNode;
}

const NavigationLink: React.FC<INavigationLinkProps> = ({
  title,
  size = 'default',
  children,
}) => {
  const { path, url } = useRouteMatch();

  const titleToPath: ITitleToPath = {
    Конструктор: '/',
    'Лента заказов': '/feed',
    'Личный кабинет': '/profile',
    Профиль: '/profile',
    'История заказов': `${url}/orders`,
    Выход: '/login',
    Лого: '/',
    'На главную': '/',
  };

  const isActive = useRouteMatch({
    path: titleToPath[title],
    strict: true,
    sensitive: true,
  })?.isExact;

  const titleToIcon: ITitleToIcon = {
    Конструктор: <BurgerIcon type={isActive ? 'primary' : 'secondary'} />,
    'Лента заказов': <ListIcon type={isActive ? 'primary' : 'secondary'} />,
    'Личный кабинет': <ProfileIcon type={isActive ? 'primary' : 'secondary'} />,
  };

  return (
    <NavLink
      to={{ pathname: titleToPath[title] }}
      exact
      className={`${styles.navigation__link} pt-4 pr-5 pb-4 pl-5`}
      activeClassName={styles.navigation__link_active}
    >
      {titleToIcon[title]}
      <span className={`text text_type_main-${size} ml-2`}>{children}</span>
    </NavLink>
  );
};

export default NavigationLink;
