import React, { Component } from 'react'
import { connect } from 'react-redux'

class CollectionWrapper extends Component {
    
    
    render() {
        
        return(
            <>
            <h2>Hello from the collection wrapper</h2>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        collection: state.collection
    }
}
export default connect(mapStateToProps)(CollectionWrapper);