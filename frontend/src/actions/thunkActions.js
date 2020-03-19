import {Kit} from '../classes/kits'
class Thunk {

    handleFetchPayload(payload, reduxSelection) {
        
        var reduxPayload = []
        var payloadThemes = []
        if (payload.message == "You currently have no selections") {
            return [];
        } else {
        //EXTRACT ARRAY OF THEMES RELATING TO THE PAYLOAD SELECTIONS
        payload.map(selection => payloadThemes.push(selection.included.find(i => i.type == 'theme').attributes.api_id))
        }
        //FILTER OUT DUPLICATES FROM THEME ARRAY 
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        //lOAD EACH THEME WITH ARRAY OF ASSOCIATED SELECTIONS.
        uniquePayloadThemes.map(theme => {reduxPayload.push({[theme]: this.filterPayload(payload, theme, reduxSelection)})})
        return reduxPayload;
    }

    filterPayload(payload, theme, reduxSelection) { 
        
        // let reduxSelectionSetNum = ((reduxSelection.length == 0) ? "null" : "I'm not empty")
        let reduxSelectionSetNum = ((reduxSelection.length == 0) ? "null" : Object.values(reduxSelection[0])[0][0].set_num)
        
        let  preFilteredPayload =  payload.filter(selection => selection.included.find(i=> i.type == "theme").attributes.api_id == theme)
        
        let filteredPayload = preFilteredPayload.filter(selection => selection.data.attributes.kit.set_num != reduxSelectionSetNum)
        debugger

        return  filteredPayload
        // return  payload.filter(selection => selection.included.find(i=> i.type == "theme").attributes.api_id == theme)
    }

    loadKits(data, theme_id) {
    var newKit; 
    var payload;

        if  (data.results == undefined || data.results.length == 0) {
            newKit= {theme_id: theme_id, description: "no data"}
            new Kit(newKit)
        } else {
            data.results.map(kit => {
                
                newKit = new Kit(kit)
            })    
        }
        payload = Kit.allIncludedKits.filter(kit => kit.theme_id === theme_id)
        return payload;
    }

    formatComment(resp){

        let comment = resp.data.attributes.comment
        let userName = resp.included.find(e=>e.type == "user").attributes.name
        let selectionId = resp.included.find(e=>e.type == "selection").id
        let commentId = resp.data.id
        let commentTheme = resp.included.find(e=> e.type == "theme").attributes.api_id
        let commentPackage = {comment: comment, userName: userName, selectionId: selectionId, theme_api_id: commentTheme, commentId: commentId}
        
        return commentPackage
    }
    










}

let thunkAction = new Thunk
export default thunkAction;