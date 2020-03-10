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
    logInLogOut= (loggedIn, name) => {
        if (loggedIn) {
            return (
                <>
                <span className="leading-tight text-sm">Logged In as</span> <span className="underline font-bold mr-4">{name}</span>
                <Link to="/logout">Logout</Link>
                </>)
        } else {
            return <Link to="/login">Login</Link>
        }     
    }
    
    accessInternals= (loggedIn) => {
        const {props:{match:{url}}} =  this.props
        const {userId} = this.props.props.computedMatch.params
        
        if (loggedIn) {
            return(
                <>
            <Link to={`/${userId}/collection`}>My Collection</Link>
            <Link to={`/${userId}/catalogue`}>Catalogue</Link>
            <Link to={`/${userId}/community`}>Community</Link>
            {/* <Route to={`${path}/community`} component={communityContainer} /> */}
            
            </>
            )
        }
    }
    render() {
        
        const {loggedIn, name, props:{match:{url}}} = this.props
        return(
            <div className="flex absolute h-12 bg-blue-200 w-full items-center justify-around px-16">
                <div className="title">
                    {this.logInLogOut(loggedIn, name)}
                </div>
                {this.accessInternals(loggedIn)}
                
                <Route exact path={`/${url}/community`} component={CommunityContainer} />
                <Route exact path={`/${url}/catalogue`} component ={CatalogueContainer} />
                <Route exact path={`/${url}/collection`} component={CollectionContainer} />
            
            </div>
            

            
            
            

        )
    }
}

const mapStateToProps = (state) => ({
        name: state.user.name,
        loggedIn: state.user.loggedIn
        })

export default connect(mapStateToProps)(NavContainer);