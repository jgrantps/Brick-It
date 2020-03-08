import React, { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux'


import Oauth from './components/oauth'
import Kits from './components/kits'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer'
import LandingPage from './components/LandingPage'

import NavContainer from './containers/NavContainer';

import {HideDashboard} from './components/routes/hideDashboard'
import {HideLogin} from './components/routes/hideLogin'
import { ProtectedRoute } from './components/routes/restrictedLogin';



//We want to set '/user.name' as a restricted route, with access only after logged in is complete.
//If access to anything beyond '/welcome' is attempted without authentication, redirect to 'welcome'....

class App extends Component { 
  state = {
    allowAccess: false
  }
  render() {
    const {loggedIn, username} = this.props
    return(
      <div className="App">
        <NavContainer/>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <HideLogin exact path='/login' loggedIn={loggedIn} myName="I'm a login routee!!!!" component={LoginContainer} />
        <HideDashboard exact path="/app" myName="headdddphones" component={DashboardContainer} />
        {/* <ProtectedRoute exact path='/login' component={LoginContainer} /> */}
        <Route path="*" component= {() => "404 NOT FOUND"} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
   username: state.user.name,
   loggedIn: state.user.loggedIn
   })


export default connect(mapStateToProps)(App);
