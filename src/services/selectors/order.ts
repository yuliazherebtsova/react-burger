/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRootState } from 'services/types';

export const selectOrderRequest = (state: TRootState) =>
  state.order.orderRequest;
  export const selectOrderFailed = (state: TRootState) =>
  state.order.orderFailed;
export const selectOrderNumber = (state: TRootState) => state.order.orderNumber;
