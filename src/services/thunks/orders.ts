import { AppThunk } from 'services/types';
import { api } from 'utils/api';
import ordersData from '../types/ordersData';
import { getOrders } from '../slices/orders';

const getOrdersData: AppThunk = () => (dispatch) => {
  dispatch(getOrders(ordersData));
};

export default getOrdersData;
