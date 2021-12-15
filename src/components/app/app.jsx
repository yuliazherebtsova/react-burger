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
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [modalVisibility, setModaVisibility] = useState(false);
  const modalRef = React.createRef(); // forwardRef?
  const closeIconRef = React.createRef();
  const [modalData, setModalData] = useState({ type: null, data: null });
  const [orderNumber, setNumber] = useState("034536");

  const handleModalOpen = ({ modalType, itemId }) => {
    let modalData = null;
    if (modalType === "ingredientInfo")
      modalData = data.find((item) => item._id === itemId);
    else {
      if (modalType === "orderSummary") modalData = {orderNumber: orderNumber};
    }

    setModalData({ type: modalType, data: modalData });
    setModaVisibility(true);
    console.log(modalData);
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
            {modalData.type === "ingredientInfo" ? (
              <IngredientDetails
                image={modalData.data.image}
                name={modalData.data.name}
                fat={modalData.data.fat}
                carbohydrates={modalData.data.carbohydrates}
                calories={modalData.data.calories}
                proteins={modalData.data.proteins}
              />
            ) : (
              <OrderDetails orderNumber={modalData.data.orderNumber} />
            )}
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
