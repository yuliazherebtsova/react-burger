/**
 * * TODO
 * * 1. типизация хуков редакс
 * * 2. проверить все any
 * * 3. типизировать оставшиеся компоненты (6 штук)
 * * 4. протестировать функционал и убрать warnings
 */

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
} from 'services/slices/ingredients';
import { resetOrder } from 'services/slices/order';
import getIngredientsData from 'services/thunks/ingredients';
import { TRootState } from 'services/types';
import { IIngredientsData } from 'services/types/data';

const App: React.FC = () => {
  const {
    ingredients,
    ingredientToView,
    ingredientsRequest,
    ingredientsFailed,
    orderNumber,
    orderFailed,
  } = useSelector((state: TRootState) => ({
    ingredients: state.burgerIngredients.ingredients,
    ingredientToView: state.burgerIngredients.ingredientToView,
    ingredientsRequest: state.burgerIngredients.ingredientsRequest,
    ingredientsFailed: state.burgerIngredients.ingredientsFailed,
    orderNumber: state.order.orderNumber,
    orderFailed: state.order.orderFailed,
  }));

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  const handleIngredientModalOpen = useCallback(
    (evt) => {
      if (!evt.target.closest('.constructor-element__action')) {
        // если в конструкторе нажата кнопка "Удалить ингредиент", не открывать попап
        const ingredientId: string = evt.target.closest('li').dataset.id;
        const ingredient = ingredients.find(
          (item: IIngredientsData) => item._id === ingredientId
        );
        if (ingredient) {
          dispatch(setIngredientToView(ingredient));
        }
      }
    },
    [dispatch, ingredients]
  );

  const handleIngredientModalClose = useCallback(() => {
    dispatch(resetIngredientToView());
  }, [dispatch]);

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetIngredients());
  }, [dispatch]);

  const handleOrderModalClose = useCallback(() => {
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={appStyles.page}>
        <LoadingIndicatorHOC
          isLoading={ingredientsRequest}
          hasError={ingredientsFailed}
          gotData={Boolean(ingredients?.length)}
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
