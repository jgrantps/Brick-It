import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import CatalogueContainer from '../containers/CatalogueContainer'
import CollectionsContainer from '../containers/CollectionsContainer'
import LogoutRoutine from '../containers/LogoutRoutine'
import LoginContainer from '../containers/LoginContainer';

class NavContainer extends Component {
    
    render() {
        return(
            <div className="navBarr">
            <Link to="/logout">Logout</Link>
            <Link to="/login">Login</Link>
            <Link to="/themes">Catalogue</Link>
            <Link to="/myCollection">My Collection</Link>

            <Route path="/themes" component={CatalogueContainer}/>
            <Route path="/myCollection" component={CollectionsContainer}/>
            <Route path="/logout" component={LogoutRoutine}/>
            </div>
        )
    }
}
export default NavContainer