import { useState, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { api } from "../../utils/api";
import { OrderContext } from "utils/appContext";

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [ingredientToView, setIngredientToView] = useState(null);

  const [orderData, setOrderData] = useState({
    isLoading: false,
    hasError: false,
    number: null,
  });

  useEffect(() => {
    const getIngredientsData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      try {
        const data = await api.getIngredients();
        /* в такой реализации state после await может быть уже не актуальный,
        нужно использовать setState с функцией, чтобы применять актуальный стейт */
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

  const { orderNumber, isOrderLoading, hasOrderError } = orderData;

  const handleIngredientModalOpen = ({ itemId }) => {
    setIngredientToView(data.find((item) => item._id === itemId));
  };

  const handleOrderModalOpen = () => {
    const getOrderData = async () => {
      setOrderData({ ...state, hasError: false, isLoading: true });
      try {
        const data = await api.postOrder();
        setOrderData((prevState) => ({
          ...prevState,
          number: data.data,
          isLoading: false,
        }));
      } catch (err) {
        setOrderData((prevState) => ({
          ...prevState,
          hasError: true,
          isLoading: false,
        }));
      }
    };
    getOrderData();
  };

  const handleIngredientModalClose = () => {
    setIngredientToView(null);
  };

  const handleOrderModalClose = () => {
    setOrderData(null);
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
            <BurgerIngredients
              data={data}
              onOpenModal={handleIngredientModalOpen}
            />
            <OrderContext.Provider value={data}>
              <BurgerConstructor
                onOpenModalWithOrder={handleOrderModalOpen}
                onOpenModalWithIngredient={handleIngredientModalOpen}
              />
            </OrderContext.Provider>
            {ingredientToView && (
              <Modal
                title="Детали ингредиента"
                onClose={handleIngredientModalClose}
              >
                <IngredientDetails
                  image={ingredientToView.image}
                  name={ingredientToView.name}
                  fat={ingredientToView.fat}
                  carbohydrates={ingredientToView.carbohydrates}
                  calories={ingredientToView.calories}
                  proteins={ingredientToView.proteins}
                />
              </Modal>
            )}
            <Modal onClose={handleOrderModalClose}>
              {orderNumber && (
                <OrderDetails orderNumber={orderData.order.number} />
              )}
            </Modal>
          </>
        )}
      </main>
    </>
  );
}

export default App;
