import React from "react";
import PropTypes from "prop-types";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

function BurgerIngredients({ data }) {
  const ingredientTypes = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const [currentTab, setCurrentTab] = React.useState("Булки");

  const handleTabClick = (value) => setCurrentTab(value);

  const getIngredientsByType = () => {
    return Object.keys(ingredientTypes).map((key) => {
      return {
        name: ingredientTypes[key],
        items: data.filter((el) => el.type === key),
      };
    });
  };

  const ingredientsByType = getIngredientsByType();

  return (
    <section className={ingredientsStyles.ingredientsContainer}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>
        Соберите бургер
      </h1>
      <nav>
        <ul className={ingredientsStyles.tabContainer}>
          {Object.values(ingredientTypes).map((tab, index) => (
            <li key={index}>
              <Tab
                value={tab}
                active={currentTab === tab}
                onClick={handleTabClick}
              >
                {tab}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>
      <section className={ingredientsStyles.ingredientsList}>
        {ingredientsByType.map(({name, items}) => (
          <>
            <h2 className="text text_type_main-medium">{name}</h2>
            <ul>
              {items.map((item) => (
                <BurgerIngredient data={item} />
              ))}
            </ul>
          </>
        ))}
      </section>
    </section>
  );
}

const ingredientsPropTypes = PropTypes.shape({
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

BurgerIngredients.propTypes =
  PropTypes.arrayOf(ingredientsPropTypes).isRequired;

export default BurgerIngredients;
