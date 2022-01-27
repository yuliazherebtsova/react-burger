import { combineReducers } from 'redux';
import burgerIngredients from 'services/reducers/ingredients';
import burgerConstructor from 'services/reducers/constructor';
import order from 'services/reducers/order';

const rootReducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  order
});

export default rootReducer;
