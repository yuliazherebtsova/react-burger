import { useState, useEffect, useReducer } from 'react';
import Modal from 'components/modal/modal';
import { ConstructorContext, OrderContext } from 'utils/appContext';
import appStyles from 'components/app/app.module.css';
import AppHeader from 'components/app-header/app-header';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import OrderDetails from 'components/order-details/order-details';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { orderInitialState, constructorInitialState } from 'utils/constants';
import LoadingIndicatorHOC from 'components/loading-indicator-hoc/loading-indicator-hoc';
import { getIngredientsData } from 'services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => ({
      ingredients: state.ingredients.ingredients,
      ingredientsRequest: state.ingredients.ingredientsRequest,
      ingredientsFailed: state.ingredients.ingredientsFailed,
    })
  );

  const dispatch = useDispatch();

  const [ingredientToView, setIngredientToView] = useState(null);

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
    dispatch(getIngredientsData());
  }, [dispatch]);

  const handleIngredientModalOpen = ({ itemId }) => {
    setIngredientToView();
    ingredients.find((item) => item._id === itemId)
  };

  const handleIngredientModalClose = () => {
    setIngredientToView(null);
  };

  const handleErrorModalClose = () => {
    //setIngredientsState(ingredientsInitialState);
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
          isLoading={ingredientsRequest}
          hasError={ingredientsFailed}
          gotData={Boolean(ingredients.length)}
          onClick={handleErrorModalClose}
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
                isLoading={false}
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
        </LoadingIndicatorHOC>
      </main>
    </>
  );
}

export default App;
