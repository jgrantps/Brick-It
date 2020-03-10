import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginContainer from '../containers/LoginContainer';

export default class LandingPage extends Component {
state = {
}
render() {
    return(
        <>
        <div className="entry-modal h-full mt-12 flex justify-center align-center w-xl" id="welcome">
        <div className="bg-white rounded-lg mx-4 my-4 flex bg-gray-100  flex-col py-6 px-6 shadow">
            <h1 className="text-2xl font-bold">
                Welcome to Brickit!
            </h1>
            
            <Link className="submit-btn py-2 mt-4 mb-2 flex align-center justify-center" to="/login">Enter Here</Link>
            
        </div>
    </div>
    </>
    )

}
}