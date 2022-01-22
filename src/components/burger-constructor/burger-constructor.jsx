import { useMemo, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from 'utils/api';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_BUN_ELEMENT,
  ADD_NON_BUN_ELEMENT,
  SET_ELEMENT_TO_VIEW,
  DELETE_ELEMENT,
  RESET_CONSTRUCTOR,
} from 'services/actions/constructor';
import constructorStyles from './burger-constructor.module.css';
import appStyles from '../app/app.module.css';
import { OrderContext } from '../../utils/appContext';

function BurgerConstructor({ onOpenModalWithIngredient }) {
  const { ingredients, bunElement, draggableElements } = useSelector((state) => ({
    ingredients: state.burgerIngredients.ingredients,
    bunElement: state.burgerConstructor.bunElement,
    draggableElements: state.burgerConstructor.draggableElements,
  }));

  const dispatch = useDispatch();

  const { orderState, setOrderState } = useContext(OrderContext);

  const nonBunElementsClass = `${
    constructorStyles.constructor__nonBunElements
  } ${
    draggableElements.length === 0
      ? constructorStyles.constructor__nonBunElements_empty
      : ''
  } ${appStyles.scroll} pt-4`;

  const totalPrice = useMemo(() => {
    const bunsPrice = bunElement.type === 'bun' ? bunElement.price * 2 : 0;

    const nonBunElementsPrice = draggableElements.reduce(
      (acc, item) => acc + item.price,
      0
    );

    return bunsPrice + nonBunElementsPrice;
  }, [bunElement, draggableElements]);

  useEffect(() => {
    dispatch({
      type: ADD_BUN_ELEMENT,
      payload: ingredients.find((item) => item.type === 'bun'),
    });

    dispatch({
      /**
       * Т.к. в конструкторе могут быть повторяющиеся элементы с одинаковыми _id, а значит для React key он не подходит.
       * На текущем этапе сгенерируем уникальный uid ингредиенту в момент создания массива draggableItems в state конструктора.
       */
      type: ADD_NON_BUN_ELEMENT,
      payload: ingredients
        .filter((item) => item.type !== 'bun')
        .map((item) => ({ ...item, uid: uuidv4() }))
        .slice(2, 9),
    });
  }, [ingredients]);

  const createOrder = async () => {
    setOrderState({
      ...orderState,
      hasError: false,
      isLoading: true,
    });
    try {
      const res = await api.postOrder([bunElement, ...draggableElements]);
      setOrderState((prevState) => ({
        ...prevState,
        number: res.order.number,
        isLoading: false,
      }));
      dispatch({
        type: RESET_CONSTRUCTOR,
      });
    } catch (err) {
      setOrderState((prevState) => ({
        ...prevState,
        hasError: true,
        isLoading: false,
      }));
    }
  };

  const onClickToIngredient = useCallback(
    (uid) => () => onOpenModalWithIngredient({ itemId: uid }),
    []
  );

  const onOrderButtonClick = () => {
    createOrder();
  };

  return (
    <section
      className={`${constructorStyles.constructor__container} pt-25 pb-2 pl-4`}
    >
      {bunElement.type === 'bun' && (
        <div
          className={`${constructorStyles.constructor__bunTop} mr-4`}
          onClick={onClickToIngredient(bunElement._id)}
          onKeyPress={onClickToIngredient(bunElement._id)}
        >
          <ConstructorElement
            type={bunElement.type}
            text={`${bunElement.name} (верх)`}
            price={bunElement.price}
            thumbnail={bunElement.image}
            isLocked
          />
        </div>
      )}

      <ul className={nonBunElementsClass}>
        {draggableElements.map((item) => (
          <li
            className={`${constructorStyles.constructor__nonBunElement} mb-4 ml-2`}
            key={item.uid}
            onClick={onClickToIngredient(item._id)}
            onKeyPress={onClickToIngredient(item._id)}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>

      {bunElement.type === 'bun' && (
        <div
          className={`${constructorStyles.constructor__bunBottom} mr-4`}
          onClick={onClickToIngredient(bunElement._id)}
          onKeyPress={onClickToIngredient(bunElement._id)}
        >
          <ConstructorElement
            type={bunElement.type}
            text={`${bunElement.name} (низ)`}
            price={bunElement.price}
            thumbnail={bunElement.image}
            isLocked
          />
        </div>
      )}
      <div
        className={`${constructorStyles.constructor__totalContainer} mt-10 mr-4`}
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
          onClick={onOrderButtonClick}
          disabled={totalPrice === 0}
          name="orderSubmitButton"
          htmlType="submit"
        >
          {orderState.isLoading ? 'Создаем заказ...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOpenModalWithIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
