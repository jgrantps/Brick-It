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
    getTheme(URL) {
        return fetch(`${this.rebrickableBaseUrl}/themes/${URL}`, this.rebrickableAuth)
        .then(r => r.json())
    }

    getThemes() {
        return fetch(`${this.rebrickableBaseUrl}/themes`, this.rebrickableAuth)
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

    fetchKit(storage) {
        return fetch(`${this.baseUrl}/kits`, this.brickItAuth(storage))
        .then(response => response.json())
    }
}

let api = new ApiAdapter
export default api