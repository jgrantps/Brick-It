

export default function mainReducer(
    state = {
      user: {
        loggedIn: false,
        name: '',
        slug:'',
        id: ''
      },
      selections: [],
    },
    action
  ) {
    switch (action.type) {

      case 'SET_USER':
        return{
          ...state,
          user:{...state.user, name: action.payload.name, id: action.payload.id, slug: action.payload.slug, loggedIn: true}
        }
      
      case 'LOG_OUT':
        window.localStorage.token = undefined
      return{
        ...state,
        user:{...state.user, name: "", id:"", slug:"", loggedIn: false },
        selections: []

      }

      case 'ADD_SELECTION':
    //EXAMPLE::::    state.selections =  [{theme456: [{selection1: "specific Kit 1"}, {selection2: "specific kit 2"}]}, {theme871: [{selection33: "specific Kit 1"}, {selection25: "specific kit 2"}]}]

      let themeId = action.payload.theme.api_id

      return {
        ...state, selections: [
          ...state.selections, {[themeId]: [ {[action.payload.selection.id]: {...action.payload.kit, public: action.payload.selection.public}}]}
        ]
      }
 
    default:
      return state;
  }
}