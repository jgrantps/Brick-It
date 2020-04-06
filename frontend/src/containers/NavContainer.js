import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom';
import LogoutRoutine from '../containers/LogoutRoutine'
import {connect} from 'react-redux'
import LoginContainer from '../containers/LoginContainer';

import CatalogueContainer from '../containers/CatalogueContainer'
import CollectionContainer from './CollectionContainer'
import CommunityContainer from './CommunityContainer'

class NavContainer extends Component {
    render() {
        
        const {loggedIn, name} = this.props
        const {userId} = this.props.props.computedMatch.params
        return(
            <div className=" flex fixed items-center h-14 z-40 bg-blue-200 w-full px-16 py-3">
                <Link className= "menu-btn" to={`/${userId}/collection`}>My Collection</Link>
                <Link className= "menu-btn" to={`/${userId}/catalogue`}>Catalogue</Link>
                <Link className= "menu-btn" to={`/${userId}/community`}>Community</Link>
               
                <div className="flex flex-col align-middle content-center text-center">
                    <div>
                        <span className="leading-tight text-sm">Logged In as</span> <span className="underline font-bold mr-4">{name}</span>
                    </div>
                    <Link className="menu-btn" to="/logout">Logout</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        name: state.user.name,
        loggedIn: state.user.loggedIn
        })

export default connect(mapStateToProps)(NavContainer);