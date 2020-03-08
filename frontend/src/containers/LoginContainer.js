import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setUser} from '../actions/authentications'
import LoginInput from '../components/Login/LoginInput';
import LoginOauth from '../components/Login/LoginOauth';
import api from '../classes/adapters'
import auth from '../classes/auth';



class LoginContainer extends Component {
   state = {
       name: "",
       password: ""
   }

   //RECORDS USERNAME AND PASSWORD KEYSTROKES
   handleOnChange = event => {
       const {name, value} = event.target
       this.setState({
           [name]: value
        })
    }
        
    //LOG USER IN.
    handleOnLogin = e => {
        e.preventDefault()
       

        let logInCredentials = {
            name: this.state.name,
            password: this.state.password
        }

        api.Login(logInCredentials)
        .then(resp => {
            let verifiedUserCredentials={name: resp.package.name, id: resp.package.id}
            
            console.log(verifiedUserCredentials)
            window.localStorage.setItem('token', resp.token)
           
            if (window.localStorage.token){
                this.props.setUser(verifiedUserCredentials)
            } else {
                this.props.setUser('unresolved')
                
            }
        })
        .catch(err => console.log(err))


    } 

    //SIGN NEW USER UP.
    handleOnSignup = e => {
        e.preventDefault()

        let logInCredentials = {
            name: this.state.name,
            password: this.state.password
        }

        api.Signup(logInCredentials)
        .then(resp => {
            window.localStorage.setItem('token', resp.token)
            console.log(resp)
        })
        .catch(err=> console.log("errors!!!:", err))
    }
   
    render() {
        return(
            <div className="entry-modal flex w-xl" id="sign-in">
                <div className="bg-white rounded-lg flex flex-col px-6 shadow">
                    <LoginInput passwordState={this.state.password} nameState={this.state.name} Signup={this.handleOnSignup} Login={this.handleOnLogin} trackChange={this.handleOnChange}/>
                    <LoginOauth />
                {/* </div> */}
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (userInfo => {
            dispatch(setUser(userInfo))
        })
    }
}

export default connect(null, mapDispatchToProps)(LoginContainer);