const initialState = {
    body: [],
    loading: false,
    loaded: false
}

export default function kitsReducer(
    state = initialState, 
    action) {
    switch(action.type){
        case 'LOADING_KITS':
            return{
                ...state, loading: true
            }
            
        case 'ADD_KIT':
        let kitThemeId = action.payload[0].theme_id
        return{
            ...state, loaded: true, loading: false, body:[...state.body, {[kitThemeId]: [...action.payload]}], 
        }

        case 'LOG_OUT':
            return{
                ...initialState
            }


        default:
            return state
    }
}