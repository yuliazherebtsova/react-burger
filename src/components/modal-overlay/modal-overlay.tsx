import React from 'react';
import overlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClose }) => (
  <div
    className={overlayStyles.overlay}
    onClick={onClose}
    onKeyPress={onClose}
  />
);

export default ModalOverlay;
