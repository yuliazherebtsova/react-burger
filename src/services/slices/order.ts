import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TOrderState = {
  orderNumber: string | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const orderInitialState: TOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    postOrderRequest(state) {
      state.orderRequest = true;
    },
    postOrderSuccess(state, action: PayloadAction<string>) {
      state.orderFailed = false;
      state.orderRequest = false;
      state.orderNumber = action.payload;
    },
    postOrderFailed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
    },
    resetOrder() {
      return orderInitialState;
    },
  },
});

export const {
  postOrderRequest,
  postOrderSuccess,
  postOrderFailed,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
