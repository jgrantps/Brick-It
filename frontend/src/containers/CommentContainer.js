import React, { Component } from 'react'
import {CommentInput} from '../components/Comments/CommentInput'
import api from '../classes/adapters'


export default class CommentContainer extends Component {
    debugger
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
        api.subitComment(commentPayload, window.localStorage.token)
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }

    render() {
        return(
            <CommentInput trackChange={this.trackChange} commentState={this.state.comment} handleSubmit={this.handleSubmit}/>
        )
    }

}