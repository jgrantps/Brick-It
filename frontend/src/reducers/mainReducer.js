

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
      collection: []
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
      var confirmedOtherSelections
      let themeId = action.payload.theme.api_id
      let themeSelections = state.selections.find(theme=> Object.keys(theme)[0] == themeId )
      let otherSelections = state.selections.filter(theme => Object.keys(theme)[0] != themeId)
      otherSelections == [] ? confirmedOtherSelections = null : confirmedOtherSelections = otherSelections
      
      
      
      
      if (themeSelections) {
        let themeSelectionContents = themeSelections[themeId]
        let selectionPackage = [{[themeId]: [...themeSelectionContents, {...action.payload.kit, selectionId: action.payload.selection.id, public: action.payload.selection.public}]}, ...confirmedOtherSelections]
        return {
          ...state, selections: selectionPackage    
        }
      }else{
        return {
          ...state, selections: [
            ...state.selections, {[themeId]:  [{...action.payload.kit, selectionId: action.payload.selection.id, public: action.payload.selection.public}]}
          ]
        }
      }

      case 'ADD_KIT': 
      let kitThemeId = action.payload[0].theme_id
      return {
        ...state, loading: false, kits: [...state.kits, {[kitThemeId]: [...action.payload]}]    
      }

      
      case 'ADD_SELECTION_COMMENT':
        let theme = state.selections.find(e => Object.keys(e)[0] == action.payload.theme_api_id)
       
        
      return{
        ...state, loading: false
      }

      case 'SET_LOADING_TO_FALSE':
        return{
          ...state, loading: false
        }

      case 'LOADING_SELECTIONS':
      return{
        ...state, loading: true
      }

      case 'LOADING_COMMENTS':
        
        return{
          ...state, loading: true
        }

      case 'LOAD_USER_SELECTIONS_FROM_DB': 
      //Redux selection Id: Object.values(state.selections[0])[0][0].selectionId ::> "13"
      //action.payload selection Id: Object.values(action.payload[0])[0][0].data.id ::> "13"
      let filteredSelections = action.payload.filter(selection => Object.values(selection)[0][0].data.id != Object.values(state.selections[0])[0][0].selectionId)

      
      return{
        ...state, loading: false, collection: [...filteredSelections]
      }

    default:
      return state;
  }
}