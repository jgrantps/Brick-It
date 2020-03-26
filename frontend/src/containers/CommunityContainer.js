import React, { Component } from 'react'
import NavContainer from './NavContainer'

import {loadCommunityComments} from '../actions/adjusterSelections'
import { connect } from 'react-redux'

class CommunityContainer extends Component {
    
    componentDidMount() {
        const {community} = this.props
        debugger
        if (!community.bulkload) {
            this.props.loadCommunityComments()
        }
    }
    
    
    render() {
        const {userId} = this.props.match.params    
        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                <h2>this is the COMMUNITY from the User {userId}</h2>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selections: state.selections,
        themes: state.themes,
        comments: state.comments,
        kits: state.kits,
        community: state.community

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCommunityComments: () => {dispatch(loadCommunityComments())}
      }
}




export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);