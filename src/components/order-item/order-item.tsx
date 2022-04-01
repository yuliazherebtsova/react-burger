/* eslint-disable react/no-array-index-key */
import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientsData, IOrderData } from 'services/types/data';
import getHowLongAgoDate from 'utils/date-time';
import { selectIngredients } from 'services/selectors/ingredients';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TLocation } from 'components/app/app';
import styles from './order-item.module.css';

interface IStatusToText {
  [title: string]: string;
}

interface IStatusToColor {
  [title: string]: string;
}

const OrderItem: React.VFC<IOrderData> = ({
  ingredients,
  status,
  name,
  number,
  createdAt,
}) => {
  const statusToText: IStatusToText = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен',
  };

  const statusToColor: IStatusToColor = {
    created: `${styles.orderItem__status_created}`,
    pending: `${styles.orderItem__status_progress}`,
    done: `${styles.orderItem__status_done}`,
  };

  const ingredientsData = useSelector(selectIngredients);

  const ingredientImages = Array.from(
    new Set(
      ingredients.map(
        (id: string) =>
          ingredientsData.find((item: IIngredientsData) => item._id === id)
            ?.image_mobile
      )
    )
  ).sort();

  const visibleIconsCount = 6;

  const hiddenIconsCount = ingredientImages.length - visibleIconsCount + 1;

  const orderPrice = ingredients
    .map((id) => {
      const ingredient = ingredientsData.find((item) => item._id === id);
      if (ingredient?.type === 'bun') {
        return ingredient.price * 2;
      }
      return ingredient?.price;
    })
    .reduce((acc, price) => {
      if (acc && price) {
        return acc + price;
      }
      return 0;
    });

  const { pathname }: TLocation = useLocation();

  const isProfilePage = pathname === '/profile/orders';

  return (
    <li className={`${styles.orderItem__container} p-6 mr-2 mb-6`}>
      <div className={styles.orderItem__header}>
        <span className="text text text_type_digits-default">{`#${number}`}</span>
        <span
          className={`${styles.orderItem__createdAt} text text_type_main-default text_color_inactive`}
        >
          {getHowLongAgoDate(createdAt)}
        </span>
      </div>
      <h2
        className={`${styles.orderItem__title} text text_type_main-medium pt-6 pb-6`}
      >
        {name}
      </h2>
      {isProfilePage && (
        <p
          className={`${styles.orderItem__status} ${statusToColor[status]} text text_type_main-default pb-6`}
        >
          {statusToText[status]}
        </p>
      )}
      <div className={styles.orderItem__details}>
        <ul className={styles.orderItem__images}>
          {ingredientImages
            .slice(0, visibleIconsCount)
            .map((image?: string, index?: number) => (
              <li key={index} className={styles.orderItem__imageOverlay}>
                <img
                  src={image}
                  alt={name}
                  className={styles.orderItem__image}
                />
              </li>
            ))}
          {hiddenIconsCount > 0 && (
            <li
              className={`text text text_type_digits-default ${styles.orderItem__imagesCount}`}
            >{`+${hiddenIconsCount}`}</li>
          )}
        </ul>
        <div className={styles.orderItem__price}>
          <span className="text text text_type_digits-default pr-2">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default React.memo(OrderItem);
// using memo will cause React to skip rendering a component if its props have not changed
