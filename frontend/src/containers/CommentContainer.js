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
        let commentPayload = {selection_comment: {selection_id: this.props.currentSelection.id, comment: this.state.comment}}
        this.props.loadComment(commentPayload) 
    }

    handleDeleteComment = (e) =>{
        debugger
        e.preventDefault()
        console.log("yay I'm deleted!!!")
    }

    localCommentList = () => {

        let localComments = this.props.comments.body.filter(comment => comment.selection.id == this.props.currentSelection.id)
        


       return  localComments.map(comment => {
           return <CommentList comment={comment} handleOnDelete={this.handleDeleteComment} />
            //  return(
            //      <div className="comment">
            //         <h2>{comment.comment}</h2>
            //         <h3>by {comment.user.name}</h3>
            //      </>
            //      ) 

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
   return {loadComment: (commentPayload) => {dispatch(loadComment(commentPayload))}
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