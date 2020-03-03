import { Kit } from "./kits"

let includedSelections = []

export class Selection {
    constructor(selectionData) {
        this.id = selectionData.id
        this.user_id = selectionData.user_id
        this.kit_id = selectionData.data.relationships.kit.data.id
        // make sure ***selectionData.kit*** is a completely serialized object.
        this.kit = (selectedKit = includedKits.find(
                    kit => kit.id == selectionData.kit_id) ? 
                    selectedKit : new Kit(selectionData.kit))
        this.save();
    }
    save() {
        includedSelections.push(this);
    }

    static get allIncludedSelections() {
        return includedSelections;
    }


}