import { useState, useEffect } from 'react';
import Modal from 'components/modal/modal';
import { OrderContext } from 'utils/appContext';
import appStyles from 'components/app/app.module.css';
import AppHeader from 'components/app-header/app-header';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import OrderDetails from 'components/order-details/order-details';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { orderInitialState } from 'utils/constants';
import LoadingIndicatorHOC from 'components/loading-indicator-hoc/loading-indicator-hoc';
import { getIngredientsData } from 'services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => ({
      ingredients: state.burgerIngredients.ingredients,
      ingredientsRequest: state.burgerIngredients.ingredientsRequest,
      ingredientsFailed: state.burgerIngredients.ingredientsFailed,
    })
  );

  const dispatch = useDispatch();

  const [ingredientToView, setIngredientToView] = useState(null);

  const [orderState, setOrderState] = useState(orderInitialState);

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
        </LoadingIndicatorHOC>
      </main>
    </>
  );
}

export default App;
