// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from '../components/SignUp';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ConfirmEmail from '../components/ConfirmEmail';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/confirm-email" component={ConfirmEmail} />
        <Route path="/" exact component={Signup} /> {/* Default to Signup page */}
      </Switch>
    </Router>
  );
};

export default Routes;
