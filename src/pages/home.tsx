import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'components/modal/modal';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import OrderDetails from 'components/order-details/order-details';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import {
  resetIngredients,
  setIngredientToView,
} from 'services/slices/ingredients';
import { resetOrder } from 'services/slices/order';
import { IIngredientsData } from 'services/types/data';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
} from 'services/selectors/ingredients';
import { selectOrderFailed, selectOrderNumber } from 'services/selectors/order';
import styles from './home.module.css';

const HomePage: React.VFC = () => {
  const ingredients = useSelector(selectIngredients);

  const ingredientsRequest = useSelector(selectIngredientsRequest);

  const ingredientsFailed = useSelector(selectIngredientsFailed);

  const orderNumber = useSelector(selectOrderNumber);

  const orderFailed = useSelector(selectOrderFailed);

  const dispatch = useDispatch();

  const handleIngredientModalOpen = useCallback(
    (evt) => {
      const eventTarget = evt.target as HTMLDivElement;
      if (!eventTarget.closest('.constructor-element__action')) {
        // если в конструкторе нажата кнопка "Удалить ингредиент", не открывать попап
        const ingredientId = eventTarget.closest('li')?.dataset.id;
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

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetIngredients());
  }, [dispatch]);

  const handleOrderDetailsModalClose = useCallback(() => {
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <main className={styles.homePage}>
      <ErrorIndicator
        isLoading={ingredientsRequest}
        hasError={ingredientsFailed}
        hasData={Boolean(ingredients?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
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
        <ErrorIndicator
          hasError={orderFailed}
          hasData={Boolean(orderNumber)}
          onErrorModalClose={handleErrorModalClose}
          errorMessage="Пожалуйста, повторите попытку позднее"
        >
          <Modal onClose={handleOrderDetailsModalClose}>
            <OrderDetails />
          </Modal>
        </ErrorIndicator>
      </ErrorIndicator>
    </main>
  );
};

export default HomePage;
