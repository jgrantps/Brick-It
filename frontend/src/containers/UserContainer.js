import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux';
import NavContainer from './NavContainer'
import {setUser} from '../actions/authentications'
import CommunityContainer from './CommunityContainer';
import CatalogueContainer from './CatalogueContainer';
import CollectionsContainer from './CollectionsContainer';

class UserContainer extends Component {
    render() {
        return(
            <>
            <NavContainer props={this.props}/>
            <Switch>
                <Route to="/community" component={CommunityContainer} />
                <Route to="/catalogue" component ={CatalogueContainer} />
                <Route to="/collections" component={CollectionsContainer} />
            </Switch>

            <div id="user-container" className="user pt-12">
                <h2>welcome to the user container</h2>
            </div>
            </>
        )
    }
}

export default UserContainer;