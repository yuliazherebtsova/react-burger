/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { IIngredientsData } from 'services/types/data';
import getHowLongAgoDate from 'utils/date-time';
import { selectIngredients } from 'services/selectors/ingredients';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { TLocation } from 'components/app/app';
import { getOrderPrice } from 'services/selectors/orders';
import { CurrencyIcon } from 'modules/common/components';
import styles from './order-item.module.css';

interface IOrderItemProps {
  id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  onOpenModal: (
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

export interface IStatusToText {
  [title: string]: string;
}

export interface IStatusToColor {
  [title: string]: string;
}

const OrderItem: React.VFC<IOrderItemProps> = ({
  id,
  ingredients,
  status,
  name,
  number,
  createdAt,
  onOpenModal,
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

  const orderPrice = useSelector(getOrderPrice(ingredients));

  const ingredientImages = Array.from(
    new Set(
      ingredients.map(
        (ingredientId: string) =>
          ingredientsData.find(
            (item: IIngredientsData) => item._id === ingredientId
          )?.image_mobile
      )
    )
  ).sort();

  const visibleIconsCount = 6;

  const hiddenIconsCount = ingredientImages.length - visibleIconsCount + 1;

  const { pathname }: TLocation = useLocation();

  const location: TLocation = useLocation();

  const isProfilePage = pathname === '/profile/orders';

  const onClickToOrder = useCallback(
    (evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
      onOpenModal(evt),
    [onOpenModal]
  );

  return (
    <Link
      to={{
        pathname: `${pathname}/${id}`,
        // This is the trick! This link sets
        // the `background` in location state.
        state: { background: location },
      }}
    >
      <li
        className={`${styles.orderItem__container} p-6 mr-2 mb-6`}
        data-id={id}
        onClick={onClickToOrder}
        onKeyPress={onClickToOrder}
      >
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
                <li
                  key={index}
                  className={styles.orderItem__imageOverlay}
                  data-id={id}
                >
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
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default React.memo(OrderItem);
// using memo will cause React to skip rendering a component if its props have not changed
