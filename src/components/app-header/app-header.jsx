import { useState } from "react";
import headerStyles from "./app-header.module.css";
import NavigationItem from "components/navigation-item/navigation-item";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

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
              <NavigationItem
                title={"constructor"}
                currentPage={currentPage}
                onNavigationClick={handleNavigationClick}
              >
                Конструктор
              </NavigationItem>
            </li>
            <li>
              <NavigationItem
                title={"orderList"}
                currentPage={currentPage}
                onNavigationClick={handleNavigationClick}
              >
                Лента заказов
              </NavigationItem>
            </li>
            <li className={headerStyles.header__logo}>
              <a href="#">
                <Logo />
              </a>
            </li>
            <li>
              <NavigationItem
                title={"profile"}
                currentPage={currentPage}
                onNavigationClick={handleNavigationClick}
              >
                Личный кабинет
              </NavigationItem>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
