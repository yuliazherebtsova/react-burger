import React, { useCallback, useEffect } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectOrders,
  selectWsConnected,
  selectWsError,
} from 'services/selectors/orders';
import OrdersList from 'components/orders-list/orders-list';
import OrdersDashboard from 'components/orders-dashboard/orders-dashboard';
import { IOrderData } from 'services/types/data';
import {
  getAllOrdersWsStart,
  getOrdersWsClosed,
  resetOrders,
  setOrderToView,
} from 'services/slices/orders';
import styles from './feed.module.css';

const FeedPage: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();

  const ordersConnected = useSelector(selectWsConnected);

  const ordersFailed = useSelector(selectWsError);

  useEffect(() => {
    dispatch(getAllOrdersWsStart());
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
    <main className={styles.feedPage}>
      <ErrorIndicator
        isLoading={!ordersConnected && !ordersFailed}
        hasError={ordersFailed}
        hasData={Boolean(orders?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
        onErrorModalClose={handleErrorModalClose}
      >
        <OrdersList onOpenModalWithOrder={handleOrderModalOpen} />
        <OrdersDashboard />
      </ErrorIndicator>
    </main>
  );
};

export default FeedPage;
