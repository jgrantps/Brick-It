class Thunk {

    handleFetchPayload(payload) {
        var reduxPayload = []
        var payloadThemes = []
        payload.map(selection => payloadThemes.push(selection.included[1].attributes.api_id))
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        
        uniquePayloadThemes.map(theme => {
            reduxPayload.push({[theme]: this.filterPayload(payload, theme)})
        })
       return reduxPayload;
    }

    filterPayload(payload, theme) {
        return  payload.filter(selection => selection.included[1].attributes.api_id == theme)
      }
}

let thunkAction = new Thunk
export default thunkAction;