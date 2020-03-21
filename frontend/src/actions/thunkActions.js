import {Kit} from '../classes/kits'
import service from '../classes/service'
import {Theme} from '../classes/themes'
import {Selection} from '../classes/selections'
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

    formatSelectionData = ({kit, isPublic, theme}) => {
        let reifiedKitList = [...Kit.allIncludedKits]
        // let i = reifiedKitList.find( unit => unit.set_num == kit.set_num)
        let i = Kit.allIncludedKits.find( unit => unit.set_num == kit.set_num)
        debugger
        let confirmedKit = ( i ? i : new Kit(kit))
    
        let selection = new Selection({kit, isPublic, theme})
        let selectionPayload = {selection: selection, kit: confirmedKit, theme: theme}
        
        return selectionPayload
      }








    handleLoginCredentials(fetch) {
        let verifiedUserCredentials={name: fetch.package.name, id: fetch.package.id, slug: service.slugify(fetch.package.name)}
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

    loadKits(data, theme_id) {
    var newKit; 
    var payload;
        //ADDS 
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

}

let thunkAction = new Thunk
export default thunkAction;