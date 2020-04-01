const initialState = {
    body: [],
    publicUsers: [],
    loading: false,
    loaded: false,
    bulkload: false
}

export default function communityReducer(
    state = initialState,
    action){
    switch(action.type){

        case 'LOADING_COMMUNITY_COMMENTS':
            return{
                ...state, loading: true
            }
        
        case 'LOAD_COMMUNITY_DATA':
            return{
                ...state, loading: false, bulkload: true, body: [...action.payload.selections]
            }

        case 'LOADING_COMMUNITY_UPDATE':
            return{
                ...state, loading: true
            }

        case 'LOAD_NEW_COMMUNITY_COMMENT':

            let affectedSelection = state.body.find(unit => unit.data.id == action.payload.selection.id)
            let affectedCommentarray = affectedSelection.data.attributes.comments
            let newAffectedCommentArray = [...affectedCommentarray, action.payload]
            

            affectedSelection.data.attributes.comments = newAffectedCommentArray

            let newStateBody = state.body.filter(selection => selection.data.id != affectedSelection.data.id)
            debugger
            return{
                ...state, loading: false, body: [...newStateBody, ...affectedSelection]
            }

        case 'DELETE_COMMUNITY_COMMENT':
            debugger
            return{
                ...state, loading: false, body: [...state.body]
            }
        
        case 'LOG_OUT':
            return{
                ...initialState
            }

        default:
            return state;
    }
}
