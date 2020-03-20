import React, { Component } from 'react'
import {TextField} from '../../components/Elements/Elements'
import SubmitBtn from '../Buttons/SubmitBtn'
import { connect } from 'react-redux'

class LoginInput extends Component {
    state = {
        name: "",
        password: ""
    }
    
    errorMsg = () => {
        const {errors} = this.props
        if (errors) {
            return(
                <h2 className="error-msg">{errors}</h2>
                )
            }
        }
        
    loadingMsg = () => {
        const {loggingIn} = this.props
        if (loggingIn) {
            return(
            <h2 className="error-msg">PATIENCE! LOGGING YOU IN NOW!!</h2>
            )
        }
    }




   
    render() {
        const {trackChange, Signup, Login, passwordState, nameState} = this.props
        
        return(
            <>
            <h1 className="font-semibold pb-2 my-2 text-xl"> Welcome to Brickit!</h1>
            <h2>Please sign up or sign in below:</h2> 
            
            <div className="my-2 my-2">
                <label className="font-semibold flex flex-col">
                    Username:
                    <TextField type="text" trackChange={trackChange} name="name" value={nameState} />
                </label>

                <label className="font-semibold flex flex-col">
                    Password:
                    <TextField type="password" trackChange={trackChange} name="password" value={passwordState} />
                </label>
            </div>
            {this.errorMsg()}
            {this.loadingMsg()}
            <div className="flex justify-between">
            <SubmitBtn btnName="LOG IN" btnAction={Login}/>
            <SubmitBtn btnName="SIGN UP" btnAction={Signup}/>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        errors: state.user.errors,
        loggingIn: state.user.loggingIn
    }
}

export default connect(mapStateToProps)(LoginInput);