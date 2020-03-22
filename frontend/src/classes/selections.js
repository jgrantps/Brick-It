import { Kit } from "./kits"

let includedSelections = []

export class Selection {
    constructor(selectionData) {
        //FILTER 'selectionData' OBJECT FOR VARIABLES SPECIFIC TO ITS RELATED KIT: 
    
        this.id = selectionData.data.id
        this.user_id = selectionData.data.attributes.user_id
        this.kit_id = selectionData.data.attributes.kit_id
        this.kit_set_num = 
        this.public = selectionData.data.attributes.public
        // make sure ***selectionData.kit*** is a completely serialized object.

        // this.comment = selectionData.comment
        
        this.save();
    }
    save() {
        includedSelections.push(this);
    }

    static get allIncludedSelections() {
        return includedSelections;
    }


}