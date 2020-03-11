import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom';
import LogoutRoutine from '../containers/LogoutRoutine'
import {connect} from 'react-redux'
import LoginContainer from '../containers/LoginContainer';

import CatalogueContainer from '../containers/CatalogueContainer'
import CollectionContainer from './CollectionContainer'
import CommunityContainer from './CommunityContainer'

class NewNav extends Component {
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
    

    
    render() {
        
        const {loggedIn, name, slug} = this.props
        return(
            <div className="flex absolute h-12 bg-blue-200 w-full items-center justify-around px-16">
                <div className="title">
                {this.logInLogOut(loggedIn, name)}
                </div>
        
                <Link to={`/${slug}/collection`}>My Collection</Link>
                <Link to={`/${slug}/catalogue`}>Catalogue</Link>
                <Link to={`/${slug}/community`}>Community</Link>
                    
               
            
            </div>
            

            
            
            

        )
    }
}

const mapStateToProps = (state) => ({
        name: state.user.name,
        slug: state.user.slug,
        loggedIn: state.user.loggedIn
        })

export default connect(mapStateToProps)(NewNav);