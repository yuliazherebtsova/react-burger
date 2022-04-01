import React, { useCallback } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useSelector, useDispatch } from 'services/types/hooks';
import { selectOrders } from 'services/selectors/orders';
import { resetOrders } from 'services/slices/orders';
import OrdersList from 'components/orders-list/orders-list';
import OrdersDashboard from 'components/orders-dashboard/orders-dashboard';
import styles from './feed.module.css';

const FeedPage: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();
  const handleErrorModalClose = useCallback(() => {
    dispatch(resetOrders());
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
        <OrdersList/>
        <OrdersDashboard/>
      </ErrorIndicator>
    </main>
  );
};

export default FeedPage;
