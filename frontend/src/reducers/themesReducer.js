const initialState = {
    body: [],
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
           debugger
            return{
                ...state, loading: false, loaded: true, body: [...action.payload]
            }
        default:
            return state;
    }
}
