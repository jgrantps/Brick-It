import React from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './components/login'
import Kits from './components/kits'

function App() {
  return (
    <div className="App">
    

    <Link to="/kits">Kits</Link>
    <Link to="/login">Login</Link>

    <Route path="/login" component={Login}/>
    <Route path="/kits" component={Kits}/>
   
    </div>

    
     
  );
}

export default App;
