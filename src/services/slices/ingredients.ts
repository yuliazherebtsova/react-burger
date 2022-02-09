import { IIngredientsData } from 'services/types/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const ingreduentsSlice = createSlice({
  name: 'ingreduents',
  initialState: ingredientsInitialState,
  reducers: {
    getIngredientsRequest(state) {
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess(state, action: PayloadAction<IIngredientsData[]>) {
      state.ingredientsFailed = false;
      state.ingredients = action.payload;
      state.ingredientsRequest = false;
    },
    getIngredientsFailed(state) {
      state.ingredientsFailed = true;
      state.ingredientsRequest = false;
    },
    setIngredientToView(state, action: PayloadAction<IIngredientsData>) {
      state.ingredientToView = action.payload;
    },
    resetIngredientToView(state) {
      state.ingredientToView = null;
    },
    resetIngredients() {
      return ingredientsInitialState;
    },
  },
});

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setIngredientToView,
  resetIngredientToView,
  resetIngredients,
} = ingreduentsSlice.actions;

export default ingreduentsSlice.reducer;
