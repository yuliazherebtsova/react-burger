/***
 * * TODO:
 * * 1. Скроллбар
 * * 2. BurgerConstructor
 * * 3. Навигация по табам
 * * 4. Навигация по табам скроллом
 */

import React from "react";
import appStyles from "./app.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients data={data} />
      </main>
    </>
  );
}

export default App;
