import React from "react";
import appStyles from "./app.module.css";
import "./app.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  return (
    <>
      <Logo />
      <main className={appStyles.main}>Hello React Burgers</main>
    </>
  );
}

export default App;
