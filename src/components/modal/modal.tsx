import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { portal } from '../../utils/constants';

interface IModalProps {
  title?: string;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${modalStyles.modal} p-10`}>
        <div className={modalStyles.modal__closeIcon}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </>,
    portal
  );
};

export default Modal;
