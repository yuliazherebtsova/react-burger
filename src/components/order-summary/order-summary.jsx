import { React, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderSummary({}) {
  return null;
}

const orderSummaryPropTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
});

OrderSummary.propTypes = PropTypes.arrayOf(modalPropTypes).isRequired;

export default OrderSummary;
