class ApiAdapter {

    constructor() { 
        this.baseUrl = "http://localhost:3001" 
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
        this.postConfig = (formData= '', token=undefined, method="POST") =>{
            return ({  
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(formData)
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

    //Send specific SELECTION to DB --> POST request to selection#create
    sendSelection(id, token) {
        return fetch(`${this.baseUrl}/selections`, this.postConfig(token))
    }


}

let api = new ApiAdapter
export default api