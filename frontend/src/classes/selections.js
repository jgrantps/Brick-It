import { Kit } from "./kits"

let includedSelections = []

export class Selection {
    constructor(selectionData) {
        //FILTER 'selectionData' OBJECT FOR VARIABLES SPECIFIC TO ITS RELATED KIT: 
        let kitData = {...selectionData.included[0].attributes, 
                       theme_id: selectionData.included[1].id, 
                       id: selectionData.included[0].id};
        
        
        var selectedKit;
        this.id = selectionData.data.id
        this.user_id = selectionData.data.attributes.user_id
        this.kit_id = selectionData.data.attributes.kit_id

        // make sure ***selectionData.kit*** is a completely serialized object.


        this.kit = (selectedKit = Kit.allIncludedKits.find(
                    kit => kit.id == selectionData.included[0].id) ? 
                    selectedKit : new Kit(kitData))
        this.save();
    }
    save() {
        includedSelections.push(this);
    }

    static get allIncludedSelections() {
        return includedSelections;
    }


}