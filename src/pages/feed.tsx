import React, { useCallback } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useSelector, useDispatch } from 'services/types/hooks';
import { selectOrders, selectOrderToView } from 'services/selectors/orders';
import OrdersList from 'components/orders-list/orders-list';
import OrdersDashboard from 'components/orders-dashboard/orders-dashboard';
import { useHistory } from 'react-router-dom';
import { IOrderData } from 'services/types/data';
import OrderContents from 'components/order-contents/order-contents';
import Modal from 'components/modal/modal';
import { resetIngredients } from 'services/slices/ingredients';
import { resetOrderToView, setOrderToView } from 'services/slices/orders';
import styles from './feed.module.css';

const FeedPage: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const orderToView = useSelector(selectOrderToView);

  const history = useHistory();

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

  const handleOrderModalClose = useCallback(() => {
    dispatch(resetOrderToView());
    history.replace('/feed');
  }, [dispatch, history]);

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
        {orderToView && (
          <Modal onClose={handleOrderModalClose}>
            <OrderContents />
          </Modal>
        )}
        <OrdersDashboard/>
      </ErrorIndicator>
    </main>
  );
};

export default FeedPage;
