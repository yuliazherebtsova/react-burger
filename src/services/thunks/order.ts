import { IIngredientsData } from 'services/types/data';
import { AppThunk } from 'services/types';
import { api } from 'utils/api';
import { resetConstructor } from 'services/slices/constructor';
import {
  postOrderRequest,
  postOrderSuccess,
  postOrderFailed,
} from '../slices/order';


const postOrder: AppThunk =
  (ingredientsData: IIngredientsData) =>
  (dispatch) => {
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
        // eslint-disable-next-line no-console
        console.log(`Ошибка оформления заказа: ${err}`);
      });
  };

export default postOrder;