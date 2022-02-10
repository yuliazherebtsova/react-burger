import React, { useCallback, useEffect } from 'react';
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
import { IIngredientsData } from 'services/types/data';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
  selectIngredientToView,
} from 'services/selectors/ingredients';
import { selectOrderFailed, selectOrderNumber } from 'services/selectors/order';

const App: React.FC = () => {
  const ingredients = useSelector(selectIngredients);
  const ingredientToView = useSelector(selectIngredientToView);
  const ingredientsRequest = useSelector(selectIngredientsRequest);
  const ingredientsFailed = useSelector(selectIngredientsFailed);
  const orderNumber = useSelector(selectOrderNumber);
  const orderFailed = useSelector(selectOrderFailed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

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
