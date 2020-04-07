import thunkAction from '../actions/thunkActions'
import api from '../classes/adapters'


export const UserLogOut = () => {
    return (dispatch) => {
        api.Logout(window.localStorage.token)
        .then(resp => {
            dispatch({type: 'LOG_OUT'})
           
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('state')
            window.localStorage.removeItem('current_user')
        })
        .catch(err => console.log(err))
    }
}

export const loadOauth = (userInfo) => {
    return (dispatch) => {
        dispatch({type: 'SET_USER',
            payload: userInfo       
        })
        let serializedUser = JSON.stringify(userInfo)
        window.localStorage.setItem('current_user', serializedUser)
    }
}

export const loadLogin = (userInfo) => {
    
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        api.Login(userInfo)
        .then(resp => {
            if (resp.token){
                window.localStorage.setItem('token', resp.token)
                dispatch({type: 'SET_USER',
                    payload: thunkAction.handleLoginCredentials(resp)
                })
            }else{
                setTimeout(() => {dispatch({ type:'COMPLETE_LOGIN_THROW' })}, 2000)
                dispatch({
                    type: 'THROW_LOGIN_ERROR',
                    payload: resp.error
                })
            }
        })
        .catch(err => console.log(err))
    }
}

export const loadSignup = (userInfo) => {
    
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        api.Signup(userInfo)
        .then(resp => {
            if (resp.token){
                window.localStorage.setItem('token', resp.token)
                dispatch({type: 'SET_USER',
                payload: thunkAction.handleLoginCredentials(resp)
            })
        }else{
            setTimeout(() => {dispatch({ type:'COMPLETE_LOGIN_THROW' })}, 2000)
            dispatch({
                type: 'THROW_LOGIN_ERROR',
                payload: `Signup failed: ${thunkAction.handleLoginErrors(resp)}` 
            })
        }
    })
    .catch(err => console.log(err))
    }
}