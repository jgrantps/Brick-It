class ApiAdapter {

    constructor() { 
        this.baseUrl = "http://localhost:3001" 
        this.rebrickableBaseUrl = "https://rebrickable.com/api/v3/lego/"
        
        this.rebrickableAuth = {
            method: "GET", 
            headers: {
                Authorization: "key 691de533ab29f2be2c2a36d536590a5e",
            }
        }

        this.postConfig = (formData= '', method="POST") =>{
            return ({  
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
        }

        this.brickItAuth = (storage = undefined) =>{
            return ({
                method: "GET",
                headers: {
                    "Authorization": storage,
                }
            })
        }
    }

// Fetch Requests to Rebrickable API:
    //GET KITS FOR SPECIFIED THEME
    fetchThemedKits(URL) {
        return fetch(`${this.rebrickableBaseUrl}/sets/?theme_id=${URL}`, this.rebrickableAuth)
        .then(r => r.json())
    }

    //GET ALL THEMES
    getThemes() {
        return fetch(`${this.rebrickableBaseUrl}/themes/?page_size=655`, this.rebrickableAuth)
        .then(r => r.json())
    }

    getKit(URL) {
        return fetch(`${this.rebrickableBaseUrl}sets/${URL}/`, this.rebrickableAuth)
        .then(r=>r.json())
    }

    

// Fetch Requests to Brickit API:
    Login(formData) {
        return fetch(`${this.baseUrl}/login`, this.postConfig(formData))
        .then(r=>r.json())
    }

    Logout(formData) {
        return fetch(`${this.baseUrl}/logout`, this.postConfig())
        .then(r=>r.json())
    }

    fetchKit(token) {
        return fetch(`${this.baseUrl}/kits`, this.brickItAuth(token))
        .then(response => response.json())
    }
    

    // GET request to Selections#Show
    fetchSelection(id, token) {
        return fetch(`${this.baseUrl}/selections/${id}`, this.brickItAuth(token))
        .then(resp => resp.json())
    }
}

let api = new ApiAdapter
export default api