import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/order';
import ingredientsReducer from './slices/ingredients';
import constructorReducer from './slices/constructor';

/**
 * Инициализируем хранилище с помощью  redux-toolkit, 
 * указываем редьюсеры, подключаем Redux Devtools и thunks
 */
const store = configureStore({
  reducer: {
    order: orderReducer,
    burgerIngredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;