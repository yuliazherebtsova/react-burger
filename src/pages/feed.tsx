import React, { useCallback, useEffect } from 'react';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
  selectIngredientToView,
} from 'services/selectors/ingredients';
import { useHistory } from 'react-router-dom';
import { selectOrders } from 'services/selectors/orders';
import getOrdersData from 'services/thunks/orders';
import { resetOrders } from 'services/slices/orders';
import OrderItem from 'components/order-item/order-item';
import styles from './feed.module.css';

const FeedPage: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getOrdersData());
  }, [dispatch]);

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
        <OrderItem {...orders[0]}/>
      </ErrorIndicator>
    </main>
  );
};

export default FeedPage;
