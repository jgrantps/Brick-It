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

            return {...state, loading: false, body:
                [ ...state.body, action.payload ]
            }

        case 'LOG_OUT':
            return{
                ...initialState
            }

        default: 
            return state
        }
}