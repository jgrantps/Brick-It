import {Kit} from '../classes/kits'
class Thunk {

    handleFetchPayload(payload) {
        var reduxPayload = []
        var payloadThemes = []
        // debugger
        // payload.map(selection => payloadThemes.push(selection.included[2].attributes.api_id))
        payload.map(selection => payloadThemes.push(selection.included.find(i => i.type == 'theme').attributes.api_id))
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        
        uniquePayloadThemes.map(theme => {
            reduxPayload.push({[theme]: this.filterPayload(payload, theme)})
            
        })
       return reduxPayload;
    }

    filterPayload(payload, theme) {
        debugger
        // return  payload.filter(selection => selection.included[2].attributes.api_id == theme)
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
        //    return this.props.addKits(payload);
        }
    










}

let thunkAction = new Thunk
export default thunkAction;