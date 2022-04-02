/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { resetIngredients } from 'services/slices/ingredients';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
} from 'services/selectors/ingredients';
import OrdersList from 'components/orders-list/orders-list';
import { selectOrders, selectOrderToView } from 'services/selectors/orders';
import Modal from 'components/modal/modal';
import { resetOrderToView, setOrderToView } from 'services/slices/orders';
import { useHistory } from 'react-router-dom';
import { IOrderData } from 'services/types/data';
import OrderContents from 'components/order-contents/order-contents';
import styles from './orders-history.module.css';

const OrdersHistoryPage: React.VFC = () => {
  const ingredients = useSelector(selectIngredients);

  const orders = useSelector(selectOrders);

  const ingredientsRequest = useSelector(selectIngredientsRequest);

  const ingredientsFailed = useSelector(selectIngredientsFailed);

  const orderToView = useSelector(selectOrderToView);

  const dispatch = useDispatch();

  const history = useHistory();

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

  const handleOrderModalClose = useCallback(() => {
    dispatch(resetOrderToView());
    history.replace('/profile/orders');
  }, [dispatch, history]);

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
        <OrdersList onOpenModalWithOrder={handleOrderModalOpen}/>
        {orderToView && (
          <Modal onClose={handleOrderModalClose}>
            <OrderContents />
          </Modal>
        )}
      </ErrorIndicator>
    </section>
  );
};

export default OrdersHistoryPage;
