import { IOrderData, IOrdersData } from 'services/types/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TOrdersState = {
  wsConnected: boolean;
  orders: Array<IOrderData>;
  orderToView: IOrderData | null | undefined;
  total: number;
  totalToday: number;
  error?: Event;
};

const ordersInitialState: TOrdersState = {
  wsConnected: false,
  orders: [],
  orderToView: null,
  total: 0,
  totalToday: 0,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {
    getOrdersWsStart(state) {
      return state;
    },
    getOrdersWsSuccess(state) {
      return state;
    },
    getOrdersWsError(state) {
      return state;
    },
    getOrdersWsClosed(state) {
      return state;
    },
    getOrders(state, action: PayloadAction<IOrdersData>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setOrderToView(state, action: PayloadAction<IOrderData>) {
      state.orderToView = action.payload;
    },
    resetOrderToView(state) {
      state.orderToView = null;
    },
    resetOrders() {
      return ordersInitialState;
    },
  },
});

export const {
  getOrdersWsStart,
  getOrdersWsSuccess,
  getOrdersWsError,
  getOrdersWsClosed,
  getOrders,
  setOrderToView,
  resetOrderToView,
  resetOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
