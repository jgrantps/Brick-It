

export default function mainReducer(
    state = {
      user: {
        loggedIn: false,
        name: '',
        slug:'',
        id: ''
      },
      selections: [],
      kits: [],
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
        user: {...state.user, name: "", id:"", slug:"", loggedIn: false },
        selections: [],
        kits: [],
        collection: []
      }

      case 'ADD_SELECTION':
    //EXAMPLE::::    state.selections =  [{theme456: [{selection1: {"specific Kit 1"}}, {selection2: {"specific kit 2"}}]}, {theme871: [{selection33: {"specific Kit 1"}}, {selection25: "{specific kit 2"}}]}]
      let themeId = action.payload.theme.api_id
      return {
        ...state, selections: [
          ...state.selections, {[themeId]:  {...action.payload.kit, selectionId: action.payload.selection.id, public: action.payload.selection.public}}
        ]
      }

      case 'ADD_KIT':
        
      let kitThemeId = action.payload[0].theme_id
        return {
          ...state, kits: [...state.kits, {[kitThemeId]: [...action.payload]}]
           
        }

      case 'ADD_COLLECTION_COMMENT':
        //ADD COMMENT TO SPECIFIC SELECTION FROM USER COLLECTION
        return{
          ...state
        }

        case 'LOAD_USER_SELECTIONS_FROM_DB':
          return{
            ...state
          }
 
    default:
      return state;
  }
}