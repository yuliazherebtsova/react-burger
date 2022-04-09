/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'services/types/hooks';
import { selectOrders } from 'services/selectors/orders';
import OrderItem from 'components/order-item/order-item';
import appStyles from 'components/app/app.module.css';
import { TLocation } from 'components/app/app';
import { useLocation } from 'react-router-dom';
import styles from './orders-list.module.css';

interface IOrderListProps {
  onOpenModalWithOrder: (
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

const OrdersList: React.VFC<IOrderListProps> = ({ onOpenModalWithOrder }) => {
  const { pathname }: TLocation = useLocation();

  const isFeedPage = pathname === '/feed';

  const isProfilePage = pathname === '/profile/orders';

  let orders = useSelector(selectOrders);

  // разворачиваем массив, т.к. заказы пользователя приходят с сервера в обратном хронологическом порядке
  if (isProfilePage) {
    orders = [...orders].reverse();
  }

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">
        {isFeedPage && 'Лента заказов'}
      </h1>
      <ul className={`${styles.orders__list} ${appStyles.scroll}`}>
        {orders.map((order) => (
          <OrderItem
            key={order._id}
            id={order._id}
            ingredients={order.ingredients}
            status={order.status}
            name={order.name}
            number={order.number}
            createdAt={order.createdAt}
            onOpenModal={onOpenModalWithOrder}
          />
        ))}
      </ul>
    </section>
  );
};

export default OrdersList;
