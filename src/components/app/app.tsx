/**
 * * 1. Страница информации о заказе (компонент)
 * * 2. Модальное окно со информацией о заказе
 * * 3. Веб-сокет с авторизацией
 * * 4. Роутинг страницы информации о заказе
 * * 5. Защищенные маршруты
 * * 6. Страница с историей заказов (profile)
 */

import React, { useCallback, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import AppHeader from 'components/app-header/app-header';
import RegisterPage from 'pages/register';
import ForgotPasswordPage from 'pages/forgot-password';
import ResetPasswordPage from 'pages/reset-password';
import NotFound404 from 'pages/not-found-404';
import ProfilePage from 'pages/profile';
import { getUserData } from 'services/thunks/auth';
import { useDispatch } from 'react-redux';
import ProtectedRoute from 'components/protected-route/protected-route';
import Modal from 'components/modal/modal';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { resetIngredientToView } from 'services/slices/ingredients';
import IngredientPage from 'pages/ingredient-page';
import FeedPage from 'pages/feed';
import getOrdersData from 'services/thunks/orders';
import getIngredientsData from 'services/thunks/ingredients';

export type TLocationState = {
  from?: string;
  // eslint-disable-next-line no-use-before-define
  background?: TLocation;
};

export type TLocation = {
  hash: string;
  key?: string;
  pathname: string;
  search: string;
  state: TLocationState;
};

const App: React.VFC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location: TLocation = useLocation();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  // https://v5.reactrouter.com/web/example/modal-gallery
  const background = location?.state && location.state.background;

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getOrdersData());
    dispatch(getIngredientsData());
  }, [dispatch]);

  const handleIngredientModalClose = useCallback(() => {
    dispatch(resetIngredientToView());
    history.replace('/');
  }, [dispatch, history]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients:id">
          <Modal onClose={handleIngredientModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
