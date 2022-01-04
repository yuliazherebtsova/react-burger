import { useState, useEffect } from "react";
import Modal from "components/modal/modal";
import { ConstructorContext, OrderContext } from "utils/appContext";
import appStyles from "components/app/app.module.css";
import AppHeader from "components/app-header/app-header";
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "components/burger-constructor/burger-constructor";
import OrderDetails from "components/order-details/order-details";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import { api } from "utils/api";

function App() {
  const [ingredientToView, setIngredientToView] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const [state, setState] = useState({
    // ingredientsState
    isLoading: false,
    hasError: false,
    data: [],
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

  const handleIngredientModalOpen = ({ itemId }) => {
    setIngredientToView(data.find((item) => item._id === itemId));
  };

  const handleOrderModalOpen = ({ number }) => {
    setOrderNumber(number);
  };

  const handleIngredientModalClose = () => {
    setIngredientToView(null);
  };

  const handleOrderModalClose = () => {
    setOrderNumber(null);
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
            <ConstructorContext.Provider value={data}>
              <OrderContext.Provider>
                <BurgerConstructor
                  onOpenModalWithOrder={handleOrderModalOpen}
                  onOpenModalWithIngredient={handleIngredientModalOpen}
                />

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
                {orderNumber && (
                  <Modal onClose={handleOrderModalClose}>
                    <OrderDetails orderNumber={orderNumber} />
                  </Modal>
                )}
              </OrderContext.Provider>
            </ConstructorContext.Provider>
          </>
        )}
      </main>
    </>
  );
}

export default App;
