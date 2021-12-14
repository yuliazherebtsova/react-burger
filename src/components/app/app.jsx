/**
 ** 1. Переключение вкладок
 ** 2. Правки ревью
 ** 3. Наполнение модальных окон
 ** 4. Загрузка данных
 ** 5. Анимация всплывающего окна
 */

import React, { useState } from "react";
import appStyles from "./app.module.css";
import data from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderSummary from "../order-summary/order-summary";
import IngredientInfo from "../ingredient-info/ingredient-info";

function App() {
  const [modalVisibility, setModaVisibility] = useState(true);
  const modalRef = React.createRef(); // forwardRef?
  const closeIconRef = React.createRef();
  const [modalData, setModalData] = useState({ type: null, data: null });

  const handleModalOpen = ({ type, itemId }) => {
    let itemData = null;
    if (type === "ingredient")
      itemData = data.find((item) => item._id === itemId);
    setModalData({ type, itemData });
    setModaVisibility(true);
  };

  const handleModalClose = (evt) => {
    // закрытие попапа по нажатию на оверлей, но не на нем самом
    if (
      (modalRef && !modalRef.current.contains(evt.target)) ||
      (closeIconRef && closeIconRef.current.contains(evt.target))
    )
      setModaVisibility(false);
  };

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients data={data} onOpen={handleModalOpen} />
        <BurgerConstructor data={data} onOpen={handleModalOpen} />
        {modalVisibility && (
          <Modal
            modalRef={modalRef}
            closeIconRef={closeIconRef}
            onClose={handleModalClose}
          >
            {modalData.type === "ingredient" ? (
              <IngredientInfo />
            ) : (
              <OrderSummary />
            )}
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
