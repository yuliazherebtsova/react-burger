import { useState } from "react";
import headerStyles from "./app-header.module.css";
import NavigationLink from "components/navigation-link/navigation-link";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

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
              <NavigationLink
                title={"constructor"}
                icon={
                  <BurgerIcon
                    type={
                      currentPage === "constructor" ? "primary" : "secondary"
                    }
                  />
                }
                isActive={currentPage === "constructor"}
                onNavigationClick={handleNavigationClick}
              >
                Конструктор
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                title={"orderList"}
                icon={
                  <ListIcon
                    type={currentPage === "orderList" ? "primary" : "secondary"}
                  />
                }
                isActive={currentPage === "orderList"}
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
                title={"profile"}
                icon={
                  <ProfileIcon
                    type={currentPage === "profile" ? "primary" : "secondary"}
                  />
                }
                isActive={currentPage === "profile"}
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
}

export default AppHeader;
