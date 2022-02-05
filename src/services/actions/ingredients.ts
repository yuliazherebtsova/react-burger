/* eslint-disable func-names */
/* eslint-disable no-console */
import { api } from 'utils/api';
import { TIngredientsData } from 'services/types/data';

/*
 * типы экшенов
 */
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
  'GET_INGREDIENTS_FAILED';
export const SET_INGREDIENT_TO_VIEW: 'SET_INGREDIENT_TO_VIEW' =
  'SET_INGREDIENT_TO_VIEW';
export const RESET_INGREDIENT_TO_VIEW: 'RESET_INGREDIENT_TO_VIEW' =
  'RESET_INGREDIENT_TO_VIEW';
export const RESET_INGREDIENTS: 'RESET_INGREDIENTS' = 'RESET_INGREDIENTS';

/*
 * генераторы экшенов
 */

// Типизация экшенов
export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredientsData>;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetIngredientToView {
  readonly type: typeof SET_INGREDIENT_TO_VIEW;
  readonly ingredient: TIngredientsData;
}

export interface IResetIngredientToView {
  readonly type: typeof RESET_INGREDIENT_TO_VIEW;
}

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

function getIngredientsRequest(): IGetIngredientsRequest {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
}

function getIngredientsSuccess(
  ingredients: ReadonlyArray<TIngredientsData>
): IGetIngredientsSuccess {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
  };
}

function getIngredientsFailed(): IGetIngredientsFailed {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
}

export function setIngredientToView(
  ingredient: TIngredientsData
): ISetIngredientToView {
  return {
    type: SET_INGREDIENT_TO_VIEW,
    ingredient,
  };
}

export function resetIngredientToView(): IResetIngredientToView {
  return {
    type: RESET_INGREDIENT_TO_VIEW,
  };
}

export function resetIngredients(): IResetIngredients {
  return {
    type: RESET_INGREDIENTS,
  };
}

export function getIngredientsData() {
  return function (dispatch: any) {
    dispatch(getIngredientsRequest());
    api
      .getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data));
        } else {
          dispatch(getIngredientsFailed());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
        console.log(`Ошибка загрузки ингредиентов: ${err}`);
      });
  };
}
