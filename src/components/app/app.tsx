import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage  from 'pages/home';
import LoginPage from 'pages/login';
import AppHeader from 'components/app-header/app-header';
import RegisterPage from 'pages/register';
import ForgotPasswordPage from 'pages/forgot-password';
import ResetPasswordPage from 'pages/reset-password';

const App: React.FC = () => (
  <>
  <AppHeader />
  <Router>
    <Switch>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/forgot-password">
        <ForgotPasswordPage />
      </Route>
      <Route path="/reset-password">
        <ResetPasswordPage />
      </Route>
    </Switch>
  </Router>
  </>
);

export default App;
