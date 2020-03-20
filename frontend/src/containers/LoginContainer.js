import React, { Component } from 'react';
import {connect} from 'react-redux';


import { loadLogin, loadSignup } from '../actions/adjusterSelections'
// import {setUser} from '../actions/authentications'
import LoginInput from '../components/Login/LoginInput';
import LoginOauth from '../components/Login/LoginOauth';
import api from '../classes/adapters'
import service from '../classes/service';



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

    // setErrorMessage = () => {
    //     this.setState({
    //       errors: <h2 className="error-msg">{this.props.errors}</h2>
    //     }) 
    // }
        
    //LOG USER IN.
    handleOnLogin = e => {
        e.preventDefault()
       
        let logInCredentials = {
            name: this.state.name,
            password: this.state.password
        }
        this.props.submitLogin(logInCredentials)

        // api.Login(logInCredentials)
        // .then(resp => {
        //     //HANDLE SUCCESS:
        //     if (resp.token) {
        //         let verifiedUserCredentials={name: resp.package.name, id: resp.package.id, slug: service.slugify(resp.package.name)}
        //         window.localStorage.setItem('token', resp.token)
        //         this.props.setUser(verifiedUserCredentials) 
        //     }
        // })
        // .catch(err => console.log(err))


    } 

    //SIGN NEW USER UP.
    handleOnSignup = e => {
        e.preventDefault()

        let logInCredentials = {
            name: this.state.name,
            password: this.state.password
        }
        this.props.submitSignup(logInCredentials)
       
        // api.Signup(logInCredentials)
        // .then(resp => {
        //     //HANDLE SUCCESS:
        //     if (resp.token) {
        //         let verifiedUserCredentials={name: resp.package.name, slug: service.slugify(resp.package.name), id: resp.package.id}
        //         window.localStorage.setItem('token', resp.token)
        //         this.props.setUser(verifiedUserCredentials)
        //  } else {
        //     //HANDLE ERRORS:
        //     var ary=[]
        //        resp.main.name ? ary.push(resp.main.name[0]) : console.log(null)
        //        resp.main.password ? ary.push(resp.main.password[0]) : console.log(null) 
                               
        //     let msg = ary.join(", ")
        //     this.setErrorMessage(msg)
        //     }
        // })
        // .catch(err=> console.log("errors!!!:", err))
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
        // setUser: (userInfo => {dispatch(setUser(userInfo))})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);