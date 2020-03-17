import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'
export const addSelection = (selectionData) => {
    return {
        type: 'ADD_SELECTION',
        payload: selectionData
    }
}

export const addKits = (kitsData) => {
    return {
        type: 'ADD_KIT',
        payload: kitsData
    }
}

export const addCollectionComment = (commentData) => {
    return {
        type: 'ADD_COLLECTION_COMMENT',
        payload: commentData
    }
}

// CollectionContainer.handleFetchPayload
export const addAllSelections = () => {
  
    return (dispatch) => {
    dispatch({type: 'LOADING_SELECTIONS'})
        api.fetchAllSelections(window.localStorage.token)
        .then(resp =>{
              dispatch({type: 'LOAD_USER_SELECTIONS_FROM_DB',
                      payload: thunkAction.handleFetchPayload(resp)
                    })
            })  
        }
}
