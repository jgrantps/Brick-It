import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import NavContainer from './NavContainer'
import {setUser} from '../actions/authentications'
import CommunityContainer from './CommunityContainer';
import CatalogueContainer from './CatalogueContainer';
import DashboardContainer from './DashboardContainer'

class UserContainer extends Component {
    render() {
        return(
            <>
            <NavContainer props={this.props}/>
            <Route to="/community" component={CommunityContainer} />
            <Route to="/catalogue" component ={CatalogueContainer} />
            <Route to="/dashboard" component={DashboardContainer} />

            <div id="user-container" className="user pt-12">
                <h2>welcome to the user container</h2>
            </div>
            </>
        )
    }
}

export default UserContainer;