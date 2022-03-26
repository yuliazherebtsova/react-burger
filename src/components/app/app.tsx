/**
 * * 1. Защищенные маршруты
 * * 2. Роутинг модальных окон
 * * 4. Тестирование
 * * 5. gh-pages (был вопрос в Слаке)
 * * 7. Убрать отладку
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

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  
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
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
