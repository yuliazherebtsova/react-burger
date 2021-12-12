/***
 * * TODO:
 * * 1. Скроллбар стилизовать
 * * 2. BurgerConstructor
 */

import appStyles from "./app.module.css";
import data from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;
