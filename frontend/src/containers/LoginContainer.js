import React, { Component } from 'react';
import {connect} from 'react-redux';

import LoginInput from '../components/Login/LoginInput';
import LoginOauth from '../components/Login/LoginOauth';
import api from '../classes/adapters'


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
            window.localStorage.setItem('token', resp.token)
            console.log(resp)
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
                    <LoginInput passwordState={this.state.password} Signup={this.handleOnSignup} nameState={this.state.name} Login={this.handleOnLogin} trackChange={this.handleOnChange}/>
                    <LoginOauth />
                {/* </div> */}
            </div>
            </div>
        )
    }
}

export default LoginContainer;