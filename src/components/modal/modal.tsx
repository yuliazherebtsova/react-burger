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

const Modal: React.FC<IModalProps> = ({ children, title = '', onClose }) => {
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
      <div className={`${modalStyles.modal} pt-15 pr-30 pb-15 pl-30`}>
        <div className={modalStyles.modal__closeIcon}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        <h2
          className={`${modalStyles.modal__title} text text_type_main-large pb-4`}
        >
          {title}
        </h2>
        {children}
      </div>
    </>,
    portal
  );
};

export default Modal;
