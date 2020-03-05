import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import CatalogueContainer from '../containers/CatalogueContainer'
import CollectionsContainer from '../containers/CollectionsContainer'
import LoginContainer from '../containers/LoginContainer';

class NavContainer extends Component {
    
    render() {
        return(
            <div className="navBarr">
            <Link to="/login">Login</Link>
            <Link to="/themes">Catalogue</Link>
            <Link to="/myCollection">My Collection</Link>

            <Route path="/themes" component={CatalogueContainer}/>
            <Route path="/myCollection" component={CollectionsContainer}/>
            {/* <Route path="/login" component={LoginContainer}/> */}
            </div>
        )
    }
}
export default NavContainer