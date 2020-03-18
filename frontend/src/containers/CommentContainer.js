import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../classes/adapters'

import {CommentInput} from '../components/Comments/CommentInput'
import { CommentList } from '../components/Elements/Elements';
import { loadComment } from '../actions/adjusterSelections'


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
        let commentPayload = {selection_comment: {selection_id: this.props.selection.selectionId, comment: this.state.comment}}
        this.props.loadComment(commentPayload)
        // debugger
    }

    // formatComment = (resp) => {
    //     let comment = resp.data.attributes.comment
    //     let userName = resp.included.find(e=>e.type == "user").attributes.name
    //     let selectionId = resp.included.find(e=>e.type == "selection").id
    //     let commentId = resp.data.id
    //     let commentPackage = {comment: comment, userName: userName, selectionId: selectionId, commentId: commentId}
    //     this.props.loadComment(commentPackage)
    //     debugger
    // }

    validateCommentList = (comments) => {
        
        if (comments == undefined || comments.length < 1)  { 
            return this.filterComments({comment: "Be The First To Comment"})
        } else {
            // return    comments.map(comment => this.filterComments(comment)) //TEST OUT TO SEE IF WE CAN AVOID FILTERCOMMENTS..
            return   comments.map(comment => <CommentList comment={comment.comment}/>)
        }
    }

    filterComments = (comment) => {
        if (comment) {return <CommentList comment={comment.comment}/>}
    } 

    render() {
        let renderCommentList = this.validateCommentList(this.props.comments)  
        return(
            <>
            {renderCommentList}
            
            <CommentInput trackChange={this.trackChange} commentState={this.state.comment} handleSubmit={this.handleSubmit}/>
           </>
        )
    }
}

const mapDispatchToProps = dispatch => {
   return {loadComment: (commentPayload) => {dispatch(loadComment(commentPayload))}
    }
}

export default connect(null, mapDispatchToProps)(CommentContainer);