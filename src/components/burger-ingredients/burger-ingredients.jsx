import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from 'components/burger-ingredient/burger-ingredient';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';

function BurgerIngredients({ onOpenModalWithIngredient }) {
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const ingredientTypes = {
    bun: {
      name: 'Булки',
      ref: useRef(null),
    },
    sauce: {
      name: 'Соусы',
      ref: useRef(null),
    },
    main: {
      name: 'Начинки',
      ref: useRef(null),
    },
  };

  const [currentTab, setCurrentTab] = useState('Булки');

  const handleTabClick = useCallback(
    ({ tabName, element }) =>
      () => {
        setCurrentTab(tabName);
        element.current.scrollIntoView({ behavior: 'smooth' });
      },
    []
  );

  const groupIngredientsByType = () =>
    Object.keys(ingredientTypes).map((key) => ({
      name: ingredientTypes[key].name,
      items: ingredients.filter((el) => el.type === key),
      ref: ingredientTypes[key].ref,
    }));

  const ingredientsByType = groupIngredientsByType();

  const handleSectionScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop;
    const scrollOffset = 120;
    const positionOfSauseSection = ingredientTypes.sauce.ref.current.offsetTop;
    const positionOfMainSection = ingredientTypes.main.ref.current.offsetTop;
    if (scrollPosition + scrollOffset <= positionOfSauseSection) {
      setCurrentTab('Булки');
    } else if (scrollPosition + scrollOffset <= positionOfMainSection) {
      setCurrentTab('Соусы');
    } else {
      setCurrentTab('Начинки');
    }
  };

  return (
    <section className={ingredientsStyles.ingredients__container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav>
        <ul className={ingredientsStyles.ingredients__tabContainer}>
          {Object.values(ingredientTypes).map((type, index) => (
            <li key={index}>
              <Tab
                value={type.name}
                active={currentTab === type.name}
                onClick={handleTabClick({
                  tabName: type.name,
                  element: type.ref,
                })}
              >
                {type.name}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>
      <section>
        <ul
          className={`${ingredientsStyles.ingredients__list} ${appStyles.scroll} pr-4 pl-4`}
          onScroll={handleSectionScroll}
        >
          {ingredientsByType.map(({ name, items, ref }, index) => (
            <li key={index}>
              <h2 className="text text_type_main-medium mt-6 mb-6" ref={ref}>
                {name}
              </h2>
              <ul
                className={`${ingredientsStyles.ingredient__category} pr-4 pl-4`}
              >
                {items.map((item) => (
                  <BurgerIngredient
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    onOpenModalWithIngredient={onOpenModalWithIngredient}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onOpenModalWithIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredients;
