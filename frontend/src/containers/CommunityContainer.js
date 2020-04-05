import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'

import CollectionWrapper from '../components/Collection/CollectionWrapper'
import {loadCommunityData} from '../actions/bulkActions'
import {onStart} from '../actions/liveUpdate'

class CommunityContainer extends Component {
   intervalID = 0

    componentDidMount() {
        const {community, loadCommunityData} = this.props
        if (!community.bulkload) {   
            loadCommunityData()
        }  

        const {updater, timer, localStateRef} = onStart
        this.intervalID = setInterval(updater, timer, localStateRef)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    
    communityCommentList = () => {
        
        const {comments:{body: commentSet}} = this.props
        let commentIdSet = [];
        commentSet.map(comment => commentIdSet.push(comment.id))
        return {currentSet: commentIdSet}
    }
    
    communityUsers = () => {
        const {community:{body: collectionSet}} = this.props
        
        var currentUserList = []
        var currentUserIdList = []
        collectionSet.map(selection => {
            let user = selection.data.attributes.user
            currentUserList.push(user)
            currentUserIdList.push(user.id)
        })
        
        let uniqueCurrentUserIdList = [...new Set(currentUserIdList)]
        let uniqueCurrentUserList = []
        uniqueCurrentUserIdList.map(userId => uniqueCurrentUserList.push(currentUserList.find(user => user.id == userId )))
        
        return uniqueCurrentUserList.map(user => {return(<CollectionWrapper key={uuid()} category = {user} categoryId={user.id} reduxType="community" />  )})
    }
    
    compileSelections = (userId) => {
        const {community} = this.props
        let selectionList = community.body.filter(unit => unit.data.attributes.user.id == userId)
        return selectionList    
    }
        
    
    render() {    
        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-4 mt-16">
                {this.communityUsers()}
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        collection: state.collection,
        selections: state.selections,
        themes: state.themes,
        comments: state.comments,
        kits: state.kits,
        community: state.community,
        // focus: state.focus
        // why does the focus not work?? no one will ever really know why...
        

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCommunityData: () => {dispatch(loadCommunityData())},
      }
}




export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);