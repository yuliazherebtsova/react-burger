/* eslint-disable camelcase */
// Типизация данных (приходящих с сервера)
export interface IIngredientsData {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}

export interface IOrderData {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IOrdersData {
  readonly orders: Array<IOrderData>,
  readonly total: number;
  readonly totalToday: number;
}

export type TUserData = {
  name: string;
  email: string;
  password: string;
};