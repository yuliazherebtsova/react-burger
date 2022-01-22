import { combineReducers } from 'redux';
import ingredientsReducer from 'services/reducers/ingredients';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});

export default rootReducer;
