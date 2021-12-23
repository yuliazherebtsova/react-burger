import navigationStyles from "./navigation-item.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function NavigationItem({ children, title, currentPage, onNavigationClick }) {
  
  const navigationClickHandler = () => {
    onNavigationClick(title);
  };

  const isActive = title === currentPage;

  const iconStyle = isActive ? "primary" : "secondary";

  const navigationIcon = () => {
    if (title === "constructor") return <BurgerIcon type={iconStyle} />;
    if (title === "orderList") return <ListIcon type={iconStyle} />;
    if (title === "profile") return <ProfileIcon type={iconStyle} />;
  };

  const navigtionTextStyle = !isActive ? "text_color_inactive" : "";

  return (
    <button
      className={`${navigationStyles.navigation__button} pt-4 pr-5 pb-4 pl-5`}
      onClick={navigationClickHandler}
    >
      {navigationIcon()}
      <p
        className={`text text text_type_main-default ml-2 ${navigtionTextStyle}`}
      >
        {children}
      </p>
    </button>
  );
}

export default NavigationItem;
