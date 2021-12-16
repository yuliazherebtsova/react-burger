/**
 ** 1. Переключение вкладок
 ** 2. Правки промежуточного ревью
 ** 3. Загрузка данных с API
 */

import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
//import data from "../../utils/data"; // локальной отладки
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Api from "../../utils/api";
import { BASE_URL } from "../../utils/constants";

function App() {
  const [modalVisibility, setModaVisibility] = useState(false);
  const modalRef = React.createRef(); // forwardRef?
  const closeIconRef = React.createRef();
  const [modalData, setModalData] = useState({ type: null, data: null });

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const api = new Api({
    // объект для работы с api сервера (с использованием fetch)
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    debugger
    console.log('useEffect')
    const getIngredientsData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      try {
        const data = await api.getIngredients();
        setState({ ...state, data: data.data, isLoading: false });
        console.log(state);
      } catch (err) {
        setState({ ...state, hasError: true, isLoading: false });
      }
    };
    getIngredientsData();
  }, []);

  const { data, isLoading, hasError } = state;

  const handleModalOpen = ({ modalType, itemId }) => {
    let modalData = null;
    if (modalType === "ingredientInfo")
      modalData = data.find((item) => item._id === itemId);
    else {
      if (modalType === "orderSummary") {
        const orderNumber = "034536"; // временно хардкод по макету
        modalData = { orderNumber: orderNumber };
      }
    }
    setModalData({ type: modalType, data: modalData });
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
      <main className={appStyles.page}>
        {isLoading && (
          <p className="text text_type_main-medium text_color_inactive pt-10">
            Загрузка...
          </p>
        )}
        {hasError && (
          <p className="text text_type_main-medium text_color_inactive pt-10">
            Ошибка загрузки данных
          </p>
        )}
        {!isLoading && !hasError && data.length && (
          <>
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
          </>
        )}
      </main>
    </>
  );
}

export default App;
