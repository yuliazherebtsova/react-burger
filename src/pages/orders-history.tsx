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
import styles from './orders-history.module.css';

const OrdersHistoryPage: React.VFC = () => {
  const ingredients = useSelector(selectIngredients);

  const ingredientsRequest = useSelector(selectIngredientsRequest);

  const ingredientsFailed = useSelector(selectIngredientsFailed);

  const dispatch = useDispatch();

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
        <OrdersList />
      </ErrorIndicator>
    </section>
  );
};

export default OrdersHistoryPage;
