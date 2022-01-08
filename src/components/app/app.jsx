import { useState, useEffect, useReducer } from 'react';
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
import {
  ingredientsInitialState,
  orderInitialState,
  constructorInitialState,
} from 'utils/constants';
import LoadingIndicatorHOC from 'components/loading-indicator-hoc/loading-indicator-hoc';

function App() {
  const [ingredientToView, setIngredientToView] = useState(null);

  const [ingredientsState, setIngredientsState] = useState(
    ingredientsInitialState
  );

  const [orderState, setOrderState] = useState(orderInitialState);

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

  const handleErrorModalClose = () => {
    setIngredientsState(ingredientsInitialState);
  };

  const handleOrderModalClose = () => {
    setOrderState(orderInitialState);
  };

  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <>
      <AppHeader />
      <main className={appStyles.page}>
        <LoadingIndicatorHOC
          isLoading={ingredientsState.isLoading}
          hasError={ingredientsState.hasError}
          gotData={Boolean(ingredientsState.data.length)}
          onClick={handleErrorModalClose}
        >
          <IngredientsContext.Provider
            value={{ ingredientsState, setIngredientsState }}
          >
            <BurgerIngredients onOpenModal={handleIngredientModalOpen} />
            <ConstructorContext.Provider
              value={{ constructorState, setConstructorState }}
            >
              <OrderContext.Provider value={{ orderState, setOrderState }}>
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
                <LoadingIndicatorHOC
                  hasError={orderState.hasError}
                  gotData={Boolean(orderState.number)}
                  onClick={handleOrderModalClose}
                >
                  <Modal onClose={handleOrderModalClose}>
                    <OrderDetails />
                  </Modal>
                </LoadingIndicatorHOC>
              </OrderContext.Provider>
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
        </LoadingIndicatorHOC>
      </main>
    </>
  );
}

export default App;
