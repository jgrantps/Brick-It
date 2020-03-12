import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import uuid from 'react-uuid'

//REDIRECTS THE USER FROM INTERNAL SIGHT TO LOGIN IF THEY'RE NOT LOGGED IN.
 export const PrivateUser = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={(props) => {
        if (rest.loggedIn && (props.match.params.userId === rest.slug)) {
            return <Component { ...props} {...rest} />;
          } else {
            return <Redirect to={{pathname: "/", state: {from: props.location}}} />
          }
        }}
      />
    );
  };