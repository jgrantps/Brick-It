import React from 'react';
import auth from '../../classes/auth'
import {Route, Redirect} from 'react-router-dom';

//REDIRECTS USER FROM LOGIN TO THE DASHBOARD IF THEY'RE ALREADY LOGGED IN.
export const HideLogin = ({component: Component, ...rest}) => {
    return (
        //DISPLAY LOGIN
      <Route {...rest} render={(props) => {
        //IF USER IS LOGGED IN, REDIRECT TO THE '/APP' DASHBOARD PAGE.
          if (rest.loggedIn) {
              return <Redirect to={{pathname: "/app", state: {from: props.location}}} />
        } else {
            //IF USER IS NOT LOGGED IN, RENDER THE LOGIN COMPONENT AS REQUESTED.
            return <Component   { ...props} {...rest} />;
        //    return <h2>you are forbiden!!</h2>
          }
        }}
      />
    );
  };