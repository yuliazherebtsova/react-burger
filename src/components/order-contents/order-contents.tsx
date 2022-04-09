/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TLocation } from 'components/app/app';
import {
  getOrderPrice,
  selectOrders,
  selectOrderToView,
} from 'services/selectors/orders';
import getHowLongAgoDate from 'utils/date-time';
import { selectIngredients } from 'services/selectors/ingredients';
import appStyles from 'components/app/app.module.css';
import { IOrderData } from 'services/types/data';
import { CurrencyIcon } from 'modules/common/components';
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

  const getIngredientbyFreq = () => {
    type TfreqDict = {
      [name: string]: number;
    };
    const freqDict: TfreqDict = {};
    order?.ingredients.forEach((id) => {
      if (!freqDict[id]) {
        freqDict[id] = 1;
      } else {
        freqDict[id] += 1;
      }
    });

    return Array.from(new Set(order?.ingredients)).map((id) => {
      const ingredient = ingredientsData.find((item) => item._id === id);
      if (ingredient?.type === 'bun') {
        return {
          id: ingredient?._id,
          image: ingredient?.image_mobile,
          name: ingredient?.name,
          price: ingredient?.price,
          count: 2,
        };
      }
      return {
        id: ingredient?._id,
        image: ingredient?.image_mobile,
        name: ingredient?.name,
        price: ingredient?.price,
        count: ingredient?._id ? freqDict[ingredient._id] : 0,
      };
    });
  };

  return (
    <li className={`${styles.orderContents__container}`}>
      <p className="text text text_type_digits-default mt-4 mb-10">{`#${order?.number}`}</p>
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
      <ul
        className={`${styles.orderContents__ingredients} ${appStyles.scroll} mb-10`}
      >
        {getIngredientbyFreq().map((ingredient) => (
          <li
            className={`${styles.orderContents__ingredient} mb-4`}
            key={ingredient.id}
          >
            <div className={styles.orderContents__imageOverlay}>
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className={styles.orderContents__image}
              />
            </div>
            <span className="text text_type_main-default ml-4">
              {ingredient.name}
            </span>
            <div className={`${styles.orderContents__price} mr-6`}>
              <span className="text text text_type_digits-default mr-2 ml-6">
                {`${ingredient.count} x ${ingredient.price}`}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
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
