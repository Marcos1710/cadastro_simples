import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";

import history from "./history";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);
