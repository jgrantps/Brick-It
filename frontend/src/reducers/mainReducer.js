

export default function mainReducer(
    state = {
      user: {
        loggedIn: true,
        name: '',
        id: ''
      },
      items: [],
      classes: {
          
      }
    },
    action
  ) {
    switch (action.type) {
        case 'INCREASE_COUNT':
      return {
        ...state,
        items: state.items.concat(state.items.length + 1)
      }

      case 'SET_USER':
        return{
          ...state,
          user:{...state.user, name: action.payload.name, id: action.payload.id, loggedIn: true}
        }
      
      case 'LOG_OUT':
        window.localStorage.token = undefined
      return{
        ...state,
        user:{...state.user, name: "", id:"", loggedIn: false }
      }
 
    default:
      return state;
  }
}