import React, { useCallback } from 'react';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import ErrorIndicator from 'components/error-indicator/error-indicator';
import { resetIngredients } from 'services/slices/ingredients';
import { useSelector, useDispatch } from 'services/types/hooks';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
} from 'services/selectors/ingredients';
import styles from './ingredient.module.css';

const IngredientPage: React.VFC = () => {
  const ingredients = useSelector(selectIngredients);

  const ingredientsRequest = useSelector(selectIngredientsRequest);

  const ingredientsFailed = useSelector(selectIngredientsFailed);

  const dispatch = useDispatch();

  const handleErrorModalClose = useCallback(() => {
    dispatch(resetIngredients());
  }, [dispatch]);

  return (
    <main className={styles.indredient__container}>
      <ErrorIndicator
        isLoading={ingredientsRequest}
        hasError={ingredientsFailed}
        hasData={Boolean(ingredients?.length)}
        errorMessage="Пожалуйста, повторите попытку позднее"
        onErrorModalClose={handleErrorModalClose}
      >
        <IngredientDetails />
      </ErrorIndicator>
    </main>
  );
};

export default IngredientPage;
