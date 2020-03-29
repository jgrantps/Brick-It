import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../classes/adapters'

import {CommentInput} from '../components/Comments/CommentInput'
import { CommentItem } from '../components/Elements/Elements';
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
        let commentPayload = {selection_comment: {selection_id: event.target.id, comment: this.state.comment}}
        this.props.loadComment(commentPayload) 
    }

    handleDeleteComment = (e) =>{
        e.preventDefault()
        this.props.deleteComment(e.target.id)
    }

    buildCommentList = () => {
        const {currentSelectionID} = this.props
debugger
     
        let localComments = this.props.comments.body.filter(comment => comment.selection.id == currentSelectionID)
                return  localComments.map(comment => {
                    return <CommentItem comment={comment} user={this.props.user} handleOnClick={this.handleDeleteComment} />
                 }) 
                
    }

    filterComments = (comment) => {
        if (comment) {return <CommentItem  comment={comment.comment} />}
    } 

    render() {
        return(
            <>
            <CommentInput trackChange={this.trackChange} selectionId={this.props.currentSelectionID} commentState={this.state.comment} handleSubmit={this.handleSubmit}/>
            {this.buildCommentList()}
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