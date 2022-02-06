/* eslint-disable default-param-last */
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_INGREDIENT_TO_VIEW,
  RESET_INGREDIENT_TO_VIEW,
  RESET_INGREDIENTS,
  TIngredientsActions,
} from 'services/actions/ingredients';
import { IIngredientsData } from '../types/data';

type TIngredientsState = {
  ingredients: ReadonlyArray<IIngredientsData>;
  ingredientToView: IIngredientsData | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],
  ingredientToView: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export default (
  state = ingredientsInitialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case SET_INGREDIENT_TO_VIEW: {
      return { ...state, ingredientToView: action.ingredient };
    }
    case RESET_INGREDIENT_TO_VIEW: {
      return { ...state, ingredientToView: null };
    }
    case RESET_INGREDIENTS: {
      return ingredientsInitialState;
    }
    default: {
      return state;
    }
  }
};
