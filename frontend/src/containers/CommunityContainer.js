import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'

import CollectionWrapper from '../components/Collection/CollectionWrapper'
import {loadCommunityData} from '../actions/bulkActions'

class CommunityContainer extends Component {
    
    componentDidMount() {
        const {community, loadCommunityData} = this.props
        if (!community.bulkload) {   
            loadCommunityData()
        }    
    }

    // componentDidUpdate() {
    //     const {updateCommunityComments, focus:{focus}} = this.props
    //     if (!focus) {
    //         this.updater = setInterval(() => { updateCommunityComments(this.communityCommentList()) }, 3000)            
    //     } else {
    //         clearInterval(this.updater)
    //     }
    // }

    componentWillUnmount() {
        clearInterval(this.updater)
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
            <div className="pt-12">
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
        

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCommunityData: () => {dispatch(loadCommunityData())},
        // updateCommunityComments: (commentSet) => {dispatch(updateCommunityComments(commentSet))}
        
      }
}




export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);