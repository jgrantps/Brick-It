const initialState = {
    body: [],
    parents: [],
    loading: false,
    loaded: false
    };

export default function themesReducer (state = initialState, action) {
    switch(action.type){
        
        case 'LOADING_THEMES':
            return{
                ...state, loading: true
            }

        case 'LOAD_THEMES':
            return{
                ...state, body: [...action.payload]
            }
        
        case 'LOAD_THEME_PARENTS':
            return{
                ...state, loading: false, loaded: true, parents: [...action.payload]
            }

        case 'LOG_OUT':
            return{
                ...initialState
            }

        default:
            return state;
    }
}
