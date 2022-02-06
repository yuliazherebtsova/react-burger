import { IConsructorElement } from 'components/burger-constructor/burger-constructor';
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
  readonly payload: IConsructorElement;
}

export interface IAddNonBunElement {
  readonly type: typeof ADD_NON_BUN_ELEMENT;
  readonly payload: IConsructorElement;
}

export interface IDeleteElement {
  readonly type: typeof DELETE_ELEMENT;
  readonly uid: string;
}

export interface IUdpadeElementsOrder {
  readonly type: typeof UPDATE_ELEMENTS_ORDER;
  readonly draggableElement: IConsructorElement;
  readonly newIndex: number;
}

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddBunElement
  | IAddNonBunElement
  | IDeleteElement
  | IUdpadeElementsOrder
  | IResetConstructor;

export function addBunElement(element: IConsructorElement): IAddBunElement {
  return {
    type: ADD_BUN_ELEMENT,
    payload: element,
  };
}

export function addNonBunElement(
  element: IConsructorElement
): IAddNonBunElement {
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
  draggableElement: IConsructorElement;
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
