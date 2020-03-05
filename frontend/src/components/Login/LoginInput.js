import React, { Component } from 'react'
import api from '../../classes/adapters'
import SubmitBtn from '../Buttons/SubmitBtn'

class LoginInput extends Component {
    state = {
        name: "",
        password: ""
    }

   
    render() {
        const {trackChange, Signup, Login, passwordState, nameState} = this.props
        return(
            <>
            {/* // <div className="entry-modal flex w-xl" id="sign-in">
            //     <div className="bg-white rounded-lg  px-6 shadow"> */}
                    <h1 className="font-semibold pb-2 my-2 text-xl"> Welcome to Brickit!</h1>
                    <h2>Please sign up or sign in below:</h2> 
                    
                    <div className="my-2 my-2">
                        <h2 className="font-semibold">Username:</h2>
                        <input 
                        type="text"
                        onChange={trackChange}
                        value={nameState}
                        name="name"
                        id="login-name"
                        className="submit-btn"
                        />

                        <h2 className="font-semibold">Password:</h2>
                        <input 
                        type="password"
                        onChange={trackChange}
                        value={passwordState}
                        name="password"
                        id="login-password"
                        className="submit-btn"
                        />
                    </div>
                    <div className="flex justify-between">
                    <SubmitBtn btnName="LOG IN" btnAction={Login}/>
                    <SubmitBtn btnName="SIGN UP" btnAction={Signup}/>
                    </div>
            {/* //     </div>
            // </div> */}
            </>
        )
    }

}

export default LoginInput;