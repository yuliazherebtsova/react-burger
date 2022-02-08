import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { AppDispatch, AppThunk, TRootState } from '.';

// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch: () => Dispatch<AnyAction> | AppThunk<void> = () =>
  dispatchHook<AppDispatch | AppThunk>();
