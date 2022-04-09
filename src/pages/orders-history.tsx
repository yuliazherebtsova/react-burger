import React, { useCallback, useEffect } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { resetIngredients } from 'services/slices/ingredients';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
} from 'services/selectors/ingredients';
import OrdersList from 'components/orders-list/orders-list';
import { selectOrders } from 'services/selectors/orders';
import {
  getOrdersWsClosed,
  getUserOrdersWsStart,
  setOrderToView,
} from 'services/slices/orders';
import { IOrderData } from 'services/types/data';
import styles from './orders-history.module.css';

const OrdersHistoryPage: React.VFC = () => {
  const ingredients = useSelector(selectIngredients);

  const orders = useSelector(selectOrders);

  const ingredientsRequest = useSelector(selectIngredientsRequest);

  const ingredientsFailed = useSelector(selectIngredientsFailed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersWsStart());
    return () => {
      dispatch(getOrdersWsClosed());
    };
  }, [dispatch]);

  const handleOrderModalOpen = useCallback(
    (evt) => {
      const eventTarget = evt.target as HTMLDivElement;
      const orderId = eventTarget.closest('li')?.dataset.id;
      const order = orders.find((item: IOrderData) => item._id === orderId);
      if (order) {
        dispatch(setOrderToView(order));
      }
    },
    [dispatch, orders]
  );

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetIngredients());
  }, [dispatch]);

  return (
    <section className={styles.ordersHistory__container}>
      <ErrorIndicator
        isLoading={ingredientsRequest}
        hasError={ingredientsFailed}
        hasData={Boolean(ingredients?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
        onErrorModalClose={handleErrorModalClose}
      >
        <OrdersList onOpenModalWithOrder={handleOrderModalOpen} />
      </ErrorIndicator>
    </section>
  );
};

export default OrdersHistoryPage;
