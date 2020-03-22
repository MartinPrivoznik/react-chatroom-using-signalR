import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import { ApplicationProvider } from './providers/ApplicationProvider';
import { AuthProvider } from './providers/AuthProvider';

import MainPage from './components/main-page'
import SignInCallback from "./components/auth/sign-in-callback";

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <ApplicationProvider>
            <AuthProvider>
              <Switch>
                <Route path="/oidc-callback" component={SignInCallback} />
                <Route exact path="/" component={MainPage} />
              </Switch>
            </AuthProvider>
        </ApplicationProvider>
    );
  }
}

