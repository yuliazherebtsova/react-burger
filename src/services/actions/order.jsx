/* eslint-disable func-names */
/* eslint-disable no-console */
import { api } from 'utils/api';
import { RESET_CONSTRUCTOR } from 'services/actions/constructor';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export function postOrder(ingredientsData) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    api
      .postOrder(ingredientsData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({
            type: POST_ORDER_FAILED,
          });
        }
      })
      .then(() => {
        dispatch({
          type: RESET_CONSTRUCTOR,
        });
      })
      .catch((err) => console.log(`Ошибка оформления заказа: ${err}`));
  };
}
