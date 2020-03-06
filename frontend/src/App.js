import React from 'react';
import { Route, Link } from 'react-router-dom';

// import Login from './components/login'
import Oauth from './components/oauth'
import Kits from './components/kits'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer'
import NavContainer from './containers/NavContainer'

function App() { 
  return (
    <div className="App">
    <NavContainer />
    <Route path="/login/github" render={(props) => <Oauth {...props} />}/>
    <Route path="/login" render={(props) => <LoginContainer {...props} />}/>
    <Route path="/kits" component={Kits}/>
    <Route path="/dashboard" render={(props) => <DashboardContainer {...props} />}/>
    </div>

    
     
  );
}

export default App;
