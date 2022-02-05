/* eslint-disable func-names */
/* eslint-disable no-console */
import { api } from 'utils/api';
import { resetConstructor } from 'services/actions/constructor';
import { TIngredientsData } from 'services/types//data';

/*
 * типы экшенов
 */

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

/*
 * генераторы экшенов
 */

// Типизация экшенов
export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: string;
}

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export function postOrderRequest() {
  return {
    type: POST_ORDER_REQUEST,
  };
}

export function postOrderSuccess(orderNumber: string): IPostOrderSuccess {
  return {
    type: POST_ORDER_SUCCESS,
    orderNumber,
  };
}

export function postOrderFailed(): IPostOrderFailed {
  return {
    type: POST_ORDER_FAILED,
  };
}

export function resetOrder(): IResetOrder {
  return {
    type: RESET_ORDER,
  };
}

export function postOrder(ingredientsData : TIngredientsData) {
  return function (dispatch: any) {
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
