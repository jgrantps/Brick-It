const initialState = {
    body: [],
    bulkLoad: false,
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
        
        case 'LOADING_USER_COMMENTS':
        return{
            ...state, loading: true, loaded: false
        }
            
        case 'LOAD_USER_COMMENTS':
        return{
            ...state, loading: false, loaded: true, bulkLoad: true, body: [...state.body, ...action.payload]
        }

        case 'LOAD_NEW_COMMENT':
        return{
            ...state, loading: false, loaded: true, body: [...state.body, action.payload]
        }  
        
        case 'DELETE_COMMENT':
        let newBody = state.body.filter(comment => comment.id !== action.payload)
        return{
            ...state, loading: false, loaded: true, body: [...newBody]
        }

        case 'LOG_OUT':
        return{
            ...initialState
        }

        default:
           return state; 
        }
    }
