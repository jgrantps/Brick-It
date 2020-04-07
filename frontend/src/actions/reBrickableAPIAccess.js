import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'


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