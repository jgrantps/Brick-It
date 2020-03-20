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

    get parent() {
        if (this.parent_id){
            return includedThemes.find(theme => theme.api_id === this.parent_id)
        } else {
            return "No Parent"
        }
    }

    get children() {
        return includedThemes.filter(theme => theme.parent_id === this.api_id)
    }

    static get allIncludedThemes() {
        return includedThemes;
    }

    static get clearCache() {
        includedThemes = [];
        return includedThemes;
    }
}