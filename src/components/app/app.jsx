/***
 * * TODO:
 * * 1. Скроллбар стилизовать
 * * 2. BurgerConstructor
 */

import appStyles from "./app.module.css";
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
