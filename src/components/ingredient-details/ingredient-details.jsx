import PropTypes from "prop-types";
import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails({
  image,
  name,
  fat,
  carbohydrates,
  calories,
  proteins,
}) {
  return (
    <div className={ingredientDetailsStyles.ingredient}>
      <h2
        className={`${ingredientDetailsStyles.ingredient__modalTitle} text text_type_main-large pb-8`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${ingredientDetailsStyles.ingredient__image} pb-4`}
        src={image}
        alt={name}
      ></img>
      <p
        className={`${ingredientDetailsStyles.ingredient__name} text text_type_main-medium pb-8`}
      >
        {name}
      </p>
      <div className={`${ingredientDetailsStyles.ingredient__compounds}`}>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Калории, ккал
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {calories}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Белки, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {proteins}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Жиры, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {fat}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles.ingredient__compound}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Углеводы, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
}

const ingredientDetailsPropTypes = PropTypes.shape({
  image: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
});

IngredientDetails.propTypes = ingredientDetailsPropTypes.isRequired;

export default IngredientDetails;
