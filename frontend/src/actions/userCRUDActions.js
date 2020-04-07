import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'

import {SetOnBlur} from './liveUpdate'


export const addSelection = (selectionData) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_SELECTION'})              
        api.sendSelection(selectionData, window.localStorage.token)
        .then(resp => {
            dispatch({type: 'ADD_SELECTION',
                payload: resp
            })
        })
        .catch(err => console.log(err))
    }
}

export const loadComment = (commentPayload) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMENTS'})
        api.submitComment(commentPayload, window.localStorage.token)
        .then(resp => {
            dispatch({type:'LOAD_NEW_COMMENT',payload: resp.data.attributes})
        })
        .catch(err => console.log(err))
    }
}

export const deleteComment = (commentPayload) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMENTS'})
        api.deleteComment(commentPayload, window.localStorage.token)
        .then(resp =>{
            dispatch({type: 'DELETE_COMMENT',
                payload: thunkAction.filterDeleteComment(resp)
            })
        })
        .catch(err => console.log(err))
    }
}