let includedKits = [];
export class Kit {
    constructor(kitData) {
        this.id = kitData.id
        this.name = kitData.name;
        this.description = kitData.description;
        this.set_img_url = kitData.set_img_url;
        this.theme_id = kitData.theme_id;
        this.set_num = kitData.set_num;
        this.year = kitData.year;
        this.num_parts = kitData.num_parts;
        this.set_url = kitData.set_url;
        this.last_modified_dt = kitData.last_modified_dt;

        
        this.save();
    }

    save() {
        includedKits.push(this);
    }  

    static get allIncludedKits() {
        return includedKits; 
    }

    static get clearCache() {
        includedKits = [];
        return includedKits;
    }

}