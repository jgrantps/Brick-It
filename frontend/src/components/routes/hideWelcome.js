import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//REDIRECTS USER FROM LOGIN TO THE DASHBOARD IF THEY'RE ALREADY LOGGED IN.
export const HideWelcome = ({component: Component, ...rest}) => {
    return (
        //DISPLAY LOGIN
      <Route {...rest} render={(props) => {
        //IF USER IS LOGGED IN, REDIRECT TO THE '/:SLUG' DASHBOARD PAGE.
          if (rest.loggedIn) {
              return <Redirect to={{pathname: `/${rest.slug}/collection`, state: {from: props.location}}} />
        } else {
        //IF USER IS NOT LOGGED IN, RENDER THE LOGIN COMPONENT AS REQUESTED.
            return <Component   { ...props} {...rest} />;
          }
        }}
      />
    );
  };