import {Kit} from '../classes/kits'
class Thunk {

    handleFetchPayload(payload, reduxSelection) {
        
        var reduxPayload = []
        var payloadThemes = []
        if (payload.message == "You currently have no selections") {
            return [];
        } else {
        payload.map(selection => payloadThemes.push(selection.included.find(i => i.type == 'theme').attributes.api_id))
        }
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        
        uniquePayloadThemes.map(theme => {reduxPayload.push({[theme]: this.filterPayload(payload, theme, reduxSelection)})})
        return reduxPayload;
    }

    filterPayload(payload, theme, reduxSelection) { 
        
        // let prefiltered = payload.filter(selection => selection.data.id != )
        return  payload.filter(selection => selection.included.find(i=> i.type == "theme").attributes.api_id == theme)
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