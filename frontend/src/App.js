import React, { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux'


import Oauth from './components/oauth'
import LoginContainer from './containers/LoginContainer'
import LandingPage from './components/LandingPage'
import UserContainer from './containers/UserContainer'

import {PrivateUser} from './components/routes/privateUser'
import {HideLogin} from './components/routes/hideLogin'
import {HideWelcome} from './components/routes/hideWelcome'
import LogoutRoutine from './containers/LogoutRoutine'
import CommunityContainer from './containers/CommunityContainer';
import CollectionContainer from './containers/CollectionContainer';
import CatalogueContainer from './containers/CatalogueContainer';


class App extends Component { 
  
  render() {
    
    const {loggedIn ,slug, name} = this.props

    
    return(
      <div className="App flex flex-col">
        
       
        <Switch>
          <HideWelcome exact path="/" loggedIn={loggedIn} slug={slug} component={LandingPage} />
          <Oauth path="/login/github/" component={Oauth} />
          <HideLogin exact path='/login' bar="bazz" loggedIn={loggedIn} params={this.props.params} slug={slug} component={LoginContainer} />
          <Route path="/logout" component={LogoutRoutine}/>
          <PrivateUser exact path={`/:userId`} loggedIn={loggedIn} name={name} params={this.props.params} slug={slug} component={UserContainer} /> 
          <PrivateUser exact path={`/:userId/community`} loggedIn={loggedIn} params={this.props.params} slug={slug} component={CommunityContainer} />
          <PrivateUser exact path={`/:userId/collection`} loggedIn={loggedIn} params={this.props.params} slug={slug} component={CollectionContainer} />
          <PrivateUser exact path={`/:userId/catalogue`} loggedIn={loggedIn} params={this.props.params} slug={slug} component={CatalogueContainer} />
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
