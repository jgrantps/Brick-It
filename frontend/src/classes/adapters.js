import {API_ROOT, API_WS_ROOT, EXT_API_BASE, EXT_API_KEY} from '../constants/index'
class ApiAdapter {

    constructor() { 

        //AUTHENTICATION HEADER FOR FETCH REQUESTS TO LOCAL API.
        this.getConfig = (token = undefined) =>{
            return ({
                method: "GET",
                headers: {
                    "Authorization": token,
                }
            })
        }
        
        //CONFIGURATION OBJECT FOR POST REQUESTS TO LOCAL API.
        this.postConfig = (configPackage= '', token=undefined, method="POST") =>{
            return ({  
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(configPackage)
            })
        }

        this.loginConfig = (configPackage) => {
            
            return({
                method: "POST",
                credentials: 'include',
                // body: JSON.stringify({name: "boobs"})
                body: {"test": "hello"}
            })
        }
        
        //CONFIGURATION OBJECT FOR DELETE REQUESTS TO LOCAL API.
        this.deleteConfig = (configPackage= '', token=undefined, method="DELETE") =>{   
            return ({  
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(configPackage)
            })
        }
        
        //AUTHENTICATION KEY FOR REBRICKABLE API FETCH REQUESTS.
        this.rebrickableAuth = {
            method: "GET", 
            headers: {
                Authorization: EXT_API_KEY,
            }
        }
    }
    
    //Requests to Rebrickable API:
    
    //RETRIEVE ALL THEMES
    retrieveThemes() {
        return fetch(`${EXT_API_BASE}/themes/?page_size=655`, this.rebrickableAuth)
        .then(r => r.json())
    }

    //RETRIEVE ALL KITS FOR SPECIFIED THEME
    fetchKitsForTheme(id) {
        return fetch(`${EXT_API_BASE}sets/?theme_id=${id}`, this.rebrickableAuth)
        .then(r => r.json())
    }
        
    //RETRIEVE SPECIFIC KIT 
    getOneKitFromRb(URL) {
        return fetch(`${EXT_API_BASE}sets/${URL}/`, this.rebrickableAuth)
        .then(r=>r.json())
    }

// Requests to Brickit API:
    
    //LOG USER IN
    // Login(formData) {
    //     return fetch(`${API_ROOT}/login`, this.loginConfig(formData))
    //     .then(r=>r.json())
    // }

    Login(loginParams) {
        // debugger
        return fetch(`http://localhost:5000/login`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            // "Content-Type": "application/json",
            // "Accept": "application/json",
            withCredentials: 'include',
            body: JSON.stringify(loginParams)
        }).then(r=>r.json())
    }

    //SIGN NEW USER UP
    Signup(formData) {
        return fetch(`${API_ROOT}/signup`, this.postConfig(formData))
        .then(r=>r.json())
    }
    
    //LOG USER OUT --> POST request to sessions#destroy
    Logout(token) {
        return fetch(`${API_ROOT}/logout`, this.postConfig(null, token))
        .then(r=>r.json())
    }

    // Retrieve specific SELECTION from DB --> GET request to selections#show
    fetchSelection(id, token) {
    return fetch(`${API_ROOT}/selections/${id}`, this.getConfig(token))
        .then(resp => resp.json())
    }

    //Retrieve all SELECTIONS from User's DB and add to Collection Store.
    fetchAllSelections(token) {
        return fetch(`${API_ROOT}/selections`, this.getConfig(token))
            .then(resp => resp.json())
    }

    //Send specific SELECTION to DB --> POST request to selection#create
    sendSelection(configPackage, token) {
        return fetch(`${API_ROOT}/selections`, this.postConfig(configPackage, token))
        .then(r => r.json())
    }

    submitComment(configPackage, token) {
        return fetch(`${API_ROOT}/comments`, this.postConfig(configPackage, token))
        // .then(r => r.json())
    }

    fetchUserComments(token) {
        return fetch(`${API_ROOT}/comments`, this.getConfig(token))
            .then(resp => resp.json())
    }

    updateComments(configPackage, token) {
        return fetch(`${API_ROOT}/community/update`, this.postConfig(configPackage, token))
        .then(r => r.json())
    }

    fetchCommunityComments(token) {
        return fetch(`${API_ROOT}/community`, this.getConfig(token))
        .then(resp => resp.json())
    }

    deleteComment(configPackage, token) {
        return fetch(`${API_ROOT}/comments/${configPackage}`, this.deleteConfig(configPackage, token))
            .then(resp => resp.json())
    }


}

let api = new ApiAdapter
export default api