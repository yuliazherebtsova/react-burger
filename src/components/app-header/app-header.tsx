import React from "react";
import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.headerContainer} pt-4 pb-4`}>
        <nav>
          <ul className={headerStyles.navigationList}>
            <li>
              <button
                className={`${headerStyles.navigationButton} pt-4 pr-5 pb-4 pl-5`}
              >
                <BurgerIcon type="primary" />
                <p className="text text_type_main-small mt-1 ml-2">
                  Конструктор
                </p>
              </button>
            </li>
            <li>
              <button
                className={`${headerStyles.navigationButton} pt-4 pr-5 pb-4 pl-5`}
              >
                <ListIcon type="secondary" />
                <p className="text text_type_main-small text_color_inactive mt-1 ml-2">
                  Лента заказов
                </p>
              </button>
            </li>
            <li>
              <a href="#" className={headerStyles.logo}>
                <Logo />
              </a>
            </li>
            <li>
              <button
                className={`${headerStyles.navigationButton} pt-4 pr-5 pb-4 pl-5`}
              >
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-small text_color_inactive mt-1 ml-2">
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
