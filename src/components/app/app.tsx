/* eslint-disable prefer-const */
/**
 * * 
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

  let location: TLocation = useLocation();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  // https://v5.reactrouter.com/web/example/modal-gallery
  let background = location?.state && location.state.background;

  useEffect(() => {
    dispatch(getUserData());
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
        <ProtectedRoute path="/ingredients/:id" exact>
          <IngredientPage />
        </ProtectedRoute>
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
