const initialState = {
    body: [],
    loading: false,
    loaded: false
}

export default function commentReducer(
    state = initialState,
    action) {
    switch(action.type){
        case 'LOADING_COMMENT':
            
            return{
                ...state, loading: true, loaded: false
            }
        
        case 'LOAD_NEW_COMMENT':
            
            return{
                ...state, loading: false, loaded: true, body: [...state.body, action.payload]
            }

        case 'LOAD_USER_COMMENTS':
            return{
                ...state, loading: false, loaded: true
            }



        case 'LOG_OUT':
            return{
                ...initialState
        }
       default:
           return state; 
    }
    }
