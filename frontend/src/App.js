import React from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './components/login'
import Kits from './components/kits'
import {NameAdapter} from './classes/names'

function App() {
  const name = new NameAdapter;
  

  
  return (
    <div className="App">
    

    <Link to="/kits">Kits</Link>
    <Link to="/login">Login</Link>

    <Route path="/login" render={(props) => <Login {...props}  namee={name}/>}/>
    <Route path="/kits" component={Kits}/>
   
    </div>

    
     
  );
}

export default App;
