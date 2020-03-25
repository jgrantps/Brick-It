const initialState = {
    body: [],
    loading: false,
    loaded: false
}

export default function selectionsReducer(
    state = initialState, 
    action) {
    switch(action.type){
        case 'LOADING_SELECTION':
            return{
                ...state, loading: true
            }

        case 'ADD_SELECTION':
            let themeId = action.payload.theme.api_id
            let otherSelections = state.body.filter(theme => Object.keys(theme)[0] != themeId)
            
            let existingList = state.body.find(theme => Object.keys(theme)[0] == themeId) 
            let specificThemeCurrentList = !!existingList ? Object.values(existingList)[0] : []
            let rebuiltThemeList =  [{...action.payload}, ...specificThemeCurrentList]
            // let rebuiltThemeList =  [{...action.payload.kit}, ...specificThemeCurrentList]
            
            return {...state, loading: false, body:
                [ ...otherSelections, {[themeId]: [...rebuiltThemeList]} ]
            }

        case 'LOG_OUT':
            return{
                ...initialState
            }

        default: 
            return state
        }
}