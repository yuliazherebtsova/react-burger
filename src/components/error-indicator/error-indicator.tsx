import Loader from 'components/loader/loader';
import Modal from 'components/modal/modal';

interface IErrorIndicatorProps {
  isLoading?: boolean;
  hasError: boolean;
  hasData: boolean;
  errorMessage: string;
  onErrorModalClose: () => void;
}

const ErrorIndicator: React.FC<IErrorIndicatorProps> = ({
  isLoading,
  hasError,
  hasData,
  errorMessage,
  children,
  onErrorModalClose,
}) => (
  <>
    {isLoading && <Loader />}
    {hasError && (
      <Modal onClose={onErrorModalClose}>
        <h1 className="text text_type_main-large">Произошла ошибка</h1>
        <p className="text text_type_main-medium text_color_inactive pt-10">
          {errorMessage}
        </p>
      </Modal>
    )}
    {!isLoading && !hasError && hasData && children}
  </>
);

export default ErrorIndicator;
