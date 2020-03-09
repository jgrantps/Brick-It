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




class App extends Component { 
  state = {
    allowAccess: false
  }
  render() {
    const {loggedIn,slug, name} = this.props
    return(
      <div className="App">
        <NavContainer/>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <HideLogin exact path='/login' loggedIn={loggedIn} slug={slug} component={LoginContainer} />
        <HideDashboard path="/user/" loggedIn={loggedIn} slug={slug} component={DashboardContainer} />
        <Route path="*" component= {() => "404 NOT FOUND"} />
        </Switch>
      </div>
    ) 
  }
}

const mapStateToProps = (state) => ({
   name: state.user.name,
   loggedIn: state.user.loggedIn,
   slug: state.user.slug
   })


export default connect(mapStateToProps)(App);
