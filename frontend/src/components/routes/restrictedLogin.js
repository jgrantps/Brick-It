import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../classes/auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.success()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{pathname: "/", state: {from: props.location} }}
            />
          );
        }
      }}
    />
  );
};