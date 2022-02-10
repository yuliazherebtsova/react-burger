/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRootState } from 'services/types';

export const selectIngredients = (state: TRootState) =>
  state.burgerIngredients.ingredients;
export const selectIngredientToView = (state: TRootState) =>
  state.burgerIngredients.ingredientToView;
export const selectIngredientsRequest = (state: TRootState) =>
  state.burgerIngredients.ingredientsRequest;
export const selectIngredientsFailed = (state: TRootState) =>
  state.burgerIngredients.ingredientsFailed;
