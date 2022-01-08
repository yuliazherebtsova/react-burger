import PropTypes from 'prop-types';
import Modal from 'components/modal/modal';

function LoadingIndicatorHOC({
  isLoading,
  hasError,
  gotData,
  children,
  onClick,
}) {
  return (
    <>
      {isLoading && (
        <p className="text text_type_main-medium text_color_inactive pt-10">
          Загрузка...
        </p>
      )}
      {hasError && (
        <Modal title="Произошла ошибка" onClose={onClick}>
          <p className="text text_type_main-medium text_color_inactive pt-10">
            Пожалуйста, повторите попытку позднее
          </p>
        </Modal>
      )}
      {!isLoading && !hasError && gotData && children}
    </>
  );
}

LoadingIndicatorHOC.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  gotData: PropTypes.bool.isRequired,
};

export default LoadingIndicatorHOC;
