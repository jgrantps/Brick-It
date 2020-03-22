import React, { Component } from 'react'
import {TextField} from '../../components/Elements/Elements'
import {SubmitBtn} from '../Elements/Elements'

import { connect } from 'react-redux'

class LoginInput extends Component {
    state = {
        name: "",
        password: ""
    }

    loadingErrors = () => {

        const {errors, errorThrown} = this.props
        if (errors && !errorThrown) {
            return <h2 className="error-msg">{errors}</h2>
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
            {/* <h2 id="login-errors" className="hidden">{this.props.errors}</h2> */}
            
            {this.loadingErrors()}
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
        errorThrown: state.user.errorThrown,
        loggingIn: state.user.loggingIn
    }
}

export default connect(mapStateToProps)(LoginInput);