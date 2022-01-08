import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { portal } from '../../utils/constants';

function Modal({ children, title = '', onClose }) {
  useEffect(() => {
    const handleEscPress = (evt) => {
      if (evt.key === 'Escape') onClose(evt);
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
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
