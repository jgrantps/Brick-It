import React, { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux'


import Oauth from './components/oauth'
import Kits from './components/kits'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer'
import LandingPage from './components/LandingPage'
import NavContainer from './containers/NavContainer';
import {hideDashboard} from './components/routes/hideDashboard'
import {hideLogin} from './components/routes/hideLogin'
import { ProtectedRoute } from './components/restrictedLogin';



//We want to set '/user.name' as a restricted route, with access only after logged in is complete.
//If access to anything beyond '/welcome' is attempted without authentication, redirect to 'welcome'....

class App extends Component { 
  state = {
    allowAccess: false
  }
  render() {
    return(
      <div className="App">
        <NavContainer/>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <hideLogin exact path="/login" myName="I'm a login routee!!!!" component={LoginContainer} />
        <hideDashboard exact path="/app" myName="headdddphones" component={DashboardContainer} /> */}
        <ProtectedRoute exact path='/login' component={LoginContainer} />
        <Route path="*" component= {() => "404 NOT FOUND"} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
   username: state.user.name
   })


export default connect(mapStateToProps)(App);
