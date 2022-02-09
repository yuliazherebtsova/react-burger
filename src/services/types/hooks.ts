import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { AppDispatch, AppThunk, TRootState } from '.';

// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
