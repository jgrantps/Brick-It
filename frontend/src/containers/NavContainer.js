import React, { Component } from 'react';
import {Route, useRouteMatch} from 'react-router-dom'
import { Link } from 'react-router-dom';
import CatalogueContainer from '../containers/CatalogueContainer'
import CollectionsContainer from '../containers/CollectionsContainer'
import LogoutRoutine from '../containers/LogoutRoutine'
import {connect} from 'react-redux'
import LoginContainer from '../containers/LoginContainer';
import communityContainer from './CommunityContainer'

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
        if (loggedIn) {
            return(
                <>
            <Link to={`${url}/collection`}>My Collection</Link>
            <Link to={`${url}/catalogue`}>Catalogue</Link>
            <Link to={`${url}/community`}>Community</Link>
            {/* <Route to={`${path}/community`} component={communityContainer} /> */}
            
            </>
            )
        }
    }
    render() {
        
        const {loggedIn, name, props:{match:{path}}} = this.props
        return(
            <div className="flex absolute h-12 bg-blue-200 w-full items-center justify-around px-16">
                    <div className="title">
                    {this.logInLogOut(loggedIn, name)}
                    </div>
                    {this.accessInternals(loggedIn)}
            

            
            {/* <Route path={`${path}/community`} component={communityContainer} />
            <Route path={`${path}/catalogue`} component={CatalogueContainer}/>
            <Route path={`${path}/collection`} component={CollectionsContainer}/> */}
            

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        name: state.user.name,
        loggedIn: state.user.loggedIn
        })

export default connect(mapStateToProps)(NavContainer);