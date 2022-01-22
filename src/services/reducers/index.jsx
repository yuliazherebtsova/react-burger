import { combineReducers } from 'redux';
import burgerIngredients from 'services/reducers/ingredients';
import burgerConstructor from 'services/reducers/constructor';

const rootReducer = combineReducers({
  burgerIngredients,
  burgerConstructor
});

export default rootReducer;
