import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

export default class LandingPage extends Component {
state = {
}
render() {
    return(
        <div>
            Welcome to Brickit!  Please log in or sign up here:
        </div>
    )

}
}