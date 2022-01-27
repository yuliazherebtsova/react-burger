import { useDrag, DragPreviewImage } from 'react-dnd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './burger-ingredient.module.css';

function BurgerIngredient({
  id,
  image,
  price,
  name,
  onOpenModalWithIngredient,
}) {
  const ingredientsInOrder = useSelector((state) => [
    state.burgerConstructor.bunElement,
    ...state.burgerConstructor.draggableElements,
    state.burgerConstructor.bunElement,
  ]);

  const [{ isDragging }, dragRef, dragPreview] = useDrag(
    {
      type: 'BurgerIngredient',
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [id]
  );

  const onClickToIngredient = (e) => onOpenModalWithIngredient(e);

  const ingredientsCounter = ingredientsInOrder.filter(
    (item) => item._id === id
  ).length;

  return (
    <li
      className={`${ingredientStyles.ingredient__сard} 
      ${isDragging && ingredientStyles.ingredient__сard_isDragging} mb-8`}
      onClick={onClickToIngredient}
      onKeyPress={onClickToIngredient}
      ref={dragRef}
      data-id={id}
    >
      <DragPreviewImage src={image} connect={dragPreview} />
      <img src={image} alt={name} />
      {ingredientsCounter !== 0 && (
        <Counter count={ingredientsCounter} size="default" />
      )}
      <div className={`${ingredientStyles.ingredient__price} mt-2 mb-2`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
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
  onOpenModalWithIngredient: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default BurgerIngredient;
