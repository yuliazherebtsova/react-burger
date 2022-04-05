import React, { useCallback } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useSelector, useDispatch } from 'services/types/hooks';
import { selectOrders } from 'services/selectors/orders';
import OrdersList from 'components/orders-list/orders-list';
import OrdersDashboard from 'components/orders-dashboard/orders-dashboard';
import { IOrderData } from 'services/types/data';
import { resetIngredients } from 'services/slices/ingredients';
import { setOrderToView } from 'services/slices/orders';
import styles from './feed.module.css';

const FeedPage: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();
  
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
    <main className={styles.feedPage}>
      <ErrorIndicator
        isLoading={false}
        hasError={false}
        hasData={Boolean(orders?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
        onErrorModalClose={handleErrorModalClose}
      >
        <OrdersList onOpenModalWithOrder={handleOrderModalOpen}/>
        <OrdersDashboard/>
      </ErrorIndicator>
    </main>
  );
};

export default FeedPage;
