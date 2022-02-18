/**
 * * 1. Авторизация
 * * 2. Регистрация
 * * 3. Выход из системы
 * * 4. Куки
 * * 5. Обновление данных о пользователе
 * * 6. Защищенные маршруты
 * * 7. Роутинг модальных окон
 * * 8. Тестирование
 * * 9. Убрать все any
 */


import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import AppHeader from 'components/app-header/app-header';
import RegisterPage from 'pages/register';
import ForgotPasswordPage from 'pages/forgot-password';
import ResetPasswordPage from 'pages/reset-password';
import NotFound404 from 'pages/not-found-404';
import ProfilePage from 'pages/profile';

const App: React.FC = () => (
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

export default App;
