import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'



export const addCollectionComment = (commentData) => {
    return {
        type: 'ADD_COLLECTION_COMMENT',
        payload: commentData
    }
}

export const UserLogOut = () => {
    return (dispatch) => {
        api.Logout(window.localStorage.token)
        .then(resp => {
            dispatch({type: 'LOG_OUT'})
           
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('state')
            window.localStorage.removeItem('current_user')
            console.log(resp)
        })
        .catch(err => console.log(err))
    }
}

export const addKits = (children) => {  
    return (dispatch, getState) => {
        const state = getState()
        const {kits} = state
        
        dispatch({type: 'LOADING_KITS'})             
        children.map(child => {  
            let existingKits = kits.body.find(kit => Object.keys(kit)[0] == child.api_id)
            
            if (!existingKits){
                api.fetchKitsForTheme(child.api_id)
                .then(resp => { 
                    dispatch({ type: 'ADD_KIT', 
                        payload: thunkAction.loadKits(resp, child.api_id)
                    })
                })
                .catch(err => console.log(err))
            }
        })
    }
}

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

export const loadOauth = (userInfo) => {
    return (dispatch) => {
        dispatch({type: 'SET_USER',
            payload: userInfo       
        })

        let serializedUser = JSON.stringify(userInfo)
        window.localStorage.setItem('current_user', serializedUser)
    }
}


//LOADS USER'S COLLECTION OF SELECTIONS FROM DATABASE UPON LOGIN.
export const loadUserCollection = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COLLECTION'})              
        api.fetchAllSelections(window.localStorage.token)   
        .then(resp =>{
            dispatch({type: 'LOAD_USER_COLLECTION_FROM_DB',
                payload: (resp)
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

export const loadComment = (commentPayload) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMENTS'})
        api.submitComment(commentPayload, window.localStorage.token)
        .then(resp => {
            dispatch({type:'LOAD_NEW_COMMENT',
                payload: resp.data.attributes
            })
        })
        .catch(err => console.log(err))
    }
}

export const updateCommunityComments = (currentCommentIdSet) => {
    
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMENTS'})
        api.updateComments(currentCommentIdSet, window.localStorage.token)
        .then(resp => {
            console.log(resp)
            dispatch({type: 'LOAD_USER_COMMENTS',
                payload: thunkAction.filterCommentPayload(resp)
            })
        })
        .catch(err => console.log(err))
    }
}




export const submitCommunityComment = (commentPayload) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMENTS'})
        dispatch({type: 'LOADING_COMMUNITY_UPDATE'})
        api.submitComment(commentPayload, window.localStorage.token)
        .then(resp => {
            dispatch({ type:'LOAD_NEW_COMMUNITY_COMMENT', payload: resp.data.attributes })
            dispatch({ type:'LOAD_NEW_COMMENT', payload: resp.data.attributes })
        })
        .catch(err => console.log(err))
    }
}

export const deleteCommunityComment = (commentPayload) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_COMMUNITY_UPDATE'})
        api.deleteComment(commentPayload, window.localStorage.token)
        .then(resp =>{
            dispatch({type: 'DELETE_COMMUNITY_COMMENT',
                payload: thunkAction.filterDeleteComment(resp)
            })
        })
        .catch(err => console.log(err))
    }
}

export const setOnFocus = () => {
    console.log('in the adjusterSelections as focus')
    return {
        type: 'FOCUS'
    }
}

export const setOnBlur = () => {
    console.log('in the adjusterSelections as blur')
    return {
        type: 'BLUR'
    };
};
