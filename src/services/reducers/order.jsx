/* eslint-disable default-param-last */
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  RESET_ORDER
} from 'services/actions/order';

const orderInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

export default (state = orderInitialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.orderNumber,
        orderRequest: false,
      };
    }
    case POST_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case RESET_ORDER: {
      return orderInitialState;
    }
    default: {
      return state;
    }
  }
};
