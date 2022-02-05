import { TIngredientsData } from 'services/types/data';
/*
 * типы экшенов
 */

export const ADD_BUN_ELEMENT = 'ADD_BUN_ELEMENT';
export const ADD_NON_BUN_ELEMENT = 'ADD_NON_BUN_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const UPDATE_ELEMENTS_ORDER = 'UPDATE_ELEMENTS_ORDER';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

/*
 * генераторы экшенов
 */

// Типизация экшенов
export interface IAddBunElement {
  readonly type: typeof ADD_BUN_ELEMENT;
  readonly payload: TIngredientsData;
}

export interface IAddNonBunElement {
  readonly type: typeof ADD_NON_BUN_ELEMENT;
  readonly payload: TIngredientsData;
}

export interface IDeleteElement {
  readonly type: typeof DELETE_ELEMENT;
  readonly uid: string;
}

export interface IUdpadeElementsOrder {
  readonly type: typeof UPDATE_ELEMENTS_ORDER;
  readonly draggableElement: TIngredientsData;
  readonly newIndex: number;
}

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export function addBunElement(element: TIngredientsData): IAddBunElement {
  return {
    type: ADD_BUN_ELEMENT,
    payload: element,
  };
}

export function addNonBunElement(element: TIngredientsData): IAddNonBunElement {
  return {
    type: ADD_NON_BUN_ELEMENT,
    payload: element,
  };
}

export function deleteElement(elementUid: string): IDeleteElement {
  return {
    type: DELETE_ELEMENT,
    uid: elementUid,
  };
}

export function udpadeElementsOrder({
  draggableElement,
  newIndex,
}: {
  draggableElement: TIngredientsData;
  newIndex: number;
}): IUdpadeElementsOrder {
  return {
    type: UPDATE_ELEMENTS_ORDER,
    draggableElement,
    newIndex,
  };
}

export function resetConstructor(): IResetConstructor {
  return {
    type: RESET_CONSTRUCTOR,
  };
}
