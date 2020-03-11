import React, { Component } from 'react';
import  {Switch, Route} from 'react-router-dom';

import NavContainer from './NavContainer'





class UserContainer extends Component {
    render() {
        
        const { name, slug, match:{url}} =  this.props
        return(
            <>
           <NavContainer props={this.props} />   
            <div id="user-container" className="user pt-12">
                <h2>welcome {name}!</h2>
                <h2>Please select from the above Menu.</h2>
            </div>
            </>
        )
    }
}

export default UserContainer;