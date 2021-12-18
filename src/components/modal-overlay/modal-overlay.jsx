import { React, useEffect } from "react";
import PropTypes from "prop-types";
import overlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ onClose }) {
  useEffect(() => {
    const handleEscPress = (evt) => {
      if (evt.key === "Escape") onClose(evt);
    };
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  });

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
    </div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
