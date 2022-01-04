import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./burger-ingredient.module.css";

function BurgerIngredient({ id, image, price, name, onOpenModal }) {
  const onOpenIngredient = () => {
    onOpenModal({ modalType: "ingredientInfo", itemId: id });
  };

  return (
    <li
      className={`${ingredientStyles.ingredient__сard} mb-8`}
      onClick={onOpenIngredient}
      onKeyPress={onOpenIngredient}
    >
      <img src={image} alt={name} />
      <Counter count={1} size="default" />
      <div className={`${ingredientStyles.ingredient__price} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon />
      </div>
      <p
        className={`${ingredientStyles.ingredient__name} text text text_type_main-default`}
      >
        {name}
      </p>
    </li>
  );
}

BurgerIngredient.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default BurgerIngredient;
