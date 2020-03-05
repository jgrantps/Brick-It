import React from 'react';
import { Route, Link } from 'react-router-dom';

import Login from './components/login'
import Oauth from './components/oauth'
import Kits from './components/kits'
import {NameAdapter} from './classes/names'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer'
import NavContainer from './containers/NavContainer'

function App() {
  const name = new NameAdapter;
  

  
  return (
    <div className="App">
    

    <Link to="/kits">Kits</Link>
    <Link to="/login">Login</Link>
    
    <NavContainer />
    <Route path="/login/github" render={(props) => <Oauth {...props}  namee={name}/>}/>
    <Route path="/login" render={(props) => <LoginContainer {...props}  namee={name}/>}/>
    <Route path="/kits" component={Kits}/>
    <Route path="/dashboard" render={(props) => <DashboardContainer {...props} />}/>
    </div>

    
     
  );
}

export default App;
