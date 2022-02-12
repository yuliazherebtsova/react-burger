import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage  from 'pages/home';
import LoginPage from 'pages/login';
import AppHeader from 'components/app-header/app-header';

const App: React.FC = () => (
  <>
  <AppHeader />
  <Router>
    <Switch>
      <Route path="/">
        <LoginPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Switch>
  </Router>
  </>
);

export default App;
