/* eslint-disable func-names */
/* eslint-disable no-console */
import { api } from 'utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_INGREDIENT_TO_VIEW = 'SET_INGREDIENT_TO_VIEW';
export const RESET_INGREDIENT_TO_VIEW = 'RESET_INGREDIENT_TO_VIEW';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export function getIngredientsData() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    api
      .getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(`Ошибка загрузки ингредиентов: ${err}`);
      });
  };
}
