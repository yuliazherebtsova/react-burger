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
import appStyles from 'components/app/app.module.css';
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

  const getIngredientFreq2 = Array.from(
    new Set(
      order?.ingredients.map((ingredientId: string) =>
        ingredientsData.filter(
          (item: IIngredientsData) => item._id === ingredientId
        )
      )
    )
  ).sort();

  // const countIngredientFreqs = () => {
  //   const freqDict: TfreqDict = {};
  //   const arrToSort: [string, number][] = [];
  //   order?.ingredients.forEach((id) => {
  //     if (!freqDict[id]) {
  //       freqDict[id] = 1;
  //     } else {
  //       freqDict[id] += 1;
  //     }
  //   });
  //   Object.keys(freqDict).forEach((key) =>
  //     arrToSort.push([key, freqDict[key]])
  //   );
  //   //return arrToSort.sort((x, y) => y[1] - x[1]);
  //   return freqDict;
  // };

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
          ...ingredient,
          count: 2,
        };
      }
      return {
        ...ingredient,
        count: ingredient ? freqDict[ingredient._id] : 0,
      };
    });
  };

  console.log(getIngredientbyFreq());

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
      <ul className={`${styles.orderContents__ingredients} ${appStyles.scroll} mb-10`}>
        {getIngredientbyFreq().map((ingredient) => (
          <li key={ingredient._id}>
            <img src={ingredient.image_mobile} alt={ingredient.name} />
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
