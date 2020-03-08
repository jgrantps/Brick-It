class Auth {

    constructor() {
        this.loggedIn = false
    }

    set success(e = true) {
        this.loggedIn = e 
    }

    set invalid(e = false) {
        this.loggedIn = e
    }
}

let auth = new Auth()
export default auth;