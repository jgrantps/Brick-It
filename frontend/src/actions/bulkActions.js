import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'


// Actions for loading bulk Data from the Brickit API in componentDidMount functions
// in the collection and community containers.

// Loads all collections in the current_user's database.
export const loadUserCollection = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COLLECTION'})              
        api.fetchAllSelections(window.localStorage.token)   
        .then(resp =>{
            if (resp.message) {
                dispatch({type: 'NEW_USER'})
            }else{
                debugger
                dispatch({type: 'LOAD_USER_COLLECTION_FROM_DB',
                payload: (resp)
            })
        }
        })  
    }
}

//loads all comments in the current_user's database
export const loadUserComments = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER_COMMENTS'})
        api.fetchUserComments(window.localStorage.token)
        .then(resp => {
            dispatch({type: 'LOAD_USER_COMMENTS',
                payload: thunkAction.filterCommentPayload(resp)
            })
        })
        .catch(err => console.log(err))
    }
}

//loads BOTH user selections AND comments for the community page.
export const loadCommunityData = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMUNITY_COMMENTS'})
        api.fetchCommunityComments(window.localStorage.token)
        .then(resp => {
            dispatch({type: 'LOAD_COMMUNITY_DATA',
                payload: thunkAction.filterCommunityDataPayload(resp)
            })
        })
        .catch(err => console.log(err))
    }
}