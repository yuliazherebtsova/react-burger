/**
 * * 1. Роутинг модальных окон
 * * 2. Тестирование
 * * 3. gh-pages (был вопрос в Слаке)
 * * 4. Убрать отладку
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(getUserData());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Router>
      <AppHeader />
      <Switch>
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
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
