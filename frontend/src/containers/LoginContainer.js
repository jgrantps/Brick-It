import React, { Component } from 'react';
import {connect} from 'react-redux';

import { loadLogin, loadSignup } from '../actions/userAccess'
import LoginInput from '../components/Login/LoginInput';
import LoginOauth from '../components/Login/LoginOauth';



class LoginContainer extends Component {
   state = {
       name: "",
       password: "",
       errors: undefined
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
        this.props.submitLogin(logInCredentials)
    } 

    //SIGN NEW USER UP.
    handleOnSignup = e => {
        e.preventDefault()

        let logInCredentials = {
            name: this.state.name,
            password: this.state.password
        }
        this.props.submitSignup(logInCredentials)
    }
   
    render() {
        return(
            <div className="entry-modal  h-full mt-12 flex justify-center align-center w-xl" id="sign-in">
                <div className="bg-white rounded-lg bg-gray-100 flex flex-col px-6 shadow">
                    <LoginInput passwordState={this.state.password} error={this.state.errors} nameState={this.state.name} Signup={this.handleOnSignup} Login={this.handleOnLogin} trackChange={this.handleOnChange}/>
                    <LoginOauth />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        errors: state.user.errors,
        loggingIn: state.user.loggingIn,
        loggedIn: state.user.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (userInfo => {dispatch(loadLogin(userInfo))}), 
        submitSignup: (userInfo => {dispatch(loadSignup(userInfo))}), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);