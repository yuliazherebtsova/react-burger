import PropTypes from "prop-types";
import overlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ onClose }) {
  return (
    <div className={overlayStyles.overlay} onClick={onClose} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
