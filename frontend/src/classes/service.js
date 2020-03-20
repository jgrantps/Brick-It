import { Kit } from './kits';

class Services {
  slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  saveToLocalStorage(state) {
    try{
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch(e) {
      console.log(e)
    }
  }

  loadFromLocalStorage() {
    try{
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) return undefined
      return JSON.parse(serializedState)
    } catch(e){
      console.log(e)
      return undefined
    }
  }

  findChildrenThemes(parent, themes) {
     let children = themes.filter(theme => theme.parent_id === parent.api_id)
     return children
  }

      
        

}

let service = new Services;
export default service;