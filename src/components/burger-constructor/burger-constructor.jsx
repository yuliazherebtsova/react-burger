import PropTypes from "prop-types";
import constructorStyles from "./burger-constructor.module.css";
import appStyles from "../app/app.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data, onOpenModal }) {
  const onClickToOrderDetails = (number) => {
    onOpenModal({ orderNumber: number });
  };

  const onClickToIngredient = (id) => {
    onOpenModal({ itemId: id });
  };

  const generateKey = (id) => {
    return `${id}_${new Date().getTime()}`;
  };

  const bun = data.find((item) => item.type === "bun");
  const nonBunElements = data
    .filter((item) => item.type === "sauce")
    .concat(data.filter((item) => item.type === "main"));

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
            key={generateKey(item._id)}
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

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

BurgerConstructor.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};

export default BurgerConstructor;
