import { IHandleModalClose } from 'components/app/app';
import React from 'react';
import overlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: IHandleModalClose
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClose }) => (
  <div
    className={overlayStyles.overlay}
    onClick={onClose}
    onKeyPress={onClose}
  />
);

export default ModalOverlay;
