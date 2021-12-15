import { React, useEffect } from "react";
import PropTypes from "prop-types";
import overlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ children, onClose }) {
  useEffect(() => {
    const handleEscPress = (evt) => {
      if (evt.key === "Escape") onClose(evt);
    };
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  });

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      {children}
    </div>
  );
}
const modalOverlayPropTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
});

ModalOverlay.propTypes = modalOverlayPropTypes.isRequired;

export default ModalOverlay;
