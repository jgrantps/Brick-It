import {Kit} from '../classes/kits'
import service from '../classes/service'
import {Theme} from '../classes/themes'


class Thunk {

    formatThemes(data) {
        data.results.map(theme => { 
            let formattedTheme = {...theme, api_id: theme.id}
            new Theme(formattedTheme);
        })
        return(Theme.allIncludedThemes)   
    }

    formatThemeParents() {
        let themes = Theme.allIncludedThemes;
        let CollectionArray = [];
        themes.map(theme => {
            
            let parentArray = service.findChildrenThemes(theme, themes)
            if (parentArray.length > 0) {
                CollectionArray.push((themes.find(theme => theme.api_id == parentArray[0].parent_id)))
            }
        });

        let sortedCollection = CollectionArray.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        
        //STORE COLLECTION OF SPECIFIED THEMES IN LOCAL COMPONENT STATE TO RENDER.
        return sortedCollection
    }

    formatSelectionData = (resp) => {
        let selectionId = resp.data.id
        let selectionUserId = resp.data.attributes.user.id
        let selectionKitId = resp.data.attributes.kit.id
        let selectionKitSetNum = resp.data.attributes.kit.set_num
        let selectionIsPublic = resp.data.attributes.public;
        let selectionTheme = resp.included.find(e => e.type == 'theme').attributes
        
        let selectionKit = resp.data.attributes.kit
        let augmentedSelectionKit = {...selectionKit, theme_api_id: selectionTheme.api_id}
    
        let selection = {id: selectionId, user_id: selectionUserId, kit_id: selectionKitId, public: selectionIsPublic, kit_set_num: selectionKitSetNum}
        let selectionPayload = {selection: selection, kit: augmentedSelectionKit, theme: selectionTheme}
        
        return selectionPayload
    }


    handleFetchPayload(payload) {
        var reduxPayload = []
        var payloadThemes = []
        if (payload.message == "You currently have no selections") {
            return [];
        } else {
        //EXTRACT ARRAY OF THEMES RELATING TO THE PAYLOAD SELECTIONS
            payload.map(selection => payloadThemes.push(selection.included.find(i => i.type == 'theme').attributes.api_id))
        }
        //FILTER OUT DUPLICATES FROM THEME ARRAY 
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        //lOAD EACH THEME WITH ARRAY OF ASSOCIATED SELECTIONS.
        uniquePayloadThemes.map(theme => {reduxPayload.push({[theme]: this.filterPayload(payload, theme)})})
        return reduxPayload;
    }
    
    filterPayload(payload, theme) {  
        //FILTER BULK PAYLOAD ACCORDING TO SPECIFIC THEME.       
        let  filteredPayload =  payload.filter(selection => selection.included.find(i=> i.type == "theme").attributes.api_id == theme)     
        return  filteredPayload
    }

    handleLoginCredentials(fetch) {
        let verifiedUserCredentials={name: fetch.package.name, id: fetch.package.id, slug: service.slugify(fetch.package.name)}
        let serializedUser = JSON.stringify(verifiedUserCredentials)
        window.localStorage.setItem('current_user', serializedUser)
        return verifiedUserCredentials;
    }

    handleLoginErrors(fetch) {
        //HANDLE ERRORS:
        var ary=[]
        fetch.main.name ? ary.push(fetch.main.name[0]) : console.log(null)
        fetch.main.password ? ary.push(fetch.main.password[0]) : console.log(null) 

        let msg = ary.join(", ")
        return msg
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
    }

    formatComment(resp){
        let comment = resp.data.attributes.comment
        let userName = resp.included.find(e=>e.type == "user").attributes.name
        let selectionId = resp.included.find(e=>e.type == "selection").id
        let commentId = resp.data.id
        let commentTheme = resp.included.find(e=> e.type == "theme").attributes.api_id
        let commentPackage = {comment: comment, userName: userName, selectionId: selectionId, theme_api_id: commentTheme, commentId: commentId}
        
        return commentPackage
    }

    filterCommentPayload(resp){
        let filteredComments = []
        resp.map(unit => filteredComments.push(unit.data.attributes))
        
        return filteredComments;
    }

    filterCommunityDataPayload(resp) {
        var dataPayload = {selections: [], comments: []}

        dataPayload.comments.push(...this.filterCommentPayload(resp.comments));
        dataPayload.selections.push(...resp.selections);
        
        return dataPayload;
    }

    filterDeleteComment(resp){
        let deletedComment = resp.deleted_id
        return deletedComment
    }

    communityCommentList(commentSet){
        let commentIdSet = [];
            commentSet.map(comment => commentIdSet.push(comment.id))
            return {currentSet: commentIdSet}
    }
}

let thunkAction = new Thunk
export default thunkAction;