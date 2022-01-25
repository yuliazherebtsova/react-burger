import { useDrag, DragPreviewImage } from 'react-dnd';
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
  const [{ isDrag }, dragRef, dragPreview] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const onClickToIngredient = (e) => onOpenModalWithIngredient(e);

  return (
    <li
      className={`${ingredientStyles.ingredient__сard} 
      ${isDrag && ingredientStyles.ingredient__сard_isDragging} mb-8`}
      onClick={onClickToIngredient}
      onKeyPress={onClickToIngredient}
      ref={dragRef}
      data-id={id}
    >
      <DragPreviewImage src={image} connect={dragPreview} />
      <img src={image} alt={name} />
      <Counter count={1} size="default" />
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
