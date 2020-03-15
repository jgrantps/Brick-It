

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
        selections: {}

      }

      case 'ADD_SELECTION':
    //  let  selections =  [{theme456: [{selection1: "specific Kit 1"}, {selection2: "specific kit 2"}]}, {theme871: [{selection33: "specific Kit 1"}, {selection25: "specific kit 2"}]}]




        let themeId = action.payload.theme.api_id
        // let themeSelections = state.selections.find(theme => Object.keys(theme)[0] === themeId)
        debugger

      return {
        ...state, selections: [
          ...state.selections, {[themeId]: [, {[action.payload.selection.id]: {...action.payload.kit}}]}
           
        ]
      }
 
    default:
      return state;
  }
}