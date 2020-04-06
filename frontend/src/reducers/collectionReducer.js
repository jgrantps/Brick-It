const initialState = {
    body: [],
    loading: false,
    loaded: false
}

export default function collectionReducer(
    state = initialState, 
    action) {
    switch(action.type){
    
    case 'LOADING_COLLECTION':
        return{
            ...state, loading: true
        }

    case 'LOAD_USER_COLLECTION_FROM_DB': 
    return{
        ...state, loading: false, loaded: true, body: [...action.payload]
    }
    
    case 'NEW_USER':
        return{
            ...state, loading: false, loaded: true, body: [...state.body]
        }

    case 'LOG_OUT':
        return{
            ...initialState
        }

    default: 
        return state
    }

}