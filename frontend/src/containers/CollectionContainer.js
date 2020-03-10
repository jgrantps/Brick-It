import React, { Component } from 'react'
import NavContainer from './NavContainer'

class CollectionContainer extends Component {

    render() {
    const {userId} = this.props.match.params    
        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                <h2>this is the COLLECTION from the User {userId}</h2>
            </div>
            </>
        
        )
    }
}
export default CollectionContainer;