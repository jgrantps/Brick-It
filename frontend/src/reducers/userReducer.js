const initialState = {
    name: '',
    slug: '',
    id: '',
    errors: null,
    loggedIn: false,
    loggingIn: false
}

export default function userReducer(
    state = initialState,
    action) {
        switch(action.type){
        
        case 'LOADING_USER':
        return{
            ...state,  errors: null, loggingIn: true
        }

        case 'THROW_LOGIN_ERROR':
            return{
                ...state, loggedIn: false, loggingIn: false, errors: action.payload
            }
        

        case 'SET_USER':
        return{
             name: action.payload.name, slug: action.payload.slug, id: action.payload.id, loggedIn: true, loggingIn: false, errors: null
        }

        case 'LOG_OUT':
        return{
            name: "", slug:"",id:"",  errors: null, loggedIn: false, loggingIn: false
        }

        default: 
        return state


        }
    }
