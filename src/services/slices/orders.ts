import { IOrderData, IOrdersData } from 'services/types/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TOrdersState = {
  wsConnected: boolean;
  wsError: boolean;
  orders: Array<IOrderData>;
  orderToView: IOrderData | null | undefined;
  total: number;
  totalToday: number;
};

const ordersInitialState: TOrdersState = {
  wsConnected: false,
  wsError: false,
  orders: [],
  orderToView: null,
  total: 0,
  totalToday: 0,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {
    getAllOrdersWsStart(state) {
      return state;
    },
    getUserOrdersWsStart(state) {
      return state;
    },
    getOrdersWsSuccess(state) {
      state.wsConnected = true;
    },
    getOrdersWsError(state) {
      state.wsConnected = false;
      state.wsError = true;
    },
    getOrdersWsClosed(state) {
      state.wsConnected = false;
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
  getAllOrdersWsStart,
  getUserOrdersWsStart,
  getOrdersWsSuccess,
  getOrdersWsError,
  getOrdersWsClosed,
  getOrders,
  setOrderToView,
  resetOrderToView,
  resetOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
