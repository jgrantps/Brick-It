import React, { Component } from 'react'

import api from '../classes/adapters';
import { connect } from 'react-redux';
import { Redirect, Link, Route } from 'react-router-dom';

class Oauth extends Component {

render () {
    let queryString=window.location.search
    let urlParam = new URLSearchParams(queryString) 
    let newtoken = urlParam.get('token')
    window.localStorage.setItem('token', newtoken)
    return <Redirect to='/login'  />
}   
}

export default Oauth;