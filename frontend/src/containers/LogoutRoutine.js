import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {UserLogOut} from '../actions/userAccess'
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
        this.props.UserLogOut()
        return( <Redirect to="/login" component />)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        UserLogOut: () => {dispatch(UserLogOut())}
    }
}
export default connect(null, mapDispatchToProps)(LogoutRoutine);