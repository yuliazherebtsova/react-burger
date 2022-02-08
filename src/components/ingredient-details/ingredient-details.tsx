import ingredientDetailsStyles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  image: string;
  name: string;
  fat: number;
  carbohydrates: number;
  calories: number;
  proteins: number;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({
  image,
  name,
  fat,
  carbohydrates,
  calories,
  proteins,
}) => (
  <div className={ingredientDetailsStyles.ingredient}>
    <img
      className={`${ingredientDetailsStyles.ingredient__image} pb-4`}
      src={image}
      alt={name}
    />
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

export default IngredientDetails;
