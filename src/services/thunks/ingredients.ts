import { AppThunk } from 'services/types';
import { api } from 'utils/api';
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} from '../slices/ingredients';


const getIngredientsData: AppThunk = () => (dispatch) => {
  dispatch(getIngredientsRequest());
  api
    .getIngredients()
    .then((res) => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch(getIngredientsFailed());
      }
    })
    .catch((err) => {
      dispatch(getIngredientsFailed());
      // eslint-disable-next-line no-console
      console.log(`Ошибка загрузки ингредиентов: ${err}`);
    });
};

export default getIngredientsData;