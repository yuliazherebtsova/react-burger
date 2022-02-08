import { IHandleModalClose } from 'components/app/app';
import Modal from 'components/modal/modal';

interface ILoadingIndicatorHOCProps {
  isLoading?: boolean;
  hasError: boolean;
  gotData: boolean;
  children: React.ReactNode;
  onErrorModalClose: IHandleModalClose;
}

const LoadingIndicatorHOC: React.FC<ILoadingIndicatorHOCProps> = ({
  isLoading,
  hasError,
  gotData,
  children,
  onErrorModalClose,
}) => (
  <>
    {isLoading && (
      <p className="text text_type_main-medium text_color_inactive pt-10">
        Загрузка...
      </p>
    )}
    {hasError && (
      <Modal title="Произошла ошибка" onClose={onErrorModalClose}>
        <p className="text text_type_main-medium text_color_inactive pt-10">
          Пожалуйста, повторите попытку позднее
        </p>
      </Modal>
    )}
    {!isLoading && !hasError && gotData && children}
  </>
);

export default LoadingIndicatorHOC;
