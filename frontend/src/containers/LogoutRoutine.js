import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/authentications'

class LogoutRoutine extends Component {
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