/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'services/types/hooks';
import {
  selectOrders,
  selectTotalOrders,
  selectTotalTodayOrders,
} from 'services/selectors/orders';
import styles from './orders-dashboard.module.css';

const OrdersDashboard: React.VFC = () => {
  const orders = useSelector(selectOrders);

  const total = useSelector(selectTotalOrders);

  const totalToday = useSelector(selectTotalTodayOrders);

  const visibleOrdersCount = 10;

  return (
    <section className={`${styles.dashboard} pt-20 pl-4`}>
      <div className="mt-4">
        <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
        <ul
          className={`${styles.dashboard__list} ${styles.dashboard__list_done}`}
        >
          {orders
            .filter((order) => order.status === 'done')
            .slice(0, visibleOrdersCount)
            .map((order) => (
              <li
                key={order._id}
                className={`${styles.dashboard__number} text text text_type_digits-default mb-2`}
              >
                {order.number}
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text text_type_main-medium mb-6">В работе:</h2>
        <ul className={`${styles.dashboard__list}`}>
          {orders
            .filter((order) => order.status === 'pending')
            .slice(0, visibleOrdersCount)
            .map((order) => (
              <li
                key={order._id}
                className="text text text_type_digits-default mb-2"
              >
                {order.number}
              </li>
            ))}
        </ul>
      </div>
      <div className={`${styles.dashboard__total} mt-10`}>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <span className="text text text_type_digits-large">{total}</span>
      </div>
      <div className={`${styles.dashboard__totalToday} mt-5`}>
        <h2 className="text text_type_main-medium">В работе:</h2>
        <span className="text text text_type_digits-large">{totalToday}</span>
      </div>
    </section>
  );
};

export default OrdersDashboard;
