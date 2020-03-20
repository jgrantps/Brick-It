export default function userReducer(
    state = {
        loggedIn: false,
        name: '',
        slug: '',
        id: ''
    },
    action
    ){
        switch(action.type){

        case 'SET_USER':
        return{
             name: action.payload.name, id: action.payload.id, slug: action.payload.slug, loggedIn: true
        }

        case 'LOG_OUT':
        return{
            name: "", id:"", slug:"", loggedIn: false 
        }

        default: 
        return state


        }
    }
