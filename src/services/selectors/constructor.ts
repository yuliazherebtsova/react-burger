/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'services/types';

export const selectBunElement = (state: TRootState) =>
  state.burgerConstructor.bunElement;
export const selectDraggableElements = (state: TRootState) =>
  state.burgerConstructor.draggableElements;

export const getTotalPrice = createSelector(
  selectBunElement,
  selectDraggableElements,
  (bunElement, draggableElements) => {
    const bunsPrice = bunElement.type === 'bun' ? bunElement.price * 2 : 0;
    const nonBunElementsPrice = draggableElements.reduce(
      (acc, item) => acc + item.price,
      0
    );
    return bunsPrice + nonBunElementsPrice;
  }
);

export const getIngredientCounter = (id: string) =>
  createSelector(
    selectBunElement,
    selectDraggableElements,
    (bunElement, draggableElements) =>
      [bunElement, ...draggableElements, bunElement].filter(
        (item) => item._id === id
      ).length
  );
