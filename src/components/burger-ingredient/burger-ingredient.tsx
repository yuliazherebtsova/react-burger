import React, { useCallback } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  getIngredientCounter,
} from 'services/selectors/constructor';
import { useSelector } from 'react-redux';
import ingredientStyles from './burger-ingredient.module.css';

interface IBurgerIngredientProps {
  id: string;
  image: string;
  price: number;
  name: string;
  onOpenModalWithIngredient: (
    // eslint-disable-next-line no-unused-vars
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

const BurgerIngredient: React.VFC<IBurgerIngredientProps> = ({
  id,
  image,
  price,
  name,
  onOpenModalWithIngredient,
}) => {

  const ingredientCounter = useSelector(getIngredientCounter(id));

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

  const onClickToIngredient = useCallback(
    (evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
      onOpenModalWithIngredient(evt),
    [onOpenModalWithIngredient]
  );

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
      {ingredientCounter !== 0 && (
        <Counter count={ingredientCounter} size="default" />
      )}
      <div className={`${ingredientStyles.ingredient__price} mt-2 mb-2`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.ingredient__name} text text text_type_main-default`}
      >
        {name}
      </p>
    </li>
  );
};

export default React.memo(BurgerIngredient);
// using memo will cause React to skip rendering a component if its props have not changed
