import PropTypes from "prop-types";
import navigationStyles from "./navigation-link.module.css";

function NavigationLink({
  children,
  title,
  icon,
  isActive,
  onNavigationClick,
}) {
  const navigationClickHandler = () => {
    onNavigationClick(title);
  };

  const navigtionTextStyle = !isActive ? "text_color_inactive" : "";

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
}

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool.isRequired,
  onNavigationClick: PropTypes.func.isRequired,
};

export default NavigationLink;
