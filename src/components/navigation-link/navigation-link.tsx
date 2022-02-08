import navigationStyles from './navigation-link.module.css';

interface INavigationLinkProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  // eslint-disable-next-line no-unused-vars
  onNavigationClick: (title: string) => void;
}

const NavigationLink: React.FC<INavigationLinkProps> = ({
  children,
  title,
  icon,
  isActive,
  onNavigationClick,
}) => {
  const navigationClickHandler = () => {
    onNavigationClick(title);
  };

  const navigtionTextStyle = !isActive ? 'text_color_inactive' : '';

  return (
    <a
      href="/#"
      className={`${navigationStyles.navigation__link} pt-4 pr-5 pb-4 pl-5`}
      onClick={navigationClickHandler}
    >
      {icon}
      <p
        className={`text text text_type_main-default ml-2 ${navigtionTextStyle}`}
      >
        {children}
      </p>
    </a>
  );
};

export default NavigationLink;
