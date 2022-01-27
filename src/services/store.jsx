import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//  Подключаем расширение React Devtools к приложению
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// Инициализируем хранилище с помощью корневого редьюсера, подключаем  Redux Devtools и усилители
const store = createStore(rootReducer, enhancer);

export default store;
