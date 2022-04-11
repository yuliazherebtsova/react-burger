/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'services/types';
import { selectIngredients } from './ingredients';

export const selectWsConnected = (state: TRootState) => state.orders.wsConnected;
export const selectWsError = (state: TRootState) => state.orders.wsError;
export const selectOrders = (state: TRootState) => state.orders.orders;
export const selectTotalOrders = (state: TRootState) => state.orders.total;
export const selectTotalTodayOrders = (state: TRootState) =>
  state.orders.totalToday;
export const selectOrderToView = (state: TRootState) =>
  state.orders.orderToView;

export const getOrderPrice = (ingredients: string[]) =>
  createSelector(selectIngredients, (ingredientsData) =>
    ingredients
      .map((id) => {
        const ingredient = ingredientsData.find(
          (item) => item._id === id
        );
        if (ingredient?.type === 'bun') {
          return ingredient.price * 2;
        }
        return ingredient?.price;
      })
      .reduce((acc, price) => {
        if (acc && price) {
          return acc + price;
        }
        return 0;
      })
  );
