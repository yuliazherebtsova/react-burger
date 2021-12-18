import PropTypes from "prop-types";
import orderStyles from "./order-details.module.css";
import doneImage from "../../images/done.svg";

function OrderDetails({ orderNumber }) {
  return (
    <div className={orderStyles.order}>
      <div className={`${orderStyles.order__number} text text_type_digits-large pt-15 pb-8`}>
        {orderNumber}
      </div>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img
        className={`${orderStyles.order__image} pt-15 pb-15`}
        src={doneImage}
        alt="заказ сформирован"
      ></img>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pt-2 pb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes =  {
  orderNumber: PropTypes.string.isRequired,
};

export default OrderDetails;
