import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/authentications'
import {Theme} from '../classes/themes'
import {Kit} from '../classes/kits'

class LogoutRoutine extends Component {
    componentDidMount() {
       return(
           Theme.clearCache,
           Kit.clearCache
           )
            
    }
    
    render() {  
        this.props.logout()
        return( <Redirect to="/login" component />)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (() => {
            dispatch(logout())
        })
    }
}
export default connect(null, mapDispatchToProps)(LogoutRoutine);