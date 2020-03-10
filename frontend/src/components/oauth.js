import React, { Component } from 'react'
import service from '../classes/service'

import { connect } from 'react-redux';
import {setUser} from '../actions/authentications'
import { Redirect} from 'react-router-dom';

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