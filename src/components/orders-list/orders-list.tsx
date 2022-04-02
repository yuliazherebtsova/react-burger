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
    // eslint-disable-next-line no-unused-vars
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

const OrdersList: React.VFC<IOrderListProps> = ({ onOpenModalWithOrder }) => {
  const orders = useSelector(selectOrders);

  const { pathname }: TLocation = useLocation();

  const isFeedPage = pathname === '/feed';

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
