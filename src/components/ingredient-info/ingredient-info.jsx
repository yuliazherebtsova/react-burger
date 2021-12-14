import PropTypes from "prop-types";
import ingredientInfoStyles from "./ingredient-info.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientInfo({}) {
  return null;
}

const ingredientInfoPropTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
});

IngredientInfo.propTypes = PropTypes.arrayOf(ingredientInfoPropTypes).isRequired;

export default IngredientInfo;
