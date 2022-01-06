import { useMemo, useState, useEffect, useReducer } from 'react';
import Modal from 'components/modal/modal';
import {
  IngredientsContext,
  ConstructorContext,
  OrderContext,
} from 'utils/appContext';
import appStyles from 'components/app/app.module.css';
import AppHeader from 'components/app-header/app-header';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import OrderDetails from 'components/order-details/order-details';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { api } from 'utils/api';

function App() {
  const [ingredientToView, setIngredientToView] = useState(null);

  const [ingredientsState, setIngredientsState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const [orderState, setOrderState] = useState(null);

  const constructorInitialState = { bun: null, draggableItem: [] };

  function constructorReducer(state, action) {
    switch (action.type) {
      case 'reset':
        return constructorInitialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [constructorState, setConstructorState] = useReducer(
    constructorReducer,
    constructorInitialState,
    undefined
  );

  useEffect(() => {
    const getIngredientsData = async () => {
      setIngredientsState({
        ...ingredientsState,
        hasError: false,
        isLoading: true,
      });
      try {
        const res = await api.getIngredients();
        /* в такой реализации state после await может быть уже не актуальный,
        нужно использовать setState с функцией, чтобы применять актуальный стейт */
        setIngredientsState((prevState) => ({
          ...prevState,
          data: res.data,
          isLoading: false,
        }));
      } catch (err) {
        setIngredientsState((prevState) => ({
          ...prevState,
          hasError: true,
          isLoading: false,
        }));
      }
    };
    getIngredientsData();
  }, []);

  const handleIngredientModalOpen = ({ itemId }) => {
    setIngredientToView(
      ingredientsState.data.find((item) => item._id === itemId)
    );
  };

  const handleOrderModalOpen = ({ number }) => {
    setOrderState(number);
  };

  const handleIngredientModalClose = () => {
    setIngredientToView(null);
  };

  const handleOrderModalClose = () => {
    setOrderState(null);
  };

  const ingredientsContextProvider = useMemo(
    () => ({ ingredientsState, setIngredientsState }),
    [ingredientsState, setIngredientsState]
  );

  const constructorContextProvider = useMemo(
    () => ({ constructorState, setConstructorState }),
    [constructorState, setConstructorState]
  );

  const orderContextProvider = useMemo(
    () => ({ orderState, setOrderState }),
    [orderState, setOrderState]
  );

  return (
    <>
      <AppHeader />
      <main className={appStyles.page}>
        {ingredientsState.isLoading && (
          <p className="text text_type_main-medium text_color_inactive pt-10">
            Загрузка...
          </p>
        )}
        {ingredientsState.hasError && (
          <p className="text text_type_main-medium text_color_inactive pt-10">
            Ошибка загрузки данных
          </p>
        )}
        {!ingredientsState.isLoading &&
          !ingredientsState.hasError &&
          ingredientsState.data.length && (
            <IngredientsContext.Provider value={ingredientsContextProvider}>
              <BurgerIngredients onOpenModal={handleIngredientModalOpen} />
              <ConstructorContext.Provider value={constructorContextProvider}>
                <OrderContext.Provider value={orderContextProvider}>
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
                  {orderState && (
                    <Modal onClose={handleOrderModalClose}>
                      <OrderDetails />
                    </Modal>
                  )}
                </OrderContext.Provider>
              </ConstructorContext.Provider>
            </IngredientsContext.Provider>
          )}
      </main>
    </>
  );
}

export default App;
