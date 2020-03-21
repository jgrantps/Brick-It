const initialState = {
    body: [],
    loading: false,
    loaded: false
}

export default function selectionsReducer(
    state = initialState, 
    action) {
    switch(action.type){
        case 'LOADING_SELECTION':
            console.log("I'm loading")
            return{
                ...state, loading: true
            }

        case 'ADD_SELECTION':
            console.log(action.payload)
            let themeId = action.payload.theme.api_id
            let otherSelections = state.body.filter(theme => Object.keys(theme)[0] != themeId)
            let confirmedOtherSelections = !!otherSelections ? otherSelections : []
            
            let ee = state.body.find(theme => Object.keys(theme)[0] == themeId) 
            let specificThemeCurrentList = !!ee ? Object.values(ee)[0] : []
        let rebuiltSelectionList =  [{...action.payload.kit}, ...specificThemeCurrentList]
        debugger
            
            return {...state, loading: false, body:
                [ ...confirmedOtherSelections, {[themeId]: [...rebuiltSelectionList]} ]
            }


    //   var confirmedOtherSelections
    //   let themeId = action.payload.theme.api_id
    //   let themeSelections = state.selections.find(theme=> Object.keys(theme)[0] == themeId )
    //   debugger
    //   if (themeSelections) {
    //     let themeSelectionContents = themeSelections[themeId]
    //     let selectionPackage = [{[themeId]: [...themeSelectionContents, {...action.payload.kit, selectionId: action.payload.selection.id, public: action.payload.selection.public}]}, ...confirmedOtherSelections]
    //     return {
    //       ...state, selections: selectionPackage    
    //     }
    //   }else{
    //     return {
    //       ...state, selections: [
    //         ...state.selections, {[themeId]:  [{...action.payload.kit, selectionId: action.payload.selection.id, public: action.payload.selection.public}]}
    //       ]
    //     }
    //   }

    // case 'LOAD_USER_SELECTIONS_FROM_DB': 
    // return{
    //   ...state, loading: false, Loaded: true, body: [...action.payload]
    // }
    case 'LOG_OUT':
        return{
            ...initialState
        }

    default: 
        return state
    }

}