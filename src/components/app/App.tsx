import React from "react";
import appStyles from "./app.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../app-header/app-header";

function App() {
  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>Hello React Burgers</main>
    </>
  );
}

export default App;
