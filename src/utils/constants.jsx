export const BASE_URL = 'https://norma.nomoreparties.space/api';
// параметры для работы с api сервера

export const portal = document.getElementById('react-portal');

export const ingredientsInitialState = {
  isLoading: false,
  hasError: false,
  data: [],
};

export const orderInitialState = {
  isLoading: false,
  hasError: false,
  number: null,
};

export const constructorInitialState = {
  bun: {},
  draggableItems: [],
};
