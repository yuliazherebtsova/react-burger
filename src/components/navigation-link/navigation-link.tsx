import { Link } from 'react-router-dom';
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

  return (
    <Link
      to={title}
      className={`${styles.navigation__link} pt-4 pr-5 pb-4 pl-5`}
      onClick={navigationClickHandler}
    >
      {icon}
      <p className={`text text text_type_main-${size} ml-2 ${textStyle}`}>
        {children}
      </p>
    </Link>
  );
};

export default NavigationLink;
