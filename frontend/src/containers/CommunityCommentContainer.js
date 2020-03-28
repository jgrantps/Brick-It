import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../classes/adapters'

import {CommentInput} from '../components/Comments/CommentInput'
import { CommunityCommentList } from '../components/Elements/Elements';
import { submitCommunityComment, loadComment, deleteCommunityComment } from '../actions/adjusterSelections'


class CommentContainer extends Component {
    
    state= {
        comment: ""
    }

    trackChange = event => {
        const {value} = event.target
        this.setState({comment: value})
    }

    handleSubmit = event => {
        event.preventDefault()
        let commentPayload = {selection_comment: {selection_id: this.props.selectionId, comment: this.state.comment}}
        this.props.submitCommunityComment(commentPayload) 
    }

    handleDeleteComment = (e) =>{
        e.preventDefault()
        console.log("yay I'm deleted!!!")
        console.log(`please delete comment number: ${e.target.id}`)
        this.props.deleteCommunityComment(e.target.id)
    }
    
    localCommentList = () => {
        const {currentSelection} = this.props
        
        if (currentSelection.length > 0){
            
               
            let localUser = this.props.community.publicUsers.find(unit => unit.id == currentSelection[0].data.attributes.user.id)
           
            return currentSelection.map(comment => {
                comment.user = localUser
                return <CommunityCommentList comment={comment} user={localUser} handleOnClick={this.handleDeleteComment}/>
            })
          }
    }

    filterComments = (comment) => {
        if (comment) {return <CommunityCommentList  comment={comment.comment} />}
    } 

    render() {
        return(
            <>
            <CommentInput trackChange={this.trackChange} commentState={this.state.comment} handleSubmit={this.handleSubmit}/>
            {this.localCommentList()}
           </>
        )
    }
}

const mapDispatchToProps = dispatch => {
   return {
       loadComment: (commentPayload) => {dispatch(loadComment(commentPayload))},
       submitCommunityComment: (commentPayload) => {dispatch(submitCommunityComment(commentPayload))},
       deleteCommunityComment: (commentPayload) => {dispatch(deleteCommunityComment(commentPayload))}
    }
}

const mapStateToProps = state => {
    return {
        selections: state.selections,
        kits: state.kits,
        collection: state.collection,
        comments: state.comments,
        community: state.community,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);