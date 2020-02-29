import React, { Component } from 'react'


class Login extends Component {

    state= {
        name: "",
        password: ""
    }

    handleOnChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleOnLogIn = event => {
        event.preventDefault()

        let formData = {
            name: this.state.name,
            password: this.state.password
        }

        let configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)

        }
          
        fetch('http://localhost:3001/login', configurationObject)
       .then(response => response.json())
       .then(resp => {
           window.localStorage.setItem('token', resp.token)
           console.log(resp)
            })
       .catch(err => console.log(err))
        }


    handleOnSignUp = event => {
        event.preventDefault()
        let configurationObject = {
            method: "GET",
            headers: {
              "Authorization": window.localStorage.token
            }
        }

        fetch('http://localhost:3001/kits', configurationObject)
        .then(response => response.json())
       .then(resp => { console.log(resp) })
       .catch(err => console.log(err))
    }

render() {
    return(
        <div className="entry-modal flex w-xl" id="sign-in">
            <div className="bg-white rounded-lg  px-6 shadow">
                <h1 className="font-semibold pb-2 text-xl"> Welcome to Brickit!</h1>
                <h2>Please sign up or sign in below:</h2> 
                <div className="my-2">
                    <h2 className="font-semibold">Username:</h2>

                    <input 
                    type="text"
                    onChange={this.handleOnChange}
                    value={this.state.name}
                    name="name"
                    id="login-name"
                    className="submit-btn"
                    />

                    <h2 className="font-semibold">Password:</h2>

                    <input 
                    type="password"
                    onChange={this.handleOnChange}
                    value={this.state.password}
                    name="password"
                    id="login-password"
                    className="submit-btn"
                    />

                    <div className="py-4">
                        <input className="submit-btn mr-2" id="signup-btn" type="submit" onClick={this.handleOnSignUp} value="Get Kits"/>
                        <input className="submit-btn mr-2" id="login-btn" type="submit" onClick={this.handleOnLogIn} value="Log In"/>
                    </div>
                    <div id="alert-div" className="hidden"></div>
                </div> 
            </div>
        </div>
        
    )
}
}

export default Login