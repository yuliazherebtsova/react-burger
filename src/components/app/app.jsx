import { useState, useEffect } from 'react';
import Modal from 'components/modal/modal';
import appStyles from 'components/app/app.module.css';
import AppHeader from 'components/app-header/app-header';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import OrderDetails from 'components/order-details/order-details';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import LoadingIndicatorHOC from 'components/loading-indicator-hoc/loading-indicator-hoc';
import { getIngredientsData } from 'services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const {
    ingredients,
    ingredientsRequest,
    ingredientsFailed,
    orderNumber,
    orderFailed,
  } = useSelector((state) => ({
    ingredients: state.burgerIngredients.ingredients,
    ingredientsRequest: state.burgerIngredients.ingredientsRequest,
    ingredientsFailed: state.burgerIngredients.ingredientsFailed,
    orderNumber: state.order.orderNumber,
    orderFailed: state.order.orderFailed,
  }));

  const dispatch = useDispatch();

  const [ingredientToView, setIngredientToView] = useState(null);

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  const handleIngredientModalOpen = ({ itemId }) => {
    setIngredientToView();
    ingredients.find((item) => item._id === itemId);
  };

  const handleIngredientModalClose = () => {
    setIngredientToView(null);
  };

  const handleErrorModalClose = () => {
    //setIngredientsState(ingredientsInitialState);
  };

  const handleOrderModalClose = () => {
    //setOrderState(orderInitialState);
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
            hasError={orderFailed}
            gotData={Boolean(orderNumber)}
            onClick={handleOrderModalClose}
          >
            <Modal onClose={handleOrderModalClose}>
              <OrderDetails />
            </Modal>
          </LoadingIndicatorHOC>
        </LoadingIndicatorHOC>
      </main>
    </>
  );
}

export default App;
