import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({ children, onClose, modalRef, closeIconRef }) {
  const portal = document.getElementById("react-portal");

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div
        className={`${modalStyles.modal} pt-15 pr-30 pb-15 pl-30`}
        ref={modalRef}
      >
        <div className={modalStyles.modal__closeIcon} ref={closeIconRef}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        <h2
          className={`${modalStyles.modal__title} text text_type_main-large pb-4`}
        >
          Детали ингредиента
        </h2>
        {children}
      </div>
    </>,
    portal
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  modalRef: PropTypes.element.isRequired,
  closeIconRef: PropTypes.element.isRequired,
};

export default Modal;
