import { useMemo } from "react";
import PropTypes from "prop-types";
import constructorStyles from "./burger-constructor.module.css";
import appStyles from "../app/app.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "../../utils/types";

function BurgerConstructor({
  data,
  onOpenModalWithIngredient,
  onOpenModalWithOrder,
}) {
  const onClickToOrderDetails = (number) => {
    onOpenModalWithOrder({ orderNumber: number });
  };

  const onClickToIngredient = (id) => {
    onOpenModalWithIngredient({ itemId: id });
  };

  const generateKey = (id) => {
    return `${id}_${new Date().getTime()}`;
  };

  const bun = data.find((item) => item.type === "bun");
  const nonBunElements = useMemo(() => {
    /**
     * Т.к. в конструкторе могут быть повторяющиеся элементы с одинаковыми _id, а значит для React key он не подходит.
     * На текущем этапе сгенерируем уникальный uid ингредиенту в момент создания массива nonBunElements.
     * Делать это нужно только в тот момент когда меняется массив исходных данных, поэтому вычисление мемоизируем
     * через useMemo с зависимостями [data]. Теперь uid не будет меняться при каждой перерисовке компонента,
     * и мы можем использовать его в качестве key.
     */
    return data
      .filter((item) => item.type !== "bun")
      .map((item) => ({ ...item, uid: generateKey(item._id) }));
  }, [data]);

  return (
    <section
      className={`${constructorStyles.constructor__container} pt-25 pb-2 pl-4`}
    >
      <div
        className={`${constructorStyles.constructor__bunTop} mr-4`}
        onClick={() => onClickToIngredient(bun._id)}
      >
        <ConstructorElement
          type={bun.type}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul
        className={`${constructorStyles.constructor__nonBunElements} ${appStyles.scroll} pt-4`}
      >
        {nonBunElements.map((item) => (
          <li
            className={`${constructorStyles.constructor__nonBunElement} mb-4 ml-2`}
            key={item.uid}
            onClick={() => onClickToIngredient(item._id)}
          >
            <DragIcon type={"primary"} />
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
        onClick={() => onClickToIngredient(bun._id)}
      >
        <ConstructorElement
          type={bun.type}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div
        className={`${constructorStyles.constructor__totalContainer} mt-10 mr-4`}
      >
        <div className={`${constructorStyles.constructor__totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={() => onClickToOrderDetails("034536")} // временно хардкод номера заказа по макету
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOpenModalWithIngredient: PropTypes.func.isRequired,
  onOpenModalWithOrder: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};

export default BurgerConstructor;
