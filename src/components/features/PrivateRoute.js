import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const admin = "admin@gmail.com";
const isLogin = () => {
  if (localStorage.getItem("user")) {
    if (localStorage.getItem("user") === admin) {
      return true;
    }
  }
  return false;
};

export default PrivateRoute;
