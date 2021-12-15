import PropTypes from "prop-types";
import orderStyles from "./order-details.module.css";
import doneImage from "../../images/done.svg";

function OrderDetails({ orderNumber }) {
  return (
    <div className={orderStyles.order}>
      <div className="text text_type_digits-large pt-15 pb-8">
        {orderNumber}
      </div>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img
        className={`${orderStyles.order__image} pt-15 pb-15`}
        src={doneImage}
      ></img>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pt-2 pb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

const orderDetailsPropTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
});

OrderDetails.propTypes = PropTypes.arrayOf(orderDetailsPropTypes).isRequired;

export default OrderDetails;
