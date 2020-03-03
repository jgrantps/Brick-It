let includedKits = [];
export class Kit {
    constructor(kitData) {
        this.set_num = kitData.set_num;
        this.name = kitData.name;
        this.year = kitData.year;
        this.theme_id = kitData.theme_id;
        this.num_parts = kitData.num_parts;
        this.set_img_url = kitData.set_img_url;
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

}