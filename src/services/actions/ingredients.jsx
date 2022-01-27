/* eslint-disable func-names */
/* eslint-disable no-console */
import { api } from 'utils/api';

/*
 * типы экшенов
 */
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_INGREDIENT_TO_VIEW = 'SET_INGREDIENT_TO_VIEW';
export const RESET_INGREDIENT_TO_VIEW = 'RESET_INGREDIENT_TO_VIEW';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

/*
 * генераторы экшенов
 */

export function setIngredientToView(ingredient) {
  return { type: SET_INGREDIENT_TO_VIEW, payload: ingredient };
}

export function resetIngredientToView() {
  return { type: RESET_INGREDIENT_TO_VIEW };
}

export function resetIngredients() {
  return { type: RESET_INGREDIENTS };
}

function getIngredientsSuccess(ingredients) {
  return { type: GET_INGREDIENTS_SUCCESS, ingredients };
}

function getIngredientsRequest() {
  return { type: GET_INGREDIENTS_REQUEST };
}

function getIngredientsFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

export function getIngredientsData() {
  return function (dispatch) {
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
