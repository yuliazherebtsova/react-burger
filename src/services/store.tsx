import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

/**
 * Объявляет глобальный интерфейс для объекта Window для возможности использованиия
 * redux-dev-tools в приложении с Typescript
 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//  Подключаем расширение React Devtools к приложению
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// Инициализируем хранилище с помощью корневого редьюсера, подключаем  Redux Devtools и усилители
const store = createStore(rootReducer, enhancer);

export default store;
