/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'services/types/hooks';
import { selectOrders } from 'services/selectors/orders';
import OrderItem from 'components/order-item/order-item';
import appStyles from 'components/app/app.module.css';
import styles from './orders-list.module.css';

const OrdersList: React.VFC = () => {
  const orders = useSelector(selectOrders);

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <ul className={`${styles.orders__list} ${appStyles.scroll}`}>
        {orders.map((order) => (
          <OrderItem key={order._id} {...order} />
        ))}
      </ul>
    </section>
  );
};

export default OrdersList;
