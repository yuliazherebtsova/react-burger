import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRouteMatch } from 'react-router-dom';

const OrdersPage: React.VFC = () => {
  const { path } = useRouteMatch();
  console.log(path);

  return (
    <section>
      <Input
        type="text"
        placeholder="Имя"
        icon="EditIcon"
        onChange={() => null}
        value="Rey Skywalker"
        name="name"
        error={false}
        errorText="Ошибка"
        disabled
      />
    </section>
  );
};

export default OrdersPage;
