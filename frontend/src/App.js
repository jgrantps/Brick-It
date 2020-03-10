import React, { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux'


import Oauth from './components/oauth'
import Kits from './components/kits'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer'
import LandingPage from './components/LandingPage'
import UserContainer from './containers/UserContainer'

import {PrivateUser} from './components/routes/privateUser'
import {HideLogin} from './components/routes/hideLogin'
import {HideWelcome} from './components/routes/hideWelcome'
import LogoutRoutine from './containers/LogoutRoutine'
import communityContainer from './containers/CommunityContainer';
import NavContainer from './containers/NavContainer';


class App extends Component { 
  state = {
    allowAccess: false
  }
  render() {
    const {loggedIn,slug, name} = this.props
    return(
      <div className="App">
        
       
        <Switch>
          
        <HideWelcome exact path="/" loggedIn={loggedIn} slug={slug} component={LandingPage} />
        <HideLogin exact path='/login' loggedIn={loggedIn} params={this.props.params} slug={slug} component={LoginContainer} />
        <Route path="/logout" component={LogoutRoutine}/>
        <PrivateUser exact path={`/user/${slug}`} loggedIn={loggedIn} params={this.props.params} slug={slug} component={UserContainer} />
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
