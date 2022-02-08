// Вспомогательная типизация
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store from 'services/store';

// Тип, повторяющий структуру хранилища (для типизации thunks)
export type TRootState = ReturnType<typeof store.getState>;

// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, TRootState, unknown, Action>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
