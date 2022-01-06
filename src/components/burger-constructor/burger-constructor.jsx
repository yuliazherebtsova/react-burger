import { useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from 'utils/api';
import constructorStyles from './burger-constructor.module.css';
import appStyles from '../app/app.module.css';
import {
  IngredientsContext,
  ConstructorContext,
  OrderContext,
} from '../../utils/appContext';

function BurgerConstructor({ onOpenModalWithIngredient }) {
  const { ingredientsState } = useContext(IngredientsContext);
  const { constructorState, setConstructorState } =
    useContext(ConstructorContext);
  const { orderState, setOrderState } = useContext(OrderContext);

  function generateKey(id) {
    return `${id}_${new Date().getTime()}`;
  }

  const totalPrice = useMemo(() => {
    const bunsPrice = constructorState.bun.price
      ? constructorState.bun.price * 2
      : 0;

    const nonBunElementsPrice = constructorState.draggableItems.reduce(
      (acc, item) => acc + item.price,
      0
    );

    return bunsPrice + nonBunElementsPrice;
  }, [constructorState]);

  /* ********************************************************************************************* */
  /** Временно заполняем корзину с заказом случайными элементами из массива данных об ингредиентах */
  /* ********************************************************************************************* */

  useEffect(() => {
    setConstructorState({
      type: 'ADD_BUN',
      payload: ingredientsState.data.find((item) => item.type === 'bun'),
    });

    setConstructorState({
      /**
       * Т.к. в конструкторе могут быть повторяющиеся элементы с одинаковыми _id, а значит для React key он не подходит.
       * На текущем этапе сгенерируем уникальный uid ингредиенту в момент создания массива draggableItems в state конструктора.
       */
      type: 'ADD_NON_BUN_ELEMENT',
      payload: ingredientsState.data
        .filter((item) => item.type !== 'bun')
        .map((item) => ({ ...item, uid: generateKey(item._id) }))
        .slice(2, 9),
    });
  }, [ingredientsState]);

  /* ********************************************************************************************* */

  const createOrder = async () => {
    setOrderState({
      ...orderState,
      hasError: false,
      isLoading: true,
    });
    try {
      const res = await api.postOrder([
        constructorState.bun,
        ...constructorState.draggableItems,
      ]);
      setOrderState((prevState) => ({
        ...prevState,
        number: res.order.number,
        isLoading: false,
      }));
    } catch (err) {
      setOrderState((prevState) => ({
        ...prevState,
        hasError: true,
        isLoading: false,
      }));
    }
  };

  const onClickToIngredient = (id) => {
    onOpenModalWithIngredient({ itemId: id });
  };

  return (
    <section
      className={`${constructorStyles.constructor__container} pt-25 pb-2 pl-4`}
    >
      <div
        className={`${constructorStyles.constructor__bunTop} mr-4`}
        onClick={() => onClickToIngredient(constructorState.bun._id)}
        onKeyPress={() => onClickToIngredient(constructorState.bun._id)}
      >
        <ConstructorElement
          type={constructorState.bun.type}
          text={`${constructorState.bun.name} (верх)`}
          price={constructorState.bun.price}
          thumbnail={constructorState.bun.image}
          isLocked
        />
      </div>
      <ul
        className={`${constructorStyles.constructor__nonBunElements} ${appStyles.scroll} pt-4`}
      >
        {constructorState.draggableItems.map((item) => (
          <li
            className={`${constructorStyles.constructor__nonBunElement} mb-4 ml-2`}
            key={item.uid}
            onClick={() => onClickToIngredient(item._id)}
            onKeyPress={() => onClickToIngredient(item._id)}
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
      <div
        className={`${constructorStyles.constructor__bunBottom} mr-4`}
        onClick={() => onClickToIngredient(constructorState.bun._id)}
        onKeyPress={() => onClickToIngredient(constructorState.bun._id)}
      >
        <ConstructorElement
          type={constructorState.bun.type}
          text={`${constructorState.bun.name} (низ)`}
          price={constructorState.bun.price}
          thumbnail={constructorState.bun.image}
          isLocked
        />
      </div>
      <div
        className={`${constructorStyles.constructor__totalContainer} mt-10 mr-4`}
      >
        <div className={`${constructorStyles.constructor__totalPrice} mr-10`}>
          <span className="text text_type_digits-medium mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="medium" onClick={() => createOrder()}>
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
