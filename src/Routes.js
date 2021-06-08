import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BnConnect from "./pages/BnConnect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={BnConnect} path="/" />
        <Route exact component={Login} path="/auth/login" />
        <Route exact component={Signup} path="/auth/signup" />
      </Switch>
    </BrowserRouter>
  );
}
