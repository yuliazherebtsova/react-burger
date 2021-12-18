/**
 ** 1. Переключение вкладок хедера
 ** 2. Правки ("можно лучше") промежуточного ревью
 ** 3. gh-pages + README
 */

import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
//import data from "../../utils/data"; // для локальной отладки
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Api from "../../utils/api";
import { BASE_URL } from "../../utils/constants";

function App() {
  //const [modalVisibility, setModaVisibility] = useState(false);
  //const [modalData, setModalData] = useState({ type: null, data: null });

  const [modalData, setModalData] = useState({ type: null, data: null });
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
    const getIngredientsData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      try {
        const data = await api.getIngredients();
        {
          /* в такой реализации state после await может быть уже не актуальный,
        нужно использовать setState с функцией, чтобы применять актуальный стейт */
        }
        setState((prevState) => ({
          ...prevState,
          data: data.data,
          isLoading: false,
        }));
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          hasError: true,
          isLoading: false,
        }));
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

  const handleModalClose = () => {
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
