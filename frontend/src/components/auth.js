class Auth {
    success = () => {
        return true;
    }

    invalid = () => {
        return false;
    }
}

let auth = new Auth()
export default auth;