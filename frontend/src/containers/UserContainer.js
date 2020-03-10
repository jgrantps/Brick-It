import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import {connect} from 'react-redux';
import NavContainer from './NavContainer'

import CommunityContainer from './CommunityContainer';
import CatalogueContainer from './CatalogueContainer';
import CollectionContainer from './CollectionContainer';

class UserContainer extends Component {
    render() {
        const {match:{url}} =  this.props
        return(
            
            <>
           <NavContainer props={this.props} />

            <div id="user-container" className="user pt-12">
           
                
          

                <h2>welcome to the user container</h2>
            </div>
            </>
        )
    }
}

export default UserContainer;