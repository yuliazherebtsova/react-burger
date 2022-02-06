import { combineReducers} from 'redux';
import burgerIngredientsReducer from 'services/reducers/ingredients';
import burgerConstructorReducer from 'services/reducers/constructor';
import orderReducer from 'services/reducers/order';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
});

export default rootReducer;