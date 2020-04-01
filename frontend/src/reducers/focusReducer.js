const initialState = {
    focus: false
}

export default function focusReducer(
    state = initialState,
    action) {
        switch(action.type){
        
        case 'FOCUS':
        return{
            ...state, focus: true
        }
        case 'BLUR':
        return{
            ...state, focus: false
        }
        case 'LOG_OUT':
        return{
            ...initialState
        }

        default:
        return state
    }
}