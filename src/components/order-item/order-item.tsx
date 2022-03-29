import React, { useCallback } from 'react';
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { IOrderData } from 'services/types/data';
import getHowLongAgoDate from 'utils/date-time';
import { selectIngredients } from 'services/selectors/ingredients';
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
  const ingredientsData = useSelector(selectIngredients);

  const ingredientImages = {
    
  }
  
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
        className={`${styles.orderItem__title} text text_type_main-medium pt-6`}
      >
        {name}
      </h2>
      <p
        className={`${styles.orderItem__status} ${statusToColor[status]} text text_type_main-default pt-2 pb-6`}
      >
        {statusToText[status]}
      </p>
      <div className={styles.orderItem__details}>
        <ul className={styles.orderItem__images}>{ingredients[0]}</ul>
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
