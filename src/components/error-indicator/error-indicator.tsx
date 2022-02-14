import Loader from 'components/loader/loader';
import Modal from 'components/modal/modal';

interface IErrorIndicatorProps {
  isLoading?: boolean;
  hasError: boolean;
  hasData: boolean;
  onErrorModalClose: () => void;
}

const ErrorIndicator: React.FC<IErrorIndicatorProps> = ({
  isLoading,
  hasError,
  hasData,
  children,
  onErrorModalClose,
}) => (
  <>
    {isLoading && <Loader />}
    {hasError && (
      <Modal title="Произошла ошибка" onClose={onErrorModalClose}>
        <p className="text text_type_main-medium text_color_inactive pt-10">
          Пожалуйста, повторите попытку позднее
        </p>
      </Modal>
    )}
    {!isLoading && !hasError && hasData && children}
  </>
);

export default ErrorIndicator;
