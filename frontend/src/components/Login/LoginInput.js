import React, { Component } from 'react'
import SubmitBtn from '../Buttons/SubmitBtn'

class LoginInput extends Component {
    state = {
        name: "",
        password: ""
    }

   
    render() {
        const {trackChange, Signup, Login, passwordState, error, nameState} = this.props
        return(
            <>
            <h1 className="font-semibold pb-2 my-2 text-xl"> Welcome to Brickit!</h1>
            <h2>Please sign up or sign in below:</h2> 
            
            <div className="my-2 my-2">
                <label className="font-semibold flex flex-col">
                    Username:
                    <input type="text" onChange={trackChange} value={nameState} name="name" id="login-name" className="submit-btn"/>
                </label>

                <label className="font-semibold flex flex-col">
                    Password:
                    <input  type="password" onChange={trackChange} value={passwordState} name="password" id="login-password" className="submit-btn" />
                </label>
            </div>
            {error}
            <div className="flex justify-between">
            <SubmitBtn btnName="LOG IN" btnAction={Login}/>
            <SubmitBtn btnName="SIGN UP" btnAction={Signup}/>
            </div>
            </>
        )
    }
}

export default LoginInput;