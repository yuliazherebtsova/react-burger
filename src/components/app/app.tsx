/**
 * * 1. Сброс и восстановление пароля
 * * 2. Выход из системы
 * * 3. Обновление токена
 * * 4. Файл cookie.js типизировать
 * * 5. Защищенные маршруты
 * * 6. Роутинг модальных окон
 * * 7. Тестирование
 * * 8. Убрать все any
 * * 9. Вопросы в Слаке
 * * 10. gh-pages (был вопрос в Слаке)
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
