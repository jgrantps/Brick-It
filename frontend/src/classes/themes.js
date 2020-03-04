let includedThemes = [];

export class Theme {
    constructor(themeData) {
        this.id = themeData.local_api_id;
        this.api_id = themeData.api_id
        this.parent_id = themeData.parent_id
        this.name = themeData.name
        this.save();
    }
    save() {
        includedThemes.push(this);
    }

    static get allIncludedThemes() {
        return includedThemes;
    }
}