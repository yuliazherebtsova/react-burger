import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { WS_URL_ORDERS } from 'utils/constants';
import orderReducer from './slices/order';
import ingredientsReducer from './slices/ingredients';
import constructorReducer from './slices/constructor';
import authReducer from './slices/auth';
import ordersReducer, {
  getAllOrdersWsStart,
  getOrders,
  getOrdersWsClosed,
  getOrdersWsError,
  getOrdersWsSuccess,
  getUserOrdersWsStart,
} from './slices/orders';
import { socketMiddleware } from './middleware';

const wsOrdersActions = {
  wsAllOrdersInit: getAllOrdersWsStart.type,
  wsUserOrdersInit: getUserOrdersWsStart.type,
  onOpen: getOrdersWsSuccess.type,
  onClose: getOrdersWsClosed.type,
  onError: getOrdersWsError.type,
  onMessage: getOrders.type,
};

/**
 * Инициализируем хранилище с помощью  redux-toolkit,
 * указываем редьюсеры, подключаем Redux Devtools и thunks
 */
const store = configureStore({
  reducer: {
    order: orderReducer,
    burgerIngredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
  middleware: [thunk, socketMiddleware(WS_URL_ORDERS, wsOrdersActions)],
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
