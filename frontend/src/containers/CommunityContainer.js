import React, { Component } from 'react'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'

import CommunityCollectionWrapper from '../components/Community/CommunityCollectionWrapper'
import {loadCommunityComments} from '../actions/adjusterSelections'
import { connect } from 'react-redux'

class CommunityContainer extends Component {
    
    componentDidMount() {
        const {community} = this.props
        
        if (!community.bulkload) {
            this.props.loadCommunityComments()
        }
    }

    communityUsers = () => {
        const {community} = this.props
        var communityUsersRaw = []
        
        community.body.map(selection => {
            communityUsersRaw.push(selection.data.attributes.user.id)
        })

        let communityUsers = [...new Set(communityUsersRaw)]
        
        return(
            communityUsers.map(user => {
                let selections= this.compileSelections(user)
                return (
                    <div key={uuid()}>
                        <CommunityCollectionWrapper selectionList = {selections} user={user} />
                    </div>
                )
            })
        )
    }
    
    compileSelections = (userId) => {
        const {community} = this.props
        let selectionList = community.body.filter(selection => selection.data.attributes.user.id == userId)
        return selectionList
        
    }
    
    
    render() {

        const {userId} = this.props.match.params    
        const {community} = this.props

        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                {this.communityUsers()}
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