import React from "react";
import PropTypes from "prop-types";
import ingredientStyles from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredient({ id, image, price, name }) {
  return (
    <li className={ingredientStyles.ingredient} key={id}>
      <img src={image} alt={name} />
      <Counter count={1} size="default" />
      <span>
        {price} <CurrencyIcon />
      </span>
      <p>{name}</p>
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
