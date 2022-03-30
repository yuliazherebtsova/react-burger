/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { IIngredientsData, IOrderData } from 'services/types/data';
import getHowLongAgoDate from 'utils/date-time';
import { selectIngredients } from 'services/selectors/ingredients';
import getIngredientsData from 'services/thunks/ingredients';
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
  const dispatch = useDispatch();

  const ingredientsData = useSelector(selectIngredients);

  const ingredientImages = Array.from(
    new Set(
      ingredients.map(
        (id: string) =>
          ingredientsData.find((item: IIngredientsData) => item._id === id)
            ?.image_mobile
      )
    )
  );

  const statusToText: IStatusToText = {
    created: 'Создан',
    progress: 'Готовится',
    done: 'Выполнен',
  };

  const statusToColor: IStatusToColor = {
    created: `${styles.orderItem__status_created}`,
    progress: `${styles.orderItem__status_progress}`,
    done: `${styles.orderItem__status_done}`,
  };

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  return (
    <li className={`${styles.orderItem__container} p-6`}>
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
      <p
        className={`${styles.orderItem__status} ${statusToColor[status]} text text_type_main-default pb-6`}
      >
        {statusToText[status]}
      </p>
      <div className={styles.orderItem__details}>
        <ul className={styles.orderItem__images}>
          {ingredientImages.map((image?: string, index?: number) => (
            <li key={index}>
              <div className={styles.orderItem__imageOverlay}>
                <img
                  src={image}
                  alt={name}
                  className={styles.orderItem__image}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.orderItem__price}>
          <span
            className={`${styles.orderItem__totalPrice} text text text_type_digits-default pr-2`}
          >
            {420}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default React.memo(OrderItem);
// using memo will cause React to skip rendering a component if its props have not changed
