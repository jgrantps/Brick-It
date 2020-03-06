import React from 'react';
import {Route} from 'react-router-dom';

const restrictedLogin = ({component: Component, allowAccess, ...rest}) => {
<Route {...rest} render={(props) => (
isAllowed ? <Component {...props} /> : 
'Access Denied - Please login'
)}
/>
};

export default restrictedLogin;