import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import { getToken, removeToken } from "../utils/localStorage";

import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";

import List from "../screens/List";
import Register from "../screens/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Non-private routes */}
        <Route exact path="/" component={Login} />
        <Route path="/forgot/password" component={ForgotPassword} />

        {/* private routes */}
        <PrivateRoute exact path="/users">
          <List />
        </PrivateRoute>

        <PrivateRoute exact path="/users/register">
          <Register />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const token = getToken();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (token) {
          return children;
        } else {
          removeToken();
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default Routes;
