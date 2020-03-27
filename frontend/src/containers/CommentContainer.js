import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../classes/adapters'

import {CommentInput} from '../components/Comments/CommentInput'
import { CommentList } from '../components/Elements/Elements';
import { loadComment, deleteComment } from '../actions/adjusterSelections'


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
        let commentPayload = {selection_comment: {selection_id: this.props.currentSelection.id, comment: this.state.comment}}
        this.props.loadComment(commentPayload) 
    }

    handleDeleteComment = (e) =>{
        e.preventDefault()
        console.log("yay I'm deleted!!!")
        console.log(`please delete comment number: ${e.target.id}`)
        this.props.deleteComment(e.target.id)
    }

    localCommentList = () => {
        const {fromCommunity, currentSelection} = this.props

        if (fromCommunity) {
           if (currentSelection.length > 0){
            let localUser = this.props.community.body.find(selection => selection.data.attributes.user.id == currentSelection[0].user_id).data.attributes.user
            return currentSelection.map(comment => {
                comment.user = localUser
                return <CommentList comment={comment} user={localUser} handleOnClick={this.handleDeleteComment}/>
            })
          }
        } else {
        let localComments = this.props.comments.body.filter(comment => comment.selection.id == this.props.currentSelection.id)
                return  localComments.map(comment => {
                    return <CommentList comment={comment} user={this.props.user} handleOnClick={this.handleDeleteComment} />
                 }) 
                } 
        // fromCommunity ? localComments = currentSelection : localComments = this.props.comments.body.filter(comment => comment.selection.id == this.props.currentSelection.id)
    }

    filterComments = (comment) => {
        if (comment) {return <CommentList  comment={comment.comment} />}
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
       deleteComment: (commentPayload) => {dispatch(deleteComment(commentPayload))}
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