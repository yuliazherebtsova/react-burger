import React, { useCallback, useEffect } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useSelector, useDispatch } from 'services/types/hooks';
import OrdersList from 'components/orders-list/orders-list';
import {
  selectOrders,
  selectWsConnected,
  selectWsError,
} from 'services/selectors/orders';
import {
  getOrdersWsClosed,
  getUserOrdersWsStart,
  resetOrders,
  setOrderToView,
} from 'services/slices/orders';
import { IOrderData } from 'services/types/data';
import styles from './orders-history.module.css';

const OrdersHistoryPage: React.VFC = () => {

  const orders = useSelector(selectOrders);

  const ordersConnected = useSelector(selectWsConnected);

  const ordersFailed = useSelector(selectWsError);

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
    dispatch(resetOrders());
  }, [dispatch]);

  return (
    <section className={styles.ordersHistory__container}>
      <ErrorIndicator
        isLoading={!ordersConnected && !ordersFailed}
        hasError={ordersFailed}
        hasData={Boolean(orders?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
        onErrorModalClose={handleErrorModalClose}
      >
        <OrdersList onOpenModalWithOrder={handleOrderModalOpen} />
      </ErrorIndicator>
    </section>
  );
};

export default OrdersHistoryPage;
