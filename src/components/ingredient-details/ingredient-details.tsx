import { TLocation } from 'components/app/app';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  selectIngredients,
  selectIngredientToView,
} from 'services/selectors/ingredients';
import { IIngredientsData } from 'services/types/data';
import ingredientDetailsStyles from './ingredient-details.module.css';

const IngredientDetails: React.VFC = () => {
  const ingredients = useSelector(selectIngredients);

  let ingredient = useSelector(selectIngredientToView);

  const location: TLocation = useLocation();

  console.log(ingredients)

  if (!ingredient) {
    const splittedUrl = location.pathname.split('/');
    const idFromUrl = splittedUrl[splittedUrl.length - 1];
    ingredient = ingredients.find(
      (item: IIngredientsData) => item._id === idFromUrl
    );
  }

  return (
    <div className={ingredientDetailsStyles.ingredient}>
      <h2
        className={`${ingredientDetailsStyles.ingredient__title} text text_type_main-large pb-4`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${ingredientDetailsStyles.ingredient__image} pb-4`}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      <p
        className={`${ingredientDetailsStyles.ingredient__name} text text_type_main-medium pb-8`}
      >
        {ingredient?.name}
      </p>
      <div className={`${ingredientDetailsStyles.ingredient__compounds}`}>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Калории, ккал
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient?.calories}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Белки, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient?.proteins}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Жиры, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient?.fat}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Углеводы, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient?.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;

