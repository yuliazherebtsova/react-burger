/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TLocation } from 'components/app/app';
import {
  getOrderPrice,
  selectOrders,
  selectOrderToView,
} from 'services/selectors/orders';
import { IIngredientsData, IOrderData } from 'services/types/data';
import getHowLongAgoDate from 'utils/date-time';
import { selectIngredients } from 'services/selectors/ingredients';
import styles from './order-contents.module.css';

export interface IStatusToText {
  [title: string]: string;
}

export interface IStatusToColor {
  [title: string]: string;
}

const OrderContents: React.VFC = () => {
  const statusToText: IStatusToText = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен',
  };
  const statusToColor: IStatusToColor = {
    created: `${styles.orderContents__status_created}`,
    pending: `${styles.orderContents__status_progress}`,
    done: `${styles.orderContents__status_done}`,
  };

  const orders = useSelector(selectOrders);

  const ingredientsData = useSelector(selectIngredients);

  const location: TLocation = useLocation();

  let order = useSelector(selectOrderToView);

  if (!order) {
    const splittedUrl = location.pathname.split('/');
    const idFromUrl = splittedUrl[splittedUrl.length - 1];
    order = orders.find((item: IOrderData) => item._id === idFromUrl);
  }

  const orderPrice = useSelector(getOrderPrice(order!.ingredients));

  const statusColor = order ? statusToColor[order.status] : '';

  const statusText = order ? statusToText[order.status] : '';

  const ingredientImage = Array.from(
    new Set(
      order?.ingredients.map(
        (ingredientId: string) =>
          ingredientsData.find(
            (item: IIngredientsData) => item._id === ingredientId
          )?.image_mobile
      )
    )
  ).sort();

  return (
    <li className={`${styles.orderContents__container}`}>
      <p className="text text text_type_digits-default mt-2 mb-10">{`#${order?.number}`}</p>
      <h1
        className={`${styles.orderContents__title} text text_type_main-medium mb-3`}
      >
        {order?.name}
      </h1>
      <p
        className={`${styles.orderContents__status} ${statusColor} text text_type_main-default mb-15`}
      >
        {statusText}
      </p>
      <h2
        className={`${styles.orderContents__title} text text_type_main-medium mb-6`}
      >
        Состав:
      </h2>
      <ul className={`${styles.orderContents__ingredients} mb-10`}>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
      <div className={`${styles.orderContents__details}`}>
        <span
          className={`${styles.orderContents__createdAt} text text_type_main-default text_color_inactive mt-1`}
        >
          {order && getHowLongAgoDate(order.createdAt)}
        </span>
        <div className={styles.orderContents__price}>
          <span className="text text text_type_digits-default pr-2">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default React.memo(OrderContents);
// using memo will cause React to skip rendering a component if its props have not changed
