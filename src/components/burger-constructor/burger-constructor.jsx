import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ADD_BUN_ELEMENT,
  ADD_NON_BUN_ELEMENT,
  DELETE_ELEMENT,
} from 'services/actions/constructor';
import { postOrder } from 'services/actions/order';
import { v4 as uuidv4 } from 'uuid';
import constructorStyles from './burger-constructor.module.css';
import appStyles from '../app/app.module.css';

function BurgerConstructor({ onOpenModalWithIngredient }) {
  const { ingredients, bunElement, draggableElements, orderRequest } =
    useSelector((state) => ({
      ingredients: state.burgerIngredients.ingredients,
      bunElement: state.burgerConstructor.bunElement,
      draggableElements: state.burgerConstructor.draggableElements,
      orderRequest: state.order.orderRequest,
    }));

  const dispatch = useDispatch();

  const handleIngredientDrop = ({ id }) => {
    console.log('drop');
    const draggedItem = ingredients.find((item) => item._id === id);
    if (draggedItem.type === 'bun') {
      dispatch({
        type: ADD_BUN_ELEMENT,
        payload: { ...draggedItem, uid: uuidv4() },
      });
    } else if (bunElement._id) {
      // в конструкторе уже есть булка, можно добавить начинку
      dispatch({
        type: ADD_NON_BUN_ELEMENT,
        payload: { ...draggedItem, uid: uuidv4() },
      });
    }
  };

  const handleCanIngredientDrop = ({ id }) => {
    const draggedItem = ingredients.find((item) => item._id === id);
    return !(!bunElement._id && draggedItem.type !== 'bun');
    // если в конструкторе еще нет булки, добавить начинку нельзя
  };

  const [{ isHover, isCanDrop, isDragging }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      handleIngredientDrop(itemId);
    },
    canDrop(itemId) {
      return handleCanIngredientDrop(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isCanDrop: monitor.canDrop(),
      isDragging: monitor.canDrop() && !monitor.isOver(),
    }),
  });

  const constructorElementsClass = `${constructorStyles.constructor__elements} 
  ${
    ((!bunElement._id && !draggableElements.length) || isDragging) &&
    constructorStyles.constructor__elements_dropArea
  } 
  ${isHover && isCanDrop && constructorStyles.constructor__elements_canDrop}
  ${
    isHover && !isCanDrop && constructorStyles.constructor__elements_canNotDrop
  }`;

  const totalPrice = useMemo(() => {
    const bunsPrice = bunElement.type === 'bun' ? bunElement.price * 2 : 0;

    const nonBunElementsPrice = draggableElements.reduce(
      (acc, item) => acc + item.price,
      0
    );

    return bunsPrice + nonBunElementsPrice;
  }, [bunElement, draggableElements]);

  const onClickToOrderButton = () => {
    dispatch(postOrder([bunElement, ...draggableElements]));
  };

  const onClickToIngredient = (e) => onOpenModalWithIngredient(e);

  const handleIngredientDelete = (e) => {
    const itemToDeleteUid = e.target.closest('li').dataset.uid;
    dispatch({
      type: DELETE_ELEMENT,
      uid: itemToDeleteUid,
    });
  };

  return (
    <section className="pt-25 pb-2 pl-4">
      <ul className={constructorElementsClass} ref={dropTarget}>
        {bunElement.type === 'bun' && (
          <li
            className={`${constructorStyles.constructor__bunTop} mr-4`}
            onClick={onClickToIngredient}
            onKeyPress={onClickToIngredient}
            data-id={bunElement._id}
          >
            <ConstructorElement
              type="top"
              text={`${bunElement.name} (верх)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
              isLocked
            />
          </li>
        )}
        <ul
          className={`${constructorStyles.constructor__nonBunElements} ${appStyles.scroll} pt-4`}
        >
          {draggableElements.map((item) => (
            <li
              className={`${constructorStyles.constructor__nonBunElement} mb-4 ml-2`}
              key={item.uid}
              onClick={onClickToIngredient}
              onKeyPress={onClickToIngredient}
              data-id={item._id}
              data-uid={item.uid}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={handleIngredientDelete}
              />
            </li>
          ))}
        </ul>
        {bunElement.type === 'bun' && (
          <li
            className={`${constructorStyles.constructor__bunBottom} mr-4`}
            onClick={onClickToIngredient}
            onKeyPress={onClickToIngredient}
            data-id={bunElement._id}
          >
            <ConstructorElement
              type="bottom"
              text={`${bunElement.name} (низ)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
              isLocked
            />
          </li>
        )}
      </ul>
      <div
        className={`${constructorStyles.constructor__totalPriceContainer} mt-10 mr-4`}
      >
        <div className={`${constructorStyles.constructor__totalPrice} mr-10`}>
          <span className="text text_type_digits-medium mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={onClickToOrderButton}
          disabled={totalPrice === 0}
          name="orderSubmitButton"
          htmlType="submit"
        >
          {orderRequest ? 'Создаем заказ...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOpenModalWithIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
