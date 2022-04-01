/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRootState } from 'services/types';

export const selectOrders = (state: TRootState) => state.orders.orders;
export const selectTotalOrders = (state: TRootState) => state.orders.total;
export const selectTotalTodayOrders = (state: TRootState) => state.orders.totalToday;
