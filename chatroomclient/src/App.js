import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import { ApplicationProvider } from './providers/ApplicationProvider';
import { AuthProvider } from './providers/AuthProvider';

import MainPage from './components/main-page'
import ChatPage from './components/chat-page'
import SignInCallback from "./components/auth/sign-in-callback";
import SignOutCallback from "./components/auth/sign-out-callback";
import SilentRenew from "./components/auth/SilentRenew";
import Unauthorized from "./components/unauthorized";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <ApplicationProvider>
        <AuthProvider>
          <Switch>
            <Route path="/oidc-callback" component={SignInCallback} />
            <Route path="/oidc-signout-callback" component={SignOutCallback} />
            <Route path="/oidc-silent-renew" component={SilentRenew} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route path="/chat" component={ChatPage} />
            <Route exact path="/" component={MainPage} />
          </Switch>
        </AuthProvider>
      </ApplicationProvider>
    );
  }
}

