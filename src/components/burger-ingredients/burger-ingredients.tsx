import React from "react";
import PropTypes from "prop-types";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients({ data }) {
  console.log({ data });
  return <section className={ingredientsStyles.ingredientsContainer}></section>;
}

const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

BurgerIngredients.propTypes =
  PropTypes.arrayOf(ingredientsPropTypes).isRequired;
export default BurgerIngredients;
