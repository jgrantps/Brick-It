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
        let localComments = this.props.comments.body.filter(comment => comment.selection.id == this.props.currentSelection.id)
       return  localComments.map(comment => {
           return <CommentList comment={comment} handleOnDelete={this.handleDeleteComment} />
        })  
    }

    filterComments = (comment) => {
        if (comment) {return <CommentList comment={comment.comment} />}
    } 

    render() {
        return(
            <>
            {this.localCommentList()}
            
            <CommentInput trackChange={this.trackChange} commentState={this.state.comment} handleSubmit={this.handleSubmit}/>
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
        comments: state.comments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);