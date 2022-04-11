import React, { useCallback } from 'react';
import OrderContents from 'components/order-contents/order-contents';
import { selectOrders } from 'services/selectors/orders';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { resetOrders } from 'services/slices/orders';
import styles from './order-contents.module.css';

const OrderContentsPage: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetOrders());
  }, [dispatch]);

  return (
    <main className={styles.order__container}>
      <ErrorIndicator
        isLoading={false}
        hasError={false}
        hasData={Boolean(orders?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
        onErrorModalClose={handleErrorModalClose}
      >
        <OrderContents />
      </ErrorIndicator>
    </main>
  );
};

export default OrderContentsPage;
