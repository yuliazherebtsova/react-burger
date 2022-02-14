import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

export const NotFound404: React.VFC = () => (
  <main className={styles.notFound__container}>
    <div className={styles.notFound__info}>
      <h1 className="text text_type_digits-large text_color_inactive pb-4">
        404
      </h1>
      <p className="text_type_main-medium text_color_inactive pb-6">
        Страница не найдена
      </p>

      <Link
        to="/"
        className={`${styles.notFound__link} text_type_main-medium text_color_inactive`}
      >
        На главную
      </Link>
    </div>
  </main>
);
export default NotFound404;
