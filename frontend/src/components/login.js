import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../classes/adapters';
import {Kit} from '../classes/kits';
import { Theme } from '../classes/themes';
import { Selection } from '../classes/selections';

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
    
    //LOG USER IN.
    handleOnLogIn = event => {
        event.preventDefault()

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
    


    //LOG USER OUT
    handleOnLogOut = event => {
        event.preventDefault()
        
        api.Logout(window.localStorage.token)
        .then(resp => {
            window.localStorage.removeItem('token')
            console.log(resp)
        })
        .catch(err => console.log(err))
    }

    //RETRIEVE SPECIFIC SELECTION FROM LOCAL API
    getSelections = event => {
        event.preventDefault()
        
        api.fetchSelection('2', window.localStorage.token)
        .then(resp =>{ 
            return console.log(resp)
            // let bb = new Selection(resp)
            // console.log(bb)
        })
    }

    //RETRIEVE ALL THEMES FROM REBRICKABLE API
    getAllThemes = event => {
        event.preventDefault()
        
        api.retrieveThemes()
        .then(resp => { resp.results.map(theme => { 
            //ASSIGN REBRICKABLE API_ID TO A SPECIFIED ID ATTRIBUTE; DEFAULT ID SET TO 'UNDEFINED'.
            let formattedTheme = {...theme, api_id: theme.id}
            
            new Theme(formattedTheme)})
            console.log(Theme.allIncludedThemes); //returns array of THEME objects to be sorted.
        })
        .catch(err => console.log(err))
    }

    //RETRIEVE ALL KITS FOR SPECIFIED THEME FROM REBRICKABLE API
    getKitsFromTheme = event => {
        event.preventDefault()
        
        api.fetchThemedKits("125")
        .then(resp => { resp.results.map(kit => {new Kit(kit)}) 
        console.log(Kit.allIncludedKits); //returns array of KIT objects to be sorted
    })
    .catch(err => console.log(err))
    } 

    //RETRIEVE SPECIFIC KIT FROM THE REBRICKABLE API 
    fetchKit = event => {
        event.preventDefault()
        
        api.getOneKitFromRb("40289-1")
        .then(resp => { 
            console.log(resp)
            let legoset = new Kit(resp)
            console.log(legoset)
        })
        .catch(err => console.log(err))
    }


    //SEND SELECTION TO USER DB
    // ****BROKEN STILL --> MUST FIX
    // sendSelection = event => {
        //     event.preventDefault()
        
        //     api.sendSelection(window.localStorage.token, selectionData)
        // }
        
        // RETRIEVE SPECIFIC SELECTION FROM USER DB.
        // fetchSelection = event => {
            //     event.preventDefault()
            
            //     api.fetchSelection('3', window.localStorage.token)
            //     .then(resp => { console.log(resp) })
            //     .catch(err => console.log(err))
            // }

                
        
                
                
                
    render() {
        return(
            <div className="entry-modal flex w-xl" id="sign-in">
                <div className="bg-white rounded-lg  px-6 shadow">
                    <h1 className="font-semibold pb-2 my-2 text-xl"> Welcome to Brickit!</h1>
                    <h2>Please sign up or sign in below:</h2> 
                    <div className="my-2 my-2">
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
                        
                            <input className="submit-btn mr-2 my-2" id="login-btn" type="submit" onClick={this.handleOnLogIn} value="LOG IN"/>
                            <a className="submit-btn mr-2 my-2" href="http://localhost:3001/auth/github">Login Via GITHUB</a>
                            <input className="submit-btn mr-2 my-2" id="logout-btn" type="submit" onClick={this.handleOnLogOut} value="LOG OUT"/>
                            <input className="submit-btn mr-2 my-2" id="signup-btn" type="submit" onClick={this.getSelections} value="GET SELECTION FROM LOCAL API"/>
                            <input className="submit-btn mr-2 my-2" id="fetch-btn" type="submit" onClick={this.getAllThemes} value="FETCH ALL THEMES FROM REBRICKABLE"/>
                            <input className="submit-btn mr-2 my-2" id="fetch-btn" type="submit" onClick={this.getKitsFromTheme} value="FETCH KITS FROM SPECIFIED THEME"/>
                            <input className="submit-btn mr-2 my-2" id="fetch-btn" type="submit" onClick={this.fetchKit} value="FETCH KIT"/>
                            <input className="submit-btn mr-2 my-2" id="fetch-btn" type="submit" onClick={this.fetchSelection} value="FETCH Selection from BrickIt"/>
                            <input className="submit-btn mr-2 my-2" id="fetch-btn" type="submit" onClick={this.fetchThemes} value="FETCH Themes from Rebrickable"/>
                        </div>
                        <div id="alert-div" className="hidden"></div>
                    </div> 
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
 
})

export default connect(mapStateToProps)(Login)