/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { AppDispatch, AppThunk, TRootState } from '.';

// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
