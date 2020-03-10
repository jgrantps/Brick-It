import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//REDIRECTS THE USER FROM DASHBOARD TO LOGIN IF THEY'RE NOT LOGGED IN.
 export const PrivateUser = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={(props) => {
        //if condition is met, render first or second componenet
          if (rest.loggedIn) {
            return <Component   { ...props} {...rest} />;
          } else {
          //  return <h2>you are forbiden!!</h2>
            return <Redirect to={{pathname: "/", state: {from: props.location}}} />
          }
        }}
      />
    );
  };


 export const PrivateCommunity = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={(props) => {
        //if condition is met, render first or second componenet
          if (rest.loggedIn) {
            return <Component   { ...props} {...rest} />;
          } else {
          //  return <h2>you are forbiden!!</h2>
            return <Redirect to={{pathname: "/", state: {from: props.location}}} />
          }
        }}
      />
    );
  };


 export const PrivateCollection = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={(props) => {
        //if condition is met, render first or second componenet
          if (rest.loggedIn) {
            return <Component   { ...props} {...rest} />;
          } else {
          //  return <h2>you are forbiden!!</h2>
            return <Redirect to={{pathname: "/", state: {from: props.location}}} />
          }
        }}
      />
    );
  };

 export const PrivateCatalogue = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={(props) => {
        //if condition is met, render first or second componenet
          if (rest.loggedIn) {
            return <Component   { ...props} {...rest} />;
          } else {
          //  return <h2>you are forbiden!!</h2>
            return <Redirect to={{pathname: "/", state: {from: props.location}}} />
          }
        }}
      />
    );
  };


