import React from 'react';
import auth from '../auth'
import {Route, Redirect} from 'react-router-dom';

//REDIRECTS USER FROM LOGIN TO THE DASHBOARD IF THEY'RE ALREADY LOGGED IN.
export const hideLogin = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={(props) => {
        //if condition is met, render first or second componenet
          if (auth.success()) {
            return <Component   { ...props} {...rest} />;
          } else {
           return <h2>you are forbiden!!</h2>
            // return <Redirect to={{pathname: "/", state: {from: props.location}}} />
          }
        }}
      />
    );
  };