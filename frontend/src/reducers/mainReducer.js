

export default function mainReducer(
    state = {
      user: {
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
          user:{...state.user, name: action.payload.name, id: action.payload.id}
        }
 
    default:
      return state;
  }
}