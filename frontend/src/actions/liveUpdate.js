import thunkAction from './thunkActions'
import api from '../classes/adapters'

const localStateRef = {
    focusState: null,
    //currentSet holds large number for private_params in backend to function properly.
    //stretch goal: find a better solution.
    currentCommentIdSet: {currentSet: [10000000000]},
    dispatch: null
};

export var onStart;

export const SetOnBlur = () => { 
    return (dispatch, getState) => {
        dispatch({type: 'BLUR'})
        const i = getState();
        const { focus: {focus}, comments: {body: commentSet}} = i
        localStateRef.focusState = focus
        let currentCommentIdSet = thunkAction.communityCommentList(commentSet)
        localStateRef.currentCommentIdSet = currentCommentIdSet
        localStateRef.dispatch = dispatch
    }
}

export const SetOnFocus = () => {
    return (dispatch, getState) => {
        dispatch({type: 'FOCUS'})
        const i = getState();
        const {focus: {focus}} = i
        localStateRef.focusState = focus
    }
}

export const updateCommunityComments = (x) => {
   const {dispatch, currentCommentIdSet} = x
        api.updateComments(currentCommentIdSet, window.localStorage.token)
        .then(resp => {
            dispatch({type: 'LOAD_USER_COMMENTS',
            payload: thunkAction.filterCommentPayload(resp)
        })
    })
    .catch(err => console.log(err))
}

const updateMe = (x) => {
    x.focusState ? console.log("I AM in focus") : updateCommunityComments(x)
}

onStart = {
    updater: updateMe,
    timer: 3000,
    localStateRef: localStateRef
}