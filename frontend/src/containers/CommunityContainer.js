import React, { Component } from 'react'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'

import CollectionWrapper from '../components/Collection/CollectionWrapper'
import {loadCommunityData, updateCommunityComments} from '../actions/adjusterSelections'
import { connect } from 'react-redux'

class CommunityContainer extends Component {
    
    componentDidMount() {
        const {community, loadCommunityData, updateCommunityComments} = this.props
        if (!community.bulkload) {   
            loadCommunityData()
        }    
        this.updater = setInterval(() => { updateCommunityComments(this.communityCommentList()) }, 3000)
        
    }

    componentWillUnmount() {
        clearInterval(this.updater)
    }
    
    communityCommentList = () => {
        
        const {comments:{body: commentSet}} = this.props
        let commentIdSet = [];
        commentSet.map(comment => commentIdSet.push(comment.id))
        console.log('commentSet is:', commentSet)
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
        loadCommunityData: () => {dispatch(loadCommunityData())},
        updateCommunityComments: (data) => {dispatch(updateCommunityComments(data))}
      }
}




export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);