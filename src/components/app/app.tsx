import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'components/modal/modal';
import appStyles from 'components/app/app.module.css';
import AppHeader from 'components/app-header/app-header';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import OrderDetails from 'components/order-details/order-details';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import LoadingIndicatorHOC from 'components/loading-indicator-hoc/loading-indicator-hoc';
import {
  resetIngredientToView,
  resetIngredients,
  setIngredientToView,
  geIIngredientsData,
} from 'services/actions/ingredients';
import { resetOrder } from 'services/actions/order';

interface IOnModalOpen {
  (evt: React.ChangeEvent<HTMLInputElement>): void;
}

interface IOnModalClose {
  (): void;
}

const App: React.FC = () => {
  const {
    ingredients,
    ingredientToView,
    ingredientsRequest,
    ingredientsFailed,
    orderNumber,
    orderFailed,
  } = useSelector((state: any) => ({
    ingredients: state.burgerIngredients.ingredients,
    ingredientToView: state.burgerIngredients.ingredientToView,
    ingredientsRequest: state.burgerIngredients.ingredientsRequest,
    ingredientsFailed: state.burgerIngredients.ingredientsFailed,
    orderNumber: state.order.orderNumber,
    orderFailed: state.order.orderFailed,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(geIIngredientsData());
  }, [dispatch]);

  const handleIngredientModalOpen = useCallback<IOnModalOpen>(
    (evt) => {
      if (!evt.target.closest('.constructor-element__action')) {
        // если в конструкторе нажата кнопка "Удалить ингредиент", не открывать попап
        const ingredientId = evt.target.closest('li')!.dataset.id;
        dispatch(
          setIngredientToView(
            ingredients.find((item: any) => item._id === ingredientId)
          )
        );
      }
    },
    [dispatch, ingredients]
  );

  const handleIngredientModalClose = useCallback<IOnModalClose>(() => {
    dispatch(resetIngredientToView());
  }, [dispatch]);

  const handleErrorModalClose = useCallback<IOnModalClose>(() => {
    dispatch(resetIngredients());
  }, [dispatch]);

  const handleOrderModalClose = useCallback<IOnModalClose>(() => {
    dispatch(resetOrder());
  }, [dispatch]);

  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <>
      <AppHeader />
      <main className={appStyles.page}>
        <LoadingIndicatorHOC
          isLoading={ingredientsRequest}
          hasError={ingredientsFailed}
          gotData={Boolean(ingredients.length)}
          onErrorModalClose={handleErrorModalClose}
        >
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients
              onOpenModalWithIngredient={handleIngredientModalOpen}
            />
            <BurgerConstructor
              onOpenModalWithIngredient={handleIngredientModalOpen}
            />
          </DndProvider>
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
            onErrorModalClose={handleOrderModalClose}
          >
            <Modal onClose={handleOrderModalClose}>
              <OrderDetails />
            </Modal>
          </LoadingIndicatorHOC>
        </LoadingIndicatorHOC>
      </main>
    </>
  );
};

export default App;
