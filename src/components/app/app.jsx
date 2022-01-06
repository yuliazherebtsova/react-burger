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

  const orderInitialState = {
    isLoading: false,
    hasError: false,
    number: null,
  };
  const [orderState, setOrderState] = useState(orderInitialState);

  const constructorInitialState = {
    bun: { isEmpty: true },
    draggableItems: [],
  };

  function constructorReducer(state, action) {
    switch (action.type) {
      case 'ADD_BUN':
        return { ...state, bun: action.payload };
      case 'ADD_NON_BUN_ELEMENT':
        return {
          ...state,
          draggableItems: state.draggableItems.concat(action.payload),
        };
      case 'RESET':
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

  const handleIngredientModalClose = () => {
    setIngredientToView(null);
  };

  const handleOrderModalClose = () => {
    setOrderState(orderInitialState);
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
                  {!orderState.isLoading &&
                    !orderState.hasError &&
                    orderState.number && (
                      <Modal onClose={handleOrderModalClose}>
                        <OrderDetails />
                      </Modal>
                    )}
                  {!orderState.isLoading && orderState.hasError && (
                    <Modal
                      title="Ошибка создания заказа"
                      onClose={handleOrderModalClose}
                    >
                      <p className="text text_type_main-medium text_color_inactive pt-10">
                        Пожалуйста, повторите попытку позднее
                      </p>
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
