import NavigationLink from 'components/navigation-link/navigation-link';
import styles from './not-found-404.module.css';

export const NotFound404: React.VFC = () => (
  <main className={styles.notFound__container}>
    <div className={styles.notFound__info}>
      <h1 className="text text_type_digits-large  pb-4">
        404
      </h1>
      <p className="text_type_main-medium  pb-6">
        Страница не найдена
      </p>
      <NavigationLink title="На главную" size="medium">
        На главную
      </NavigationLink>
    </div>
  </main>
);
export default NotFound404;
