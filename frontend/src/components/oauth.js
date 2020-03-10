import React, { Component } from 'react'

import api from '../classes/adapters';
import {setUser} from '../actions/authentications'

import { connect } from 'react-redux';
import service from '../classes/service'
import { Redirect, Link, Route } from 'react-router-dom';

class Oauth extends Component {

render () {
    let queryString=window.location.search
    let urlParam = new URLSearchParams(queryString) 
    let newtoken = urlParam.get('token')
    let userName = urlParam.get('name')
    let userId = urlParam.get('id')
    window.localStorage.setItem('token', newtoken)
    let verifiedUserCredentials={name: userName, id: userId, slug: service.slugify(userName)}
    this.props.setUser(verifiedUserCredentials) 

    return <Redirect to='/login'  />
}   
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (userInfo => {
            dispatch(setUser(userInfo))
        })
    }
}


export default connect(null, mapDispatchToProps)(Oauth);