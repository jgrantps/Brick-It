import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import CatalogueContainer from '../containers/CatalogueContainer'
import CollectionsContainer from '../containers/CollectionsContainer'
import LogoutRoutine from '../containers/LogoutRoutine'
import {connect} from 'react-redux'
import LoginContainer from '../containers/LoginContainer';

class NavContainer extends Component {
    
    logInLogOut= (loggedIn) => {
        if (loggedIn) {
            return <Link to="/logout">Logout</Link>
        } else {
            return <Link to="/login">Login</Link>
        }   
    }
    render() {
        const {loggedIn, username} = this.props
        
        return(
            <div className="navBarr">
               {this.logInLogOut(loggedIn)}
            <Link to="/themes">Catalogue</Link>
            <Link to="/myCollection">My Collection</Link>

            <Route path="/themes" component={CatalogueContainer}/>
            <Route path="/myCollection" component={CollectionsContainer}/>
            <Route path="/logout" component={LogoutRoutine}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        username: state.user.name,
        loggedIn: state.user.loggedIn
        })

export default connect(mapStateToProps)(NavContainer);