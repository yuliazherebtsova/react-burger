import PropTypes from "prop-types";
import ingredientStyles from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredient({ id, image, price, name }) {
  console.log({ id, image, price, name });
  return (
    <li className={`${ingredientStyles.ingredient__сard} mb-8`} key={id}>
      <img src={image} alt={name} />
      <Counter count={1} size="default" />
      <div className={`${ingredientStyles.price__сontainer} mt-2 mb-2`}>
        <p className={"text text_type_digits-default mr-2"}>{price}</p>
        <CurrencyIcon />
      </div>
      <p
        className={`${ingredientStyles.name} text text text_type_main-default`}
      >
        {name}
      </p>
    </li>
  );
}

const ingredientPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerIngredient.propTypes = PropTypes.arrayOf(ingredientPropTypes).isRequired;

export default BurgerIngredient;
