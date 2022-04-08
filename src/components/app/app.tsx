/* eslint-disable no-use-before-define */
/**
 * * 2.Тренажер (веб-сокет, 2-я часть)
 * * 3. Веб-сокет с авторизацией
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
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from 'components/protected-route/protected-route';
import Modal from 'components/modal/modal';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { resetIngredientToView } from 'services/slices/ingredients';
import IngredientPage from 'pages/ingredient';
import FeedPage from 'pages/feed';
import getOrdersData from 'services/thunks/orders';
import getIngredientsData from 'services/thunks/ingredients';
import OrderContentsPage from 'pages/order-contents';
import OrderContents from 'components/order-contents/order-contents';
import { selectIngredientToView } from 'services/selectors/ingredients';
import { selectOrderToView } from 'services/selectors/orders';
import { resetOrderToView } from 'services/slices/orders';

export type TLocationState = {
  from?: { 
    pathname?: string 
  };
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

  const ingredientToView = useSelector(selectIngredientToView);

  const orderToView = useSelector(selectOrderToView);

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

  const handleOrderModalClose = useCallback(() => {
    dispatch(resetOrderToView());
    history.goBack();
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
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderContentsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderContentsPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {ingredientToView && background && (
        <Route path="/ingredients/:id">
          <Modal onClose={handleIngredientModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {orderToView && background && (
        <Route path="/profile/orders/:id">
          <Modal onClose={handleOrderModalClose}>
            <OrderContents />
          </Modal>
        </Route>
      )}
      {orderToView && background && (
        <Route path="/feed/:id">
          <Modal onClose={handleOrderModalClose}>
            <OrderContents />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
