/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'services/types/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from 'components/burger-ingredient/burger-ingredient';
import { TRootState } from 'services/types';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';

interface IBurgerIngredientsProps {
  onOpenModalWithIngredient: (
    // eslint-disable-next-line no-unused-vars
    evt: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void;
}

interface IIngredientCategory {
  name: string;
  ref: React.RefObject<HTMLHeadingElement>;
}

interface IIngredientCategories {
  bun: IIngredientCategory;
  sauce: IIngredientCategory;
  main: IIngredientCategory;
}

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({
  onOpenModalWithIngredient,
}) => {
  const ingredients = useSelector(
    (state: TRootState) => state.burgerIngredients.ingredients
  );

  const ingredientCategories: IIngredientCategories = {
    bun: {
      name: 'Булки',
      ref: useRef<HTMLHeadingElement>(null),
    },
    sauce: {
      name: 'Соусы',
      ref: useRef<HTMLHeadingElement>(null),
    },
    main: {
      name: 'Начинки',
      ref: useRef<HTMLHeadingElement>(null),
    },
  };

  const [currentTab, setCurrentTab] = useState('Булки');

  const handleTabClick = useCallback(
    ({ name, ref }: IIngredientCategory) =>
      () => {
        setCurrentTab(name);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      },
    []
  );

  const groupIngredientsByType = useCallback(
    () =>
      (
        Object.keys(ingredientCategories) as (keyof IIngredientCategories)[]
      ).map((key) => ({
        name: ingredientCategories[key].name,
        items: ingredients.filter((el) => el.type === key),
        ref: ingredientCategories[key].ref,
      })),
    [ingredientCategories, ingredients]
  );

  const ingredientsByType = groupIngredientsByType();

  const handleSectionScroll = useCallback(
    (evt: React.UIEvent) => {
      const container = evt.target as HTMLElement;
      const scrollPosition = container.scrollTop;
      const scrollOffset = 120;
      const positionOfSauseSection =
      ingredientCategories.sauce.ref.current?.offsetTop;
      const positionOfMainSection = ingredientCategories.main.ref.current?.offsetTop;
      if (
        positionOfSauseSection &&
        scrollPosition + scrollOffset <= positionOfSauseSection
      ) {
        setCurrentTab('Булки');
      } else if (
        positionOfMainSection &&
        scrollPosition + scrollOffset <= positionOfMainSection
      ) {
        setCurrentTab('Соусы');
      } else {
        setCurrentTab('Начинки');
      }
    },
    [setCurrentTab, ingredientCategories.sauce.ref, ingredientCategories.main.ref]
  );

  return (
    <section className={ingredientsStyles.ingredients__container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav>
        <ul className={ingredientsStyles.ingredients__tabContainer}>
          {Object.values(ingredientCategories).map((type, index) => (
            <li key={index}>
              <Tab
                value={type.name}
                active={currentTab === type.name}
                onClick={handleTabClick({
                  name: type.name,
                  ref: type.ref,
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
};

export default React.memo(BurgerIngredients);