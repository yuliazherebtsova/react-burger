import PropTypes from "prop-types";
import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails({}) {
  return null;
}

const ingredientDetailsPropTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
});

IngredientDetails.propTypes = PropTypes.arrayOf(ingredientDetailsPropTypes).isRequired;

export default IngredientDetails;
