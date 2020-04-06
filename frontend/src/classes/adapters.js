class ApiAdapter {

    constructor() { 
        this.backend = "http://localhost:5000" 
        this.baseUrl = "http://localhost:5000" 
        this.rebrickableBaseUrl = "https://rebrickable.com/api/v3/lego/"
        
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
                Authorization: "key 691de533ab29f2be2c2a36d536590a5e",
            }
        }
    }
    
    //Requests to Rebrickable API:
    
    //RETRIEVE ALL THEMES
    retrieveThemes() {
        return fetch(`${this.rebrickableBaseUrl}/themes/?page_size=655`, this.rebrickableAuth)
        .then(r => r.json())
    }

    //RETRIEVE ALL KITS FOR SPECIFIED THEME
    fetchKitsForTheme(id) {
        return fetch(`${this.rebrickableBaseUrl}sets/?theme_id=${id}`, this.rebrickableAuth)
        .then(r => r.json())
    }
        
    //RETRIEVE SPECIFIC KIT 
    getOneKitFromRb(URL) {
        return fetch(`${this.rebrickableBaseUrl}sets/${URL}/`, this.rebrickableAuth)
        .then(r=>r.json())
    }

// Requests to Brickit API:
    
    //LOG USER IN
    Login(formData) {
        return fetch(`${this.baseUrl}/login`, this.postConfig(formData))
        .then(r=>r.json())
    }

    //SIGN NEW USER UP
    Signup(formData) {
        return fetch(`${this.baseUrl}/signup`, this.postConfig(formData))
        .then(r=>r.json())
    }
    
    //LOG USER OUT --> POST request to sessions#destroy
    Logout(token) {
        return fetch(`${this.baseUrl}/logout`, this.postConfig(null, token))
        .then(r=>r.json())
    }

    // Retrieve specific SELECTION from DB --> GET request to selections#show
    fetchSelection(id, token) {
    return fetch(`${this.baseUrl}/selections/${id}`, this.getConfig(token))
        .then(resp => resp.json())
    }

    //Retrieve all SELECTIONS from User's DB and add to Collection Store.
    fetchAllSelections(token) {
        return fetch(`${this.backend}/selections`, this.getConfig(token))
            .then(resp => resp.json())
    }

    //Send specific SELECTION to DB --> POST request to selection#create
    sendSelection(configPackage, token) {
        return fetch(`${this.baseUrl}/selections`, this.postConfig(configPackage, token))
        .then(r => r.json())
    }

    submitComment(configPackage, token) {
        return fetch(`${this.backend}/comments`, this.postConfig(configPackage, token))
        .then(r => r.json())
    }



    fetchUserComments(token) {
        return fetch(`${this.backend}/comments`, this.getConfig(token))
            .then(resp => resp.json())
    }

    updateComments(configPackage, token) {
        return fetch(`${this.backend}/community/update`, this.postConfig(configPackage, token))
        .then(r => r.json())
    }

    fetchCommunityComments(token) {
        return fetch(`${this.backend}/community`, this.getConfig(token))
        .then(resp => resp.json())
    }



    deleteComment(configPackage, token) {
        return fetch(`${this.baseUrl}/comments/${configPackage}`, this.deleteConfig(configPackage, token))
            .then(resp => resp.json())
    }


}

let api = new ApiAdapter
export default api