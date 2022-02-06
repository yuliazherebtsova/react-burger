// типизация вспомогательная
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store from 'services/store';
import { TOrderActions } from 'services/actions/order';
import { TIngredientsActions } from 'services/actions/ingredients';
import { TConstructorActions } from 'services/actions/constructor';

// Тип, повторяющий структуру хранилища (для типизации thunks)
export type TRootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TOrderActions
  | TIngredientsActions
  | TConstructorActions;

// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 
