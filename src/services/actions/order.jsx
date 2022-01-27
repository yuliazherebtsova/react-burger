/* eslint-disable func-names */
/* eslint-disable no-console */
import { api } from 'utils/api';
import { resetConstructor } from 'services/actions/constructor';

/*
 * типы экшенов
 */

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

/*
 * генераторы экшенов
 */

export function resetOrder() {
  return { type: RESET_ORDER };
}

function postOrderSuccess(orderNumber) {
  return { type: POST_ORDER_SUCCESS, orderNumber };
}

function postOrderRequest() {
  return { type: POST_ORDER_REQUEST };
}

function postOrderFailed() {
  return { type: POST_ORDER_FAILED };
}

export function postOrder(ingredientsData) {
  return function (dispatch) {
    dispatch(postOrderRequest());
    api
      .postOrder(ingredientsData)
      .then((res) => {
        if (res && res.success) {
          dispatch(postOrderSuccess(res.order.number));
        } else {
          dispatch(postOrderFailed());
        }
      })
      .then(() => {
        dispatch(resetConstructor());
      })
      .catch((err) => {
        dispatch(postOrderFailed());
        console.log(`Ошибка оформления заказа: ${err}`);
      });
  };
}
