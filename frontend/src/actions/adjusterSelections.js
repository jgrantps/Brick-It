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

export const addKits = (children) => {  

    return (dispatch, getState) => {
        const state = getState()
        const {kits} = state
     
        dispatch({type: 'LOADING_KITS'})              //1
        debugger
        //CHILDREN ARE IE:::    TEMPLE OF DOOM -- LAST CRUSADE -- RAIDERS OF THE LOST ARK -- KINGDOM OF THE CRYSTAL SKULL
        children.map(child => {  
            let existingKits = kits.body.find(kit => Object.keys(kit)[0] == child.api_id)
            let loaded = false
            if (loaded) {
                // debugger                        //IE TEMPLE OF DOOM
                dispatch({type: 'SET_LOADING_TO_FALSE'})
            }else{
                debugger
                api.fetchKitsForTheme(child.api_id)
                .then(resp => { 
                    dispatch({ type: 'ADD_KIT', payload: thunkAction.loadKits(resp, child.api_id)})
                    return loaded = true;
                })
            }
        })
    }
}






// export const addKits = (children) => {  

//     return (dispatch, getState) => {
//         const state = getState()
//         const {kits} = state
     
//         dispatch({type: 'LOADING_SELECTIONS'})              //1
        
//         //CHILDREN ARE IE:::    TEMPLE OF DOOM -- LAST CRUSADE -- RAIDERS OF THE LOST ARK -- KINGDOM OF THE CRYSTAL SKULL
//         children.map(child => {  
//             let existingKits = kits.find(kit => Object.keys(kit)[0] == child.api_id)
//                                     //IE TEMPLE OF DOOM
//             if (existingKits && Object.values(existingKits).length > 0) {
//                 debugger                        //IE TEMPLE OF DOOM
//                 dispatch({type: 'SET_LOADING_TO_FALSE'})
//             }else{
//                 debugger
//                 api.fetchKitsForTheme(child.api_id)
//                 .then(resp => { dispatch({ type: 'ADD_KIT', payload: thunkAction.loadKits(resp, child.api_id)})})
//             }
//         })
//     }
// }


export const loadUserCollection = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COLLECTION'})              
        api.fetchAllSelections(window.localStorage.token)   
        .then(resp =>{
            dispatch({type: 'LOAD_USER_COLLECTION_FROM_DB',
                payload: thunkAction.handleFetchPayload(resp)
            })
        })  
    }
}


export const loadLogin = (userInfo) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        api.Login(userInfo)
        .then(resp => {
            if (resp.token){
                window.localStorage.setItem('token', resp.token)
                dispatch({type: 'SET_USER',
                    payload: thunkAction.handleLoginCredentials(resp)
                })
            }else{
                setTimeout(() => {dispatch({ type:'COMPLETE_LOGIN_THROW' })}, 2000)
                dispatch({
                    type: 'THROW_LOGIN_ERROR',
                    payload: resp.error
                })
            }
        })
        .catch(err => console.log(err))
    }
}


export const loadSignup = (userInfo) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        api.Signup(userInfo)
        .then(resp => {
            if (resp.token){
                window.localStorage.setItem('token', resp.token)
                dispatch({type: 'SET_USER',
                payload: thunkAction.handleLoginCredentials(resp)
            })
        }else{
            setTimeout(() => {dispatch({ type:'COMPLETE_LOGIN_THROW' })}, 2000)
            dispatch({
                type: 'THROW_LOGIN_ERROR',
                payload: `Signup failed: ${thunkAction.handleLoginErrors(resp)}` 
            })
        }
    })
    .catch(err => console.log(err))
}
}

export const loadThemes = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_THEMES'})
        api.retrieveThemes()
        .then(resp => {
            dispatch({type: 'LOAD_THEMES',
                payload: thunkAction.formatThemes(resp)
            })
            dispatch({type: 'LOAD_THEME_PARENTS',
                payload: thunkAction.formatThemeParents()
            })
        })
        .catch(err => console.log(err))
    }
}


export const loadComment = (commentPayload) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMENTS'})
        api.subitComment(commentPayload, window.localStorage.token)
        .then(resp => {
            dispatch({type:'ADD_SELECTION_COMMENT',
                payload: thunkAction.formatComment(resp)
            })
        })
        .catch(err => console.log(err))
    }
}

// .catch(err => console.log(err))




// children.map(child => {                             //2...
//     var storedThemeList;
//     kits.length > 0 ? storedThemeList = kits.map(theme => Object.keys(theme)[0]) : storedThemeList = []    
//     if (storedThemeList.find(theme => theme == child.api_id)) {
//         dispatch({type: 'SET_LOADING_TO_FALSE'})
//     } else {
//         debugger
//         api.fetchKitsForTheme(child.api_id)
//         .then(resp => { 
//             testie.push(thunkAction.loadKits(resp,child.api_id))
//             dispatch({ type: 'ADD_KIT', payload: thunkAction.loadKits(resp, child.api_id)}) 
//         })
//     }
// })