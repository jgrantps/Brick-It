let includedThemes = [];

export class Theme {
    constructor(themeData) {
        this.id = themeData.id
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