

export default function mainReducer(
    state = {
      user: {
        loggedIn: false,
        name: '',
        slug:'',
        id: ''
      },
      loading: false,
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
      let themeId = action.payload.theme.api_id
      return {
        ...state, selections: [
          ...state.selections, {[themeId]:  {...action.payload.kit, selectionId: action.payload.selection.id, public: action.payload.selection.public}}
        ]
      }

      case 'ADD_KIT': 
      let kitThemeId = action.payload[0].theme_id
      return {
        ...state, loading: false, kits: [...state.kits, {[kitThemeId]: [...action.payload]}]    
      }

      //ADD COMMENT TO SPECIFIC SELECTION FROM USER COLLECTION
      case 'ADD_COLLECTION_COMMENT':
      return{
        ...state
      }

      case 'SET_LOAD_TO_FALSE':
        return{
          ...state, loading: false
        }

      case 'LOADING_SELECTIONS':
        console.log('LOADING SELECTION SIGNALLLLLL')
      return{
        ...state, loading: true
      }

      case 'LOAD_USER_SELECTIONS_FROM_DB': 
      
      return{
        ...state, loading: false, collection: [...action.payload]
      }


        
 
    default:
      return state;
  }
}