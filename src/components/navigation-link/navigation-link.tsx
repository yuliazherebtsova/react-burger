import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './navigation-link.module.css';

interface INavigationLinkProps {
  title: string;
  icon?: React.ReactNode;
  isActive: boolean;
  size?: string;
  // eslint-disable-next-line no-unused-vars
  onNavigationClick: (title: string) => void;
}

const NavigationLink: React.FC<INavigationLinkProps> = ({
  title,
  icon,
  isActive,
  size = 'default',
  children,
  onNavigationClick,
}) => {
  const navigationClickHandler = () => {
    onNavigationClick(title);
  };

  const textStyle = !isActive ? 'text_color_inactive' : '';

  const { path, url } = useRouteMatch();

  return (
    <NavLink
      to={{ pathname: title }}
      exact
      className={`${styles.navigation__link} pt-4 pr-5 pb-4 pl-5 text_color_inactive`}
      activeClassName="text_color_active"
      onClick={navigationClickHandler}
    >
      {icon}
      <span className={`text text_type_main-${size} ml-2`}>{children}</span>
    </NavLink>
  );
};

export default NavigationLink;
