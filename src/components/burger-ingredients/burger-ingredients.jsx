import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from 'components/burger-ingredient/burger-ingredient';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import { IngredientsContext } from '../../utils/appContext';

function BurgerIngredients({ onOpenModal }) {
  const { ingredientsState } = useContext(IngredientsContext);

  const ingredientTypes = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const [currentTab, setCurrentTab] = useState('Булки');

  const handleTabClick = (value) => setCurrentTab(value);

  const getIngredientsByType = () =>
    Object.keys(ingredientTypes).map((key) => ({
      name: ingredientTypes[key],
      items: ingredientsState.data.filter((el) => el.type === key),
    }));

  const ingredientsByType = getIngredientsByType();
  return (
    <section className={ingredientsStyles.ingredients__container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav>
        <ul className={ingredientsStyles.ingredients__tabContainer}>
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
      <section
        className={`${ingredientsStyles.ingredients__list} ${appStyles.scroll} pr-4 pl-4`}
      >
        {ingredientsByType.map(({ name, items }, index) => (
          <>
            <h2 className="text text_type_main-medium mt-10 mb-6" key={index}>
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
                  onOpenModal={onOpenModal}
                />
              ))}
            </ul>
          </>
        ))}
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
