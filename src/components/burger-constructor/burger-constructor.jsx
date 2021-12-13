import React from "react";
import PropTypes from "prop-types";
import constructorStyles from "./burger-constructor.module.css";
import appStyles from "../app/app.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data }) {

  const createBunElement = (type, { name, price, image }) => {
    return (
      <div
        className={
          type === "top"
            ? `${constructorStyles.constructor__bunTop} mr-4`
            : `${constructorStyles.constructor__bunBottom} mr-4`
        }
      >
        <ConstructorElement
          type={type}
          isLocked={true}
          text={name}
          price={price}
          thumbnail={image}
        />
      </div>
    );
  };

  const createFillerElement = ({ _id, name, price, image }) => {
    return (
      <li
        className={`${constructorStyles.constructor__filler} mb-4 mr-2`}
        key={_id}
      >
        <DragIcon type={"primary"} />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
        />
      </li>
    );
  };

  const demoBun = data.find((item) => item.type === "bun");
  const demoFillers = data
    .filter((item) => item.type === "sauce")
    .concat(data.filter((item) => item.type === "main"));

  return (
    <section
      className={`${constructorStyles.constructor__container} pt-25 pb-2 pl-4`}
    >
      {createBunElement("top", demoBun)}
      <ul
        className={`${constructorStyles.constructor__fillerList} ${appStyles.scroll}`}
      >
        {demoFillers.map((filler) => createFillerElement(filler))}
      </ul>
      {createBunElement("bottom", demoBun)}
      <div
        className={`${constructorStyles.constructor__totalContainer} mt-10 mr-4`}
      >
        <div className={`${constructorStyles.constructor__totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

const constructorPropTypes = PropTypes.shape({
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

BurgerConstructor.propTypes =
  PropTypes.arrayOf(constructorPropTypes).isRequired;

export default BurgerConstructor;
