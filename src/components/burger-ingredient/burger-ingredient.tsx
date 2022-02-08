import React, { useCallback , useMemo } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { useSelector } from 'react-redux';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TRootState } from 'services/types';
import { IHandleIngredientModalOpen } from 'components/app/app';
import ingredientStyles from './burger-ingredient.module.css';

interface IBurgerIngredientProps {
  id: string;
  image: string;
  price: number;
  name: string;
  onOpenModalWithIngredient: IHandleIngredientModalOpen;
}

const BurgerIngredient: React.FC<IBurgerIngredientProps> = ({
  id,
  image,
  price,
  name,
  onOpenModalWithIngredient,
}) => {
  const ingredientsInOrder = useSelector((state: TRootState) => [
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

  const onClickToIngredient = useCallback(
    (evt: React.MouseEvent<Element> | React.KeyboardEvent<Element>) =>
      onOpenModalWithIngredient(evt),
    [onOpenModalWithIngredient]
  );

  const ingredientsCounter = useMemo(() => ingredientsInOrder.filter(
    (item) => item._id === id
  ).length, [id, ingredientsInOrder]);

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
