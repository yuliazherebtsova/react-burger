/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'services/types/hooks';
import { selectOrders } from 'services/selectors/orders';
import OrderItem from 'components/order-item/order-item';
import appStyles from 'components/app/app.module.css';
import { TLocation } from 'components/app/app';
import { useLocation } from 'react-router-dom';
import styles from './orders-list.module.css';

const OrdersList: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const { pathname }: TLocation = useLocation();

  const isFeedPage = pathname === '/feed';

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">
        {isFeedPage && 'Лента заказов'}
      </h1>
      <ul className={`${styles.orders__list} ${appStyles.scroll}`}>
        {orders.map((order) => (
          <OrderItem key={order._id} {...order} />
        ))}
      </ul>
    </>
  );
};

export default OrdersList;
