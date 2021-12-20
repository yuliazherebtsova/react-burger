import { useState } from "react";
import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "components/navigation-item/navigation-item";

function AppHeader() {
  const [currentPage, setCurrentPage] = useState("constructor");

  const handleNavigationClick = (title) => {
    setCurrentPage(title);
  };

  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.header__container} pt-4 pb-4`}>
        <nav>
          <ul className={headerStyles.header__navigation}>
            <li>
              <button
                className={`${headerStyles.navigation__button} pt-4 pr-5 pb-4 pl-5`}
              >
                <BurgerIcon type="secondary" />
                <p className="text text text_type_main-default text_color_inactive ml-2">
                  Конструктор
                </p>
              </button>
            </li>
            <li>
              <button
                className={`${headerStyles.navigation__button} pt-4 pr-5 pb-4 pl-5`}
              >
                <ListIcon type="secondary" />
                <p className="text text text_type_main-default text_color_inactive ml-2">
                  Лента заказов
                </p>
              </button>
            </li>
            <li className={headerStyles.header__logo}>
              <a href="#">
                <Logo />
              </a>
            </li>
            <li>
              <button
                className={`${headerStyles.navigation__button} pt-4 pr-5 pb-4 pl-5`}
              >
                <ProfileIcon type="secondary" />
                <p className="text text text_type_main-default text_color_inactive ml-2">
                  Личный кабинет
                </p>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
