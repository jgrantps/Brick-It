import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'
export const addSelection = (selectionData) => {
    return {
        type: 'ADD_SELECTION',
        payload: selectionData
    }
}

export const addCollectionComment = (commentData) => {
    return {
        type: 'ADD_COLLECTION_COMMENT',
        payload: commentData
    }
}

// export const addKits = (kitsData) => {
//     return {
//         type: 'ADD_KIT',
//         payload: kitsData
//     }
// }

export const addKits = (children, kits) => {
    
    return (dispatch) => {
        dispatch({type: 'LOADING_SELECTIONS'})              //1
        children.map(child => {                             //2...
            var storedThemeList;
           kits.length > 0 ? storedThemeList = kits.map(theme => Object.keys(theme)[0]) : storedThemeList = []    
            if (storedThemeList.find(theme => theme == child.api_id)) {
               dispatch({type: 'SET_LOAD_TO_FALSE'})
            } else {
                api.fetchKitsForTheme(child.api_id)
                .then(resp => { dispatch({ type: 'ADD_KIT', payload: thunkAction.loadKits(resp, child.api_id)}) })
            }
        })
    }
}



// CollectionContainer.handleFetchPayload
export const addAllSelections = () => {
    return (dispatch) => {
    dispatch({type: 'LOADING_SELECTIONS'})              //1
    api.fetchAllSelections(window.localStorage.token)   //2...
    .then(resp =>{
            dispatch({type: 'LOAD_USER_SELECTIONS_FROM_DB',
                    payload: thunkAction.handleFetchPayload(resp)
                })
        })  
    }
}
